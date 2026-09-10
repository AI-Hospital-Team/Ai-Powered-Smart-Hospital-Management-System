import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

const API_URL = "http://localhost:8080/api";

const AI_EXAMPLES = [
  {
    label: "🌡️ Fever & Cough",
    text: "I have fever, dry cough, weakness and mild headache for the last two days.",
  },
  {
    label: "🤧 Cold & Sore Throat",
    text: "I have a sore throat, runny nose and mild fever since yesterday.",
  },
  {
    label: "🤢 Stomach Problem",
    text: "I have stomach pain, nausea and weakness after eating since this morning.",
  },
];

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time) {
  if (!time) return "—";

  return String(time).slice(0, 5);
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
}

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================
     AI HEALTH ASSISTANT
  ========================= */

  const [aiSymptoms, setAiSymptoms] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Unable to load user:", error);
    }
  }, []);

  /* =========================
     LOAD PATIENT DATA
  ========================= */

  useEffect(() => {
    const patientId = user?.patientId;

    if (!patientId) {
      setLoading(false);
      return;
    }

    const loadDashboardData = async () => {
      setLoading(true);

      try {
        const results = await Promise.allSettled([
          fetch(`${API_URL}/appointments/patient/${patientId}`),
          fetch(`${API_URL}/medical-records/patient/${patientId}`),
          fetch(`${API_URL}/prescriptions/patient/${patientId}`),
          fetch(`${API_URL}/bills/patient/${patientId}`),
        ]);

        const [
          appointmentsResult,
          recordsResult,
          prescriptionsResult,
          billsResult,
        ] = results;

        if (
          appointmentsResult.status === "fulfilled" &&
          appointmentsResult.value.ok
        ) {
          const data = await appointmentsResult.value.json();
          setAppointments(Array.isArray(data) ? data : []);
        } else {
          setAppointments([]);
        }

        if (
          recordsResult.status === "fulfilled" &&
          recordsResult.value.ok
        ) {
          const data = await recordsResult.value.json();
          setMedicalRecords(Array.isArray(data) ? data : []);
        } else {
          setMedicalRecords([]);
        }

        if (
          prescriptionsResult.status === "fulfilled" &&
          prescriptionsResult.value.ok
        ) {
          const data = await prescriptionsResult.value.json();
          setPrescriptions(Array.isArray(data) ? data : []);
        } else {
          setPrescriptions([]);
        }

        if (
          billsResult.status === "fulfilled" &&
          billsResult.value.ok
        ) {
          const data = await billsResult.value.json();
          setBills(Array.isArray(data) ? data : []);
        } else {
          setBills([]);
        }
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user?.patientId]);

  /* =========================
     UPCOMING APPOINTMENT
  ========================= */

  const upcomingAppointment = useMemo(() => {
    const validAppointments = appointments.filter((appointment) => {
      const status = String(appointment?.status || "").toLowerCase();

      return (
        status !== "cancelled" &&
        status !== "canceled" &&
        status !== "completed"
      );
    });

    validAppointments.sort((a, b) => {
      const dateA = new Date(
        `${a?.appointmentDate || ""}T${a?.appointmentTime || "00:00"}`
      );

      const dateB = new Date(
        `${b?.appointmentDate || ""}T${b?.appointmentTime || "00:00"}`
      );

      return dateA - dateB;
    });

    return validAppointments[0] || null;
  }, [appointments]);

  /* =========================
     PATIENT NAME
  ========================= */

  const patientName =
    user?.name ||
    user?.fullName ||
    user?.patientName ||
    "Patient";

  /* =========================
     AI EXAMPLE
  ========================= */

  const handleExampleClick = (example) => {
    setAiSymptoms(example);
    setAiResponse("");
    setAiError("");
  };

  /* =========================
     AI HEALTH ASSISTANT
  ========================= */

  const handleAIHealthAssistant = async () => {
    const symptoms = aiSymptoms.trim();

    if (!symptoms) {
      setAiError("Please describe your symptoms first.");
      setAiResponse("");
      return;
    }

    if (symptoms.length < 20) {
      setAiError(
        "Please describe your symptoms in more detail (at least 20 characters)."
      );
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
            symptoms,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to get AI response."
        );
      }

      setAiResponse(
        data?.response || "AI response was not available."
      );
    } catch (error) {
      console.error(
        "AI Health Assistant Error:",
        error
      );

      setAiError(
        "Unable to connect to AI Health Assistant. Please make sure Ollama and the hospital backend are running."
      );
    } finally {
      setAiLoading(false);
    }
  };

  /* =========================
     LOADING SCREEN
  ========================= */

  if (loading) {
    return (
      <div className="patient-dashboard-loading">
        <div className="dashboard-loader"></div>
        <p>Loading patient dashboard...</p>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">

      {/* =========================================
          WELCOME
      ========================================= */}

      <section className="dashboard-welcome">

        <div className="welcome-content">

          <span className="welcome-label">
            PATIENT PORTAL
          </span>

          <h1>
            {getGreeting()}, {patientName} 👋
          </h1>

          <p>
            Welcome back to your healthcare dashboard.
            Manage your appointments, medical records,
            prescriptions and bills from one place.
          </p>

          <div className="patient-id">
            <span>Patient ID</span>
            <strong>#{user?.patientId || "—"}</strong>
          </div>

          <div className="welcome-actions">

            <button
              type="button"
              className="primary-dashboard-button"
              onClick={() =>
                navigate("/patient/book-appointment")
              }
            >
              🗓️ Book Appointment
            </button>

            <button
              type="button"
              className="secondary-dashboard-button"
              onClick={() =>
                navigate("/patient/appointments")
              }
            >
              View Appointments →
            </button>

          </div>

        </div>

        <div className="welcome-visual">
          <div className="heart-circle">

            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 82C50 82 18 63 18 38C18 24 28 17 39 17C45 17 49 20 50 25C51 20 55 17 61 17C72 17 82 24 82 38C82 63 50 82 50 82Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              <path
                d="M31 45H42L46 36L52 54L57 43L61 45H69"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>
        </div>

      </section>


      {/* =========================================
          QUICK OVERVIEW
      ========================================= */}

      <section className="quick-overview">

        <div className="section-heading">

          <div>
            <span className="section-label">
              OVERVIEW
            </span>

            <h2>
              Your Health at a Glance
            </h2>
          </div>

        </div>

        <div className="overview-grid">

          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/appointments")
            }
          >
            <div className="overview-icon">
              🗓️
            </div>

            <div className="overview-info">
              <span>Appointments</span>
              <strong>{appointments.length}</strong>
              <small>View appointments →</small>
            </div>
          </button>


          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/medical-records")
            }
          >
            <div className="overview-icon">
              📋
            </div>

            <div className="overview-info">
              <span>Medical Records</span>
              <strong>{medicalRecords.length}</strong>
              <small>View records →</small>
            </div>
          </button>


          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/prescriptions")
            }
          >
            <div className="overview-icon">
              💊
            </div>

            <div className="overview-info">
              <span>Prescriptions</span>
              <strong>{prescriptions.length}</strong>
              <small>View prescriptions →</small>
            </div>
          </button>


          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/bills")
            }
          >
            <div className="overview-icon">
              💳
            </div>

            <div className="overview-info">
              <span>Bills</span>
              <strong>{bills.length}</strong>
              <small>View bills →</small>
            </div>
          </button>

        </div>

      </section>


      {/* =========================================
          MAIN GRID
      ========================================= */}

      <section className="dashboard-main-grid">

        {/* UPCOMING APPOINTMENT */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="section-label">
                NEXT VISIT
              </span>

              <h2>
                Upcoming Appointment
              </h2>
            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate("/patient/appointments")
              }
            >
              View All →
            </button>

          </div>


          {upcomingAppointment ? (

            <div className="appointment-preview">

              <div className="appointment-date-box">

                <span>
                  {upcomingAppointment?.appointmentDate
                    ? new Date(
                        upcomingAppointment.appointmentDate
                      ).toLocaleDateString("en-IN", {
                        month: "short",
                      })
                    : "DATE"}
                </span>

                <strong>
                  {upcomingAppointment?.appointmentDate
                    ? new Date(
                        upcomingAppointment.appointmentDate
                      ).getDate()
                    : "—"}
                </strong>

              </div>


              <div className="appointment-details">

                <h3>
                  Dr.{" "}
                  {upcomingAppointment?.doctorName ||
                    "Doctor"}
                </h3>

                <p>
                  {upcomingAppointment?.specialization ||
                    "Healthcare Specialist"}
                </p>

                <div className="appointment-meta">

                  <span>
                    🗓️{" "}
                    {formatDate(
                      upcomingAppointment?.appointmentDate
                    )}
                  </span>

                  <span>
                    🕐{" "}
                    {formatTime(
                      upcomingAppointment?.appointmentTime
                    )}
                  </span>

                </div>

                {upcomingAppointment?.status && (
                  <span
                    className={`appointment-status ${String(
                      upcomingAppointment.status
                    ).toLowerCase()}`}
                  >
                    {upcomingAppointment.status}
                  </span>
                )}

              </div>

            </div>

          ) : (

            <div className="empty-panel">

              <div className="empty-panel-icon">
                🗓️
              </div>

              <h3>
                No Upcoming Appointment
              </h3>

              <p>
                You don't have any upcoming appointments.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/patient/book-appointment")
                }
              >
                Book Appointment
              </button>

            </div>

          )}

        </div>


        {/* HEALTH MESSAGE */}

        <div className="dashboard-panel health-message-panel">

          <div className="panel-header">

            <div>
              <span className="section-label">
                HEALTH TIP
              </span>

              <h2>
                Stay Healthy
              </h2>
            </div>

            <div className="health-tip-icon">
              💗
            </div>

          </div>


          <div className="health-message">

            <h3>
              Take care of your health every day.
            </h3>

            <p>
              Maintain a balanced diet, stay hydrated,
              get enough sleep and keep your medical
              appointments up to date.
            </p>

            <div className="health-tip-list">

              <span>
                ✓ Stay hydrated
              </span>

              <span>
                ✓ Exercise regularly
              </span>

              <span>
                ✓ Get enough sleep
              </span>

              <span>
                ✓ Follow doctor's advice
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          AI HEALTH ASSISTANT
      ========================================= */}

      <section className="ai-health-section">

        <div className="ai-health-header">

          <div>

            <span className="section-label">
              AI HEALTHCARE
            </span>

            <h2>
              🤖 AI Health Assistant
            </h2>

            <p>
              Describe your symptoms and get general
              health guidance powered by AI.
            </p>

          </div>

          <div className="ai-status-badge">

            <span className="ai-status-dot"></span>

            AI Assistant Online

          </div>

        </div>


        <div className="ai-health-card">

          {/* =====================================
              AI INPUT
          ===================================== */}

          <div className="ai-input-area">

            <label htmlFor="ai-symptoms">
              Describe Your Symptoms
            </label>

            <textarea
              id="ai-symptoms"
              value={aiSymptoms}
              onChange={(e) => {
                setAiSymptoms(e.target.value);
                setAiError("");
              }}
              placeholder="Example: I have fever, cough, weakness and headache..."
              rows={6}
              disabled={aiLoading}
            />


            {/* TRY AN EXAMPLE */}

            <div className="ai-examples">

              <div className="ai-example-label">
                Try an Example
              </div>

              <div className="ai-example-list">

                {AI_EXAMPLES.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    className="ai-example-chip"
                    onClick={() =>
                      handleExampleClick(example.text)
                    }
                    disabled={aiLoading}
                  >
                    {example.label}
                  </button>
                ))}

              </div>

            </div>


            {/* INPUT FOOTER */}

            <div className="ai-input-footer">

              <span>
                {aiSymptoms.length} characters
              </span>

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
                  <>
                    🤖 Analyze Symptoms →
                  </>
                )}

              </button>

            </div>


            {aiError && (
              <div className="ai-error">
                ⚠️ {aiError}
              </div>
            )}

          </div>


          {/* =====================================
              AI RESPONSE
          ===================================== */}

          <div className="ai-response-area">

            <div className="ai-response-header">

              <div className="ai-response-icon">
                🤖
              </div>

              <div>

                <span>
                  AI ANALYSIS
                </span>

                <h3>
                  Health Assistant Response
                </h3>

              </div>

            </div>


            {aiLoading ? (

              <div className="ai-loading">

                <div className="ai-loading-animation">
                  🤖
                </div>

                <h3>
                  Analyzing symptoms...
                </h3>

                <p>
                  Please wait while the health assistant
                  prepares a response.
                </p>

              </div>

            ) : aiResponse ? (

              <div className="ai-response-content">

                <div className="ai-response-text">
                  <ReactMarkdown>
                    {aiResponse}
                  </ReactMarkdown>
                </div>


                <div className="ai-medical-warning">

                  <span>
                    ⚠️
                  </span>

                  <strong>
                    Important:
                  </strong>

                  <span>
                    This AI assistant provides general
                    health information only. It does not
                    provide a definitive diagnosis or replace
                    a qualified doctor.
                  </span>

                </div>

              </div>

            ) : (

              <div className="ai-empty">

                <div className="ai-empty-icon">
                  🩺
                </div>

                <h3>
                  Your AI health guidance will appear here
                </h3>

                <p>
                  Enter your symptoms on the left and click{" "}
                  <strong>
                    Analyze Symptoms
                  </strong>.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* AI DISCLAIMER */}

        <div className="ai-disclaimer">

          <span>
            🔒
          </span>

          <p>
            AI-generated information is for educational
            purposes only. For medical concerns, always
            consult a qualified healthcare professional.
          </p>

        </div>

      </section>


      {/* =========================================
          PATIENT SERVICES
      ========================================= */}

      <section className="patient-services">

        <div className="section-heading">

          <div>
            <span className="section-label">
              SERVICES
            </span>

            <h2>
              Patient Services
            </h2>
          </div>

        </div>


        <div className="services-grid">

          <button
            type="button"
            className="service-card"
            onClick={() =>
              navigate("/patient/appointments")
            }
          >
            <div className="service-icon">
              🗓️
            </div>

            <div>
              <h3>Appointments</h3>
              <p>Manage your appointments</p>
            </div>

            <span>→</span>
          </button>


          <button
            type="button"
            className="service-card"
            onClick={() =>
              navigate("/patient/book-appointment")
            }
          >
            <div className="service-icon">
              ✚
            </div>

            <div>
              <h3>Book Appointment</h3>
              <p>Schedule a doctor visit</p>
            </div>

            <span>→</span>
          </button>


          <button
            type="button"
            className="service-card"
            onClick={() =>
              navigate("/patient/medical-records")
            }
          >
            <div className="service-icon">
              📋
            </div>

            <div>
              <h3>Medical Records</h3>
              <p>View your health records</p>
            </div>

            <span>→</span>
          </button>


          <button
            type="button"
            className="service-card"
            onClick={() =>
              navigate("/patient/prescriptions")
            }
          >
            <div className="service-icon">
              💊
            </div>

            <div>
              <h3>Prescriptions</h3>
              <p>View prescribed medicines</p>
            </div>

            <span>→</span>
          </button>


          <button
            type="button"
            className="service-card"
            onClick={() =>
              navigate("/patient/profile")
            }
          >
            <div className="service-icon">
              👤
            </div>

            <div>
              <h3>My Profile</h3>
              <p>Manage your profile</p>
            </div>

            <span>→</span>
          </button>


          <button
            type="button"
            className="service-card"
            onClick={() =>
              navigate("/patient/bills")
            }
          >
            <div className="service-icon">
              💳
            </div>

            <div>
              <h3>My Bills</h3>
              <p>View and manage bills</p>
            </div>

            <span>→</span>
          </button>

        </div>

      </section>


      {/* =========================================
          NEW PATIENT MESSAGE
      ========================================= */}

      {appointments.length === 0 &&
        medicalRecords.length === 0 &&
        prescriptions.length === 0 &&
        bills.length === 0 && (

          <div className="new-patient-message">

            <div className="new-patient-icon">
              👋
            </div>

            <div>

              <h3>
                Welcome to AI Smart Hospital!
              </h3>

              <p>
                Your healthcare information will appear
                here as you use the hospital services.
              </p>

            </div>

          </div>

        )}

    </div>
  );
}