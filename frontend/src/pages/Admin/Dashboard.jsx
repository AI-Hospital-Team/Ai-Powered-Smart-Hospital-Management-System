import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Stethoscope,
  CalendarDays,
  ReceiptText,
  UserRound,
  ArrowRight,
  Plus,
  RefreshCw,
  Activity,
  ClipboardList,
  X,
} from "lucide-react";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // ADD DOCTOR
  // =====================================================

  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] =
    useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [doctorConfirmPassword, setDoctorConfirmPassword] =
    useState("");

  const [doctorError, setDoctorError] = useState("");
  const [doctorSuccess, setDoctorSuccess] = useState("");
  const [addingDoctor, setAddingDoctor] = useState(false);

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        patientsResponse,
        doctorsResponse,
        appointmentsResponse,
        billsResponse,
      ] = await Promise.all([
        fetch("http://localhost:8080/api/patients"),
        fetch("http://localhost:8080/api/doctors"),
        fetch("http://localhost:8080/api/appointments"),
        fetch("http://localhost:8080/api/bills"),
      ]);

      const patientsData = patientsResponse.ok
        ? await patientsResponse.json()
        : [];

      const doctorsData = doctorsResponse.ok
        ? await doctorsResponse.json()
        : [];

      const appointmentsData = appointmentsResponse.ok
        ? await appointmentsResponse.json()
        : [];

      const billsData = billsResponse.ok
        ? await billsResponse.json()
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
      console.error("Admin Dashboard Error:", err);

      setError(
        "Unable to load dashboard data. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DATA HELPERS
  // =====================================================

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

  const getPatientName = (appointment) => {
    return (
      appointment.patientName ||
      appointment.patient?.name ||
      `Patient #${appointment.patientId || "-"}`
    );
  };

  const getDoctorName = (appointment) => {
    return (
      appointment.doctorName ||
      appointment.doctor?.name ||
      `Doctor #${appointment.doctorId || "-"}`
    );
  };

  const getStatusClass = (status) => {
    return String(status || "Pending")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // =====================================================
  // ADD DOCTOR
  // =====================================================

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

  const handleAddDoctor = async (event) => {
    event.preventDefault();

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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-loading">
          <div className="admin-dashboard-spinner"></div>
          <p>Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="admin-dashboard-page">

      {/* =================================================
          WELCOME HERO
      ================================================= */}

      <section className="admin-welcome-card">

        <div className="admin-welcome-content">

          <div className="admin-welcome-badge">
            <ShieldCheck size={14} />
            Admin Workspace
          </div>

          <h1>
            Welcome back,{" "}
            <span>Admin</span>
          </h1>

          <p>
            Manage patients, doctors, appointments and
            hospital operations from one place.
          </p>

          <div className="admin-welcome-info">

            <div>
              <small>Role</small>
              <strong>Administrator</strong>
            </div>

            <div>
              <small>System Status</small>
              <strong className="admin-online">
                <Activity size={13} />
                Online
              </strong>
            </div>

          </div>

        </div>

        <div className="admin-welcome-actions">

          <button
            className="admin-add-doctor-button"
            onClick={openAddDoctor}
          >
            <Plus size={18} />
            Add Doctor
          </button>

          <div className="admin-welcome-icon">
            <ShieldCheck size={72} />
          </div>

        </div>

      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="admin-dashboard-error">

          <div>
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>

          <button onClick={loadDashboardData}>
            <RefreshCw size={15} />
            Retry
          </button>

        </div>
      )}

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="admin-stat-grid">

        <div className="admin-stat-card patients-stat">

          <div className="admin-stat-icon">
            <Users size={24} />
          </div>

          <div>
            <span>Total Patients</span>

            <strong>
              {patients.length}
            </strong>

            <small>
              Registered patients
            </small>
          </div>

        </div>

        <div className="admin-stat-card doctors-stat">

          <div className="admin-stat-icon">
            <Stethoscope size={24} />
          </div>

          <div>
            <span>Total Doctors</span>

            <strong>
              {doctors.length}
            </strong>

            <small>
              Medical professionals
            </small>
          </div>

        </div>

        <div className="admin-stat-card appointments-stat">

          <div className="admin-stat-icon">
            <CalendarDays size={24} />
          </div>

          <div>
            <span>Appointments</span>

            <strong>
              {appointments.length}
            </strong>

            <small>
              Total appointments
            </small>
          </div>

        </div>

        <div className="admin-stat-card bills-stat">

          <div className="admin-stat-icon">
            <ReceiptText size={24} />
          </div>

          <div>
            <span>Pending Bills</span>

            <strong>
              {pendingBills.length}
            </strong>

            <small>
              Awaiting payment
            </small>
          </div>

        </div>

      </section>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <section className="admin-dashboard-grid">

        {/* =================================================
            RECENT APPOINTMENTS
        ================================================= */}

        <div className="admin-dashboard-card">

          <div className="admin-card-header">

            <div>
              <h2>Recent Appointments</h2>

              <p>
                Latest appointments in the hospital.
              </p>
            </div>

            <button
              className="admin-view-all"
              onClick={() =>
                navigate("/dashboard/appointments")
              }
            >
              View All
              <ArrowRight size={15} />
            </button>

          </div>

          {recentAppointments.length === 0 ? (
            <div className="admin-empty-small">

              <CalendarDays size={28} />

              <p>
                No appointments found.
              </p>

            </div>
          ) : (
            <div className="admin-appointment-list">

              {recentAppointments.map(
                (appointment) => (
                  <div
                    className="admin-appointment-item"
                    key={appointment.appointmentId}
                  >

                    <div className="admin-appointment-icon">
                      <CalendarDays size={18} />
                    </div>

                    <div className="admin-appointment-main">

                      <strong>
                        {getPatientName(appointment)}
                      </strong>

                      <span>
                        <Stethoscope size={13} />
                        {getDoctorName(appointment)}
                      </span>

                      <small>
                        {formatDate(
                          appointment.appointmentDate
                        )}
                        {" • "}
                        {appointment.appointmentTime ||
                          "Time not set"}
                      </small>

                    </div>

                    <div
                      className={`admin-status ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status ||
                        "Pending"}
                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* =================================================
            DOCTORS
        ================================================= */}

        <div className="admin-dashboard-card">

          <div className="admin-card-header">

            <div>
              <h2>Hospital Doctors</h2>

              <p>
                Doctors currently registered in the system.
              </p>
            </div>

            <button
              className="admin-view-all"
              onClick={() =>
                navigate("/dashboard/doctors")
              }
            >
              View All
              <ArrowRight size={15} />
            </button>

          </div>

          {doctors.length === 0 ? (
            <div className="admin-empty-small">

              <Stethoscope size={28} />

              <p>
                No doctors registered yet.
              </p>

            </div>
          ) : (
            <div className="admin-doctor-list">

              {doctors.slice(0, 5).map((doctor) => (

                <div
                  className="admin-doctor-item"
                  key={doctor.doctorId}
                >

                  <div className="admin-doctor-avatar">
                    <UserRound size={19} />
                  </div>

                  <div className="admin-doctor-main">

                    <strong>
                      {doctor.name ||
                        `Doctor #${doctor.doctorId}`}
                    </strong>

                    <span>
                      {doctor.specialization ||
                        "Medical Specialist"}
                    </span>

                  </div>

                  <div className="admin-doctor-id">
                    #{doctor.doctorId}
                  </div>

                </div>

              ))}

            </div>
          )}

          <button
            className="admin-add-inline"
            onClick={openAddDoctor}
          >
            <Plus size={16} />
            Add New Doctor
          </button>

        </div>

      </section>

      {/* =================================================
          SYSTEM OVERVIEW
      ================================================= */}

      <section className="admin-overview-card">

        <div className="admin-overview-header">

          <div>
            <h2>Hospital Overview</h2>
            <p>
              Current system activity at a glance.
            </p>
          </div>

          <button
            onClick={loadDashboardData}
            className="admin-refresh-button"
          >
            <RefreshCw size={15} />
            Refresh
          </button>

        </div>

        <div className="admin-overview-grid">

          <button
            onClick={() =>
              navigate("/dashboard/patients")
            }
            className="admin-overview-item"
          >
            <div className="overview-icon patients-overview">
              <Users size={20} />
            </div>

            <div>
              <strong>{patients.length}</strong>
              <span>Patients</span>
            </div>

            <ArrowRight size={16} />
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/doctors")
            }
            className="admin-overview-item"
          >
            <div className="overview-icon doctors-overview">
              <Stethoscope size={20} />
            </div>

            <div>
              <strong>{doctors.length}</strong>
              <span>Doctors</span>
            </div>

            <ArrowRight size={16} />
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/medical-records")
            }
            className="admin-overview-item"
          >
            <div className="overview-icon records-overview">
              <ClipboardList size={20} />
            </div>

            <div>
              <strong>View</strong>
              <span>Medical Records</span>
            </div>

            <ArrowRight size={16} />
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/bills")
            }
            className="admin-overview-item"
          >
            <div className="overview-icon bills-overview">
              <ReceiptText size={20} />
            </div>

            <div>
              <strong>{pendingBills.length}</strong>
              <span>Pending Bills</span>
            </div>

            <ArrowRight size={16} />
          </button>

        </div>

      </section>

      {/* =================================================
          ADD DOCTOR MODAL
      ================================================= */}

      {showAddDoctor && (
        <div
          className="admin-modal-overlay"
          onClick={closeAddDoctor}
        >

          <div
            className="admin-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div className="admin-modal-title">

                <div className="admin-modal-icon">
                  <Stethoscope size={24} />
                </div>

                <div>
                  <h2>Add Doctor</h2>
                  <p>
                    Create a new doctor account.
                  </p>
                </div>

              </div>

              <button
                className="admin-modal-close"
                onClick={closeAddDoctor}
                type="button"
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="admin-doctor-form"
              onSubmit={handleAddDoctor}
            >

              <div className="admin-form-grid">

                <div className="admin-form-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter doctor's name"
                    value={doctorName}
                    onChange={(event) =>
                      setDoctorName(event.target.value)
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Enter doctor's email"
                    value={doctorEmail}
                    onChange={(event) =>
                      setDoctorEmail(event.target.value)
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label>Specialization</label>

                  <input
                    type="text"
                    placeholder="e.g. Cardiologist"
                    value={doctorSpecialization}
                    onChange={(event) =>
                      setDoctorSpecialization(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={doctorPassword}
                    onChange={(event) =>
                      setDoctorPassword(event.target.value)
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label>Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={doctorConfirmPassword}
                    onChange={(event) =>
                      setDoctorConfirmPassword(
                        event.target.value
                      )
                    }
                  />
                </div>

              </div>

              {doctorError && (
                <div className="admin-form-error">
                  {doctorError}
                </div>
              )}

              {doctorSuccess && (
                <div className="admin-form-success">
                  {doctorSuccess}
                </div>
              )}

              <div className="admin-form-actions">

                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={closeAddDoctor}
                  disabled={addingDoctor}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-create-button"
                  disabled={addingDoctor}
                >
                  {addingDoctor ? (
                    <>
                      <span className="admin-button-spinner"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Create Doctor
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;