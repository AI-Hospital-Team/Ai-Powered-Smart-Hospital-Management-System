import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Check whether user is logged in
  if (!role || isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Decide account page according to user role
  const getAccountPath = () => {
    switch (role.toLowerCase()) {
      case "patient":
        return "/patient/account";

      case "doctor":
        return "/doctor/account";

      case "admin":
        return "/admin/account";

      default:
        return "/";
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  return (
    <div className={`dashboard-page ${darkMode ? "dark-mode" : ""}`}>

      {/* ================= HEADER ================= */}
      <header className="dashboard-header">

        {/* Hospital Logo + Name */}
        <div className="hospital-brand">

          <button
            className="logo-symbol"
            onClick={() => navigate("/")}
            title="Home"
          >
            🏥
          </button>

          <div className="hospital-brand-text">
            <h2>AI Smart Hospital</h2>
            <p>Intelligent Healthcare Management</p>
          </div>

        </div>

        {/* Header Actions */}
        <div className="dashboard-header-actions">

          {/* Home */}
          <button
            className="header-link"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>

          {/* Dark / Light Mode */}
          <button
            className="theme-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Account */}
          <button
            className="header-link"
            onClick={() => navigate(getAccountPath())}
          >
            👤 Account
          </button>

          {/* Logout */}
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* ================= DASHBOARD CONTENT ================= */}
      <main className="dashboard-main">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;