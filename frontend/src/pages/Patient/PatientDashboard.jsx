function PatientDashboard() {
  return (
    <div className="patient-dashboard">

      <div className="page-header">
        <div>
          <h1>Patient Dashboard</h1>
          <p>Welcome, Patient</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <div>
            <h3>My Appointments</h3>
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

        <div className="dashboard-card">
          <div className="card-icon">💳</div>
          <div>
            <h3>Pending Bills</h3>
            <p>0</p>
          </div>
        </div>

      </div>

      <div className="dashboard-section">

        <h2>My Appointments</h2>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
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

export default PatientDashboard;
