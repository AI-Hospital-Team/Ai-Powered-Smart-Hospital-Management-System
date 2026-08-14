import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const [loginRole, setLoginRole] = useState("Patient");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Patient",
    password: "",
    confirmPassword: "",
  });

  const openLogin = (role = "Patient") => {
    setLoginRole(role);
    setShowLogin(true);
    setShowLoginMenu(false);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowLoginMenu(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password.");
      return;
    }

    /*
      Demo login.

      Replace this section later with your Spring Boot API call.
    */

    if (loginRole === "Doctor") {
      navigate("/doctor/dashboard");
    } else if (loginRole === "Patient") {
      navigate("/patient/dashboard");
    } else {
      navigate("/dashboard");
    }

    setShowLogin(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration successful.");

    setRegisterData({
      name: "",
      email: "",
      phone: "",
      role: "Patient",
      password: "",
      confirmPassword: "",
    });

    setShowRegister(false);
    setShowLogin(true);
    setLoginRole(registerData.role);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="home-header">

        <div className="hospital-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="AI Hospital Logo"
          />

          <div>
            <h2>AI Smart Hospital</h2>
            <p>Healthcare • Technology • Care</p>
          </div>
        </div>

        <nav>
          <a href="#home">Home</a>

          <a href="#services">Services</a>

          <a href="#departments">Departments</a>

          <a href="#doctors">Doctors</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="login-dropdown">

            <button
              className="login-btn"
              onClick={() => setShowLoginMenu(!showLoginMenu)}
            >
              Login ▾
            </button>

            {showLoginMenu && (
              <div className="login-menu">

                <button onClick={() => openLogin("Patient")}>
                  👤 Patient Login
                </button>

                <button onClick={() => openLogin("Doctor")}>
                  👨‍⚕️ Doctor Login
                </button>

                <button onClick={() => openLogin("Admin")}>
                  🛡️ Admin Login
                </button>

              </div>
            )}

          </div>

          <button
            className="register-btn"
            onClick={openRegister}
          >
            Register
          </button>

        </div>

      </header>


      {/* =====================================================
          EMERGENCY BAR
      ===================================================== */}

      <div className="emergency-bar">

        <span>
          🚨 <strong>Emergency?</strong> Our emergency department is
          available 24/7.
        </span>

        <a href="tel:108">
          Call Emergency: 108
        </a>

      </div>


      {/* =====================================================
          ANNOUNCEMENT
      ===================================================== */}

      <div className="announcement">

        <span>📢</span>

        <span>
          <strong>Important:</strong> Online appointments are now
          available. Book your appointment from anywhere.
        </span>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="hero-section"
        id="home"
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-badge">
            🏥 ADVANCED DIGITAL HEALTHCARE
          </div>

          <p className="welcome-text">
            WELCOME TO AI SMART HOSPITAL
          </p>

          <h1>
            Smarter Healthcare.
            <br />
            <span>Better Care.</span>
          </h1>

          <p className="hero-description">
            Experience modern healthcare powered by artificial
            intelligence, expert doctors, advanced technology and
            patient-focused services.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => openLogin("Patient")}
            >
              📅 Book Appointment
            </button>

            <button
              className="secondary-btn"
              onClick={() => scrollToSection("services")}
            >
              Explore Services →
            </button>

          </div>

          <div className="hero-features">

            <span>✓ 24/7 Emergency</span>

            <span>✓ Expert Doctors</span>

            <span>✓ AI Powered</span>

            <span>✓ Digital Records</span>

          </div>

        </div>


        {/* HERO CARD */}

        <div className="hero-card">

          <div className="hero-card-top">

            <div className="hospital-round-icon">
              🏥
            </div>

            <div>
              <h2>AI Smart Care</h2>
              <p>Technology for better healthcare</p>
            </div>

          </div>

          <div className="hero-medical-image">

            <div className="doctor-circle">
              👨‍⚕️
            </div>

            <div>
              <strong>Expert Medical Team</strong>
              <small>
                Experienced healthcare professionals
              </small>
            </div>

          </div>

          <div className="hero-stats">

            <div>
              <strong>50+</strong>
              <span>Doctors</span>
            </div>

            <div>
              <strong>15+</strong>
              <span>Departments</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="stats-section">

        <div className="stat-box">
          <span>👨‍⚕️</span>
          <strong>50+</strong>
          <p>Expert Doctors</p>
        </div>

        <div className="stat-box">
          <span>🏥</span>
          <strong>15+</strong>
          <p>Departments</p>
        </div>

        <div className="stat-box">
          <span>😊</span>
          <strong>10K+</strong>
          <p>Happy Patients</p>
        </div>

        <div className="stat-box">
          <span>⭐</span>
          <strong>4.9/5</strong>
          <p>Patient Rating</p>
        </div>

      </section>


      {/* =====================================================
          TRUST BAR
      ===================================================== */}

      <section className="trust-bar">

        <div>
          <span>🛡️</span>
          <strong>Secure Medical Records</strong>
          <small>Your information stays protected</small>
        </div>

        <div>
          <span>🤖</span>
          <strong>AI Assisted Healthcare</strong>
          <small>Smart technology for better decisions</small>
        </div>

        <div>
          <span>👨‍⚕️</span>
          <strong>Qualified Doctors</strong>
          <small>Experienced medical professionals</small>
        </div>

        <div>
          <span>📞</span>
          <strong>24/7 Support</strong>
          <small>We are here when you need us</small>
        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="services-section"
        id="services"
      >

        <div className="section-heading">

          <p>OUR SERVICES</p>

          <h2>
            Complete Healthcare Services
          </h2>

          <span>
            Everything you need for convenient,
            modern and reliable healthcare.
          </span>

        </div>


        <div className="services-grid">

          <div className="service-card ai-card">

            <div className="service-icon">
              🤖
            </div>

            <h3>AI Health Assistant</h3>

            <p>
              Get AI-assisted health guidance,
              symptom analysis and smart health
              recommendations.
            </p>

            <a href="#ai">
              Learn More →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              📅
            </div>

            <h3>Online Appointments</h3>

            <p>
              Book appointments with doctors
              quickly without waiting in long queues.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openLogin("Patient");
              }}
            >
              Book Now →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              🩺
            </div>

            <h3>Doctor Consultation</h3>

            <p>
              Consult experienced doctors from
              different medical departments.
            </p>

            <a href="#doctors">
              Find Doctors →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              📋
            </div>

            <h3>Medical Records</h3>

            <p>
              Manage prescriptions, reports and
              medical history digitally.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openLogin("Patient");
              }}
            >
              View Records →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              💊
            </div>

            <h3>Digital Prescriptions</h3>

            <p>
              Access prescriptions and medication
              information from your digital account.
            </p>

            <a href="#contact">
              Learn More →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              🚑
            </div>

            <h3>Emergency Care</h3>

            <p>
              Emergency medical support available
              around the clock.
            </p>

            <a href="tel:108">
              Call 108 →
            </a>

          </div>

        </div>

      </section>


      {/* =========================================================
    HEALTHCARE EXPERIENCE / PHOTO SECTION
   ========================================================= */}

