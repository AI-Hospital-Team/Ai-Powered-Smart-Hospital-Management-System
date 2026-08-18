import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
=======
  const [errorMessage, setErrorMessage] = useState("");
>>>>>>> origin/main

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
=======
    // Clear previous error
    setErrorMessage("");

    // Validate fields
    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
>>>>>>> origin/main
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

<<<<<<< HEAD
      // Read response safely
      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Login failed
      if (!response.ok) {
        console.error("Login failed:", data);

        if (typeof data === "object" && data.message) {
          alert(data.message);
        } else {
          alert("Invalid email, password or role");
        }

=======
      // Wrong login
      if (!response.ok) {
        setErrorMessage("Invalid email or password.");
>>>>>>> origin/main
        return;
      }

      // Backend returned user
      const user = data;

      console.log("Login successful:", user);

      // Clear old login data
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      // Save login state
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

      // Redirect according to backend role
      const userRole = user.role?.toLowerCase();

      if (userRole === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (userRole === "doctor") {
        navigate("/doctor", { replace: true });
      } else if (userRole === "patient") {
        navigate("/patient", { replace: true });
      } else {
        alert("Invalid user role received from server.");
      }
    } catch (error) {
      console.error("Login error:", error);
<<<<<<< HEAD

      alert(
        "Cannot connect to the hospital server. Make sure Spring Boot is running on port 8080."
      );
    } finally {
      setLoading(false);
=======
      setErrorMessage("Cannot connect to the hospital server.");
>>>>>>> origin/main
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

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* ROLE */}
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

<<<<<<< HEAD
          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
=======
          {/* LOGIN */}
          {/* ERROR MESSAGE */}
            {errorMessage && (
              <div className="login-error">
                ❌ {errorMessage}
              </div>
            )}

        {/* LOGIN */}
<button
  type="submit"
  className="login-button"
>
  Login
</button>
>>>>>>> origin/main

        </form>

        <div className="login-footer">
          AI Hospital Management System
        </div>

      </div>

    </div>
  );
}

export default Login;