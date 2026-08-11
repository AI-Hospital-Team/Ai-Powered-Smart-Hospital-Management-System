import { Link, Outlet, useLocation } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();

  const isDoctor = location.pathname.startsWith("/doctor");
  const isPatient = location.pathname.startsWith("/patient");

  let role = "Admin";

  if (isDoctor) {
    role = "Doctor";
  } else if (isPatient) {
    role = "Patient";
  }

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">

        <div className="sidebar-header">
          <span className="hospital-logo">🏥</span>
          <h2>AI Hospital</h2>
        </div>

        <nav className="sidebar-nav">

          {/* Admin Navigation */}
          {role === "Admin" && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/dashboard/patients">Patients</Link>
              <Link to="/dashboard/doctors">Doctors</Link>
              <Link to="/dashboard/appointments">Appointments</Link>
              <Link to="/dashboard/medical-records">
                Medical Records
              </Link>
              <Link to="/dashboard/prescriptions">
                Prescriptions
              </Link>
              <Link to="/dashboard/billing">Billing</Link>
            </>
          )}

          {/* Doctor Navigation */}
          {role === "Doctor" && (
            <>
              <Link to="/doctor">Dashboard</Link>
              <Link to="/doctor/patients">My Patients</Link>
              <Link to="/doctor/appointments">Appointments</Link>
              <Link to="/doctor/medical-records">
                Medical Records
              </Link>
              <Link to="/doctor/prescriptions">
                Prescriptions
              </Link>
            </>
          )}

          {/* Patient Navigation */}
          {role === "Patient" && (
            <>
              <Link to="/patient">Dashboard</Link>

              <Link to="/patient/appointments">
                My Appointments
              </Link>

              <Link to="/patient/medical-records">
                Medical Records
              </Link>

              <Link to="/patient/prescriptions">
                Prescriptions
              </Link>

              <Link to="/patient/profile">
                Profile
              </Link>

              <Link to="/patient/bills">
                Billing
              </Link>

              <Link to="/patient/notifications">
                Notifications
              </Link>
            </>
          )}

        </nav>

        <div className="sidebar-bottom">
          <Link to="/login">Logout</Link>
        </div>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-navbar">

          <h2>Hospital Management System</h2>

          <div className="user-info">
            <span>{role}</span>
            <span className="user-icon">👤</span>
          </div>

        </header>

        <section className="dashboard-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default DashboardLayout;