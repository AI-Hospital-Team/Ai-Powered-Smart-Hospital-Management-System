import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Doctor
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [doctorConfirmPassword, setDoctorConfirmPassword] = useState("");
  const [doctorError, setDoctorError] = useState("");
  const [doctorSuccess, setDoctorSuccess] = useState("");
  const [addingDoctor, setAddingDoctor] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        patientsRes,
        doctorsRes,
        appointmentsRes,
        billsRes,
      ] = await Promise.all([
        fetch("http://localhost:8080/api/patients"),
        fetch("http://localhost:8080/api/doctors"),
        fetch("http://localhost:8080/api/appointments"),
        fetch("http://localhost:8080/api/bills"),
      ]);

      const patientsData = patientsRes.ok
        ? await patientsRes.json()
        : [];

      const doctorsData = doctorsRes.ok
        ? await doctorsRes.json()
        : [];

      const appointmentsData = appointmentsRes.ok
        ? await appointmentsRes.json()
        : [];

      const billsData = billsRes.ok
        ? await billsRes.json()
        : [];

      setPatients(
        Array.isArray(patientsData) ? patientsData : []
      );

      setDoctors(
        Array.isArray(doctorsData) ? doctorsData : []
      );

      setAppointments(
        Array.isArray(appointmentsData)
          ? appointmentsData
          : []
      );

      setBills(
        Array.isArray(billsData) ? billsData : []
      );
    } catch (err) {
      console.error("Dashboard API Error:", err);
      setError(
        "Unable to load dashboard data. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const pendingBills = bills.filter(
    (bill) =>
      bill.status?.toLowerCase() === "pending" ||
      bill.paymentStatus?.toLowerCase() === "pending"
  );

  const recentAppointments = [...appointments]
    .sort((a, b) => {
      const dateA = new Date(
        `${a.appointmentDate || ""} ${
          a.appointmentTime || ""
        }`
      );

      const dateB = new Date(
        `${b.appointmentDate || ""} ${
          b.appointmentTime || ""
        }`
      );

      return dateB - dateA;
    })
    .slice(0, 5);

  const getPatientName = (appointment) =>
    appointment.patientName ||
    appointment.patient?.name ||
    `Patient #${appointment.patientId || "-"}`;

  const getDoctorName = (appointment) =>
    appointment.doctorName ||
    appointment.doctor?.name ||
    `Doctor #${appointment.doctorId || "-"}`;

  const getStatusClass = (status) => {
    if (!status) return "pending";

    return String(status)
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // ================================
  // ADD DOCTOR
  // ================================

  const openAddDoctor = () => {
    setDoctorName("");
    setDoctorEmail("");
    setDoctorSpecialization("");
    setDoctorPassword("");
    setDoctorConfirmPassword("");
    setDoctorError("");
    setDoctorSuccess("");
    setShowAddDoctor(true);
  };

  const closeAddDoctor = () => {
    if (addingDoctor) return;

    setShowAddDoctor(false);
    setDoctorError("");
    setDoctorSuccess("");
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    setDoctorError("");
    setDoctorSuccess("");

    if (!doctorName.trim()) {
      setDoctorError("Full Name is required.");
      return;
    }

    if (!doctorEmail.trim()) {
      setDoctorError("Email is required.");
      return;
    }

    if (!doctorSpecialization.trim()) {
      setDoctorError("Specialization is required.");
      return;
    }

    if (!doctorPassword) {
      setDoctorError("Password is required.");
      return;
    }

    if (!doctorConfirmPassword) {
      setDoctorError("Confirm Password is required.");
      return;
    }

    if (doctorPassword !== doctorConfirmPassword) {
      setDoctorError("Passwords do not match.");
      return;
    }

    if (doctorPassword.length < 8) {
      setDoctorError(
        "Password must be at least 8 characters."
      );
      return;
    }

    try {
      setAddingDoctor(true);

      const response = await fetch(
        "http://localhost:8080/api/doctors/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: doctorName.trim(),
            email: doctorEmail.trim(),
            password: doctorPassword,
            specialization:
              doctorSpecialization.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setDoctorError(
          data?.message ||
            data ||
            "Unable to create doctor account."
        );
        return;
      }

      setDoctorSuccess(
        "Doctor account created successfully."
      );

      await loadDashboardData();

      setTimeout(() => {
        setShowAddDoctor(false);
        setDoctorSuccess("");
      }, 1200);
    } catch (err) {
      console.error("Add Doctor Error:", err);

      setDoctorError(
        "Unable to connect to the hospital server."
      );
    } finally {
      setAddingDoctor(false);
    }
  };

  return (
    <div className="admin-dashboard-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="admin-dashboard-header">

        <div className="admin-welcome">

          <div className="admin-welcome-icon">
            🛡️
          </div>

          <div>
            <p className="admin-small-title">
              Administration
            </p>

            <h1>
              Admin Dashboard
            </h1>

            <p className="admin-subtitle">
              Manage your hospital operations
              from one place.
            </p>
          </div>

        </div>

        <button
          className="admin-add-doctor-btn"
          onClick={openAddDoctor}
        >
          <span>＋</span>
          Add Doctor
        </button>

      </div>

      {/* =================================
          ERROR
      ================================= */}

      {error && (
        <div className="admin-dashboard-error">
          <span>⚠️</span>

          <div>
            <strong>
              Something went wrong
            </strong>

            <p>{error}</p>
          </div>

          <button onClick={loadDashboardData}>
            Retry
          </button>
        </div>
      )}

      {/* =================================
          STAT CARDS
      ================================= */}

      <div className="admin-stats-grid">

        <div className="admin-stat-card patients-card">

          <div className="admin-stat-icon">
            👥
          </div>

          <div className="admin-stat-content">
            <span>Total Patients</span>

            <strong>
              {loading ? "..." : patients.length}
            </strong>

            <small>
              Registered patients
            </small>
          </div>

        </div>

        <div className="admin-stat-card doctors-card">

          <div className="admin-stat-icon">
            🩺
          </div>

          <div className="admin-stat-content">
            <span>Total Doctors</span>

            <strong>
              {loading ? "..." : doctors.length}
            </strong>

            <small>
              Medical professionals
            </small>
          </div>

        </div>

        <div className="admin-stat-card appointments-card">

          <div className="admin-stat-icon">
            📅
          </div>

          <div className="admin-stat-content">
            <span>Appointments</span>

            <strong>
              {loading
                ? "..."
                : appointments.length}
            </strong>

            <small>
              Total appointments
            </small>
          </div>

        </div>

        <div className="admin-stat-card bills-card">

          <div className="admin-stat-icon">
            💳
          </div>

          <div className="admin-stat-content">
            <span>Pending Bills</span>

            <strong>
              {loading
                ? "..."
                : pendingBills.length}
            </strong>

            <small>
              Awaiting payment
            </small>
          </div>

        </div>

      </div>

      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <div className="admin-section">

        <div className="admin-section-heading">
          <div>
            <h2>Quick Actions</h2>
            <p>
              Frequently used administration
              tools
            </p>
          </div>
        </div>

        <div className="admin-quick-grid">

          <button
            className="admin-quick-card"
            onClick={openAddDoctor}
          >
            <div className="quick-icon">
              🩺
            </div>

            <div>
              <h3>Add Doctor</h3>
              <p>
                Create a new doctor account
              </p>
            </div>

            <span className="quick-arrow">
              →
            </span>
          </button>

          <button
            className="admin-quick-card"
            onClick={loadDashboardData}
          >
            <div className="quick-icon">
              🔄
            </div>

            <div>
              <h3>Refresh Data</h3>
              <p>
                Update dashboard information
              </p>
            </div>

            <span className="quick-arrow">
              →
            </span>
          </button>

        </div>

      </div>

      {/* =================================
          RECENT APPOINTMENTS
      ================================= */}

      <div className="admin-section">

        <div className="admin-section-heading">

          <div>
            <h2>Recent Appointments</h2>

            <p>
              Latest appointments in the
              hospital
            </p>
          </div>

          <span className="admin-record-count">
            {recentAppointments.length} Recent
          </span>

        </div>

        {loading ? (
          <div className="admin-loading-card">
            <div className="admin-spinner"></div>
            <h3>Loading appointments...</h3>
            <p>
              Please wait while we fetch the
              latest data.
            </p>
          </div>
        ) : recentAppointments.length === 0 ? (
          <div className="admin-empty-card">

            <div>📭</div>

            <h3>No appointments yet</h3>

            <p>
              Appointments will appear here
              when patients book visits.
            </p>

          </div>
        ) : (
          <div className="admin-appointments-grid">

            {recentAppointments.map(
              (appointment) => (
                <div
                  className="admin-appointment-card"
                  key={
                    appointment.appointmentId
                  }
                >

                  <div className="appointment-top">

                    <div className="appointment-avatar">
                      👤
                    </div>

                    <span
                      className={`admin-status-pill ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status ||
                        "Pending"}
                    </span>

                  </div>

                  <div className="appointment-info">

                    <h3>
                      {getPatientName(
                        appointment
                      )}
                    </h3>

                    <p>
                      👨‍⚕️{" "}
                      {getDoctorName(
                        appointment
                      )}
                    </p>

                  </div>

                  <div className="appointment-details">

                    <div>
                      <span>📅</span>

                      <p>
                        <strong>
                          {appointment.appointmentDate ||
                            "-"}
                        </strong>

                        <small>
                          Appointment Date
                        </small>
                      </p>
                    </div>

                    <div>
                      <span>🕐</span>

                      <p>
                        <strong>
                          {appointment.appointmentTime ||
                            "-"}
                        </strong>

                        <small>
                          Appointment Time
                        </small>
                      </p>
                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* =================================
          ADD DOCTOR MODAL
      ================================= */}

      {showAddDoctor && (
        <div
          className="admin-modal-overlay"
          onClick={closeAddDoctor}
        >

          <div
            className="admin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div className="admin-modal-title">

                <div className="modal-doctor-icon">
                  🩺
                </div>

                <div>
                  <h2>Add Doctor</h2>

                  <p>
                    Create a new doctor account
                  </p>
                </div>

              </div>

              <button
                className="admin-modal-close"
                onClick={closeAddDoctor}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleAddDoctor}
              className="doctor-form"
            >

              <div className="doctor-form-grid">

                <div className="doctor-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter doctor's name"
                    value={doctorName}
                    onChange={(e) =>
                      setDoctorName(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="doctor-field">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Enter doctor's email"
                    value={doctorEmail}
                    onChange={(e) =>
                      setDoctorEmail(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="doctor-field">
                  <label>Specialization</label>

                  <input
                    type="text"
                    placeholder="e.g. Cardiologist"
                    value={
                      doctorSpecialization
                    }
                    onChange={(e) =>
                      setDoctorSpecialization(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="doctor-field">
                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Create password"
                    value={doctorPassword}
                    onChange={(e) =>
                      setDoctorPassword(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="doctor-field">
                  <label>Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={
                      doctorConfirmPassword
                    }
                    onChange={(e) =>
                      setDoctorConfirmPassword(
                        e.target.value
                      )
                    }
                  />
                </div>

              </div>

              {doctorError && (
                <div className="doctor-form-error">
                  ⚠️ {doctorError}
                </div>
              )}

              {doctorSuccess && (
                <div className="doctor-form-success">
                  ✓ {doctorSuccess}
                </div>
              )}

              <button
                type="submit"
                className="create-doctor-btn"
                disabled={addingDoctor}
              >
                {addingDoctor
                  ? "Creating..."
                  : "Create Doctor Account"}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;