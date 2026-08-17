import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error
    setErrorMessage("");

    // Validate fields
    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
      return;
    }

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

      // Wrong login
      if (!response.ok) {
        setErrorMessage("Invalid email or password.");
        return;
      }

      const user = await response.json();

      // Clear previous login
      localStorage.clear();

      // Save logged-in user
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          role: user.role,
          userId: user.userId,
          patientId: user.patientId,
          doctorId: user.doctorId,
        })
      );

      // Redirect based on role
      if (user.role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "Doctor") {
        navigate("/doctor", { replace: true });
      } else if (user.role === "Patient") {
        navigate("/patient", { replace: true });
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Cannot connect to the hospital server.");
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

        </form>

        <div className="login-footer">
          AI Hospital Management System
        </div>

      </div>

    </div>
  );
}

export default Login;