<section className="healthcare-gallery">

  <div className="section-heading">
    <p>MODERN HEALTHCARE EXPERIENCE</p>

    <h2>
      Advanced Care With
      <span> Human Touch</span>
    </h2>

    <span>
      Experience modern healthcare supported by expert doctors,
      advanced technology, comfortable facilities and intelligent
      hospital management.
    </span>
  </div>

  <div className="healthcare-gallery-grid">

    {/* Large Image */}
    <div className="gallery-large">
      <img
        src="https://images.ctfassets.net/kfkw517g6gvn/71kXqZiHb5a9pu6o8HirUW/72b773632f7c2b4a6c5b009922062373/liv42900.jpg"
        alt="Modern hospital consultation"
      />

      <div className="gallery-overlay">
        <div className="gallery-icon">👨‍⚕️</div>

        <div>
          <h3>Expert Medical Consultation</h3>
          <p>Professional doctors focused on patient care.</p>
        </div>
      </div>
    </div>


    {/* Small Image 1 */}
    <div className="gallery-small">
      <img
        src="https://trlshealthcare.com/blog/blog_images/1755607033.jpg"
        alt="Doctor consultation"
      />

      <div className="gallery-caption">
        <strong>Specialist Care</strong>
        <span>Trusted medical professionals</span>
      </div>
    </div>


    {/* Small Image 2 */}
    <div className="gallery-small">
      <img
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85"
        alt="Healthcare technology"
      />

      <div className="gallery-caption">
        <strong>Smart Healthcare</strong>
        <span>Technology-powered patient care</span>
      </div>
    </div>

  </div>


  {/* Feature Cards */}

  <div className="gallery-features">

    <div>
      <span>🏥</span>
      <div>
        <strong>Modern Facilities</strong>
        <small>Comfortable and well-equipped environment</small>
      </div>
    </div>

    <div>
      <span>🩺</span>
      <div>
        <strong>Expert Doctors</strong>
        <small>Experienced specialists for your care</small>
      </div>
    </div>

    <div>
      <span>🤖</span>
      <div>
        <strong>AI-Powered Care</strong>
        <small>Smart technology supporting healthcare</small>
      </div>
    </div>

    <div>
      <span>❤️</span>
      <div>
        <strong>Patient First</strong>
        <small>Care designed around every patient</small>
      </div>
    </div>

  </div>

