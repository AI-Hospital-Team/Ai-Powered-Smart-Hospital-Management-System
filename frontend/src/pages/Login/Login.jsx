import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      setErrorMessage("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      // =====================================================
      // LOGIN API
      // =====================================================

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

      // =====================================================
      // READ BACKEND RESPONSE
      // =====================================================

      const contentType = response.headers.get("content-type");

      let data;

      if (
        contentType &&
        contentType.toLowerCase().includes("application/json")
      ) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE FROM BACKEND:", data);

      // =====================================================
      // LOGIN FAILED
      // =====================================================

      if (!response.ok) {
        console.error("Login failed:", data);

        if (typeof data === "object" && data !== null) {
          if (data.message) {
            setErrorMessage(data.message);
          } else if (data.error) {
            setErrorMessage(data.error);
          } else {
            setErrorMessage(
              "Invalid email, password or role."
            );
          }
        } else if (typeof data === "string" && data.trim()) {
          setErrorMessage(data);
        } else {
          setErrorMessage(
            "Invalid email, password or role."
          );
        }

        return;
      }

      // =====================================================
      // CHECK BACKEND RESPONSE
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

        return;
      }

      // =====================================================
      // BACKEND USER DATA
      // =====================================================

      const user = data;

      console.log(
        "USER RECEIVED FROM BACKEND:",
        user
      );

      // =====================================================
      // GET ROLE
      // =====================================================

      const backendRole =
        user.role || role;

      const userRole =
        backendRole.toString().toLowerCase();

      console.log(
        "USER ROLE:",
        userRole
      );

      // =====================================================
      // VERIFY ROLE
      // =====================================================

      if (
        userRole !== "admin" &&
        userRole !== "doctor" &&
        userRole !== "patient"
      ) {
        setErrorMessage(
          "Invalid user role received from server."
        );

        return;
      }

      // =====================================================
      // CLEAR OLD LOGIN DATA
      // =====================================================

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      // =====================================================
      // SAFE USER OBJECT
      //
      // IMPORTANT:
      // PASSWORD IS NOT STORED
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
      // VERIFY LOCAL STORAGE
      // =====================================================

      console.log(
        "USER STORED IN LOCALSTORAGE:",
        JSON.parse(
          localStorage.getItem("user")
        )
      );

      // =====================================================
      // REDIRECT BASED ON ROLE
      // =====================================================

      if (userRole === "admin") {
        navigate("/dashboard", {
          replace: true,
        });
      } else if (userRole === "doctor") {
        navigate("/doctor", {
          replace: true,
        });
      } else if (userRole === "patient") {
        navigate("/patient", {
          replace: true,
        });
      }

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setErrorMessage(
        "Cannot connect to the hospital server. Make sure Spring Boot is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Header */}
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

        {/* Login Form */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

          </div>

          {/* Role */}
          <div className="form-group">

            <label htmlFor="role">
              Login As
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
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

          {/* Error Message */}
          {errorMessage && (
            <div className="login-error">
              {errorMessage}
            </div>
          )}

          {/* Login Button */}
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