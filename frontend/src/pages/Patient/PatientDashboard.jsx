import "./PatientDashboard.css";
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
          <span>📅</span>
          <div>
            <small>Appointments</small>
            <strong>0</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <span>📋</span>
          <div>
            <small>Medical Records</small>
            <strong>0</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <span>💊</span>
          <div>
            <small>Prescriptions</small>
            <strong>0</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <span>💳</span>
          <div>
            <small>Pending Bills</small>
            <strong>0</strong>
          </div>
        </div>

      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <button>📅 Book Appointment</button>
          <button>📋 Medical Records</button>
          <button>💊 Prescriptions</button>
          <button>👤 My Profile</button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Upcoming Appointment</h2>

        <div className="appointment-box">
          <div>
            <small>Doctor</small>
            <p>No appointments yet</p>
          </div>

          <div>
            <small>Date</small>
            <p>-</p>
          </div>

          <div>
            <small>Time</small>
            <p>-</p>
          </div>

          <div>
            <small>Status</small>
            <p>-</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PatientDashboard;