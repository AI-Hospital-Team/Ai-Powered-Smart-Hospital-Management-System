import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Clear previous login
    localStorage.clear();

    // Save current user
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email.trim(),
        role: role,
      })
    );

    // Redirect based on selected role
    if (role === "Admin") {
      navigate("/dashboard", { replace: true });
    } else if (role === "Doctor") {
      navigate("/doctor", { replace: true });
    } else if (role === "Patient") {
      navigate("/patient", { replace: true });
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

          {/* LOGIN */}
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        <div className="login-footer">
          AI Hospital Management System
        </div>

      </div>

    </div>
  );
}

export default Login;