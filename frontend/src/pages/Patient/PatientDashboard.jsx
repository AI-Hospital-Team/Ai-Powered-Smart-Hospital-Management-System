import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

const API_URL = "http://localhost:8080/api";

function PatientDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================================================
  // AI HEALTH ASSISTANT STATES
  // =========================================================
  const [aiSymptoms, setAiSymptoms] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // =========================================================
  // LOAD USER
  // =========================================================
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error("No user found in localStorage.");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      console.log("Logged-in user:", parsedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error reading logged-in user:", error);
      setLoading(false);
    }
  }, []);

  // =========================================================
  // FETCH PATIENT DATA
  // =========================================================
  useEffect(() => {
    if (!user?.patientId) {
      return;
    }

    const patientId = user.patientId;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [
          appointmentsResponse,
          recordsResponse,
          prescriptionsResponse,
          billsResponse,
        ] = await Promise.allSettled([
          fetch(`${API_URL}/appointments/patient/${patientId}`),
          fetch(`${API_URL}/medical-records/patient/${patientId}`),
          fetch(`${API_URL}/prescriptions/patient/${patientId}`),
          fetch(`${API_URL}/bills/patient/${patientId}`),
        ]);

        // APPOINTMENTS
        if (
          appointmentsResponse.status === "fulfilled" &&
          appointmentsResponse.value.ok
        ) {
          const data = await appointmentsResponse.value.json();
          setAppointments(Array.isArray(data) ? data : []);
        } else {
          setAppointments([]);
        }

        // MEDICAL RECORDS
        if (
          recordsResponse.status === "fulfilled" &&
          recordsResponse.value.ok
        ) {
          const data = await recordsResponse.value.json();
          setMedicalRecords(Array.isArray(data) ? data : []);
        } else {
          setMedicalRecords([]);
        }

        // PRESCRIPTIONS
        if (
          prescriptionsResponse.status === "fulfilled" &&
          prescriptionsResponse.value.ok
        ) {
          const data = await prescriptionsResponse.value.json();
          setPrescriptions(Array.isArray(data) ? data : []);
        } else {
          setPrescriptions([]);
        }

        // BILLS
        if (
          billsResponse.status === "fulfilled" &&
          billsResponse.value.ok
        ) {
          const data = await billsResponse.value.json();
          setBills(Array.isArray(data) ? data : []);
        } else {
          setBills([]);
        }
      } catch (error) {
        console.error("Patient dashboard data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // =========================================================
  // UPCOMING APPOINTMENT
  // =========================================================
  const upcomingAppointment = useMemo(() => {
    if (!appointments.length) {
      return null;
    }

    const validAppointments = appointments.filter((appointment) => {
      const status = String(appointment?.status || "").toLowerCase();
      return (
        status !== "cancelled" &&
        status !== "canceled" &&
        status !== "completed"
      );
    });

    if (!validAppointments.length) {
      return null;
    }

    return [...validAppointments].sort((a, b) => {
      const dateA = new Date(
        `${a.appointmentDate || ""} ${a.appointmentTime || ""}`
      );
      const dateB = new Date(
        `${b.appointmentDate || ""} ${b.appointmentTime || ""}`
      );
      return dateA - dateB;
    })[0];
  }, [appointments]);

  // =========================================================
  // PATIENT NAME
  // =========================================================
  const patientName =
    user?.name ||
    user?.fullName ||
    user?.patientName ||
    "Patient";

  // =========================================================
  // AI HEALTH ASSISTANT HANDLER
  // =========================================================
  const handleAIHealthAssistant = async () => {
    const symptoms = aiSymptoms.trim();

    if (!symptoms) {
      setAiError("Please describe your symptoms first.");
      setAiResponse("");
      return;
    }

    if (symptoms.length < 20) {
      setAiError("Please describe your symptoms in more detail (at least 20 characters).");
      setAiResponse("");
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiResponse("");

    try {
      const response = await fetch(
        `${API_URL}/ai/health-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: symptoms,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get AI response.");
      }

      setAiResponse(data?.response || "AI response was not available.");
    } catch (error) {
      console.error("AI Health Assistant Error:", error);
      setAiError(
        "Unable to connect to AI Health Assistant. Please make sure Ollama and the hospital backend are running."
      );
    } finally {
      setAiLoading(false);
    }
  };

  // =========================================================
  // DATE & TIME FORMATTERS
  // =========================================================
  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      const parsed = new Date(date);
      if (Number.isNaN(parsed.getTime())) {
        return date;
      }
      return parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const formatTime = (time) => {
    if (!time) {
      return "Time not available";
    }
    return String(time).slice(0, 5);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // =========================================================
  // PAGE RENDER
  // =========================================================
  return (
    <div className="patient-dashboard">
      {/* =====================================================
          WELCOME HEADER
      ===================================================== */}
      <section className="dashboard-welcome">
        <div className="welcome-content">
          <span className="welcome-label">AI SMART HOSPITAL</span>
          <h1>
            {getGreeting()}, {patientName}
          </h1>
          <p>
            Welcome to your patient dashboard. Manage your appointments,
            medical records, prescriptions, and billing all in one place.
          </p>

          {user?.patientId && (
            <span className="welcome-patient-id">
              Patient ID: #{user.patientId}
            </span>
          )}

          <div className="welcome-actions">
            <button
              type="button"
              className="primary-dashboard-button"
              onClick={() => navigate("/patient/book-appointment")}
            >
              <span className="button-icon">+</span>
              Book Appointment
            </button>

            <button
              type="button"
              className="secondary-dashboard-button"
              onClick={() => navigate("/patient/appointments")}
            >
              View Appointments
            </button>
          </div>
        </div>

        <div className="welcome-visual">
          <div className="welcome-heart">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M20.8 8.8c0 5.5-8.8 10.4-8.8 10.4S3.2 14.3 3.2 8.8A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.4Z" />
              <path d="M7 11h2l1.2-2.2L12 14l1.5-3h2.5" />
            </svg>
          </div>
          <strong>
            Your Health,<br />Our Priority
          </strong>
          <span>Stay informed. Stay healthy.</span>
        </div>
      </section>

      {/* =====================================================
          QUICK OVERVIEW
      ===================================================== */}
      <section className="dashboard-overview">
        <div className="dashboard-section-heading">
          <div>
            <span>OVERVIEW</span>
            <h2>Your Healthcare Summary</h2>
          </div>
          <p>A quick look at your hospital information.</p>
        </div>

        <div className="dashboard-cards">
          {/* APPOINTMENTS */}
          <button
            type="button"
            className="dashboard-card card-appointments"
            onClick={() => navigate("/patient/appointments")}
          >
            <div className="dashboard-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <span>Appointments</span>
              <strong>{loading ? "..." : appointments.length}</strong>
              <small>
                {appointments.length === 0
                  ? "No appointments yet"
                  : "View your appointments"}
              </small>
            </div>
            <span className="dashboard-card-arrow">→</span>
          </button>

          {/* MEDICAL RECORDS */}
          <button
            type="button"
            className="dashboard-card card-records"
            onClick={() => navigate("/patient/medical-records")}
          >
            <div className="dashboard-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h5M8 16h6" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <span>Medical Records</span>
              <strong>{loading ? "..." : medicalRecords.length}</strong>
              <small>
                {medicalRecords.length === 0
                  ? "No records yet"
                  : "View your records"}
              </small>
            </div>
            <span className="dashboard-card-arrow">→</span>
          </button>

          {/* PRESCRIPTIONS */}
          <button
            type="button"
            className="dashboard-card card-prescriptions"
            onClick={() => navigate("/patient/prescriptions")}
          >
            <div className="dashboard-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m8 8 8 8" />
                <path d="m16 8-8 8" />
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <span>Prescriptions</span>
              <strong>{loading ? "..." : prescriptions.length}</strong>
              <small>
                {prescriptions.length === 0
                  ? "No prescriptions yet"
                  : "View your medicines"}
              </small>
            </div>
            <span className="dashboard-card-arrow">→</span>
          </button>

          {/* BILLS */}
          <button
            type="button"
            className="dashboard-card card-bills"
            onClick={() => navigate("/patient/bills")}
          >
            <div className="dashboard-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <span>Bills &amp; Payment</span>
              <strong>{loading ? "..." : bills.length}</strong>
              <small>
                {bills.length === 0
                  ? "No bills yet"
                  : "View billing information"}
              </small>
            </div>
            <span className="dashboard-card-arrow">→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          UPCOMING APPOINTMENT & HEALTH MESSAGE
      ===================================================== */}
      <section className="dashboard-main-grid">
        <div className="upcoming-card">
          <div className="content-card-header">
            <div>
              <span className="section-label">APPOINTMENT</span>
              <h2>Upcoming Appointment</h2>
            </div>
            <button
              type="button"
              className="text-link-button"
              onClick={() => navigate("/patient/appointments")}
            >
              View All →
            </button>
          </div>

          {loading ? (
            <div className="dashboard-empty-state">
              <div className="empty-state-loader"></div>
              <p>Checking your appointments...</p>
            </div>
          ) : upcomingAppointment ? (
            <div className="upcoming-appointment">
              <div className="appointment-date-box">
                <span>
                  {formatDate(upcomingAppointment.appointmentDate).split(" ")[0]}
                </span>
                <strong>
                  {formatDate(upcomingAppointment.appointmentDate).split(" ")[1]}
                </strong>
              </div>

              <div className="appointment-details">
                <h3>Doctor #{upcomingAppointment.doctorId || "—"}</h3>
                <p>{upcomingAppointment.reason || "General consultation"}</p>
                <div className="appointment-meta">
                  <span>{formatDate(upcomingAppointment.appointmentDate)}</span>
                  <span>{formatTime(upcomingAppointment.appointmentTime)}</span>
                </div>
              </div>

              <span className="appointment-status">
                {upcomingAppointment.status || "Confirmed"}
              </span>
            </div>
          ) : (
            <div className="dashboard-empty-state">
              <div className="empty-state-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                </svg>
              </div>
              <h3>No upcoming appointments</h3>
              <p>
                Ready to see a doctor? Book your first appointment in just a few
                steps.
              </p>
              <button
                type="button"
                className="empty-state-button"
                onClick={() => navigate("/patient/book-appointment")}
              >
                + Book Appointment
              </button>
            </div>
          )}
        </div>

        {/* HEALTH MESSAGE */}
        <div className="health-message-card">
          <div className="health-message-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 21s-7-4.4-9-9.2C1.5 8.2 3.5 5 7 5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 5.5 3.2 4 6.8C19 16.6 12 21 12 21Z" />
            </svg>
          </div>
          <span className="section-label">YOUR HEALTH MATTERS</span>
          <h2>
            Your Health,<br />Our Priority
          </h2>
          <p>
            Keep your healthcare information organized and stay informed about
            your appointments, records and prescriptions.
          </p>
          <div className="health-message-line">Stay healthy. Stay informed.</div>
        </div>
      </section>

      {/* =====================================================
          AI HEALTH ASSISTANT SECTION
      ===================================================== */}
      <section className="ai-health-section">
        <div className="ai-health-header">
          <div>
            <span className="section-label">AI HEALTHCARE</span>
            <h2>&#129302; AI Health Assistant</h2>
            <p>
              Describe your symptoms and get general health guidance powered by
              AI.
            </p>
          </div>
          <div className="ai-status-badge">
            <span className="ai-status-dot"></span>
            AI Assistant Online
          </div>
        </div>

        <div className="ai-health-card">
          {/* LEFT SIDE: INPUT */}
          <div className="ai-input-area">
            <label htmlFor="ai-symptoms">Describe Your Symptoms</label>
            <textarea
              id="ai-symptoms"
              value={aiSymptoms}
              onChange={(e) => {
                setAiSymptoms(e.target.value);
                setAiError("");
              }}
              placeholder="Example: fever, cough, weakness..."
              rows="6"
              disabled={aiLoading}
            />

            <div className="ai-input-footer">
              <span>{aiSymptoms.length} characters</span>
              <button
                type="button"
                className="ai-analyze-button"
                onClick={handleAIHealthAssistant}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <>
                    <span className="ai-spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>&#129302; Analyze Symptoms &rarr;</>
                )}
              </button>
            </div>

            {aiError && <div className="ai-error">⚠️ {aiError}</div>}
          </div>

          {/* RIGHT SIDE: RESPONSE */}
          <div className="ai-response-area">
            <div className="ai-response-header">
              <div className="ai-response-icon">&#129302;</div>
              <div>
                <span>AI ANALYSIS</span>
                <h3>Health Assistant Response</h3>
              </div>
            </div>

            {aiLoading ? (
              <div className="ai-loading">
                <div className="ai-loading-animation">&#129302;</div>
                <h3>Analyzing symptoms...</h3>
                <p>
                  Please wait while the health assistant prepares a response.
                </p>
              </div>
            ) : aiResponse ? (
              <div className="ai-response-content">
                <div className="ai-response-text"><ReactMarkdown>{aiResponse}</ReactMarkdown></div>
                <div className="ai-medical-warning">
                  ⚠️ <strong>Important:</strong>
                  <span>
                    This AI assistant provides general health information only.
                    It does not provide a definitive diagnosis or replace a
                    qualified doctor.
                  </span>
                </div>
              </div>
            ) : (
              <div className="ai-empty">
                <div className="ai-empty-icon">&#129695;</div>
                <h3>Your AI health guidance will appear here</h3>
                <p>
                  Enter your symptoms on the left and click{" "}
                  <strong>Analyze Symptoms</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="ai-disclaimer">
          <span>🔒</span>
          <p>
            AI-generated information is for educational purposes only. For
            medical concerns, always consult a qualified healthcare
            professional.
          </p>
        </div>
      </section>

      {/* =====================================================
          PATIENT SERVICES
      ===================================================== */}
      <section className="services-section">
        <div className="dashboard-section-heading">
          <div>
            <span>PATIENT SERVICES</span>
            <h2>Everything You Need in One Place</h2>
          </div>
          <p>Explore the different sections of your hospital account.</p>
        </div>

        <div className="service-grid">
          {/* APPOINTMENTS */}
          <div className="service-card">
            <div className="service-icon appointment-service">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
            </div>
            <h3>Appointments</h3>
            <p>View upcoming and previous appointments with your doctors.</p>
            <button
              type="button"
              onClick={() => navigate("/patient/appointments")}
            >
              View Appointments →
            </button>
          </div>

          {/* BOOK APPOINTMENT */}
          <div className="service-card featured-service">
            <div className="service-icon book-service">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M8 2v4M16 2v4M3 9h18M12 12v5M9.5 14.5h5" />
              </svg>
            </div>
            <h3>Book Appointment</h3>
            <p>
              Choose a doctor, date and time for your next consultation.
            </p>
            <button
              type="button"
              onClick={() => navigate("/patient/book-appointment")}
            >
              Book Now →
            </button>
          </div>

          {/* MEDICAL RECORDS */}
          <div className="service-card">
            <div className="service-icon records-service">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h5M8 16h6" />
              </svg>
            </div>
            <h3>Medical Records</h3>
            <p>Access your diagnosis, symptoms, treatment and medical notes.</p>
            <button
              type="button"
              onClick={() => navigate("/patient/medical-records")}
            >
              View Records →
            </button>
          </div>

          {/* PRESCRIPTIONS */}
          <div className="service-card">
            <div className="service-icon prescription-service">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m8 8 8 8M16 8l-8 8" />
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" />
              </svg>
            </div>
            <h3>Prescriptions</h3>
            <p>View your medicines, dosage, frequency and instructions.</p>
            <button
              type="button"
              onClick={() => navigate("/patient/prescriptions")}
            >
              View Prescriptions →
            </button>
          </div>

          {/* PROFILE */}
          <div className="service-card">
            <div className="service-icon profile-service">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="3" />
                <path d="M5 20c.8-3.5 3-5 7-5s6.2 1.5 7 5" />
              </svg>
            </div>
            <h3>My Profile</h3>
            <p>View your personal information and registered account details.</p>
            <button
              type="button"
              onClick={() => navigate("/patient/profile")}
            >
              View Profile →
            </button>
          </div>

          {/* BILLS */}
          <div className="service-card">
            <div className="service-icon bills-service">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            </div>
            <h3>Bills &amp; Payment</h3>
            <p>Review your hospital bills and simulated payment status.</p>
            <button
              type="button"
              onClick={() => navigate("/patient/bills")}
            >
              View Bills →
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEW PATIENT MESSAGE
      ===================================================== */}
      {!loading &&
        appointments.length === 0 &&
        medicalRecords.length === 0 &&
        prescriptions.length === 0 &&
        bills.length === 0 && (
          <section className="new-patient-card">
            <div className="new-patient-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>
            <div>
              <span className="section-label">GET STARTED</span>
              <h2>Welcome to AI Smart Hospital</h2>
              <p>
                Your account is ready. Start by booking an appointment with one
                of our doctors. Your appointments, medical records,
                prescriptions and billing information will appear here as you use
                the system.
              </p>
            </div>
            <button
              type="button"
              className="primary-dashboard-button"
              onClick={() => navigate("/patient/book-appointment")}
            >
              + Book Your First Appointment
            </button>
          </section>
        )}
    </div>
  );
}

export default PatientDashboard;






