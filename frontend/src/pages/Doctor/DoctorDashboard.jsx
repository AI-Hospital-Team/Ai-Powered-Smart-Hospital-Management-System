function DoctorDashboard() {
  return (
    <div className="doctor-dashboard">

      <div className="page-header">
        <div>
          <h1>Doctor Dashboard</h1>
          <p>Welcome, Doctor</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <div>
            <h3>Today's Appointments</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <div>
            <h3>My Patients</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <div>
            <h3>Medical Records</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💊</div>
          <div>
            <h3>Prescriptions</h3>
            <p>0</p>
          </div>
        </div>

      </div>

      <div className="dashboard-section">

        <h2>Today's Appointments</h2>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>No appointments</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;