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

    if (!email.trim() || !password.trim()) {
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
            email: email.trim(),
            password: password,
            role: role,
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        console.error("Login failed:", data);

        if (typeof data === "object" && data?.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Invalid email, password or role.");
        }

        return;
      }

      const user = data;

      console.log("Login successful:", user);

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: user.userId,
          email: user.email,
          role: user.role,
          patientId: user.patientId,
          doctorId: user.doctorId,
        })
      );

      const userRole = user.role?.toLowerCase();

      if (userRole === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (userRole === "doctor") {
        navigate("/doctor", { replace: true });
      } else if (userRole === "patient") {
        navigate("/patient", { replace: true });
      } else {
        setErrorMessage("Invalid user role received from server.");
      }
    } catch (error) {
      console.error("Login error:", error);

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
        <div className="login-header">
          <div className="hospital-icon">🏥</div>

          <h1>AI Hospital</h1>

          <p>Hospital Management System</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="form-group">
            <label>Login As</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {errorMessage && (
            <div className="login-error">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;