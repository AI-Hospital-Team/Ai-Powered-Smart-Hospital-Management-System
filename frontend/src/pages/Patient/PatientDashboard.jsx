import "./PatientDashboard.css";

function PatientDashboard() {
  return (
    <div className="patient-dashboard">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Patient Dashboard</h1>
        <p>Your healthcare, organized in one place</p>
      </div>


      {/* SUMMARY CARDS */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <span className="card-icon">📅</span>

          <div>
            <small>Appointments</small>
            <strong>0</strong>
            <em>Upcoming & scheduled visits</em>
          </div>
        </div>


        <div className="dashboard-card">
          <span className="card-icon">📋</span>

          <div>
            <small>Medical Records</small>
            <strong>0</strong>
            <em>Your health history</em>
          </div>
        </div>


        <div className="dashboard-card">
          <span className="card-icon">💊</span>

          <div>
            <small>Prescriptions</small>
            <strong>0</strong>
            <em>Current medications</em>
          </div>
        </div>


        <div className="dashboard-card">
          <span className="card-icon">💳</span>

          <div>
            <small>Pending Bills</small>
            <strong>0</strong>
            <em>Payments to be completed</em>
          </div>
        </div>

      </div>


      {/* QUICK ACTIONS */}
      <div className="dashboard-section">

        <div className="section-heading">
          <h2>Quick Actions</h2>
          <p>Access your most important healthcare services</p>
        </div>


        <div className="quick-actions">

          <button className="quick-card">

            <span className="quick-icon">📅</span>

            <div>
              <strong>Book Appointment</strong>
              <small>Schedule a visit with a doctor</small>
            </div>

            <span className="quick-arrow">→</span>

          </button>


          <button className="quick-card">

            <span className="quick-icon">📋</span>

            <div>
              <strong>Medical Records</strong>
              <small>View your medical history</small>
            </div>

            <span className="quick-arrow">→</span>

          </button>


          <button className="quick-card">

            <span className="quick-icon">💊</span>

            <div>
              <strong>Prescriptions</strong>
              <small>Check your prescribed medicines</small>
            </div>

            <span className="quick-arrow">→</span>

          </button>


          <button className="quick-card">

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