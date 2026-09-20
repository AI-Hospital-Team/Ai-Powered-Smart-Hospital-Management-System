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

  const navigate = useNavigate();

  // =========================================================
  // LOGIN FUNCTION
  // =========================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    const savedDarkMode =
      localStorage.getItem("darkMode");

    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      setErrorMessage(
        "Please enter email and password."
      );
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

      console.log(
        "LOGIN STATUS:",
        response.status
      );

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      // =====================================================
      // LOGIN FAILED
      // =====================================================

      if (!response.ok) {
        console.error(
          "Login failed:",
          data
        );

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

        // Restore dark mode
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

      console.log(
        "LOGIN SUCCESS:",
        user
      );

      // =====================================================
      // ROLE
      // =====================================================

      const backendRole =
        user.role || role;

      const userRole =
        backendRole
          .toString()
          .toLowerCase();

      console.log(
        "USER ROLE:",
        userRole
      );

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

      localStorage.removeItem(
        "isLoggedIn"
      );

      localStorage.removeItem(
        "role"
      );

      localStorage.removeItem(
        "user"
      );

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

        console.log(
          "DARK MODE RESTORED:",
          savedDarkMode
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

        console.log(
          "DARK MODE INITIALIZED:",
          currentDarkMode
        );
      }

      // =====================================================
      // VERIFY LOCAL STORAGE
      // =====================================================

      console.log(
        "USER STORED:",
        JSON.parse(
          localStorage.getItem("user")
        )
      );

      console.log(
        "FINAL DARK MODE:",
        localStorage.getItem(
          "darkMode"
        )
      );

      console.log(
        "HTML DARK MODE:",
        document.documentElement.classList.contains(
          "dark-mode"
        )
      );

      console.log(
        "BODY DARK MODE:",
        document.body.classList.contains(
          "dark-mode"
        )
      );

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
      }

      else if (userRole === "doctor") {
        navigate(
          "/doctor",
          {
            replace: true,
          }
        );
      }

      else if (userRole === "patient") {
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

      // Restore dark mode
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
    console.log(
      "FORGOT PASSWORD CLICKED"
    );

    navigate(
      "/forgot-password"
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="login-header">

          <div className="hospital-icon">
            🏥
          </div>

          <h1>
            AI Hospital
          </h1>

          <p>
            Hospital Management System
          </p>

        </div>

        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

          </div>

          {/* =================================================
              FORGOT PASSWORD
              
              INLINE CSS IS INTENTIONAL.
              This prevents Login.css from hiding it.
          ================================================= */}

          <div
            style={{
              width: "100%",
              display: "block",
              textAlign: "right",
              marginTop: "8px",
              marginBottom: "20px",
              padding: "0",
              position: "relative",
              zIndex: 999999,
            }}
          >

            <button
              type="button"
              onClick={handleForgotPassword}

              style={{
                display: "inline-block",
                visibility: "visible",
                opacity: 1,

                color: "#2563eb",

                backgroundColor:
                  "transparent",

                border: "none",

                outline: "none",

                padding: "5px 0",

                margin: "0",

                fontSize: "14px",

                fontWeight: "600",

                lineHeight: "20px",

                cursor: "pointer",

                textDecoration: "none",

                position: "relative",

                zIndex: 999999,
              }}
            >
              Forgot Password?
            </button>

          </div>

          {/* =================================================
              ROLE
          ================================================= */}

          <div className="form-group">

            <label htmlFor="role">
              Login As
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >

              <option value="Patient">
                Patient
              </option>

              <option value="Doctor">
                Doctor
              </option>

              <option value="Admin">
                Admin
              </option>

            </select>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {errorMessage && (
            <div className="login-error">
              {errorMessage}
            </div>
          )}

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;