import { Link, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="hospital-logo">🏥</span>
          <h2>AI Hospital</h2>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/patients">Patients</Link>
          <Link to="/dashboard/doctors">Doctors</Link>
          <Link to="/dashboard/appointments">Appointments</Link>
          <Link to="/dashboard/medical-records">Medical Records</Link>
          <Link to="/dashboard/prescriptions">Prescriptions</Link>
          <Link to="/dashboard/billing">Billing</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/login">Logout</Link>
        </div>
      </aside>

      <main className="dashboard-main">

        <header className="dashboard-navbar">
          <h2>Hospital Management System</h2>

          <div className="user-info">
            <span>Admin</span>
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
