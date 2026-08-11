function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Welcome to AI Hospital Management System.</p>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Patients</h3>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Doctors</h3>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h3>Appointments</h3>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Bills</h3>
          <p>0</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;