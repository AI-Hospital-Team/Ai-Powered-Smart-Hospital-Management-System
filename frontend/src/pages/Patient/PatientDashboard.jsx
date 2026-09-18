import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import {
  CalendarDays,
  ClipboardList,
  Pill,
  ReceiptText,
  ArrowRight,
  Clock3,
  FileText,
  CreditCard,
  UserRound,
  HeartPulse,
  Bell,
  CheckCircle2,
  FlaskConical,
} from "lucide-react";

import "./PatientDashboard.css";

const API_URL = "http://localhost:8080/api";

function PatientDashboard() {
  const navigate = useNavigate();

  /* =========================================================
     USER
  ========================================================= */

  const [user, setUser] = useState(null);

  /* =========================================================
     DASHBOARD DATA
  ========================================================= */

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationError, setNotificationError] = useState("");

  /* =========================================================
     AI HEALTH ASSISTANT
  ========================================================= */

  const [aiSymptoms, setAiSymptoms] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  /* =========================================================
     LOAD USER
  ========================================================= */

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  }, []);

  /* =========================================================
     PATIENT ID
  ========================================================= */

  const patientId = useMemo(() => {
    if (!user) return null;

    return (
      user.patientId ??
      user.id ??
      user.userId ??
      null
    );
  }, [user]);

  /* =========================================================
     LOAD DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
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

        /* -------------------------
           APPOINTMENTS
        ------------------------- */

        if (
          results[0].status === "fulfilled" &&
          results[0].value.ok
        ) {
          const data = await results[0].value.json();
          setAppointments(Array.isArray(data) ? data : []);
        } else {
          setAppointments([]);
        }

        /* -------------------------
           MEDICAL RECORDS
        ------------------------- */

        if (
          results[1].status === "fulfilled" &&
          results[1].value.ok
        ) {
          const data = await results[1].value.json();
          setMedicalRecords(Array.isArray(data) ? data : []);
        } else {
          setMedicalRecords([]);
        }

        /* -------------------------
           PRESCRIPTIONS
        ------------------------- */

        if (
          results[2].status === "fulfilled" &&
          results[2].value.ok
        ) {
          const data = await results[2].value.json();
          setPrescriptions(Array.isArray(data) ? data : []);
        } else {
          setPrescriptions([]);
        }

        /* -------------------------
           BILLS
        ------------------------- */

        if (
          results[3].status === "fulfilled" &&
          results[3].value.ok
        ) {
          const data = await results[3].value.json();
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
  }, [patientId]);

  /* =========================================================
     LOAD NOTIFICATIONS
  ========================================================= */

  useEffect(() => {
    if (!patientId) return;

    const loadNotifications = async () => {
      setNotificationLoading(true);
      setNotificationError("");

      try {
        const response = await fetch(
          `${API_URL}/notifications/${patientId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load notifications");
        }

        const data = await response.json();

        setNotifications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Notification loading error:", error);

        setNotificationError(
          "Unable to load notifications. Please try again."
        );
      } finally {
        setNotificationLoading(false);
      }
    };

    loadNotifications();
  }, [patientId]);

  /* =========================================================
     NOTIFICATION UNREAD COUNT
  ========================================================= */

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(
      (notification) => !notification.read
    ).length;
  }, [notifications]);

  /* =========================================================
     MARK SINGLE NOTIFICATION AS READ
  ========================================================= */

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}/read`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification.notificationId === notificationId
            ? {
                ...notification,
                read: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Mark notification as read error:",
        error
      );
    }
  };

  /* =========================================================
     MARK ALL NOTIFICATIONS AS READ
  ========================================================= */

  const markAllNotificationsAsRead = async () => {
    if (!patientId || unreadNotificationCount === 0) return;

    try {
      const response = await fetch(
        `${API_URL}/notifications/user/${patientId}/read-all`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to mark all notifications as read"
        );
      }

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(
        "Mark all notifications error:",
        error
      );
    }
  };

  /* =========================================================
     NOTIFICATION ICON
  ========================================================= */

  const getNotificationIcon = (type) => {
    const notificationType = String(type || "").toUpperCase();

    if (
      notificationType.includes("APPOINTMENT")
    ) {
      return {
        icon: CalendarDays,
        className: "appointment",
      };
    }

    if (
      notificationType.includes("BILL")
    ) {
      return {
        icon: ReceiptText,
        className: "bill",
      };
    }

    if (
      notificationType.includes("PRESCRIPTION")
    ) {
      return {
        icon: Pill,
        className: "prescription",
      };
    }

    if (
      notificationType.includes("LAB")
    ) {
      return {
        icon: FlaskConical,
        className: "default",
      };
    }

    return {
      icon: Bell,
      className: "default",
    };
  };

  /* =========================================================
     NOTIFICATION DATE FORMAT
  ========================================================= */

  const formatNotificationDate = (dateValue) => {
    if (!dateValue) return "";

    try {
      return new Date(dateValue).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return dateValue;
    }
  };

  /* =========================================================
     APPOINTMENT HELPERS
  ========================================================= */

  const upcomingAppointment = useMemo(() => {
    const now = new Date();

    const validAppointments = appointments
      .filter((appointment) => {
        if (!appointment.appointmentDate) {
          return false;
        }

        const date = new Date(
          `${appointment.appointmentDate}T${
            appointment.appointmentTime || "00:00:00"
          }`
        );

        const status = String(
          appointment.status || ""
        ).toLowerCase();

        return (
          date >= now &&
          status !== "cancelled" &&
          status !== "completed" &&
          status !== "rejected" &&
          status !== "expired"
        );
      })
      .sort((a, b) => {
        const dateA = new Date(
          `${a.appointmentDate}T${
            a.appointmentTime || "00:00:00"
          }`
        );

        const dateB = new Date(
          `${b.appointmentDate}T${
            b.appointmentTime || "00:00:00"
          }`
        );

        return dateA - dateB;
      });

    return validAppointments[0] || null;
  }, [appointments]);

  /* =========================================================
     RECENT DATA
  ========================================================= */

  const recentRecords = useMemo(() => {
    return [...medicalRecords]
      .sort((a, b) => {
        const dateA = new Date(
          a.recordDate ||
            a.date ||
            a.createdAt ||
            0
        );

        const dateB = new Date(
          b.recordDate ||
            b.date ||
            b.createdAt ||
            0
        );

        return dateB - dateA;
      })
      .slice(0, 4);
  }, [medicalRecords]);

  const recentPrescriptions = useMemo(() => {
    return [...prescriptions]
      .sort((a, b) => {
        const dateA = new Date(
          a.prescriptionDate ||
            a.createdAt ||
            0
        );

        const dateB = new Date(
          b.prescriptionDate ||
            b.createdAt ||
            0
        );

        return dateB - dateA;
      })
      .slice(0, 4);
  }, [prescriptions]);

  const recentBills = useMemo(() => {
    return [...bills]
      .sort((a, b) => {
        const dateA = new Date(
          a.billDate ||
            a.createdAt ||
            0
        );

        const dateB = new Date(
          b.billDate ||
            b.createdAt ||
          0
        );

        return dateB - dateA;
      })
      .slice(0, 4);
  }, [bills]);

  /* =========================================================
     BILLING CALCULATIONS
  ========================================================= */

  const pendingBills = useMemo(() => {
    return bills.filter(
      (bill) =>
        String(bill.status || "").toLowerCase() ===
        "pending"
    );
  }, [bills]);

  const paidBills = useMemo(() => {
    return bills.filter(
      (bill) =>
        String(bill.status || "").toLowerCase() ===
        "paid"
    );
  }, [bills]);

  const pendingAmount = useMemo(() => {
    return pendingBills.reduce(
      (total, bill) =>
        total + Number(bill.amount || 0),
      0
    );
  }, [pendingBills]);

  /* =========================================================
     GREETING
  ========================================================= */

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    try {
      return new Date(dateValue).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return dateValue;
    }
  };

  /* =========================================================
     AI HEALTH ASSISTANT
  ========================================================= */

  const handleAiAssistant = async () => {
    const symptoms = aiSymptoms.trim();

    setAiError("");
    setAiResponse("");

    if (!symptoms) {
      setAiError(
        "Please describe your symptoms first."
      );
      return;
    }

    if (symptoms.length < 20) {
      setAiError(
        "Please provide at least 20 characters describing your symptoms."
      );
      return;
    }

    setAiLoading(true);

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

      if (!response.ok) {
        throw new Error(
          "AI Health Assistant request failed"
        );
      }

      const data = await response.json();

      setAiResponse(
        data.response ||
          data.message ||
          "No response received from AI assistant."
      );
    } catch (error) {
      console.error(
        "AI Health Assistant error:",
        error
      );

      setAiError(
        "Unable to connect to the AI Health Assistant. Please make sure the backend and Ollama are running."
      );
    } finally {
      setAiLoading(false);
    }
  };

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <div className="patient-dashboard-loading">
        <div className="dashboard-loader"></div>

        <p>Loading your dashboard...</p>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="patient-dashboard">


      {/* =====================================================
          WELCOME
      ===================================================== */}

      <section className="dashboard-welcome">

        <div className="welcome-content">

          <span className="welcome-label">
            PATIENT PORTAL
          </span>

          <h1>
            {getGreeting()},{" "}
            <span>
              {user?.name || "Patient"}
            </span>
          </h1>

          <p>
            Manage your appointments, medical
            records, prescriptions and bills from
            one place.
          </p>

          {patientId && (
            <div className="patient-id">

              <UserRound size={15} />

              <span>Patient ID</span>

              <strong>
                #{patientId}
              </strong>

            </div>
          )}

          <div className="welcome-actions">

            <button
              type="button"
              className="primary-dashboard-button"
              onClick={() =>
                navigate("/patient/book-appointment")
              }
            >
              <CalendarDays size={15} />

              Book Appointment

              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              className="secondary-dashboard-button"
              onClick={() =>
                navigate("/patient/profile")
              }
            >
              <UserRound size={15} />

              View Profile
            </button>

          </div>

        </div>

        <div className="welcome-visual">

          <div className="heart-circle">
            <HeartPulse size={82} />
          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK OVERVIEW
      ===================================================== */}

      <section className="quick-overview">

        <div className="section-heading">

          <div>

            <span className="section-label">
              HEALTH OVERVIEW
            </span>

            <h2>
              Your Healthcare Summary
            </h2>

          </div>

        </div>

        <div className="overview-grid">

          {/* Appointments */}

          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/appointments")
            }
          >

            <div className="overview-icon appointments">
              <CalendarDays size={21} />
            </div>

            <div className="overview-info">

              <span>Appointments</span>

              <strong>
                {appointments.length}
              </strong>

              <small>
                View appointments
                <ArrowRight size={10} />
              </small>

            </div>

          </button>

          {/* Medical Records */}

          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/medical-records")
            }
          >

            <div className="overview-icon records">
              <ClipboardList size={21} />
            </div>

            <div className="overview-info">

              <span>Medical Records</span>

              <strong>
                {medicalRecords.length}
              </strong>

              <small>
                View records
                <ArrowRight size={10} />
              </small>

            </div>

          </button>

          {/* Prescriptions */}

          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/prescriptions")
            }
          >

            <div className="overview-icon prescriptions">
              <Pill size={21} />
            </div>

            <div className="overview-info">

              <span>Prescriptions</span>

              <strong>
                {prescriptions.length}
              </strong>

              <small>
                View prescriptions
                <ArrowRight size={10} />
              </small>

            </div>

          </button>

          {/* Bills */}

          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate("/patient/bills")
            }
          >

            <div className="overview-icon bills">
              <ReceiptText size={21} />
            </div>

            <div className="overview-info">

              <span>Total Bills</span>

              <strong>
                {bills.length}
              </strong>

              <small>
                View billing
                <ArrowRight size={10} />
              </small>

            </div>

          </button>

        </div>

      </section>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="dashboard-main-grid">

        {/* ===================================================
            UPCOMING APPOINTMENT
        =================================================== */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                APPOINTMENT
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
              View all
              <ArrowRight size={12} />
            </button>

          </div>

          {upcomingAppointment ? (
            <div className="appointment-preview">

              <div className="appointment-date-box">

                <span>
                  {new Date(
                    upcomingAppointment.appointmentDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      month: "short",
                    }
                  )}
                </span>

                <strong>
                  {new Date(
                    upcomingAppointment.appointmentDate
                  ).getDate()}
                </strong>

              </div>

              <div className="appointment-details">

                <h3>
                  {upcomingAppointment.doctorName ||
                    "Doctor"}
                </h3>

                <p>
                  {upcomingAppointment.specialization ||
                    "Medical Consultation"}
                </p>

                <div className="appointment-meta">

                  <span>
                    <CalendarDays size={12} />

                    {formatDate(
                      upcomingAppointment.appointmentDate
                    )}
                  </span>

                  <span>
                    <Clock3 size={12} />

                    {upcomingAppointment.appointmentTime ||
                      "Time not available"}
                  </span>

                </div>

                <span
                  className={`patient-status ${String(
                    upcomingAppointment.status ||
                      "pending"
                  ).toLowerCase()}`}
                >
                  {upcomingAppointment.status ||
                    "Pending"}
                </span>

              </div>

            </div>
          ) : (
            <div className="empty-panel">

              <div className="empty-panel-icon">
                <CalendarDays size={23} />
              </div>

              <h3>
                No upcoming appointment
              </h3>

              <p>
                Book an appointment with a doctor
                whenever you need medical care.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/patient/book-appointment"
                  )
                }
              >
                Book Appointment
              </button>

            </div>
          )}

        </section>

        {/* ===================================================
            BILLING SUMMARY
        =================================================== */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                BILLING
              </span>

              <h2>
                Billing Summary
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate("/patient/bills")
              }
            >
              View all
              <ArrowRight size={12} />
            </button>

          </div>

          <div className="billing-summary">

            <div className="billing-total">

              <div className="billing-icon">
                <CreditCard size={20} />
              </div>

              <div>

                <span>
                  Pending Amount
                </span>

                <strong>
                  ₹
                  {pendingAmount.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </div>

            <div className="billing-stats">

              <div>

                <span>
                  Pending Bills
                </span>

                <strong>
                  {pendingBills.length}
                </strong>

              </div>

              <div>

                <span>
                  Paid Bills
                </span>

                <strong>
                  {paidBills.length}
                </strong>

              </div>

            </div>

            {recentBills.length > 0 && (
              <div className="mini-bill-list">

                {recentBills
                  .slice(0, 3)
                  .map((bill) => (

                    <div
                      className="mini-bill"
                      key={bill.billId}
                    >

                      <div>

                        <strong>
                          {bill.billType ||
                            "Hospital Bill"}
                        </strong>

                        <span>
                          {formatDate(
                            bill.billDate
                          )}
                        </span>

                      </div>

                      <div>

                        <strong>
                          ₹
                          {Number(
                            bill.amount || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <span
                          className={`bill-mini-status ${String(
                            bill.status ||
                              "pending"
                          ).toLowerCase()}`}
                        >
                          {bill.status ||
                            "Pending"}
                        </span>

                      </div>

                    </div>

                  ))}

              </div>
            )}

          </div>

        </section>

      </div>

      {/* =====================================================
          RECENT HEALTH DATA
      ===================================================== */}

      <div className="recent-grid">

        {/* ===================================================
            MEDICAL RECORDS
        =================================================== */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                MEDICAL HISTORY
              </span>

              <h2>
                Recent Medical Records
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate("/patient/medical-records")
              }
            >
              View all
              <ArrowRight size={12} />
            </button>

          </div>

          {recentRecords.length > 0 ? (
            <div className="recent-list">

              {recentRecords.map((record) => (

                <div
                  className="recent-item"
                  key={
                    record.recordId ||
                    record.medicalRecordId ||
                    record.id
                  }
                >

                  <div className="recent-item-icon records">
                    <FileText size={17} />
                  </div>

                  <div className="recent-item-content">

                    <strong>
                      {record.diagnosis ||
                        record.title ||
                        record.condition ||
                        "Medical Record"}
                    </strong>

                    <span>
                      {record.doctorName ||
                        record.description ||
                        "Medical record available"}
                    </span>

                  </div>

                  <time>
                    {formatDate(
                      record.recordDate ||
                        record.date ||
                        record.createdAt
                    )}
                  </time>

                </div>

              ))}

            </div>
          ) : (
            <div className="small-empty">
              No medical records available.
            </div>
          )}

        </section>

        {/* ===================================================
            PRESCRIPTIONS
        =================================================== */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                MEDICATION
              </span>

              <h2>
                Recent Prescriptions
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate("/patient/prescriptions")
              }
            >
              View all
              <ArrowRight size={12} />
            </button>

          </div>

          {recentPrescriptions.length > 0 ? (
            <div className="recent-list">

              {recentPrescriptions.map(
                (prescription) => (

                  <div
                    className="recent-item"
                    key={
                      prescription.prescriptionId ||
                      prescription.id
                    }
                  >

                    <div className="recent-item-icon prescriptions">
                      <Pill size={17} />
                    </div>

                    <div className="recent-item-content">

                      <strong>
                        {prescription.medicineName ||
                          "Prescription"}
                      </strong>

                      <span>
                        {prescription.dosage ||
                          "Dosage not available"}

                        {prescription.frequency
                          ? ` • ${prescription.frequency}`
                          : ""}
                      </span>

                    </div>

                    <time>
                      {formatDate(
                        prescription.prescriptionDate ||
                          prescription.createdAt
                      )}
                    </time>

                  </div>

                )
              )}

            </div>
          ) : (
            <div className="small-empty">
              No prescriptions available.
            </div>
          )}

        </section>

      </div>

      {/* =====================================================
          AI HEALTH ASSISTANT
      ===================================================== */}

      <section className="dashboard-panel ai-health-panel">

        <div className="panel-header">

          <div>

            <span className="section-label">
              AI HEALTH ASSISTANT
            </span>

            <h2>
              Describe Your Symptoms
            </h2>

          </div>

        </div>

        <div className="ai-dashboard-content">

          <p>
            Describe your symptoms and get
            AI-powered general health guidance.
          </p>

          <textarea
            value={aiSymptoms}
            onChange={(event) =>
              setAiSymptoms(event.target.value)
            }
            placeholder="Example: I have fever, cough, weakness and headache for the last two days..."
            disabled={aiLoading}
          />

          {aiError && (
            <div className="notifications-error">
              {aiError}
            </div>
          )}

          <button
            type="button"
            className="primary-dashboard-button"
            onClick={handleAiAssistant}
            disabled={aiLoading}
          >

            {aiLoading ? (
              <>
                <Clock3 size={15} />

                Analyzing symptoms...
              </>
            ) : (
              <>
                <HeartPulse size={15} />

                Analyze Symptoms

                <ArrowRight size={14} />
              </>
            )}

          </button>

          {aiResponse && (
            <div className="ai-response-box">

              <div className="ai-response-header">
                <strong>
                  Patient Analysis
                </strong>
              </div>

              <div className="ai-response-content">

                <ReactMarkdown>
                  {aiResponse}
                </ReactMarkdown>

              </div>

              <small>
                AI-generated information is for
                general guidance only and should
                not replace professional medical
                advice. Please consult a qualified
                healthcare professional for diagnosis
                and treatment.
              </small>

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="quick-actions-section">

        <div className="section-heading">

          <div>

            <span className="section-label">
              QUICK ACCESS
            </span>

            <h2>
              Patient Services
            </h2>

          </div>

        </div>

        <div className="quick-actions-grid">

          {/* Appointments */}

          <button
            type="button"
            onClick={() =>
              navigate("/patient/appointments")
            }
          >

            <CalendarDays size={19} />

            <div>

              <strong>
                My Appointments
              </strong>

              <span>
                View and manage appointments
              </span>

            </div>

            <ArrowRight size={14} />

          </button>

          {/* Medical Records */}

          <button
            type="button"
            onClick={() =>
              navigate("/patient/medical-records")
            }
          >

            <ClipboardList size={19} />

            <div>

              <strong>
                Medical Records
              </strong>

              <span>
                Check your medical history
              </span>

            </div>

            <ArrowRight size={14} />

          </button>

          {/* Prescriptions */}

          <button
            type="button"
            onClick={() =>
              navigate("/patient/prescriptions")
            }
          >

            <Pill size={19} />

            <div>

              <strong>
                Prescriptions
              </strong>

              <span>
                View medicines and instructions
              </span>

            </div>

            <ArrowRight size={14} />

          </button>

          {/* Bills */}

          <button
            type="button"
            onClick={() =>
              navigate("/patient/bills")
            }
          >

            <ReceiptText size={19} />

            <div>

              <strong>
                Bills & Payment
              </strong>

              <span>
                Check bills and payment status
              </span>

            </div>

            <ArrowRight size={14} />

          </button>

        </div>

      </section>

    </div>
  );
}

export default PatientDashboard;