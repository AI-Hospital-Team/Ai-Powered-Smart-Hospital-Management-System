import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import "./DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // If user is not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Logout
      const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/", { replace: true });
    };
    
  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        {/* Sidebar Header */}
        <div className="sidebar-header">
          <h2>Hospital Management</h2>
          <p>{role} Panel</p>
        </div>

        {/* Sidebar Menu */}
        <nav className="sidebar-menu">

          {/* ================= ADMIN ================= */}
          {role === "Admin" && (
            <>
              <Link
                to="/dashboard"
                className={
                  location.pathname === "/dashboard"
                    ? "active"
                    : ""
                }
              >
                Dashboard
              </Link>
            </>
          )}

          {/* ================= DOCTOR ================= */}
          {role === "Doctor" && (
            <>
              <Link
                to="/doctor"
                className={
                  location.pathname === "/doctor"
                    ? "active"
                    : ""
                }
              >
                Dashboard
              </Link>
            </>
          )}

          {/* ================= PATIENT ================= */}
          {role === "Patient" && (
            <>
              <Link
                to="/patient"
                className={
                  location.pathname === "/patient"
                    ? "active"
                    : ""
                }
              >
                Dashboard
              </Link>

              <Link
                to="/patient/appointments"
                className={
                  location.pathname === "/patient/appointments"
                    ? "active"
                    : ""
                }
              >
                Appointments
              </Link>

              <Link
                to="/patient/book-appointment"
                className={
                  location.pathname === "/patient/book-appointment"
                    ? "active"
                    : ""
                }
              >
                Book Appointment
              </Link>

              <Link
                to="/patient/medical-records"
                className={
                  location.pathname === "/patient/medical-records"
                    ? "active"
                    : ""
                }
              >
                Medical Records
              </Link>

              <Link
                to="/patient/prescriptions"
                className={
                  location.pathname === "/patient/prescriptions"
                    ? "active"
                    : ""
                }
              >
                Prescriptions
              </Link>

              <Link
                to="/patient/profile"
                className={
                  location.pathname === "/patient/profile"
                    ? "active"
                    : ""
                }
              >
                Profile
              </Link>

              <Link
                to="/patient/bills"
                className={
                  location.pathname === "/patient/bills"
                    ? "active"
                    : ""
                }
              >
                Bills
              </Link>

              <Link
                to="/patient/notifications"
                className={
                  location.pathname === "/patient/notifications"
                    ? "active"
                    : ""
                }
              >
                Notifications
              </Link>
            </>
          )}

          {/* ================= LOGOUT ================= */}
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-content">

        {/* Top Bar */}
        <header className="topbar">
          <h1>{role} Dashboard</h1>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;