import { useEffect, useState } from "react";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  const [loading, setLoading] = useState(true);

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

  return (
    <div className="admin-dashboard">

      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome to AI Hospital Management System</p>
        </div>
      </div>

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

    </div>
  );
}

export default Dashboard;