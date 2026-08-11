function Dashboard() {
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
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👨‍⚕️</div>
          <div>
            <h3>Total Doctors</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <div>
            <h3>Appointments</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💳</div>
          <div>
            <h3>Pending Bills</h3>
            <p>0</p>
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

export default Dashboard;