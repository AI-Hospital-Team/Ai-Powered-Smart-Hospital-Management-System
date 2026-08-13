import { useState } from "react";
import hospitalLogo from "../../assets/hospital-logo.jpeg";
import "./Home.css";

function Home() {
    const [showLoginMenu, setShowLoginMenu] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="home-page">

      {/* Header */}
      <header className="home-header">
        <div className="hospital-logo">
            <img src={hospitalLogo} alt="AI Hospital Logo" />

        <div>
                <h2>AI Hospital</h2>
                <p>Smart Healthcare Management System</p>
            </div>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>


        <div className="header-actions">

        {/* Login */}
        <div className="login-dropdown">

            <button
            className="login-btn"
            onClick={() => setShowLoginMenu(!showLoginMenu)}
            >
                Login <span className="login-arrow"></span>

            </button>

                {showLoginMenu && (
                <div className="login-menu">

                <button
                onClick={() => {
                    setSelectedRole("Patient");
                    setShowLoginMenu(false);
                }}
                >
                Patient Login
                </button>

                <button
                onClick={() => {
                    setSelectedRole("Doctor");
                    setShowLoginMenu(false);
                }}
                >
                Doctor Login
                </button>

                <button
                onClick={() => {
                    setSelectedRole("Admin");
                    setShowLoginMenu(false);
                }}
                >
                Admin Login
                </button>

            </div>
            )}

        </div>

        {/* Register */}
        <button
            className="register-btn"
            onClick={() => setShowRegister(true)}
        >
            Register
        </button>

        </div>
       

      </header>

  {/* Login Popup */}
        {selectedRole && (
        <div className="login-overlay">

            <div className="hospital-login">

            {/* Close */}
            <button
                className="close-login"
                onClick={() => setSelectedRole("")}
            >
                ×
            </button>

            {/* Logo */}
            <div className="hospital-login-logo">
                <img
                src={hospitalLogo}
                alt="AI Hospital Logo"
                />
            </div>

            <h1>LOGIN</h1>

            <p className="login-subtitle">
                AI Hospital Management System
            </p>

            {/* Role Selection */}
            <div className="role-tabs">

                <button type="button"
                        className={selectedRole === "Patient" ? "active" : ""}
                        onClick={() => setSelectedRole("Patient")}
                >
                Patient
                </button>

                <button type="button"
                    className={selectedRole === "Doctor" ? "active" : ""}
                    onClick={() => setSelectedRole("Doctor")}
                >
                Doctor
                </button>

                <button type="button"
                    className={selectedRole === "Admin" ? "active" : ""}
                    onClick={() => setSelectedRole("Admin")}
                >
                Admin
                </button>

            </div>

            {/* Login Form */}
            <form
                onSubmit={(e) => {
                e.preventDefault();

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", selectedRole);

                localStorage.setItem(
                    "user",
                    JSON.stringify({
                    email: e.target.email.value,
                    role: selectedRole,
                    })
                );

                if (selectedRole === "Patient") {
                    window.location.href = "/patient";
                }

                if (selectedRole === "Doctor") {
                    window.location.href = "/doctor";
                }

                if (selectedRole === "Admin") {
                    window.location.href = "/dashboard";
                }
                }}
            >

                <label>Email</label>

                <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                />

                <label>Password</label>

                <input
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                />

                <button
                type="submit"
                className="hospital-login-button"
                >
                Login
                </button>

            </form>

            <p className="register-text">
                If you are a new user, please{" "}
                <button
                type="button"
                onClick={() => {
                    setSelectedRole("");
                    setShowRegister(true);
                }}
                >
                register first
                </button>
            </p>

            <button className="forgot-password">
                Forgot Password?
            </button>

            </div>

        </div>
        )}
       

    {/* Register Popup */}
{showRegister && (
  <div className="login-overlay">

    <div className="register-modal">

      <button
        className="close-login"
        onClick={() => setShowRegister(false)}
      >
        ×
      </button>

      <div className="register-top">
        <img src={hospitalLogo} alt="AI Hospital" />

        <div>
          <h1>Create Account</h1>
          <p>Join AI Hospital</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (
            e.target.password.value !==
            e.target.confirmPassword.value
          ) {
            alert("Passwords do not match");
            return;
          }

          alert("Registration successful!");
          setShowRegister(false);
        }}
      >

        <div className="register-field">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="register-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
        </div>

        <div className="register-field">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile number"
            required
          />
        </div>

        <div className="register-field">
          <label>Account Type</label>
          <select name="role">
            <option>Patient</option>
            <option>Doctor</option>
          </select>
        </div>

        <div className="register-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            required
          />
        </div>

        <div className="register-field">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />
        </div>

        <button
          type="submit"
          className="register-submit"
        >
          Create Account
        </button>

      </form>

      <p className="already-account">
        Already registered?
        <button
          type="button"
          onClick={() => {
            setShowRegister(false);
            setSelectedRole("Patient");
          }}
        >
          Login
        </button>
      </p>

    </div>

  </div>
)}
      {/* Announcement */}
      <div className="announcement">
        <strong>📢 Latest Updates:</strong>
        <span>
          Online appointment booking and digital hospital services are now available.
        </span>
      </div>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="welcome-text">WELCOME TO AI HOSPITAL</p>

          <h1>
            Smart Healthcare
            <br />
            <span>For Everyone</span>
          </h1>

          <p className="hero-description">
            A simple and intelligent hospital management system that connects
            patients, doctors and hospital administration in one place.
          </p>

          <div className="hero-buttons">
            <a href="/login" className="primary-btn">
              Login to Portal
            </a>

            <a href="#services" className="secondary-btn">
              Explore Services
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-icon">🏥</div>
          <h2>AI Hospital</h2>
          <p>Technology • Care • Trust</p>

          <div className="hero-stats">
            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Portals</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Powered</span>
            </div>
          </div>
        </div>
      </section>

          
      {/* Services */}
      <section id="services" className="services-section">
        <div className="section-heading">
          <p>OUR SERVICES</p>
          <h2>Hospital Services</h2>
          <span>
            Easy access to important healthcare and hospital management
            services.
          </span>
        </div>

        <div className="services-grid">

          <div className="service-card">
            <div>👤</div>
            <h3>Patient Portal</h3>
            <p>
              Manage appointments, medical records, prescriptions and bills.
            </p>
          </div>

          <div className="service-card">
            <div>👨‍⚕️</div>
            <h3>Doctor Portal</h3>
            <p>
              Manage appointments and access patient information efficiently.
            </p>
          </div>

          <div className="service-card">
            <div>📅</div>
            <h3>Appointments</h3>
            <p>
              Book and manage hospital appointments easily.
            </p>
          </div>

          <div className="service-card">
            <div>📋</div>
            <h3>Medical Records</h3>
            <p>
              Access important medical records in one place.
            </p>
          </div>

          <div className="service-card">
            <div>💊</div>
            <h3>Prescriptions</h3>
            <p>
              View and manage prescribed medicines and treatments.
            </p>
          </div>

          <div className="service-card">
            <div>🤖</div>
            <h3>AI Assistant</h3>
            <p>
              Get basic healthcare assistance using AI-powered features.
            </p>
          </div>

        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="section-heading">
          <p>WHY AI HOSPITAL?</p>
          <h2>Healthcare Made Simpler</h2>
        </div>

        <div className="why-grid">
          <div>
            <span>⚡</span>
            <h3>Easy to Use</h3>
            <p>Simple interface for patients, doctors and administrators.</p>
          </div>

          <div>
            <span>🔒</span>
            <h3>Secure</h3>
            <p>Hospital information is managed through a secure system.</p>
          </div>

          <div>
            <span>🤖</span>
            <h3>AI Powered</h3>
            <p>Smart features help improve the healthcare experience.</p>
          </div>

          <div>
            <span>📱</span>
            <h3>Accessible</h3>
            <p>Important hospital services available from one platform.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div>
          <p className="section-label">ABOUT THE SYSTEM</p>
          <h2>AI-Powered Smart Hospital Management</h2>
        </div>

        <p>
          AI Hospital is a college project designed to demonstrate how
          modern web technologies can be used to manage hospital services.
          The system provides separate portals for patients, doctors and
          administrators while bringing important hospital information
          together in one platform.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2>Need Help?</h2>
        <p>
          For assistance with appointments, hospital services or your account,
          contact the hospital administration.
        </p>

        <a href="/login" className="primary-btn">
          Access Hospital Portal
        </a>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div>
          <h3>🏥 AI Hospital</h3>
          <p>Smart Healthcare Management System</p>
        </div>

        <p>© 2026 AI Hospital. College Project.</p>
      </footer>

    </div>
  );
}

export default Home;