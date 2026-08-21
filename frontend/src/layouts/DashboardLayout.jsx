import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get role and convert it to lowercase
  // Example: "Patient" -> "patient"
  const role = localStorage.getItem("role")?.toLowerCase();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ==========================================
  // SAVE DARK MODE
  // ==========================================

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ==========================================
  // LOGIN CHECK
  // ==========================================

  if (!role || isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  // ==========================================
  // ACCOUNT PATH
  // ==========================================

  const getAccountPath = () => {
    switch (role) {
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

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  // ==========================================
  // PATIENT MENU
  // ==========================================

  const patientMenu = [
    {
      name: "Dashboard",
      path: "/patient",
      icon: "🏠",
    },
    {
      name: "Appointments",
      path: "/patient/appointments",
      icon: "📅",
    },
    {
      name: "Book Appointment",
      path: "/patient/book-appointment",
      icon: "➕",
    },
    {
      name: "Medical Records",
      path: "/patient/medical-records",
      icon: "📋",
    },
    {
      name: "Prescriptions",
      path: "/patient/prescriptions",
      icon: "💊",
    },
    {
      name: "Bills",
      path: "/patient/bills",
      icon: "💰",
    },
    {
      name: "Profile",
      path: "/patient/profile",
      icon: "👤",
    },
  ];

  // ==========================================
  // DOCTOR MENU
  // ==========================================

  const doctorMenu = [
    {
      name: "Dashboard",
      path: "/doctor",
      icon: "🏠",
    },
  ];

  // ==========================================
  // ADMIN MENU
  // ==========================================

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
  ];

  // ==========================================
  // SELECT MENU BASED ON ROLE
  // ==========================================

  const getMenu = () => {
    switch (role) {
      case "patient":
        return patientMenu;

      case "doctor":
        return doctorMenu;

      case "admin":
        return adminMenu;

      default:
        return [];
    }
  };

  const menu = getMenu();

  // ==========================================
  // MENU TITLE
  // ==========================================

  const getMenuTitle = () => {
    switch (role) {
      case "patient":
        return "Patient Menu";

      case "doctor":
        return "Doctor Menu";

      case "admin":
        return "Admin Menu";

      default:
        return "Menu";
    }
  };

  // ==========================================
  // ACTIVE MENU
  // ==========================================

  const isActive = (path) => {
    // Dashboard exact match
    if (
      path === "/patient" ||
      path === "/doctor" ||
      path === "/dashboard"
    ) {
      return location.pathname === path;
    }

    return location.pathname === path;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      className={`dashboard-page ${
        darkMode ? "dark-mode" : ""
      }`}
    >

      {/* ========================================
          HEADER
      ======================================== */}

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

            <p>
              Intelligent Healthcare Management
            </p>
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
            onClick={() =>
              setDarkMode((prev) => !prev)
            }
            title={
              darkMode
                ? "Light Mode"
                : "Dark Mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Account */}
          <button
            className="header-link"
            onClick={() =>
              navigate(getAccountPath())
            }
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

      {/* ========================================
          DASHBOARD BODY
      ======================================== */}

      <div className="dashboard-body">

        {/* ======================================
            SIDEBAR
        ====================================== */}

        <aside className="dashboard-sidebar">

          {/* Sidebar Title */}
          <div className="sidebar-title">
            {getMenuTitle()}
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">

            {menu.map((item) => (
              <button
                key={item.path}
                className={`sidebar-link ${
                  isActive(item.path)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  navigate(item.path)
                }
              >

                <span className="sidebar-icon">
                  {item.icon}
                </span>

                <span className="sidebar-text">
                  {item.name}
                </span>

              </button>
            ))}

          </nav>

        </aside>

        {/* ======================================
            MAIN CONTENT
        ====================================== */}

        <main className="dashboard-main">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;