import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role")?.toLowerCase();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ==========================================
  // DARK MODE
  // ==========================================

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  // ==========================================
  // LOGIN PROTECTION
  // ==========================================

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ==========================================
  // ADMIN MENU
  // ==========================================

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Patients",
      path: "/dashboard/patients",
      icon: "👥",
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: "👨‍⚕️",
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: "📅",
    },
    {
      name: "Medical Records",
      path: "/dashboard/medical-records",
      icon: "📋",
    },
    {
      name: "Prescriptions",
      path: "/dashboard/prescriptions",
      icon: "💊",
    },
    {
      name: "Bills",
      path: "/dashboard/bills",
      icon: "💰",
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

  // PATIENT MENU

 const patientMenu = [
  {
    name: "Dashboard",
    path: "/patient",
    icon: "⌂",
  },
  {
    name: "Appointments",
    path: "/patient/appointments",
    icon: "▦",
  },
  {
    name: "Book Appointment",
    path: "/patient/book-appointment",
    icon: "✚",
  },
  {
    name: "Medical Records",
    path: "/patient/medical-records",
    icon: "▤",
  },
  {
    name: "Prescriptions",
    path: "/patient/prescriptions",
    icon: "◈",
  },
  {
    name: "Profile",
    path: "/patient/profile",
    icon: "●",
  },
  {
    name: "Bills",
    path: "/patient/bills",
    icon: "₹",
  },
];

  // ==========================================
  // SELECT MENU ACCORDING TO ROLE
  // ==========================================

  let menuItems = [];
  let dashboardTitle = "Dashboard";
  let dashboardSubtitle = "AI Hospital Management System";

  if (role === "admin") {
    menuItems = adminMenu;
    dashboardTitle = "Admin Panel";
    dashboardSubtitle = "AI Hospital Management System";
  } else if (role === "doctor") {
    menuItems = doctorMenu;
    dashboardTitle = "Doctor Panel";
    dashboardSubtitle = "AI Hospital Management System";
  } else if (role === "patient") {
    menuItems = patientMenu;
    dashboardTitle = "Patient Panel";
    dashboardSubtitle = "AI Hospital Management System";
  } else {
    return <Navigate to="/login" replace />;
  }

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handleNavigation = (path) => {
    navigate(path);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    navigate("/", { replace: true });
  };

  // ==========================================
  // ACTIVE MENU
  // ==========================================

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    if (path === "/doctor") {
      return location.pathname === "/doctor";
    }

    if (path === "/patient") {
      return location.pathname === "/patient";
    }

    return location.pathname === path;
  };

  // ==========================================
  // ACCOUNT NAVIGATION
  // ==========================================

  const handleAccount = () => {
    if (role === "patient") {
      navigate("/patient/profile");
    } else if (role === "doctor") {
      navigate("/doctor");
    } else if (role === "admin") {
      navigate("/dashboard");
    }
  };

  // ==========================================
  // LOGO ERROR HANDLER
  // ==========================================

  const handleLogoError = (event) => {
    event.currentTarget.style.display = "none";

    const fallback = event.currentTarget.nextElementSibling;

    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className={`dashboard-layout ${darkMode ? "dark" : ""}`}>

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="dashboard-sidebar">

        {/* =====================================
            LOGO
        ===================================== */}

        <div className="sidebar-logo">

          {/* Same Hospital Logo For All Roles */}

          <div className="patient-logo-wrapper">

            <img
              src="/ai-smart-hospital-logo.jpeg"
              alt="AI Smart Hospital"
              className="patient-hospital-logo"
              onError={handleLogoError}
            />

            {/* Fallback if image is missing */}

            <div
              className="logo-icon patient-logo-fallback"
              style={{ display: "none" }}
            >
              🏥
            </div>

          </div>

          {/* Logo Text */}

          <div className="logo-text">

            <h2>
              AI Smart Hospital
            </h2>

            <span>
             Intelligent Healthcare Management
            </span>

          </div>

        </div>

        {/* =====================================
            USER ROLE CARD
        ===================================== */}

        <div className="user-role-card">

          <div className="role-icon">

            {role === "admin" && "👨‍💼"}

            {role === "doctor" && "👨‍⚕️"}

            {role === "patient" && "🧑‍🦱"}

          </div>

          <div>

            <small>
              Logged in as
            </small>

            <strong>
              {role
                ? role.charAt(0).toUpperCase() + role.slice(1)
                : "User"}
            </strong>

          </div>

        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}

        <nav className="sidebar-navigation">

          <div className="menu-heading">
            MAIN MENU
          </div>

          {menuItems.map((item) => (

            <button
              key={item.path}
              className={`sidebar-menu-item ${
                isActive(item.path) ? "active" : ""
              }`}
              onClick={() => handleNavigation(item.path)}
            >

              <span className="menu-icon">
                {item.icon}
              </span>

              <span className="menu-name">
                {item.name}
              </span>

            </button>

          ))}

        </nav>

        {/* =====================================
            SIDEBAR BOTTOM
        ===================================== */}

        <div className="sidebar-bottom">

          <div className="hospital-status">

            <span className="status-dot"></span>

            <div>

              <strong>
                System Online
              </strong>

              <small>
                All services running
              </small>

            </div>

          </div>

        </div>

      </aside>

      {/* =====================================
          MAIN AREA
      ===================================== */}

      <main className="dashboard-main">

        {/* ===================================
            TOP HEADER
        =================================== */}

        <header className="dashboard-header">

          <div className="header-left">

            <div>

              <h1>
                {dashboardTitle}
              </h1>

              <p>
                {dashboardSubtitle}
              </p>

            </div>

          </div>


          <div className="header-right">

            {/* =================================
                HOME
            ================================= */}

            <button
              type="button"
              className="home-header-button"
              onClick={() => navigate("/")}
              title="Go to Home"
            >
              <span className="home-header-icon">⌂</span>
              <span>Home</span>
            </button>


            {/* =================================
                DARK MODE
            ================================= */}

            <button
              className="header-button"
              onClick={() => setDarkMode((prev) => !prev)}
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* ACCOUNT */}
            <button
              type="button"
              className="account-button"
              onClick={handleAccount}
              title="My Account"
            >
              <span className="account-icon">👤</span>
              <span>Account</span>
            </button>


            {/* LOGOUT */}
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <span className="logout-icon">↪</span>
              <span>Logout</span>
            </button>
            
          </div>

        </header>

        {/* ===================================
            PAGE CONTENT
        =================================== */}

        <section className="dashboard-content">

          <Outlet />

        </section>

      </main>

    </div>
  );
}

export default DashboardLayout;