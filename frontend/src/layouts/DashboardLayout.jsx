import {
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useState } from "react";
import { useDarkMode } from "../theme/DarkMode";

import "./DashboardLayout.css";


function DashboardLayout() {

  const navigate = useNavigate();
  const location = useLocation();


  // ==========================================
  // LOGIN / ROLE
  // ==========================================

  const role = localStorage.getItem("role")?.toLowerCase();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";


  // ==========================================
  // DARK MODE
  // ==========================================

  const [darkMode, setDarkMode] = useDarkMode();

  // ==========================================
  // LOGIN PROTECTION
  // NOT LOGGED IN → HOME
  // ==========================================

  if (!isLoggedIn || !role) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

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


  // ==========================================
  // PATIENT MENU
  // ==========================================

  const patientMenu = [
  {
    name: "Dashboard",
    path: "/patient",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },

  {
    name: "Appointments",
    path: "/patient/appointments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 9h16" />
        <path d="M8 13h2M14 13h2M8 16h2" />
      </svg>
    ),
  },

  {
    name: "Book Appointment",
    path: "/patient/book-appointment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 9h16" />
        <path d="M12 12v6M9 15h6" />
      </svg>
    ),
  },

  {
    name: "Medical Records",
    path: "/patient/medical-records",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 8h8M8 12h6M8 16h5" />
      </svg>
    ),
  },

  {
    name: "Prescriptions",
    path: "/patient/prescriptions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8.5 4.5a4 4 0 0 1 5.7 0l5.3 5.3a4 4 0 0 1-5.7 5.7l-5.3-5.3a4 4 0 0 1 0-5.7Z" />
        <path d="m10 6 8 8" />
        <path d="M6.5 15.5 4 18" />
        <path d="M4 18h3" />
      </svg>
    ),
  },

  {
    name: "Profile",
    path: "/patient/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
      </svg>
    ),
  },

  {
    name: "Bills & Payment",
    path: "/patient/bills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h5M8 16h6" />
      </svg>
    ),
  },
];

  // ==========================================
  // SELECT MENU ACCORDING TO ROLE
  // ==========================================

  let menuItems = [];

  let dashboardTitle =
    "Dashboard";

  let dashboardSubtitle =
    "AI Hospital Management System";


  if (role === "admin") {

    menuItems = adminMenu;

    dashboardTitle =
      "Admin Panel";

    dashboardSubtitle =
      "AI Hospital Management System";

  }

  else if (role === "doctor") {

    menuItems = doctorMenu;

    dashboardTitle =
      "Doctor Panel";

    dashboardSubtitle =
      "AI Hospital Management System";

  }

  else if (role === "patient") {

    menuItems = patientMenu;

    dashboardTitle =
      "Patient Panel";

    dashboardSubtitle =
      "AI Hospital Management System";

  }

  else {

    // Unknown role → Home

    localStorage.clear();

    return (
      <Navigate
        to="/"
        replace
      />
    );

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

    // Remove login information

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userId"
    );


    // Go directly to Home

    navigate(
      "/",
      {
        replace: true,
      }
    );

  };


  // ==========================================
  // ACTIVE MENU
  // ==========================================

  const isActive = (path) => {

    if (path === "/dashboard") {

      return (
        location.pathname ===
        "/dashboard"
      );

    }


    if (path === "/doctor") {

      return (
        location.pathname ===
        "/doctor"
      );

    }


    if (path === "/patient") {

      return (
        location.pathname ===
        "/patient"
      );

    }


    return (
      location.pathname === path
    );

  };


  // ==========================================
  // ACCOUNT NAVIGATION
  // ==========================================

  const handleAccount = () => {

    if (role === "patient") {

      navigate(
        "/patient/profile"
      );

    }

    else if (role === "doctor") {

      navigate(
        "/doctor"
      );

    }

    else if (role === "admin") {

      navigate(
        "/dashboard"
      );

    }

  };


  // ==========================================
  // LOGO ERROR HANDLER
  // ==========================================

  const handleLogoError = (
    event
  ) => {

    event.currentTarget.style.display =
      "none";


    const fallback =
      event.currentTarget
        .nextElementSibling;


    if (fallback) {

      fallback.style.display =
        "flex";

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div
      className="dashboard-layout"
    >


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="dashboard-sidebar">


        {/* =====================================
            LOGO
        ===================================== */}

        <div className="sidebar-logo">

          <div className="patient-logo-wrapper">

            <img
              src="/ai-smart-hospital-logo.jpeg"
              alt="AI Smart Hospital"
              className="patient-hospital-logo"
              onError={
                handleLogoError
              }
            />


            {/* FALLBACK LOGO */}

            <div
              className="logo-icon patient-logo-fallback"
              style={{
                display: "none",
              }}
            >
              🏥
            </div>

          </div>


          {/* LOGO TEXT */}

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

    {role === "admin" && (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" />
        <circle cx="12" cy="9" r="2.2" />
        <path d="M8.5 16c.5-2 1.7-3 3.5-3s3 .9 3.5 3" />
      </svg>
    )}

    {role === "doctor" && (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="7" r="3" />
        <path d="M6 20c.6-3.6 2.7-5.5 6-5.5s5.4 1.9 6 5.5" />
        <path d="M18 3v5" />
        <path d="M15.5 5.5h5" />
      </svg>
    )}

    {role === "patient" && (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.7 3-5.5 7-5.5s6.3 1.8 7 5.5" />
      </svg>
    )}

  </div>

  <div className="role-info">

    <small>
      Logged in as
    </small>

    <strong>
      {role
        ? role.charAt(0).toUpperCase() +
          role.slice(1)
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


          {menuItems.map(
            (item) => (

              <button
                key={item.path}
                type="button"
                className={`sidebar-menu-item ${
                  isActive(
                    item.path
                  )
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleNavigation(
                    item.path
                  )
                }
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                <span className="menu-name">
                  {item.name}
                </span>

              </button>

            )
          )}

        </nav>


        {/* =====================================
            PATIENT SUPPORT
        ===================================== */}

        {role === "patient" && (
          <div className="sidebar-support">

            <button
              type="button"
              className="sidebar-support-item"
              onClick={() => {
                window.location.href = "/#contact";
              }}
            >
              <span className="support-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.7-1.7 1.2-1.7 2.7" />
                  <path d="M12 17h.01" />
                </svg>
              </span>

              <span className="support-name">
                Need Help?
              </span>
            </button>

            <button
              type="button"
              className="sidebar-support-item"
              onClick={() => {
                window.location.href = "/#contact";
              }}
            >
              <span className="support-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7Z" />
                  <path d="M8 8h8" />
                  <path d="M8 11h5" />
                </svg>
              </span>

              <span className="support-name">
                Contact Us
              </span>
            </button>

          </div>
        )}

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
              onClick={() =>
                navigate("/")
              }
              title="Go to Home"
            >

              <span className="home-header-icon">
                ⌂
              </span>

              <span>
                Home
              </span>

            </button>


            {/* =================================
                DARK MODE
            ================================= */}

            <button
              type="button"
              className="header-button"
              onClick={() =>
                setDarkMode(
                  (prev) => !prev
                )
              }
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >

              {darkMode
                ? "☀️"
                : "🌙"}

            </button>


            {/* =================================
                ACCOUNT
            ================================= */}

            <button
              type="button"
              className="account-button"
              onClick={
                handleAccount
              }
              title="My Account"
            >

              <span className="account-icon">
                👤
              </span>

              <span>
                Account
              </span>

            </button>


            {/* =================================
                LOGOUT
            ================================= */}

            <button
              type="button"
              className="logout-button"
              onClick={
                handleLogout
              }
              title="Logout"
            >

              <span className="logout-icon">
                ↪
              </span>

              <span>
                Logout
              </span>

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