</section>

      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section
        className="departments-section"
        id="departments"
      >

        <div className="section-heading">

          <p>MEDICAL DEPARTMENTS</p>

          <h2>
            Specialized Care Under One Roof
          </h2>

          <span>
            Our departments provide specialized
            healthcare with modern medical facilities.
          </span>

        </div>


        <div className="departments-grid">

          <div className="department-card">
            <div>❤️</div>
            <h3>Cardiology</h3>
            <p>
              Heart and cardiovascular care.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🧠</div>
            <h3>Neurology</h3>
            <p>
              Brain and nervous system treatment.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🦴</div>
            <h3>Orthopedics</h3>
            <p>
              Bone, joint and muscle care.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>👶</div>
            <h3>Pediatrics</h3>
            <p>
              Specialized healthcare for children.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🩸</div>
            <h3>General Medicine</h3>
            <p>
              Diagnosis and treatment of common diseases.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>👁️</div>
            <h3>Ophthalmology</h3>
            <p>
              Complete eye care and treatment.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🦷</div>
            <h3>Dentistry</h3>
            <p>
              Complete dental healthcare services.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🫁</div>
            <h3>Pulmonology</h3>
            <p>
              Respiratory and lung care.
            </p>
            <span>View Department →</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          DOCTORS
      ===================================================== */}

      <section
        className="doctors-section"
        id="doctors"
      >

        <div className="section-heading">

          <p>OUR DOCTORS</p>

          <h2>
            Meet Our Medical Experts
          </h2>

          <span>
            Skilled professionals dedicated to
            providing quality patient care.
          </span>

        </div>


        <div className="doctors-grid">

          <DoctorCard
            emoji="👨‍⚕️"
            name="Dr. Rajesh Sharma"
            specialty="Cardiologist"
            experience="15+ Years Experience"
            rating="4.9"
          />

          <DoctorCard
            emoji="👩‍⚕️"
            name="Dr. Priya Patil"
            specialty="Neurologist"
            experience="12+ Years Experience"
            rating="4.8"
          />

          <DoctorCard
            emoji="👨‍⚕️"
            name="Dr. Amit Kulkarni"
            specialty="Orthopedic Surgeon"
            experience="10+ Years Experience"
            rating="4.9"
          />

          <DoctorCard
            emoji="👩‍⚕️"
            name="Dr. Neha Deshmukh"
            specialty="Pediatrician"
            experience="9+ Years Experience"
            rating="4.8"
          />

        </div>

      </section>


      {/* =====================================================
          FACILITIES
      ===================================================== */}

      <section className="facilities-section">

        <div className="section-heading">

          <p>OUR FACILITIES</p>

          <h2>
            Modern Healthcare Infrastructure
          </h2>

          <span>
            Advanced facilities designed for patient
            comfort and quality healthcare.
          </span>

        </div>


        <div className="facilities-grid">

          <Facility
            icon="🛏️"
            title="Modern Patient Rooms"
            text="Comfortable and well-equipped patient rooms."
          />

          <Facility
            icon="🔬"
            title="Advanced Laboratory"
            text="Modern diagnostic and testing facilities."
          />

          <Facility
            icon="🩻"
            title="Digital Diagnostics"
            text="Advanced imaging and diagnostic technology."
          />

          <Facility
            icon="🚑"
            title="24/7 Ambulance"
            text="Emergency ambulance support available."
          />

          <Facility
            icon="💊"
            title="Hospital Pharmacy"
            text="Easy access to prescribed medicines."
          />

          <Facility
            icon="🧑‍⚕️"
            title="Nursing Care"
            text="Professional nursing and patient support."
          />

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="why-section">

        <div className="section-heading">

          <p>WHY CHOOSE US</p>

          <h2>
            Healthcare Designed Around You
          </h2>

          <span>
            We combine medical expertise and technology
            to make healthcare simpler.
          </span>

        </div>


        <div className="why-grid">

          <div className="why-card">
            <div>🤖</div>
            <h3>AI Technology</h3>
            <p>
              Smart technology supports doctors and
              improves healthcare workflows.
            </p>
          </div>

          <div className="why-card">
            <div>🔒</div>
            <h3>Data Security</h3>
            <p>
              Patient information is handled with
              security and privacy in mind.
            </p>
          </div>

          <div className="why-card">
            <div>⚡</div>
            <h3>Fast Service</h3>
            <p>
              Quick appointment booking and
              convenient digital services.
            </p>
          </div>

          <div className="why-card">
            <div>❤️</div>
            <h3>Patient First</h3>
            <p>
              Our services are designed around
              patient comfort and care.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <p className="section-label">
            ABOUT AI SMART HOSPITAL
          </p>

          <h2>
            Building the Future of Healthcare
          </h2>

          <p>
            AI Smart Hospital is a modern healthcare
            management platform designed to connect
            patients, doctors and hospital administrators
            through one digital system.
          </p>

          <p>
            Our platform helps manage appointments,
            medical records, prescriptions and other
            healthcare services while using AI-assisted
            features to improve healthcare workflows.
          </p>

          <div className="about-points">

            <span>✓ Patient-focused healthcare</span>

            <span>✓ Digital medical records</span>

            <span>✓ AI-assisted services</span>

            <span>✓ Online appointment management</span>

          </div>

        </div>


        <div className="about-card">

          <div className="about-medical-icon">
            🏥
          </div>

          <h3>
            Smart Healthcare Platform
          </h3>

          <p>
            Connecting healthcare professionals and
            patients through modern digital technology.
          </p>

          <div className="about-stat">

            <strong>24/7</strong>

            <span>
              Digital healthcare access
            </span>

          </div>

          <div className="about-stat">

            <strong>100%</strong>

            <span>
              Patient-focused design
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          AI SECTION
      ===================================================== */}

      <section
        className="ai-section"
        id="ai"
      >

        <div className="ai-content">

          <div className="ai-icon">
            🤖
          </div>

          <div>

            <p className="section-label">
              AI-POWERED HEALTHCARE
            </p>

            <h2>
              Smarter Decisions With AI
            </h2>

            <p>
              Our AI-assisted healthcare features are
              designed to support medical professionals
              and improve the patient experience.
            </p>

            <div className="ai-features">

              <span>✓ Symptom Analysis</span>

              <span>✓ Risk Alerts</span>

              <span>✓ Medical Summary</span>

              <span>✓ Smart Recommendations</span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INFORMATION
      ===================================================== */}

      <section className="information-section">

        <div className="information-card">

          <div className="information-icon">
            🕐
          </div>

          <div>

            <h2>
              Hospital Hours
            </h2>

            <div className="hours-row">
              <span>Monday - Friday</span>
              <strong>24 Hours</strong>
            </div>

            <div className="hours-row">
              <span>Saturday</span>
              <strong>24 Hours</strong>
            </div>

            <div className="hours-row">
              <span>Sunday</span>
              <strong>24 Hours</strong>
            </div>

            <div className="hours-row">
              <span>Emergency</span>
              <strong>24/7</strong>
            </div>

          </div>

        </div>


        <div className="information-card">

          <div className="information-icon">
            📍
          </div>

          <div>

            <h2>
              Hospital Location
            </h2>

            <p className="location-text">
              AI Smart Hospital
              <br />
              Pune, Maharashtra, India
              <br />
              Near Main City Medical Center
            </p>

            <a
              className="map-button"
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
            >
              📍 Open Google Maps
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="testimonials-section">

        <div className="section-heading">

          <p>PATIENT STORIES</p>

          <h2>
            What Our Patients Say
          </h2>

          <span>
            Patient experiences help us improve our
            healthcare services.
          </span>

        </div>


        <div className="testimonial-grid">

          <Testimonial
            text="The online appointment system made it very easy to consult a doctor without waiting in a queue."
            name="Rahul"
            role="Patient"
          />

          <Testimonial
            text="The digital medical records feature is very convenient. I can access my reports whenever I need them."
            name="Sneha"
            role="Patient"
          />

          <Testimonial
            text="The hospital platform provides a clean and simple way to manage healthcare services."
            name="Amit"
            role="Patient"
          />

        </div>

      </section>


      {/* =====================================================
          PARTNERS
      ===================================================== */}

      <section className="partners-section">

        <div className="section-heading">

          <p>OUR TECHNOLOGY PARTNERS</p>

          <h2>
            Powered by Modern Technology
          </h2>

        </div>


        <div className="partners-grid">

          <div>AI Healthcare</div>

          <div>Digital Health</div>

          <div>Cloud Technology</div>

          <div>Secure Systems</div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="contact-icon">
          📞
        </div>

        <p className="section-label">
          NEED HELP?
        </p>

        <h2>
          We Are Here For You
        </h2>

        <p>
          Contact our healthcare support team for
          appointments, general information and
          emergency assistance.
        </p>

        <div className="contact-buttons">

          <a
            href="tel:+912012345678"
            className="contact-btn"
          >
            📞 Call Hospital
          </a>

          <a
            href="mailto:support@aismarthospital.com"
            className="contact-btn"
          >
            ✉️ Email Support
          </a>

          <a
            href="tel:108"
            className="emergency-btn"
          >
            🚨 Emergency 108
          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="home-footer">

        <div className="footer-main">

          <div>

            <div className="footer-logo">

              <img
                src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                alt="Hospital Logo"
              />

              <div>
                <h3>AI Smart Hospital</h3>
                <p>Healthcare • Technology • Care</p>
              </div>

            </div>

            <p className="footer-description">
              A modern healthcare management platform
              connecting patients, doctors and hospitals
              through technology.
            </p>

            <div className="footer-social">
              <span>f</span>
              <span>in</span>
              <span>𝕏</span>
              <span>▶</span>
            </div>

          </div>


          <div className="footer-column">

            <h4>Quick Links</h4>

            <a href="#home">Home</a>

            <a href="#services">Services</a>

            <a href="#departments">Departments</a>

            <a href="#doctors">Doctors</a>

            <a href="#about">About Us</a>

          </div>


          <div className="footer-column">

            <h4>Patient Services</h4>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openLogin("Patient");
              }}
            >
              Book Appointment
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openLogin("Patient");
              }}
            >
              Patient Login
            </a>

            <a href="#services">
              Medical Records
            </a>

            <a href="#services">
              Digital Prescription
            </a>

            <a href="#contact">
              Contact Support
            </a>

          </div>


          <div className="footer-contact">

            <h4>Contact Us</h4>

            <p>
              📍 Pune, Maharashtra, India
            </p>

            <p>
              📞 +91 20 1234 5678
            </p>

            <p>
              ✉️ support@aismarthospital.com
            </p>

            <div className="footer-hours">

              <strong>Emergency Services</strong>

              <span>Available 24 Hours</span>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 AI-Smart Hospital by Prathmesh Panmand & Radhesham Wayal. All Rights Reserved.
          </span>

          <div>

            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#terms">
              Terms & Conditions
            </a>

          </div>

        </div>

      </footer>


      {/* =====================================================
          LOGIN MODAL
      ===================================================== */}

      {showLogin && (

        <div
          className="login-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModals();
            }
          }}
        >

          <div className="hospital-login">

            <button
              className="close-login"
              onClick={closeModals}
            >
              ×
            </button>

            <div className="hospital-login-logo">

              <img
                src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                alt="Hospital Logo"
              />

            </div>

            <h1>
              {loginRole} Login
            </h1>

            <p className="login-subtitle">
              Login to your AI Smart Hospital account
            </p>


            <div className="role-tabs">

              <button
                className={loginRole === "Patient" ? "active" : ""}
                onClick={() => setLoginRole("Patient")}
                type="button"
              >
                Patient
              </button>

              <button
                className={loginRole === "Doctor" ? "active" : ""}
                onClick={() => setLoginRole("Doctor")}
                type="button"
              >
                Doctor
              </button>

              <button
                className={loginRole === "Admin" ? "active" : ""}
                onClick={() => setLoginRole("Admin")}
                type="button"
              >
                Admin
              </button>

            </div>


            <form onSubmit={handleLogin}>

              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
              />


              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
              />


              <button
                type="submit"
                className="hospital-login-button"
              >
                Login as {loginRole}
              </button>

            </form>


            <button
              className="forgot-password"
              type="button"
              onClick={() => alert("Password reset feature will be connected to backend.")}
            >
              Forgot Password?
            </button>


            <p className="register-text">

              Don't have an account?

              <button
                type="button"
                onClick={openRegister}
              >
                Register
              </button>

            </p>

          </div>

        </div>

      )}


      {/* =====================================================
          REGISTER MODAL
      ===================================================== */}

      {showRegister && (

        <div
          className="login-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModals();
            }
          }}
        >

          <div className="register-modal">

            <button
              className="close-login"
              onClick={closeModals}
            >
              ×
            </button>


            <div className="register-top">

              <img
                src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                alt="Hospital Logo"
              />

              <div>

                <h1>
                  Create Account
                </h1>

                <p>
                  Join AI Smart Hospital
                </p>

              </div>

            </div>


            <form onSubmit={handleRegister}>

              <div className="register-field">

                <label htmlFor="register-name">
                  Full Name
                </label>

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Enter your full name"
                />

              </div>


              <div className="register-field">

                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Enter your email"
                />

              </div>


              <div className="register-field">

                <label htmlFor="register-phone">
                  Phone Number
                </label>

                <input
                  id="register-phone"
                  type="tel"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  placeholder="Enter phone number"
                />

              </div>


              <div className="register-field">

                <label htmlFor="register-role">
                  Role
                </label>

                <select
                  id="register-role"
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                >
                  <option value="Patient">
                    Patient
                  </option>

                  <option value="Doctor">
                    Doctor
                  </option>
                </select>

              </div>


              <div className="register-field">

                <label htmlFor="register-password">
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Create password"
                />

              </div>


              <div className="register-field">

                <label htmlFor="register-confirm-password">
                  Confirm Password
                </label>

                <input
                  id="register-confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Confirm password"
                />

              </div>


              <button
                className="register-submit"
                type="submit"
              >
                Create Account
              </button>

            </form>


            <p className="already-account">

              Already have an account?

              <button
                type="button"
                onClick={() => openLogin(registerData.role)}
              >
                Login
              </button>

            </p>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   DOCTOR CARD COMPONENT
   ========================================================= */

