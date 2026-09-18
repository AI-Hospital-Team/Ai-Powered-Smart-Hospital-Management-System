import {
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import {
  useDarkMode,
  applyDarkMode,
} from "../theme/DarkMode";

import "./DashboardLayout.css";

const API_URL = "http://localhost:8080/api";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // LOGIN / ROLE
  // ==========================================

  const role = localStorage
    .getItem("role")
    ?.toLowerCase();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // ==========================================
  // USER ID
  // ==========================================

  const getUserId = () => {
    const directUserId =
      localStorage.getItem("userId");

    if (directUserId) {
      return Number(directUserId);
    }

    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!storedUser) {
        return null;
      }

      return Number(
        storedUser.userId ||
          storedUser.patientId ||
          storedUser.doctorId ||
          storedUser.id ||
          null
      );
    } catch {
      return null;
    }
  };

  const userId = getUserId();

  // ==========================================
  // DARK MODE
  // ==========================================

  const [darkMode, setDarkMode] =
    useDarkMode();

  useEffect(() => {
    applyDarkMode(darkMode);
  }, [darkMode]);

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const [notifications, setNotifications] =
    useState([]);

  const [
    notificationLoading,
    setNotificationLoading,
  ] = useState(false);

  const [
    notificationError,
    setNotificationError,
  ] = useState("");

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const notificationRef =
    useRef(null);

  // ==========================================
  // UNREAD COUNT
  // ==========================================

  const unreadNotificationCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  // ==========================================
  // LOAD NOTIFICATIONS
  // ==========================================

  const loadNotifications =
    async () => {
      if (
        !isLoggedIn ||
        !userId
      ) {
        setNotifications([]);
        return;
      }

      setNotificationLoading(true);
      setNotificationError("");

      try {
        const response = await fetch(
          `${API_URL}/notifications/${userId}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load notifications"
          );
        }

        const data =
          await response.json();

        setNotifications(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Notification loading error:",
          error
        );

        setNotificationError(
          "Unable to load notifications."
        );
      } finally {
        setNotificationLoading(false);
      }
    };

  // ==========================================
  // LOAD NOTIFICATIONS ON LOGIN
  // ==========================================

  useEffect(() => {
    if (
      isLoggedIn &&
      userId
    ) {
      loadNotifications();
    } else {
      setNotifications([]);
    }
  }, [
    isLoggedIn,
    userId,
  ]);

  // ==========================================
  // AUTO REFRESH NOTIFICATIONS
  // EVERY 30 SECONDS
  // ==========================================

  useEffect(() => {
    if (
      !isLoggedIn ||
      !userId
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        loadNotifications();
      }, 30000);

    return () =>
      clearInterval(interval);
  }, [
    isLoggedIn,
    userId,
  ]);

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ==========================================
  // CLOSE DROPDOWN WITH ESC
  // ==========================================

  useEffect(() => {
    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ==========================================
  // MARK INDIVIDUAL NOTIFICATION AS READ
  // ==========================================

  const markNotificationAsRead =
    async (notificationId) => {
      try {
        const response =
          await fetch(
            `${API_URL}/notifications/${notificationId}/read`,
            {
              method: "PUT",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to mark notification as read"
          );
        }

        setNotifications(
          (previousNotifications) =>
            previousNotifications.map(
              (notification) =>
                notification.notificationId ===
                notificationId
                  ? {
                      ...notification,
                      read: true,
                    }
                  : notification
            )
        );
      } catch (error) {
        console.error(
          "Mark notification read error:",
          error
        );
      }
    };

  // ==========================================
  // MARK ALL NOTIFICATIONS AS READ
  // ==========================================

  const markAllNotificationsAsRead =
    async () => {
      if (
        !userId ||
        unreadNotificationCount === 0
      ) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/notifications/user/${userId}/read-all`,
            {
              method: "PUT",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to mark all notifications as read"
          );
        }

        setNotifications(
          (previousNotifications) =>
            previousNotifications.map(
              (notification) => ({
                ...notification,
                read: true,
              })
            )
        );
      } catch (error) {
        console.error(
          "Mark all notifications read error:",
          error
        );
      }
    };

  // ==========================================
  // NOTIFICATION ICON
  // ==========================================

  const getNotificationIcon =
    (type) => {
      if (!type) {
        return "🔔";
      }

      const notificationType =
        String(type).toUpperCase();

      if (
        notificationType.includes(
          "APPOINTMENT"
        )
      ) {
        return "📅";
      }

      if (
        notificationType.includes(
          "BILL"
        )
      ) {
        return "💳";
      }

      if (
        notificationType.includes(
          "PRESCRIPTION"
        )
      ) {
        return "💊";
      }

      if (
        notificationType.includes(
          "LAB"
        )
      ) {
        return "🧪";
      }

      if (
        notificationType.includes(
          "MEDICINE"
        )
      ) {
        return "💊";
      }

      if (
        notificationType.includes(
          "DOCTOR"
        )
      ) {
        return "👨‍⚕️";
      }

      return "🔔";
    };

  // ==========================================
  // NOTIFICATION TYPE CLASS
  // ==========================================

  const getNotificationTypeClass =
    (type) => {
      if (!type) {
        return "default";
      }

      const notificationType =
        String(type).toUpperCase();

      if (
        notificationType.includes(
          "APPOINTMENT"
        )
      ) {
        return "appointment";
      }

      if (
        notificationType.includes(
          "BILL"
        )
      ) {
        return "bill";
      }

      if (
        notificationType.includes(
          "PRESCRIPTION"
        )
      ) {
        return "prescription";
      }

      if (
        notificationType.includes(
          "LAB"
        )
      ) {
        return "lab";
      }

      if (
        notificationType.includes(
          "MEDICINE"
        )
      ) {
        return "medicine";
      }

      if (
        notificationType.includes(
          "DOCTOR"
        )
      ) {
        return "doctor";
      }

      return "default";
    };

  // ==========================================
  // NOTIFICATION TIME
  // ==========================================

  const formatNotificationTime =
    (createdAt) => {
      if (!createdAt) {
        return "";
      }

      try {
        return new Date(
          createdAt
        ).toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
      } catch {
        return "";
      }
    };

  // ==========================================
  // LOGIN PROTECTION
  // ==========================================

  if (
    !isLoggedIn ||
    !role
  ) {
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
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
    },

    {
      name: "Patients",
      path: "/dashboard/patients",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            cx="9"
            cy="8"
            r="3"
          />
          <path d="M3.5 20c.6-3.6 2.4-5.5 5.5-5.5s4.9 1.9 5.5 5.5" />
          <path d="M16 6.5a2.5 2.5 0 1 1 0 5" />
          <path d="M16 14.5c2.5.2 4 2 4.5 5" />
        </svg>
      ),
    },

    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4v5a7 7 0 0 0 14 0V4" />
          <path d="M5 4H3" />
          <path d="M19 4h2" />
          <path d="M12 16v1a4 4 0 0 0 4 4h1" />
          <circle
            cx="19"
            cy="21"
            r="2"
          />
        </svg>
      ),
    },

    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
          />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M8 13h2M14 13h2M8 16h2" />
        </svg>
      ),
    },

    {
      name: "Medical Records",
      path: "/dashboard/medical-records",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
          />
          <path d="M8 8h8M8 12h6M8 16h5" />
        </svg>
      ),
    },

    {
      name: "Prescriptions",
      path: "/dashboard/prescriptions",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" />
          <path d="M8 9h4a2 2 0 0 1 0 4H8" />
          <path d="M8 9v6" />
          <path d="M12 13l4 4" />
          <path d="M15 9h2" />
        </svg>
      ),
    },

    {
      name: "Bills & Payment",
      path: "/dashboard/bills",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h12v18l-2.5-1.8L13 21l-3-1.8L7 21l-1-1.8L6 21V3Z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      ),
    },

    {
      name: "Admin Logs",
      path: "/dashboard/logs",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16v16H4z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      ),
    },
  ];

  // ==========================================
  // DOCTOR MENU
  // ==========================================

  const doctorMenu = [
    {
      name: "Dashboard",
      path: "/doctor",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
    },

    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
          />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M8 13h2M14 13h2M8 16h2" />
        </svg>
      ),
    },

    {
      name: "My Patients",
      path: "/doctor/patients",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            cx="9"
            cy="8"
            r="3"
          />
          <path d="M3.5 20c.6-3.6 2.4-5.5 5.5-5.5s4.9 1.9 5.5 5.5" />
          <path d="M16 6.5a2.5 2.5 0 1 1 0 5" />
          <path d="M16 14.5c2.5.2 4 2 4.5 5" />
        </svg>
      ),
    },

    {
      name: "Medical Records",
      path: "/doctor/medical-records",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
          />
          <path d="M8 8h8M8 12h6M8 16h5" />
        </svg>
      ),
    },

    {
      name: "Prescriptions",
      path: "/doctor/prescriptions",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" />
          <path d="M8 9h4a2 2 0 0 1 0 4H8" />
          <path d="M8 9v6" />
          <path d="M12 13l4 4" />
          <path d="M15 9h2" />
        </svg>
      ),
    },

    {
      name: "Profile",
      path: "/doctor/profile",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            cx="12"
            cy="8"
            r="3"
          />
          <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
        </svg>
      ),
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
          />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M8 13h2M14 13h2M8 16h2" />
        </svg>
      ),
    },

    {
      name: "Book Appointment",
      path: "/patient/book-appointment",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
          />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M12 12v6M9 15h6" />
        </svg>
      ),
    },

    {
      name: "Medical Records",
      path: "/patient/medical-records",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
          />
          <path d="M8 8h8M8 12h6M8 16h5" />
        </svg>
      ),
    },

    {
      name: "Prescriptions",
      path: "/patient/prescriptions",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" />
          <path d="M8 9h4a2 2 0 0 1 0 4H8" />
          <path d="M8 9v6" />
          <path d="M12 13l4 4" />
          <path d="M15 9h2" />
        </svg>
      ),
    },

    {
      name: "Profile",
      path: "/patient/profile",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle
            cx="12"
            cy="8"
            r="3"
          />
          <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
        </svg>
      ),
    },

    {
      name: "Bills & Payment",
      path: "/patient/bills",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h12v18l-2.5-1.8L13 21l-3-1.8L7 21l-1-1.8L6 21V3Z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      ),
    },
  ];

  // ==========================================
  // SELECT MENU
  // ==========================================

  let menuItems = [];

  let dashboardTitle =
    "Dashboard";

  let dashboardSubtitle =
    "AI Hospital Management System";

  if (role === "admin") {
    menuItems = adminMenu;
    dashboardTitle = "Admin Panel";
  } else if (role === "doctor") {
    menuItems = doctorMenu;
    dashboardTitle = "Doctor Panel";
  } else if (role === "patient") {
    menuItems = patientMenu;
    dashboardTitle = "Patient Panel";
  } else {
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

  const handleNavigation = (
    path
  ) => {
    navigate(path);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
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

    localStorage.removeItem(
      "patientId"
    );

    setNotifications([]);
    setNotificationOpen(false);

    // Dark mode remains saved.

    navigate("/", {
      replace: true,
    });
  };

  // ==========================================
  // ACTIVE MENU
  // ==========================================

  const isActive = (
    path
  ) => {
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
  // ACCOUNT
  // ==========================================

  const handleAccount = () => {
    if (role === "patient") {
      navigate(
        "/patient/profile"
      );
    } else if (role === "doctor") {
      navigate(
        "/doctor/profile"
      );
    } else if (role === "admin") {
      navigate("/dashboard");
    }
  };

  // ==========================================
  // LOGO ERROR
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
  // DARK MODE TOGGLE
  // ==========================================

  const handleDarkMode = () => {
    setDarkMode(
      (current) => !current
    );
  };

  // ==========================================
  // NOTIFICATION TOGGLE
  // ==========================================

  const handleNotificationToggle =
    () => {
      setNotificationOpen(
        (current) => !current
      );

      if (!notificationOpen) {
        loadNotifications();
      }
    };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="dashboard-layout">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="dashboard-sidebar">

        {/* LOGO */}

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

            <div
              className="logo-icon patient-logo-fallback"
              style={{
                display: "none",
              }}
            >
              🏥
            </div>

          </div>

          <div className="logo-text">

            <h2>
              AI Smart Hospital
            </h2>

            <span>
              Intelligent Healthcare Management
            </span>

          </div>

        </div>

        {/* USER ROLE CARD */}

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
                <path d="M12 3l7 3v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z" />
                <path d="M9.5 11.5a2.5 2.5 0 1 1 5 0" />
                <path d="M8.5 17c.6-2 1.8-3 3.5-3s2.9 1 3.5 3" />
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
                <path d="M6 3v5a6 6 0 0 0 12 0V3" />
                <path d="M6 3H4" />
                <path d="M18 3h2" />
                <path d="M12 14v2a4 4 0 0 0 4 4h1" />
                <circle
                  cx="19"
                  cy="20"
                  r="2"
                />
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
                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                />
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
                ? role
                    .charAt(0)
                    .toUpperCase() +
                  role.slice(1)
                : "User"}
            </strong>

          </div>

        </div>

        {/* NAVIGATION */}

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

        {/* PATIENT SUPPORT */}

        {role === "patient" && (
          <div className="sidebar-support">

            <button
              type="button"
              className="sidebar-support-item"
              onClick={() => {
                window.location.href =
                  "/#contact";
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
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
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
                window.location.href =
                  "/#contact";
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

        {/* SIDEBAR BOTTOM */}

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

        {/* =====================================
            TOP HEADER
        ===================================== */}

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

            {/* HOME */}

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
                NOTIFICATION BELL
                PATIENT + DOCTOR + ADMIN
            ================================= */}

            <div
              className="notification-header-wrapper"
              ref={notificationRef}
            >

              <button
                type="button"
                className={`notification-header-button ${
                  notificationOpen
                    ? "active"
                    : ""
                } ${
                  unreadNotificationCount >
                  0
                    ? "has-unread"
                    : ""
                }`}
                onClick={
                  handleNotificationToggle
                }
                title="Notifications"
                aria-label="Notifications"
                aria-expanded={
                  notificationOpen
                }
              >

                <span className="notification-header-icon">
                  🔔
                </span>

                {/* UNREAD BADGE */}

                {unreadNotificationCount >
                  0 && (
                  <span className="notification-badge">

                    {unreadNotificationCount >=
                    10
                      ? "9+"
                      : unreadNotificationCount}

                  </span>
                )}

              </button>

              {/* =================================
                  NOTIFICATION DROPDOWN
              ================================= */}

              {notificationOpen && (
                <div className="notification-dropdown">

                  {/* HEADER */}

                  <div className="notification-dropdown-header">

                    <div>

                      <h3>
                        Notifications
                      </h3>

                      <span>
                        {unreadNotificationCount ===
                        0
                          ? "You're all caught up"
                          : `${unreadNotificationCount} unread notification${
                              unreadNotificationCount >
                              1
                                ? "s"
                                : ""
                            }`}
                      </span>

                    </div>

                    {unreadNotificationCount >
                      0 && (
                      <button
                        type="button"
                        className="notification-mark-all"
                        onClick={
                          markAllNotificationsAsRead
                        }
                      >
                        Mark all as read
                      </button>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="notification-dropdown-body">

                    {notificationLoading ? (
                      <div className="notification-dropdown-loading">

                        <span className="notification-small-loader"></span>

                        <span>
                          Loading notifications...
                        </span>

                      </div>
                    ) : notificationError ? (
                      <div className="notification-dropdown-error">

                        <span>
                          {notificationError}
                        </span>

                        <button
                          type="button"
                          onClick={
                            loadNotifications
                          }
                        >
                          Retry
                        </button>

                      </div>
                    ) : notifications.length ===
                      0 ? (
                      <div className="notification-dropdown-empty">

                        <div className="notification-empty-icon">
                          🔔
                        </div>

                        <strong>
                          No notifications
                        </strong>

                        <span>
                          You're all caught up.
                        </span>

                      </div>
                    ) : (
                      <div className="notification-dropdown-list">

                        {notifications
                          .slice(
                            0,
                            6
                          )
                          .map(
                            (
                              notification
                            ) => (
                              <div
                                key={
                                  notification.notificationId
                                }
                                className={`notification-dropdown-item ${
                                  !notification.read
                                    ? "unread"
                                    : ""
                                }`}
                              >

                                {/* ICON */}

                                <div
                                  className={`notification-dropdown-icon ${getNotificationTypeClass(
                                    notification.type
                                  )}`}
                                >
                                  {getNotificationIcon(
                                    notification.type
                                  )}
                                </div>

                                {/* CONTENT */}

                                <div className="notification-dropdown-content">

                                  <div className="notification-dropdown-title">

                                    <strong>
                                      {
                                        notification.title
                                      }
                                    </strong>

                                    {!notification.read && (
                                      <span className="notification-new-dot">
                                        New
                                      </span>
                                    )}

                                  </div>

                                  <p>
                                    {
                                      notification.message
                                    }
                                  </p>

                                  <small>
                                    {formatNotificationTime(
                                      notification.createdAt
                                    )}
                                  </small>

                                </div>

                                {/* MARK AS READ */}

                                {!notification.read && (
                                  <button
                                    type="button"
                                    className="notification-mark-read"
                                    onClick={() =>
                                      markNotificationAsRead(
                                        notification.notificationId
                                      )
                                    }
                                    title="Mark as read"
                                    aria-label="Mark notification as read"
                                  >
                                    ✓
                                  </button>
                                )}

                              </div>
                            )
                          )}

                      </div>
                    )}

                  </div>

                  {/* FOOTER */}

                  {notifications.length >
                    6 && (
                    <div className="notification-dropdown-footer">

                      <span>
                        Showing latest 6 notifications
                      </span>

                    </div>
                  )}

                </div>
              )}

            </div>

            {/* =================================
                DARK MODE
            ================================= */}

            <button
              type="button"
              className="header-button"
              onClick={
                handleDarkMode
              }
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              aria-label={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              aria-pressed={
                darkMode
              }
            >

              <span className="theme-icon">
                {darkMode
                  ? "☀️"
                  : "🌙"}
              </span>

            </button>

            {/* ACCOUNT */}

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

            {/* LOGOUT */}

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

        {/* =====================================
            PAGE CONTENT
        ===================================== */}

        <section className="dashboard-content">

          <Outlet />

        </section>

      </main>

    </div>
  );
}

export default DashboardLayout;