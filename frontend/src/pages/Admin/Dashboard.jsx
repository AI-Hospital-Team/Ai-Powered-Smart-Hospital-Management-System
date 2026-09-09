import { useEffect, useState } from "react";
import "./AdminTable.css";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);

  // Add Doctor states
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

      const [patientsRes, doctorsRes, appointmentsRes, billsRes] =
        await Promise.all([
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

      setPatients(Array.isArray(patientsData) ? patientsData : []);
      setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
      setAppointments(
        Array.isArray(appointmentsData) ? appointmentsData : []
      );
      setBills(Array.isArray(billsData) ? billsData : []);
    } catch (error) {
      console.error("Dashboard API Error:", error);
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
        `${a.appointmentDate || ""} ${a.appointmentTime || ""}`
      );

      const dateB = new Date(
        `${b.appointmentDate || ""} ${b.appointmentTime || ""}`
      );

      return dateB - dateA;
    })
    .slice(0, 5);

  // Open Add Doctor modal
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

  // Add Doctor
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
      setDoctorError("Password must be at least 8 characters.");
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
            specialization: doctorSpecialization.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setDoctorError(data?.message || data || "Unable to create doctor account.");
        return;
      }

      setDoctorSuccess("Doctor account created successfully.");

      // Refresh doctor list
      await loadDashboardData();

      setTimeout(() => {
        setShowAddDoctor(false);
        setDoctorSuccess("");
      }, 1200);
    } catch (error) {
      console.error("Add Doctor Error:", error);
      setDoctorError("Unable to connect to the hospital server.");
    } finally {
      setAddingDoctor(false);
    }
  };

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome to AI Hospital Management System</p>
        </div>

        <button
          className="add-doctor-btn"
          onClick={openAddDoctor}
        >
          + Add Doctor
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <div>
            <h3>Total Patients</h3>
            <p>{loading ? "..." : patients.length}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👨‍⚕️</div>
          <div>
            <h3>Total Doctors</h3>
            <p>{loading ? "..." : doctors.length}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <div>
            <h3>Appointments</h3>
            <p>{loading ? "..." : appointments.length}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💳</div>
          <div>
            <h3>Pending Bills</h3>
            <p>{loading ? "..." : pendingBills.length}</p>
          </div>
        </div>

      </div>

      {/* Recent Appointments */}
      <div className="dashboard-section">

        <h2>Recent Appointments</h2>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="4">Loading appointments...</td>
                </tr>
              ) : recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan="4">No appointments</td>
                </tr>
              ) : (
                recentAppointments.map((appointment) => (
                  <tr key={appointment.appointmentId}>

                    <td>
                      {appointment.patientName ||
                        appointment.patient?.name ||
                        `Patient #${appointment.patientId || "-"}`}
                    </td>

                    <td>
                      {appointment.doctorName ||
                        appointment.doctor?.name ||
                        `Doctor #${appointment.doctorId || "-"}`}
                    </td>

                    <td>
                      {appointment.appointmentDate || "-"}
                    </td>

                    <td>
                      {appointment.status || "-"}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add Doctor Modal */}
      {showAddDoctor && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowAddDoctor(false)}
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="admin-modal-header">
              <div>
                <h2>Add Doctor</h2>
                <p>Create a new doctor account</p>
              </div>

              <button
                className="admin-modal-close"
                onClick={() => setShowAddDoctor(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddDoctor}>

              <div className="doctor-form-grid">

                <div className="doctor-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter doctor's name"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>

                <div className="doctor-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter doctor's email"
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                  />
                </div>

                <div className="doctor-field">
                  <label>Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiologist"
                    value={doctorSpecialization}
                    onChange={(e) =>
                      setDoctorSpecialization(e.target.value)
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
                      setDoctorPassword(e.target.value)
                    }
                  />
                </div>

                <div className="doctor-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={doctorConfirmPassword}
                    onChange={(e) =>
                      setDoctorConfirmPassword(e.target.value)
                    }
                  />
                </div>

              </div>

              {doctorError && (
                <div className="doctor-form-error">
                  {doctorError}
                </div>
              )}

              {doctorSuccess && (
                <div className="doctor-form-success">
                  {doctorSuccess}
                </div>
              )}

              <button
                type="submit"
                className="create-doctor-btn"
                disabled={addingDoctor}
              >
                {addingDoctor ? "Creating..." : "Create Doctor Account"}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;