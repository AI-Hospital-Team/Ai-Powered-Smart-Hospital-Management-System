import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  return (
    <div className={`dashboard-page ${darkMode ? "dark-mode" : ""}`}>

      {/* HEADER */}
      <header className="dashboard-header">

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

        <div className="dashboard-header-actions">

          <button
            className="header-link"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Change Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className="header-link"
            onClick={() => navigate("/patient/account")}
          >
            👤 Account
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* DASHBOARD CONTENT */}
      <main className="dashboard-main">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;