function DoctorCard({
  emoji,
  name,
  specialty,
  experience,
  rating,
}) {
  const handleAppointment = () => {
    alert("Please login as a patient to book an appointment.");
  };

  return (
    <div className="doctor-card">

      <div className="doctor-photo">
        {emoji}
      </div>

      <div className="doctor-info">

        <span className="doctor-available">
          ● Available
        </span>

        <h3>{name}</h3>

        <p>{specialty}</p>

        <small>
          {experience}
        </small>

        <div className="doctor-bottom">

          <span>
            ⭐ {rating}
          </span>

          <span>
            🕐 Mon - Sat
          </span>

        </div>

        <button onClick={handleAppointment}>
          Book Appointment
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   FACILITY COMPONENT
   ========================================================= */

function Facility({
  icon,
  title,
  text,
}) {
  return (
    <div className="facility-card">

      <div>
        {icon}
      </div>

      <section>

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </section>

    </div>
  );
}


/* =========================================================
   TESTIMONIAL COMPONENT
   ========================================================= */

function Testimonial({
  text,
  name,
  role,
}) {
  return (
    <div className="testimonial-card">

      <div className="stars">
        ⭐⭐⭐⭐⭐
      </div>

      <p>
        "{text}"
      </p>

      <div className="testimonial-user">

        <div>
          👤
        </div>

        <section>

          <strong>
            {name}
          </strong>

          <small>
            {role}
          </small>

        </section>

      </div>

    </div>
  );
}


export default Home;