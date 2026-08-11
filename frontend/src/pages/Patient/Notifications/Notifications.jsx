import "./Notifications.css";

function Notifications() {
  return (
    <div className="notifications-page">

      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>View your latest hospital notifications</p>
        </div>
      </div>

      <div className="dashboard-section">

        <h2>Recent Notifications</h2>

        <div className="notification-list">

          <div className="notification-card">
            <div className="notification-icon">🔔</div>

            <div className="notification-content">
              <h3>Welcome to AI Hospital</h3>
              <p>
                Your patient account has been successfully created.
              </p>
              <span>Just now</span>
            </div>
          </div>

          <div className="notification-card">
            <div className="notification-icon">📅</div>

            <div className="notification-content">
              <h3>Appointment Updates</h3>
              <p>
                Your appointment notifications will appear here.
              </p>
              <span>Today</span>
            </div>
          </div>

          <div className="notification-card">
            <div className="notification-icon">💊</div>

            <div className="notification-content">
              <h3>Prescription Updates</h3>
              <p>
                New prescription notifications will appear here.
              </p>
              <span>Today</span>
            </div>
          </div>

          <div className="notification-card">
            <div className="notification-icon">💳</div>

            <div className="notification-content">
              <h3>Billing Updates</h3>
              <p>
                Your billing and payment notifications will appear here.
              </p>
              <span>Today</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;