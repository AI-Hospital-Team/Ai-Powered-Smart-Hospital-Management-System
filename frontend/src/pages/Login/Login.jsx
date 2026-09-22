import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import {
  applyDarkMode,
  getInitialDarkMode,
} from "../../theme/DarkMode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // =========================================================
  // LOGIN FUNCTION
  // =========================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    const savedDarkMode = localStorage.getItem("darkMode");

    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      setErrorMessage("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
            password: password,
            role: role,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type");

      let data;

      if (
        contentType &&
        contentType
          .toLowerCase()
          .includes("application/json")
      ) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE:", data);

      // =====================================================
      // LOGIN FAILED
      // =====================================================

      if (!response.ok) {
        console.error("Login failed:", data);

        if (
          typeof data === "object" &&
          data !== null
        ) {
          if (data.message) {
            setErrorMessage(data.message);
          } else if (data.error) {
            setErrorMessage(data.error);
          } else {
            setErrorMessage(
              "Invalid email, password or role."
            );
          }
        } else if (
          typeof data === "string" &&
          data.trim()
        ) {
          setErrorMessage(data);
        } else {
          setErrorMessage(
            "Invalid email, password or role."
          );
        }

        if (savedDarkMode !== null) {
          localStorage.setItem(
            "darkMode",
            savedDarkMode
          );

          applyDarkMode(
            savedDarkMode === "true"
          );
        }

        return;
      }

      // =====================================================
      // INVALID BACKEND RESPONSE
      // =====================================================

      if (
        !data ||
        typeof data !== "object"
      ) {
        console.error(
          "Invalid login response:",
          data
        );

        setErrorMessage(
          "Invalid response received from server."
        );

        if (savedDarkMode !== null) {
          localStorage.setItem(
            "darkMode",
            savedDarkMode
          );

          applyDarkMode(
            savedDarkMode === "true"
          );
        }

        return;
      }

      const user = data;

      console.log("LOGIN SUCCESS:", user);

      // =====================================================
      // ROLE
      // =====================================================

      const backendRole =
        user.role || role;

      const userRole =
        backendRole
          .toString()
          .toLowerCase();

      console.log("USER ROLE:", userRole);

      // =====================================================
      // VALIDATE ROLE
      // =====================================================

      if (
        userRole !== "admin" &&
        userRole !== "doctor" &&
        userRole !== "patient"
      ) {
        setErrorMessage(
          "Invalid user role received from server."
        );

        if (savedDarkMode !== null) {
          localStorage.setItem(
            "darkMode",
            savedDarkMode
          );

          applyDarkMode(
            savedDarkMode === "true"
          );
        }

        return;
      }

      // =====================================================
      // CLEAR OLD LOGIN DATA
      // =====================================================

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("patientId");
      localStorage.removeItem("doctorId");

      // =====================================================
      // SAFE USER OBJECT
      // =====================================================

      const safeUser = {
        userId:
          user.userId ??
          user.id ??
          null,

        email:
          user.email ??
          cleanEmail,

        role: backendRole,

        patientId:
          user.patientId ??
          null,

        doctorId:
          user.doctorId ??
          null,

        name:
          user.name ??
          user.fullName ??
          user.patientName ??
          user.patient?.name ??
          null,
      };

      console.log(
        "SAFE USER:",
        safeUser
      );

      // =====================================================
      // SAVE LOGIN STATE
      // =====================================================

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        backendRole
      );

      localStorage.setItem(
        "user",
        JSON.stringify(safeUser)
      );

      if (safeUser.userId !== null) {
        localStorage.setItem(
          "userId",
          String(safeUser.userId)
        );
      }

      if (safeUser.patientId !== null) {
        localStorage.setItem(
          "patientId",
          String(safeUser.patientId)
        );
      }

      if (safeUser.doctorId !== null) {
        localStorage.setItem(
          "doctorId",
          String(safeUser.doctorId)
        );
      }

      // =====================================================
      // RESTORE DARK MODE
      // =====================================================

      if (savedDarkMode !== null) {
        localStorage.setItem(
          "darkMode",
          savedDarkMode
        );

        applyDarkMode(
          savedDarkMode === "true"
        );
      } else {
        const currentDarkMode =
          getInitialDarkMode();

        localStorage.setItem(
          "darkMode",
          String(currentDarkMode)
        );

        applyDarkMode(
          currentDarkMode
        );
      }

      // =====================================================
      // REDIRECT
      // =====================================================

      if (userRole === "admin") {
        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );
      } else if (userRole === "doctor") {
        navigate(
          "/doctor",
          {
            replace: true,
          }
        );
      } else if (userRole === "patient") {
        navigate(
          "/patient",
          {
            replace: true,
          }
        );
      }

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setErrorMessage(
        "Cannot connect to the hospital server. Make sure Spring Boot is running on port 8080."
      );

      if (savedDarkMode !== null) {
        localStorage.setItem(
          "darkMode",
          savedDarkMode
        );

        applyDarkMode(
          savedDarkMode === "true"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // =========================================================
  // BACK TO HOME
  // =========================================================

  const handleBackToHome = () => {
    navigate("/");
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="login-page">

      <div className="login-background-glow login-glow-one"></div>
      <div className="login-background-glow login-glow-two"></div>

      <div className="login-container">

        {/* =================================================
            LOGO / HEADER
        ================================================= */}

        <div className="login-header">

          <button
            type="button"
            className="login-back-home"
            onClick={handleBackToHome}
          >
            ← Back to Home
          </button>

          <div className="login-logo-wrapper">
            <img
              src="/github-logo.jpeg"
              alt="AI Smart Hospital"
              className="login-logo"
            />
          </div>

          <h1>
            AI Smart Hospital
          </h1>

          <p>
            Intelligent Healthcare Management
          </p>

          <div className="login-status">
            <span className="login-status-dot"></span>
            Secure Hospital Login
          </div>

        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="login-card">

          <div className="login-card-heading">

            <div>
              <span className="login-kicker">
                WELCOME BACK
              </span>

              <h2>
                {role} Login
              </h2>

              <p>
                Login to your AI Smart Hospital account
              </p>
            </div>

          </div>

          {/* =================================================
              ROLE SELECTOR
          ================================================= */}

          <div className="login-role-section">

            <span className="login-role-label">
              Login As
            </span>

            <div className="login-role-tabs">

              <button
                type="button"
                className={
                  role === "Patient"
                    ? "login-role-tab active"
                    : "login-role-tab"
                }
                onClick={() => {
                  setRole("Patient");
                  setErrorMessage("");
                }}
              >
                <span className="role-icon">
                  +
                </span>
                Patient
              </button>

              <button
                type="button"
                className={
                  role === "Doctor"
                    ? "login-role-tab active"
                    : "login-role-tab"
                }
                onClick={() => {
                  setRole("Doctor");
                  setErrorMessage("");
                }}
              >
                <span className="role-icon">
                  +
                </span>
                Doctor
              </button>

              <button
                type="button"
                className={
                  role === "Admin"
                    ? "login-role-tab active"
                    : "login-role-tab"
                }
                onClick={() => {
                  setRole("Admin");
                  setErrorMessage("");
                }}
              >
                <span className="role-icon">
                  +
                </span>
                Admin
              </button>

            </div>

          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  @
                </span>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  •
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* FORGOT PASSWORD */}

            <div className="forgot-password-row">

              <button
                type="button"
                className="forgot-password-button"
                onClick={
                  handleForgotPassword
                }
              >
                Forgot Password?
              </button>

            </div>

            {/* ERROR */}

            {errorMessage && (
              <div className="login-error">
                <span>!</span>
                {errorMessage}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login as {role}
                  <span className="login-button-arrow">
                    →
                  </span>
                </>
              )}

            </button>

          </form>

          {/* =================================================
              SECURITY INFO
          ================================================= */}

          <div className="login-security">

            <div className="security-item">
              <span className="security-icon">
                ✓
              </span>

              <span>
                Secure Login
              </span>
            </div>

            <div className="security-item">
              <span className="security-icon">
                ✓
              </span>

              <span>
                Protected Account
              </span>
            </div>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="login-footer">

          <span>
            AI Smart Hospital
          </span>

          <span className="login-footer-dot">
            •
          </span>

          <span>
            Intelligent Healthcare
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;