import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setErrorMessage("Patient login information not found.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);

        if (user.patientId == null) {
          setErrorMessage("Patient ID not found in login information.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/patients/${user.patientId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load patient information.");
        }

        const data = await response.json();

        setPatient(data);
      } catch (error) {
        console.error("Patient dashboard error:", error);

        setErrorMessage(
          "Unable to load patient information. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  if (loading) {
    return (
      <div className="patient-dashboard">
        <div className="dashboard-loading">
          Loading patient information...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="patient-dashboard">
        <div className="dashboard-error">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Patient Dashboard</h1>

        <p>
          Welcome, <strong>{patient?.name}</strong>
        </p>
      </div>

      {/* PATIENT INFORMATION */}
      <div className="patient-info-section">

        <div className="patient-info-header">

          <div className="patient-avatar">
            👤
          </div>

          <div>
            <h2>{patient?.name}</h2>
            <p>Patient ID: {patient?.patientId}</p>
          </div>

        </div>

        <div className="patient-info-grid">

          <div>
            <small>Age</small>
            <strong>{patient?.age ?? "—"} years</strong>
          </div>

          <div>
            <small>Gender</small>
            <strong>{patient?.gender || "—"}</strong>
          </div>

          <div>
            <small>Blood Group</small>
            <strong>{patient?.bloodGroup || "—"}</strong>
          </div>

          <div>
            <small>Phone</small>
            <strong>{patient?.phone || "—"}</strong>
          </div>

          <div>
            <small>Email</small>
            <strong>{patient?.email || "—"}</strong>
          </div>

          <div>
            <small>Address</small>
            <strong>{patient?.address || "—"}</strong>
          </div>

        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="dashboard-cards">

        <button
          className="dashboard-card"
          onClick={() => navigate("/patient/appointments")}
        >
          <span className="card-icon">📅</span>

          <div>
            <small>Appointments</small>
            <strong>0</strong>
            <em>Upcoming & scheduled visits</em>
          </div>
        </button>

        <button
          className="dashboard-card"
          onClick={() => navigate("/patient/medical-records")}
        >
          <span className="card-icon">📋</span>

          <div>
            <small>Medical Records</small>
            <strong>0</strong>
            <em>Your health history</em>
          </div>
        </button>

        <button
          className="dashboard-card"
          onClick={() => navigate("/patient/prescriptions")}
        >
          <span className="card-icon">💊</span>

          <div>
            <small>Prescriptions</small>
            <strong>0</strong>
            <em>Current medications</em>
          </div>
        </button>

        <button
          className="dashboard-card"
          onClick={() => navigate("/patient/bills")}
        >
          <span className="card-icon">💳</span>

          <div>
            <small>Pending Bills</small>
            <strong>0</strong>
            <em>Payments to be completed</em>
          </div>
        </button>

      </div>

      {/* QUICK ACTIONS */}
      <div className="dashboard-section">

        <div className="section-heading">
          <h2>Quick Actions</h2>
          <p>Access your most important healthcare services</p>
        </div>

        <div className="quick-actions">

          {/* BOOK APPOINTMENT */}
          <button
            className="quick-card"
            onClick={() => navigate("/patient/book-appointment")}
          >
            <span className="quick-icon">📅</span>

            <div>
              <strong>Book Appointment</strong>
              <small>Schedule a visit with a doctor</small>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          {/* MEDICAL RECORDS */}
          <button
            className="quick-card"
            onClick={() => navigate("/patient/medical-records")}
          >
            <span className="quick-icon">📋</span>

            <div>
              <strong>Medical Records</strong>
              <small>View your medical history</small>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          {/* PRESCRIPTIONS */}
          <button
            className="quick-card"
            onClick={() => navigate("/patient/prescriptions")}
          >
            <span className="quick-icon">💊</span>

            <div>
              <strong>Prescriptions</strong>
              <small>Check your prescribed medicines</small>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          {/* PROFILE */}
          <button
            className="quick-card"
            onClick={() => navigate("/patient/profile")}
          >
            <span className="quick-icon">👤</span>

            <div>
              <strong>My Profile</strong>
              <small>Manage your personal details</small>
            </div>

            <span className="quick-arrow">→</span>
          </button>

        </div>
      </div>

      {/* UPCOMING APPOINTMENT */}
      <div className="dashboard-section">

        <div className="section-heading">
          <h2>Upcoming Appointment</h2>
          <p>Your next scheduled visit</p>
        </div>

        <div className="appointment-box">

          <div>
            <small>Doctor</small>
            <strong>No upcoming appointments</strong>
          </div>

          <div>
            <small>Date</small>
            <strong>—</strong>
          </div>

          <div>
            <small>Time</small>
            <strong>—</strong>
          </div>

          <div>
            <small>Status</small>
            <strong>—</strong>
          </div>

        </div>

        <p className="empty-message">
          You don't have any appointments scheduled yet.
        </p>

      </div>

    </div>
  );
}

export default PatientDashboard;