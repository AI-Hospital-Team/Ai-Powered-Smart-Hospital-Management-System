import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  useEffect(() => {
  if (window.location.hash !== "#contact") {
    return;
  }

  const timer = setTimeout(() => {
    const contactSection =
      document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 300);

  return () => {
    clearTimeout(timer);
  };
  
}, []);
  const [loginDarkMode, setLoginDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
  const sections = [
    "home",
    "services",
    "departments",
    "doctors",
    "about",
    "contact",
  ];
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 140;

    let currentSection = "home";

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);

      if (section && section.offsetTop <= scrollPosition) {
        currentSection = sectionId;
      }
    });

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  const navigate = useNavigate();
  /* =====================================================
   AI HEALTHCARE CHATBOT
===================================================== */
const [darkMode, setDarkMode] = useState(false);

const toggleTheme = () => {
  setDarkMode((prev) => !prev);
  document.body.classList.toggle("dark-mode");
};

const [showAboutChat, setShowAboutChat] = useState(false);

const [chatMessages, setChatMessages] = useState([
  {
    sender: "bot",
    text:
      "Hello! I’m the AI Healthcare Assistant for AI Smart Hospital. How can I help you?"
  }
]);

const [chatInput, setChatInput] = useState("");

const getChatbotResponse = (question) => {

  const q = question.toLowerCase().trim();


  /* ================= GREETING ================= */

  if (
    q === "hi" ||
    q === "hii" ||
    q === "hello" ||
    q === "hey" ||
    q.includes("good morning") ||
    q.includes("good evening")
  ) {

    return (
      "Hello! Welcome to AI Smart Hospital. I can tell you about our hospital, services, doctors, departments, appointments, Ayushman Bharat, timings, location and project."
    );

  }


  /* ================= WEBSITE ================= */

  if (
    q.includes("what is your web") ||
    q.includes("what is this website") ||
    q.includes("what is your website") ||
    q.includes("website") ||
    q.includes("what is ai smart hospital")
  ) {

    return (
      "AI Smart Hospital is an AI-powered hospital management system designed to connect patients, doctors and hospital administration through one digital platform. It supports appointments, medical records, doctor management, healthcare services and AI-assisted healthcare information."
    );

  }


  /* ================= ABOUT ================= */

  if (
    q.includes("about you") ||
    q.includes("about hospital") ||
    q.includes("tell me about") ||
    q.includes("about your hospital")
  ) {

    return (
      "AI Smart Hospital is a modern healthcare management platform focused on making healthcare more organized, accessible and technology-driven. The platform connects patients, doctors and hospital administration in one system."
    );

  }


  /* ================= SERVICES ================= */

  if (
    q.includes("service") ||
    q.includes("services") ||
    q.includes("what can you do")
  ) {

    return (
      "Our main services include online appointments, doctor consultation, secure medical records, pharmacy support, diagnostic services and AI healthcare assistance."
    );

  }


  /* ================= APPOINTMENT ================= */

  if (
    q.includes("appointment") ||
    q.includes("book doctor") ||
    q.includes("book an appointment")
  ) {

    return (
      "You can book a patient appointment through the Login section. Select Patient Login and continue to your patient dashboard. Our website is designed to make appointment management simple and digital."
    );

  }


  /* ================= DOCTORS ================= */

  if (
    q.includes("doctor") ||
    q.includes("doctors") ||
    q.includes("medical experts")
  ) {

    return (
      "Our website currently presents 4 medical experts: Dr. Rajesh Sharma – Cardiologist, Dr. Priya Mehta – Neurologist, Dr. Amit Patil – Orthopedic Surgeon, and Dr. Sneha Kulkarni – Pediatrician."
    );

  }


  /* ================= DEPARTMENTS ================= */

  if (
    q.includes("department") ||
    q.includes("departments") ||
    q.includes("specialist")
  ) {

    return (
      "Our departments include Cardiology, Neurology, Orthopedics, Pediatrics, Gynecology, Pulmonology, Dermatology and General Medicine."
    );

  }


  /* ================= AYUSHMAN ================= */

  if (
    q.includes("ayushman") ||
    q.includes("pm-jay") ||
    q.includes("pmjay") ||
    q.includes("5 lakh") ||
    q.includes("insurance")
  ) {

    return (
      "Ayushman Bharat PM-JAY provides eligible families with health coverage of up to ₹5 lakh per family per year for eligible secondary and tertiary hospitalization. Eligibility and benefits depend on applicable government rules."
    );

  }


  /* ================= HOSPITAL TIMING ================= */

  if (
    q.includes("timing") ||
    q.includes("time") ||
    q.includes("open") ||
    q.includes("hours") ||
    q.includes("24/7")
  ) {

    return (
      "AI Smart Hospital provides 24-hour hospital support. Emergency services are available 24/7."
    );

  }


  /* ================= LOCATION ================= */

  if (
    q.includes("location") ||
    q.includes("where") ||
    q.includes("address") ||
    q.includes("pune")
  ) {

    return (
      "AI Smart Hospital is located in Pune, Maharashtra, India."
    );

  }


  /* ================= CONTACT ================= */

  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("support")
  ) {

    return (
      "You can contact AI Smart Hospital at +91 99999 99999 or email support@aismarthospital.com. Emergency support is available through 108."
    );

  }


  /* ================= EMERGENCY ================= */

  if (
    q.includes("emergency") ||
    q.includes("ambulance") ||
    q.includes("108")
  ) {

    return (
      "For an emergency, please call 108 immediately. Our website also provides information about 24/7 emergency support."
    );

  }


  /* ================= MEDICAL RECORDS ================= */

  if (
    q.includes("medical record") ||
    q.includes("medical records") ||
    q.includes("reports") ||
    q.includes("prescription")
  ) {

    return (
      "The platform is designed to help patients securely manage medical records, prescriptions and reports through the digital healthcare system."
    );

  }


  /* ================= PHARMACY ================= */

  if (
    q.includes("pharmacy") ||
    q.includes("medicine") ||
    q.includes("medicines")
  ) {

    return (
      "Our platform includes pharmacy support for managing prescriptions and providing information about required medicines."
    );

  }


  /* ================= DIAGNOSTIC ================= */

  if (
    q.includes("diagnostic") ||
    q.includes("laboratory") ||
    q.includes("lab") ||
    q.includes("test")
  ) {

    return (
      "Our platform provides information about diagnostic services and laboratory testing through the hospital network."
    );

  }


  /* ================= AI ================= */

  if (
    q.includes("ai") ||
    q.includes("artificial intelligence") ||
    q.includes("smart healthcare")
  ) {

    return (
      "AI is an important part of our project. The system is designed to support intelligent healthcare tools, healthcare information, risk alerts and better digital healthcare management."
    );

  }


  /* ================= PROJECT ================= */

  if (
    q.includes("project") ||
    q.includes("academic") ||
    q.includes("technology")
  ) {

    return (
      "AI-Powered Smart Hospital Management System is an academic project focused on creating a smarter, organized and technology-driven healthcare platform. It connects patients, doctors and hospital administration."
    );

  }


  /* ================= PATIENT ================= */

  if (
    q.includes("patient") ||
    q.includes("patients")
  ) {

    return (
      "Patients can use the platform to manage appointments, access healthcare services, manage medical information and connect with doctors digitally."
    );

  }


  /* ================= THANK YOU ================= */

  if (
    q.includes("thank") ||
    q.includes("thanks")
  ) {

    return (
      "You’re welcome! I’m always here to help you learn more about AI Smart Hospital."
    );

  }


  /* ================= BYE ================= */

  if (
    q === "bye" ||
    q.includes("goodbye")
  ) {

    return (
      "Goodbye! Thank you for visiting AI Smart Hospital. Take care!"
    );

  }


  /* ================= DEFAULT ================= */

  return (
    "I’m still learning about that. You can ask me about our hospital, services, doctors, departments, appointments, Ayushman Bharat, timings, location, contact information or our project."
  );
};


/* =====================================================
   SEND CHAT MESSAGE
===================================================== */

const sendChatMessage = () => {

  const message = chatInput.trim();

  if (!message) {
    return;
  }


  const userMessage = {
    sender: "user",
    text: message
  };


  const botMessage = {
    sender: "bot",
    text: getChatbotResponse(message)
  };


  setChatMessages((previousMessages) => [
    ...previousMessages,
    userMessage,
    botMessage
  ]);


  setChatInput("");

};


/* =====================================================
   QUICK CHAT QUESTION
===================================================== */

const askChatQuestion = (question) => {

  const userMessage = {
    sender: "user",
    text: question
  };


  const botMessage = {
    sender: "bot",
    text: getChatbotResponse(question)
  };


  setChatMessages((previousMessages) => [
    ...previousMessages,
    userMessage,
    botMessage
  ]);

};


/* =====================================================
   CLEAR CHAT
===================================================== */

const clearChat = () => {

  setChatMessages([
    {
      sender: "bot",
      text:
        "Hello! I’m the AI Healthcare Assistant for AI Smart Hospital. How can I help you?"
    }
  ]);

};
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loginRole, setLoginRole] = useState("Patient");



  

  /* =====================================================
     LOGIN
  ===================================================== */

  const openLogin = (role = "Patient") => {
    setLoginRole(role);
    setLoginOpen(true);
    setRegisterOpen(false);
    setLoginMenuOpen(false);
  };

  /* =====================================================
     REGISTER
  ===================================================== */

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
    setLoginMenuOpen(false);
  };


  return (
    <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>

{/* =====================================================
    MAIN HEADER
===================================================== */}

<header className="main-header">

  <div className="header-container">

    {/* =================================================
        LEFT — BRAND
    ================================================= */}

    <a
      href="#home"
      className="brand"
      onClick={() => setActiveSection("home")}
    >

      <div className="brand-logo">

        <img
          src="/github-logo.jpeg"
          alt="AI Smart Hospital"
        />

      </div>


      <div className="brand-text">

        <h2>
          AI Smart Hospital
        </h2>

        <span>
          Intelligent Healthcare Management
        </span>

      </div>

    </a>


    {/* =================================================
        CENTER — NAVIGATION
    ================================================= */}

    <nav className="main-nav">

      <a
        href="#home"
        className={`nav-link ${
          activeSection === "home" ? "active" : ""
        }`}
        onClick={() => setActiveSection("home")}
      >
        Home
      </a>


      <a
        href="#services"
        className={`nav-link ${
          activeSection === "services" ? "active" : ""
        }`}
        onClick={() => setActiveSection("services")}
      >
        Services
      </a>


      <a
        href="#departments"
        className={`nav-link ${
          activeSection === "departments" ? "active" : ""
        }`}
        onClick={() => setActiveSection("departments")}
      >
        Departments
      </a>


      <a
        href="#doctors"
        className={`nav-link ${
          activeSection === "doctors" ? "active" : ""
        }`}
        onClick={() => setActiveSection("doctors")}
      >
        Doctors
      </a>


      <a
        href="#about"
        className={`nav-link ${
          activeSection === "about" ? "active" : ""
        }`}
        onClick={() => setActiveSection("about")}
      >
        About
      </a>


      <a
        href="#contact"
        className={`nav-link ${
          activeSection === "contact" ? "active" : ""
        }`}
        onClick={() => setActiveSection("contact")}
      >
        Contact
      </a>

    </nav>


    {/* =================================================
        RIGHT — ACTIONS
    ================================================= */}

    <div className="header-actions">


      {/* THEME */}

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={
          darkMode
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        title={
          darkMode
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >

        <span className="theme-icon">

          {darkMode ? "☀️" : "🌙"}

        </span>

      </button>


      {/* LOGIN */}

      <button
        type="button"
        className="login-btn"
        onClick={() => openLogin("Patient")}
      >
        Login
      </button>


      {/* REGISTER */}

      <button
        type="button"
        className="register-btn"
        onClick={openRegister}
      >
        Register
      </button>

    </div>

  </div>

</header>

     
      {/* =====================================================
          ANNOUNCEMENT
      ===================================================== */}

      <div className="announcement">

        <span>🔔</span>

        <span>
          <strong>Smart Healthcare:</strong> Book appointments,
          manage medical records and connect with doctors digitally.
        </span>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section" id="home">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="hero-badge">
            ✨ AI-POWERED SMART HEALTHCARE
          </span>

          <p className="welcome-text">
            WELCOME TO AI SMART HOSPITAL
          </p>

          <h1>
            Better Healthcare.
            <br />
            <span>Smarter Future.</span>
          </h1>

          <p className="hero-description">
            Experience modern healthcare powered by technology,
            intelligent medical systems and compassionate doctors.
            Manage appointments, medical records and healthcare
            services from one secure platform.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => openLogin("Patient")}
            >
              📅 Book Appointment
            </button>

            <a
              href="#services"
              className="secondary-btn"
            >
              Explore Services →
            </a>

          </div>

          <div className="hero-features">

            <span>✓ AI Assisted Healthcare</span>
            <span>✓ Secure Medical Records</span>
            <span>✓ 24/7 Emergency Support</span>

          </div>

        </div>


        {/* HERO CARD */}

        <div className="hero-card">

          <div className="hero-card-top">

            <div className="hospital-round-icon">
              🏥
            </div>

            <div>
              <h2>Smart Care</h2>
              <p>Technology + Human Care</p>
            </div>

          </div>

          <div className="hero-medical-image">

            <div className="doctor-circle">
              👨‍⚕️
            </div>

            <div>
              <strong>Expert Doctors</strong>
              <small>Available for you</small>
            </div>

          </div>

          <div className="hero-stats">

            <div>
              <strong>24/7</strong>
              <span>Emergency</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Doctors</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Patients</span>
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
          <span>❤️</span>
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
          SERVICES
      ===================================================== */}

      <section className="services-section" id="services">

        <div className="section-heading">

          <p>OUR SERVICES</p>

          <h2>
            Complete Healthcare
            <br />
            Under One Platform
          </h2>

          <span>
            Access essential healthcare services through our
            intelligent hospital management system.
          </span>

        </div>


        <div className="services-grid">

          <div className="service-card">

            <div className="service-icon">
              📅
            </div>

            <h3>Online Appointments</h3>

            <p>
              Book appointments with doctors according to your
              preferred date and time.
            </p>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                openLogin("Patient");
              }}
            >
              Book Appointment →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              🩺
            </div>

            <h3>Doctor Consultation</h3>

            <p>
              Connect with qualified doctors and receive
              professional medical guidance.
            </p>

            <a href="#doctors">
              Find Doctor →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              📋
            </div>

            <h3>Medical Records</h3>

            <p>
              Securely manage prescriptions, reports and
              important medical records.
            </p>

            <a
              href="#contact"
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

            <h3>Pharmacy Support</h3>

            <p>
              Manage prescriptions and get information about
              required medicines.
            </p>

            <a href="#contact">
              Learn More →
            </a>

          </div>


          <div className="service-card">

            <div className="service-icon">
              🧪
            </div>

            <h3>Diagnostic Services</h3>

            <p>
              Access laboratory testing and diagnostic services
              through our hospital network.
            </p>

            <a href="#contact">
              Explore →
            </a>

          </div>


          <div className="service-card ai-card">

            <div className="service-icon">
              🤖
            </div>

            <h3>AI Healthcare</h3>

            <p>
              Use intelligent healthcare tools for symptom
              analysis, risk alerts and medical information.
            </p>

            <a
              href="#ai-healthcare"
              onClick={(e) => {
                e.preventDefault();
                navigate("/ai-health-assistant");
              }}
            >
              Explore AI →
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          HEALTHCARE GALLERY
      ===================================================== */}

      <section className="healthcare-gallery">

        <div className="section-heading">

          <p>MODERN HEALTHCARE</p>

          <h2>
            Healthcare Designed
            <span> Around You</span>
          </h2>

          <span>
            Modern infrastructure, expert professionals and
            technology working together.
          </span>

        </div>


        <div className="healthcare-gallery-grid">

          <div className="gallery-large">

            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80"
              alt="Modern Hospital"
            />

            <div className="gallery-overlay">

              <div className="gallery-icon">
                🏥
              </div>

              <div>
                <h3>Modern Hospital Infrastructure</h3>
                <p>
                  Designed for safe and comfortable patient care.
                </p>
              </div>

            </div>

          </div>


          <div className="gallery-small">

            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80"
              alt="Medical Team"
            />

            <div className="gallery-caption">
              <strong>Expert Medical Team</strong>
              <span>Experienced healthcare professionals</span>
            </div>

          </div>


          <div className="gallery-small">

            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80"
              alt="Healthcare Technology"
            />

            <div className="gallery-caption">
              <strong>Smart Healthcare Technology</strong>
              <span>Technology-enabled medical services</span>
            </div>

          </div>

        </div>


        <div className="gallery-features">

          <div>
            <span>🧑‍⚕️</span>
            <div>
              <strong>Qualified Staff</strong>
              <small>Experienced medical professionals</small>
            </div>
          </div>

          <div>
            <span>🛡️</span>
            <div>
              <strong>Patient Safety</strong>
              <small>Safety-focused healthcare environment</small>
            </div>
          </div>

          <div>
            <span>💻</span>
            <div>
              <strong>Digital Healthcare</strong>
              <small>Smart and connected medical services</small>
            </div>
          </div>

          <div>
            <span>❤️</span>
            <div>
              <strong>Patient First</strong>
              <small>Care focused on patient needs</small>
            </div>
          </div>

        </div>

      </section>

<section className="insurance-section" id="insurance">

  <div className="insurance-layout">

    {/* ================= LEFT ================= */}
    <div className="insurance-content">

      <div className="insurance-title-row">

        <div>
          <div className="section-label">
            AYUSHMAN BHARAT • HEALTHCARE SUPPORT
          </div>

          <h2>
            Get Free Healthcare
            <br />
            Treatment Up To ₹5 Lakh
          </h2>
        </div>

      </div>


      <p className="insurance-description">
        Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)
        provides eligible families with health coverage of up to ₹5 lakh
        per family per year for eligible secondary and tertiary
        hospitalization.
      </p>


      <div className="insurance-features">

        <div>
          <span>✓</span>
          Up to ₹5 Lakh Coverage
        </div>

        <div>
          <span>✓</span>
          Cashless Hospitalization
        </div>

        <div>
          <span>✓</span>
          Eligible Family Members
        </div>

        <div>
          <span>✓</span>
          Hospital Treatment Support
        </div>

      </div>
    </div>


    {/* ================= RIGHT ================= */}
    <div className="ayushman-right">

      <div className="ayushman-image-wrap">

        <img
          src="/ayushman.png"
          alt="Ayushman Bharat"
          className="ayushman-main-image"
        />

      </div>


      {/* CARD BELOW IMAGE */}
      <div className="ayushman-info-card">

        <div className="ayushman-info-content">

          <span className="ayushman-mini-label">
            GOVERNMENT HEALTHCARE SCHEME
          </span>

          <h3>
            Ayushman Bharat
          </h3>

          <p>
             Benefits and eligibility depend on applicable government
        scheme rules and beneficiary eligibility. * The Official Government Portal.
          </p>

        

        </div>


        <a
          href="https://beneficiary.nha.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="insurance-btn card-btn"
        >
          🪪 Check Details →
        </a>

      </div>

    </div>

  </div>

</section>

      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section className="departments-section" id="departments">

        <div className="section-heading">

          <p>OUR DEPARTMENTS</p>

          <h2>
            Specialized Medical Care
          </h2>

          <span>
            Professional care across multiple medical specialties.
          </span>

        </div>


        <div className="departments-grid">

          <div className="department-card">
            <div>❤️</div>
            <h3>Cardiology</h3>
            <p>
              Diagnosis and treatment of heart-related conditions.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🧠</div>
            <h3>Neurology</h3>
            <p>
              Specialized treatment for neurological disorders.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🦴</div>
            <h3>Orthopedics</h3>
            <p>
              Bone, joint and musculoskeletal healthcare.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>👶</div>
            <h3>Pediatrics</h3>
            <p>
              Healthcare services focused on children.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>👩</div>
            <h3>Gynecology</h3>
            <p>
              Comprehensive women's healthcare services.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🫁</div>
            <h3>Pulmonology</h3>
            <p>
              Diagnosis and management of respiratory conditions.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🧴</div>
            <h3>Dermatology</h3>
            <p>
              Medical care for skin, hair and nail conditions.
            </p>
            <span>View Department →</span>
          </div>

          <div className="department-card">
            <div>🩺</div>
            <h3>General Medicine</h3>
            <p>
              Primary diagnosis and comprehensive medical care.
            </p>
            <span>View Department →</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          DOCTORS
      ===================================================== */}

      <section className="doctors-section" id="doctors">

        <div className="section-heading">

          <p>OUR DOCTORS</p>

          <h2>
            Meet Our Medical Experts
          </h2>

          <span>
            Experienced healthcare professionals committed to
            quality patient care.
          </span>

        </div>


        <div className="doctors-grid">

          <div className="doctor-card">

            <div className="doctor-photo">
              👨‍⚕️
            </div>

            <div className="doctor-info">

              <span className="doctor-available">
                ● AVAILABLE TODAY
              </span>

              <h3>Dr. Rajesh Sharma</h3>

              <p>Cardiologist</p>

              <small>
                12+ years of experience in cardiovascular care.
              </small>

              <div className="doctor-bottom">
                <span>★★★★★</span>
                <span>12+ Years</span>
              </div>

              <button onClick={() => openLogin("Patient")}>
                Book Appointment
              </button>

            </div>

          </div>


          <div className="doctor-card">

            <div className="doctor-photo">
              👩‍⚕️
            </div>

            <div className="doctor-info">

              <span className="doctor-available">
                ● AVAILABLE TODAY
              </span>

              <h3>Dr. Priya Mehta</h3>

              <p>Neurologist</p>

              <small>
                Specialist in neurological diagnosis and treatment.
              </small>

              <div className="doctor-bottom">
                <span>★★★★★</span>
                <span>10+ Years</span>
              </div>

              <button onClick={() => openLogin("Patient")}>
                Book Appointment
              </button>

            </div>

          </div>


          <div className="doctor-card">

            <div className="doctor-photo">
              👨‍⚕️
            </div>

            <div className="doctor-info">

              <span className="doctor-available">
                ● AVAILABLE TODAY
              </span>

              <h3>Dr. Amit Patil</h3>

              <p>Orthopedic Surgeon</p>

              <small>
                Expert in bone, joint and musculoskeletal care.
              </small>

              <div className="doctor-bottom">
                <span>★★★★★</span>
                <span>11+ Years</span>
              </div>

              <button onClick={() => openLogin("Patient")}>
                Book Appointment
              </button>

            </div>

          </div>


          <div className="doctor-card">

            <div className="doctor-photo">
              👩‍⚕️
            </div>

            <div className="doctor-info">

              <span className="doctor-available">
                ● AVAILABLE TODAY
              </span>

              <h3>Dr. Sneha Kulkarni</h3>

              <p>Pediatrician</p>

              <small>
                Dedicated to children's healthcare and wellbeing.
              </small>

              <div className="doctor-bottom">
                <span>★★★★★</span>
                <span>9+ Years</span>
              </div>

              <button onClick={() => openLogin("Patient")}>
                Book Appointment
              </button>

            </div>

          </div>

        </div>

      </section>

{/* =====================================================
    ABOUT AI SMART HOSPITAL
===================================================== */}

<section className="about-section" id="about">

  <div className="about-container">


    {/* =================================================
        SECTION HEADING
    ================================================= */}

    <div className="about-heading">

      <span className="about-badge">
        AI POWERED HEALTHCARE
      </span>

      <h2>
        About <span>AI Smart Hospital</span>
      </h2>

      <p>
        A smarter digital healthcare platform connecting
        patients, doctors and hospital administration.
      </p>

    </div>


    {/* =================================================
        MAIN ABOUT CONTENT
    ================================================= */}

    <div className="about-main">


      {/* =================================================
          LEFT INFORMATION
      ================================================= */}

      <div className="about-information">

        <p className="about-small-title">
          OUR VISION
        </p>

        <h3>
          Building a smarter
          <span> future of healthcare.</span>
        </h3>

        <p className="about-text">

          AI Smart Hospital is a modern hospital management
          platform designed to connect patients, doctors and
          hospital administrators through one intelligent
          digital system.

        </p>

        <p className="about-text">

          Our goal is to simplify healthcare management,
          improve accessibility and use technology to support
          better medical decisions.

        </p>


        {/* FEATURES */}

        <div className="about-feature-list">

          <div className="about-feature-item">

            <span className="feature-check">
              ✓
            </span>

            <div>
              <strong>
                Digital Appointment Management
              </strong>

              <small>
                Easy and organized appointment booking
              </small>
            </div>

          </div>


          <div className="about-feature-item">

            <span className="feature-check">
              ✓
            </span>

            <div>
              <strong>
                Secure Medical Records
              </strong>

              <small>
                Manage important healthcare information
              </small>
            </div>

          </div>


          <div className="about-feature-item">

            <span className="feature-check">
              ✓
            </span>

            <div>
              <strong>
                Doctor Management
              </strong>

              <small>
                Connect patients with medical professionals
              </small>
            </div>

          </div>


          <div className="about-feature-item">

            <span className="feature-check">
              ✓
            </span>

            <div>
              <strong>
                AI Healthcare Assistance
              </strong>

              <small>
                Intelligent healthcare information support
              </small>
            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          RIGHT PLATFORM CARD
      ================================================= */}

      <div className="about-platform-card">


        <div className="platform-top">

          <div className="ai-symbol">
            AI
          </div>

          <div>

            <span>
              INTELLIGENT PLATFORM
            </span>

            <h3>
              Smart Healthcare
            </h3>

          </div>

        </div>


        <p className="platform-description">

          One connected platform for patients, doctors and
          hospital administration.

        </p>


        <div className="platform-divider"></div>


        <div className="platform-stat">

          <strong>
            50+
          </strong>

          <span>
            Medical Professionals
          </span>

        </div>


        <div className="platform-stat">

          <strong>
            15+
          </strong>

          <span>
            Medical Departments
          </span>

        </div>


        <div className="platform-stat">

          <strong>
            10K+
          </strong>

          <span>
            Patients
          </span>

        </div>


        <div className="platform-stat">

          <strong>
            24/7
          </strong>

          <span>
            Emergency Support
          </span>

        </div>


        <div className="platform-status">

          <span></span>

          Healthcare Platform Online

        </div>

      </div>

    </div>


    {/* =================================================
        AI CHATBOT AREA
    ================================================= */}

    <div className="about-chat-area">


      {/* =================================================
          CHATBOT INTRO
      ================================================= */}

      <div className="chat-intro">

        <div className="chat-ai-icon">
          AI
        </div>

        <div>

          <span>
            AI HEALTHCARE ASSISTANT
          </span>

          <h3>
            Have a question?
          </h3>

          <p>
            Ask our assistant about AI Smart Hospital,
            services, doctors, departments and more.
          </p>

        </div>

      </div>


      {/* =================================================
          CHATBOT
      ================================================= */}

      <div className="ai-chatbot">


        {/* CHAT HEADER */}

        <div className="ai-chat-header">

          <div className="ai-chat-profile">

            <div className="chat-ai-logo">
              AI
            </div>

            <div>

              <strong>
                AI Healthcare Assistant
              </strong>

              <span>
                Online • Smart Hospital Support
              </span>

            </div>

          </div>


          <button
            type="button"
            className="chat-clear-button"
            onClick={clearChat}
            title="Clear chat"
          >
            Clear
          </button>

        </div>


        {/* =================================================
            CHAT BODY
        ================================================= */}

        <div className="ai-chat-body">

          {chatMessages.map((message, index) => (

            <div
              key={index}
              className={
                message.sender === "user"
                  ? "chat-message user-message"
                  : "chat-message bot-message"
              }
            >

              {message.sender === "bot" && (
                <div className="message-ai-icon">
                  AI
                </div>
              )}

              <div className="message-content">

                <span className="message-sender">

                  {message.sender === "user"
                    ? "You"
                    : "AI Assistant"}

                </span>

                <p>
                  {message.text}
                </p>

              </div>

            </div>

          ))}

        </div>


        {/* =================================================
            QUICK QUESTIONS
        ================================================= */}

        <div className="chat-quick-section">

          <span>
            Try asking
          </span>

          <div className="chat-quick-buttons">

            <button
              type="button"
              onClick={() =>
                askChatQuestion("What is your website?")
              }
            >
              What is your website?
            </button>

            <button
              type="button"
              onClick={() =>
                askChatQuestion("What services do you provide?")
              }
            >
              Our services
            </button>

            <button
              type="button"
              onClick={() =>
                askChatQuestion("Who are your doctors?")
              }
            >
              Doctors
            </button>

            <button
              type="button"
              onClick={() =>
                askChatQuestion("Tell me about Ayushman Bharat")
              }
            >
              Ayushman Bharat
            </button>

          </div>

        </div>


        {/* =================================================
            CHAT INPUT
        ================================================= */}

        <div className="ai-chat-input-area">

          <input
            type="text"
            value={chatInput}
            placeholder="Type your question..."
            onChange={(e) =>
              setChatInput(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                sendChatMessage();
              }

            }}
          />

          <button
            type="button"
            onClick={sendChatMessage}
            disabled={!chatInput.trim()}
          >
            Send
          </button>

        </div>


        {/* FOOTER */}

        <div className="ai-chat-footer">

          AI Smart Hospital • Healthcare Information Assistant

        </div>

      </div>

    </div>

  </div>

</section>

{/* =====================================================
    AI HEALTH ASSISTANT — REDIRECT CARD
===================================================== */}

<section className="home-ai-section" id="ai-healthcare">

  <div className="home-ai-content">

    <span className="home-ai-label">
      🤖 AI HEALTHCARE
    </span>

    <h2>
      Smart Healthcare,
      <br />
      Powered by AI
    </h2>

    <p>
      Get general health guidance from our AI Health
      Assistant. Describe your symptoms and receive
      helpful information instantly.
    </p>

    <button
      type="button"
      className="home-ai-button"
      onClick={() => navigate("/ai-health-assistant")}
    >
      🤖 Open AI Health Assistant →
    </button>

  </div>


  <button
    type="button"
    className="home-ai-card"
    onClick={() => navigate("/ai-health-assistant")}
  >

    <div className="home-ai-image">

      <div className="ai-glow-circle">
        🤖
      </div>

      <div className="ai-floating-card">
        <span>AI Assistant</span>
        <strong>Online</strong>
      </div>

    </div>

    <div className="home-ai-card-content">

      <span>
        AI HEALTH ASSISTANT
      </span>

      <h3>
        Your Smart Healthcare Helper
      </h3>

      <p>
        Click here to describe your symptoms
        and get AI-powered general health guidance.
      </p>

      <strong>
        Try AI Assistant →
      </strong>

    </div>

  </button>

</section>

     {/* =====================================================
    HOSPITAL INFO
===================================================== */}

<section className="hospital-info-section">

  <div className="hospital-info-container">

    {/* Hospital Hours */}
    <div className="hospital-info-card hours-card">

      <div className="info-card-top">
        <div className="info-icon">◷</div>

        <div>
          <span className="info-label">HOSPITAL AVAILABILITY</span>
          <h2>Hospital Hours</h2>
        </div>
      </div>

      <p className="info-description">
        Our hospital is available around the clock to provide
        reliable healthcare support whenever you need it.
      </p>

      <div className="hours-list">

        <div className="hours-row">
          <span>Monday – Friday</span>
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

        <div className="hours-row emergency-row">
          <span>
            <i></i>
            Emergency Care
          </span>

          <strong>24 / 7</strong>
        </div>

      </div>

      <div className="availability-status">
        <span className="status-dot"></span>
        Hospital currently available
      </div>

    </div>


    {/* Hospital Location */}
    <div className="hospital-info-card location-card">

      <div className="info-card-top">

        <div className="info-icon location-icon">
          +
        </div>

        <div>
          <span className="info-label">FIND OUR HOSPITAL</span>
          <h2>Hospital Location</h2>
        </div>

      </div>

      <div className="location-content">

        <div className="location-pin">
          +
        </div>

        <div>
          <h3>AI Smart Hospital</h3>

          <p>
            Pune, Maharashtra, India
          </p>

          <span>
            Easily accessible healthcare services for
            patients, families and visitors.
          </span>
        </div>

      </div>

      <div className="location-actions">

        <button
          className="map-button"
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/?api=1&query=Pune,Maharashtra,India",
              "_blank"
            )
          }
        >
          Open Google Maps →
        </button>

        <span className="distance-text">
          
        </span>

      </div>

    </div>

  </div>

</section>

{/* =====================================================
    CONTACT / SUPPORT CTA
===================================================== */}

<section className="support-section" id="contact">

  <div className="support-container">

    <div className="support-heading">

      <span className="support-label">
        PATIENT SUPPORT
      </span>

      <h2>
        We're Here <span>To Help</span>
      </h2>

      <p>
        Have questions about appointments, doctors, or healthcare
        services? Our support team is ready to assist you.
      </p>

    </div>


    <div className="support-options">

      {/* CALL */}
      <div className="support-card">

        <div className="support-icon phone-icon">
          ☎
        </div>

        <div className="support-card-content">

          <span className="support-small">
            TALK TO US
          </span>

          <h3>Call Hospital</h3>

          <p>
            Speak directly with our hospital support team.
          </p>

          <a
            href="tel:+91999999999"
            className="support-button"
          >
            Call Hospital →
          </a>

        </div>

      </div>


      {/* EMAIL */}
      <div className="support-card">

        <div className="support-icon email-icon">
          ✉
        </div>

        <div className="support-card-content">

          <span className="support-small">
            GET IN TOUCH
          </span>

          <h3>Email Support</h3>

          <p>
            Send us your questions and we'll get back to you.
          </p>

          <a
            href="mailto:support@aihospital.com"
            className="support-button"
          >
            Email Support →
          </a>

        </div>

      </div>


      {/* EMERGENCY */}
      <div className="support-card emergency-card">

        <div className="emergency-glow"></div>

        <div className="support-icon emergency-icon">
          !
        </div>

        <div className="support-card-content">

          <span className="support-small">
            EMERGENCY SERVICES
          </span>

          <h3>Emergency 108</h3>

          <p>
            For urgent medical emergencies, get immediate
            assistance.
          </p>

          <a
            href="tel:108"
            className="emergency-button"
          >
            Call 108 →
          </a>

        </div>

      </div>

    </div>


    <div className="support-footer">

      <span className="online-dot"></span>

      <span>
        AI Smart Hospital Support is available 24/7
      </span>

    </div>

  </div>

</section>
     
    {/* =====================================================
    FOOTER
===================================================== */}

<footer className="home-footer">

  <div className="footer-main">

    {/* BRAND */}
    <div className="footer-brand">

      <div className="footer-logo">

        <div className="logo-symbol">
          +
        </div>

        <div>
          <h3>AI Smart Hospital</h3>
          <p>Intelligent Healthcare Management</p>
        </div>

      </div>

      <p className="footer-description">
        A modern healthcare management platform connecting
        patients, doctors and hospital services through one
        intelligent digital system.
      </p>

      <div className="footer-status">
        <span></span>
        AI Healthcare System Online
      </div>

      <div className="footer-social">

        <a href="#home" aria-label="Facebook">f</a>
        <a href="#home" aria-label="LinkedIn">in</a>
        <a href="#home" aria-label="X">X</a>
        <a href="#home" aria-label="YouTube">▶</a>

      </div>

    </div>


    {/* QUICK LINKS */}
    <div className="footer-column">

      <h4>Explore</h4>

      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#departments">Departments</a>
      <a href="#doctors">Doctors</a>
      <a href="#about">About Us</a>

    </div>


    {/* PATIENT SERVICES */}
    <div className="footer-column">

      <h4>Patient Care</h4>

      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          openLogin("Patient");
        }}
      >
        Book Appointment
      </a>

      <a href="#services">
        Medical Records
      </a>

      <a href="#ayushman">
        Ayushman Bharat
      </a>

      <a href="#contact">
        Contact Support
      </a>

    </div>


    {/* CONTACT */}
    <div className="footer-contact">

      <h4>Get In Touch</h4>

      <div className="footer-contact-item">
        <span>⌖</span>
        <p>
          Pune, Maharashtra,<br />
          India
        </p>
      </div>

      <div className="footer-contact-item">
        <span>☎</span>
        <a href="tel:+919999999999">
          +91 99999 99999
        </a>
      </div>

      <div className="footer-contact-item">
        <span>✉</span>
        <a href="mailto:support@aismarthospital.com">
          support@aismarthospital.com
        </a>
      </div>


      <a
        href="tel:108"
        className="footer-emergency"
      >

        <div className="emergency-icon">
          !
        </div>

        <div>
          <strong>Emergency Support</strong>

          <span>
            Call 108 • Available 24/7
          </span>
        </div>

        <b>→</b>

      </a>

    </div>

  </div>


  {/* =====================================================
    OUR PROJECT
===================================================== */}

<div className="footer-project">

  <div className="project-left">

    <span className="project-badge">
      OUR PROJECT
    </span>

    <h3>
      AI-Powered Smart Hospital
      <span> Management System</span>
    </h3>

    <p>
      A modern academic project focused on smarter,
      organized and technology-driven healthcare.
    </p>

  </div>


  <div className="project-actions">

    {/* Change these URLs if your page routes have different names */}

    <a href="/about">
      <span>About Us</span>
      <b>→</b>
    </a>

    <a href="/project">
      <span>Project Details</span>
      <b>→</b>
    </a>

  </div>

</div>

  {/* =====================================================
    FOOTER BOTTOM
===================================================== */}

<div className="footer-bottom">

  <div className="footer-credit">

    <p>
      © 2026 <strong>AI Smart Hospital</strong>
    </p>

    <span>
      Academic Project • TY BCA • Healthcare Technology
    </span>

  </div>


  <div className="footer-creators">

    <span>Created by</span>

    <strong>Prathmesh Panmand</strong>

    <span>&</span>

    <strong>Radheshyam Wayal</strong>

  </div>


  <div className="footer-legal">

    <a href="#home">Privacy</a>
    <a href="#home">Terms</a>
    <a href="#home">Security</a>

  </div>

</div>

</footer>

{/* =====================================================
    LOGIN MODAL
===================================================== */}

{loginOpen && (

  <div
    className="login-overlay"
    onClick={() => setLoginOpen(false)}
  >

    <div
      className={`hospital-login ${
        loginDarkMode ? "login-dark-mode" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >

      {/* LOGIN-ONLY THEME BUTTON */}
      <button
        type="button"
        className="login-theme-toggle"
        onClick={() =>
          setLoginDarkMode((prev) => !prev)
        }
        aria-label={
          loginDarkMode
            ? "Switch login to light mode"
            : "Switch login to dark mode"
        }
      >
        {loginDarkMode ? "☀️" : "🌙"}
      </button>

      {/* CLOSE */}
      <button
        type="button"
        className="close-login"
        onClick={() => setLoginOpen(false)}
      >
        ×
      </button>

      {/* LOGO */}
      <div className="hospital-login-logo">
        <img
          src="/github-logo.jpeg"
          alt="AI Smart Hospital"
          className="login-hospital-logo"
        />
      </div>

      {/* TITLE */}
      <h1>
        {loginRole} Login
      </h1>

      <p className="login-subtitle">
        Login to AI Smart Hospital
      </p>

      {/* ROLE TABS */}
      <div className="role-tabs">

        <button
          type="button"
          className={
            loginRole === "Patient"
              ? "active"
              : ""
          }
          onClick={() =>
            setLoginRole("Patient")
          }
        >
          Patient
        </button>

        <button
          type="button"
          className={
            loginRole === "Doctor"
              ? "active"
              : ""
          }
          onClick={() =>
            setLoginRole("Doctor")
          }
        >
          Doctor
        </button>

        <button
          type="button"
          className={
            loginRole === "Admin"
              ? "active"
              : ""
          }
          onClick={() =>
            setLoginRole("Admin")
          }
        >
          Admin
        </button>

      </div>

      {/* LOGIN FORM */}
      <form
        onSubmit={async (e) => {

          e.preventDefault();

          setErrorMessage("");

          const formData =
            new FormData(e.currentTarget);

          const email =
            formData.get("email");

          const password =
            formData.get("password");

          if (!email || !password) {
            setErrorMessage(
              "Please enter email and password."
            );
            return;
          }

          try {

            const response =
              await fetch(
                "http://localhost:8080/api/auth/login",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    email: email.trim(),
                    password: password,
                    role: loginRole,
                  }),
                }
              );

            if (!response.ok) {

              await response.text();

              setErrorMessage(
                "Invalid email or password."
              );

              return;
            }

            const user =
              await response.json();

            localStorage.clear();

            localStorage.setItem(
              "isLoggedIn",
              "true"
            );

            localStorage.setItem(
              "role",
              user.role
            );

            localStorage.setItem(
              "user",
              JSON.stringify(user)
            );

            setLoginOpen(false);

            if (user.role === "Admin") {

              navigate("/dashboard", {
                replace: true,
              });

            } else if (
              user.role === "Doctor"
            ) {

              navigate("/doctor", {
                replace: true,
              });

            } else if (
              user.role === "Patient"
            ) {

              navigate("/patient", {
                replace: true,
              });

            }

          } catch (error) {

            console.error(
              "Login error:",
              error
            );

            setErrorMessage(
              "Unable to connect to the hospital server."
            );
          }
        }}
      >

        <label htmlFor="login-email">
          Email / Username
        </label>

        <input
          id="login-email"
          type="email"
          name="email"
          placeholder="Enter email or username"
          required
        />

        <label htmlFor="login-password">
          Password
        </label>

        <input
          id="login-password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />

        <button
          type="submit"
          className="hospital-login-button"
        >
          Login as {loginRole}
        </button>

      </form>

      {/* ERROR */}
      {errorMessage && (
        <div className="login-error">
          ⚠️ {errorMessage}
        </div>
      )}

    </div>

  </div>

)}
      
    {/* =====================================================
    REGISTER MODAL
===================================================== */}

{registerOpen && (
  <div
    className="login-overlay"
    onClick={() => setRegisterOpen(false)}
  >

    <div
      className="register-modal"
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE */}
      <button
        className="close-login"
        onClick={() => setRegisterOpen(false)}
      >
        ×
      </button>


      {/* HEADER */}
      <div className="register-top">

        <div className="large-logo">
          🏥
        </div>

        <div>
          <h1>Create Account</h1>
          <p>Join AI Smart Hospital</p>
        </div>

      </div>


          {/* REGISTER FORM — now calls the backend register API */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          setRegisterError("");
          setRegisterSuccess("");

          const formData = new FormData(e.currentTarget);

          const fullName = formData.get("fullName")?.trim();
          const email = formData.get("email")?.trim();
          const mobile = formData.get("mobile")?.trim();
          const dob = formData.get("dob");
          const gender = formData.get("gender");

          // Full Name
          if (!/^[A-Za-z ]{2,50}$/.test(fullName)) {
            setRegisterError(
              "Please enter a valid full name using letters only."
            );
            return;
          }

          // Email
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setRegisterError("Please enter a valid email address.");
            return;
          }

          // Mobile
          if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            setRegisterError(
              "Mobile number must be exactly 10 digits and start with 6-9."
            );
            return;
          }

          // DOB
          if (!dob) {
            setRegisterError("Please select your date of birth.");
            return;
          }

          const selectedDate = new Date(dob);
          const today = new Date();

          if (selectedDate > today) {
            setRegisterError("Date of birth cannot be in the future.");
            return;
          }

          // Gender
          if (!gender) {
            setRegisterError("Please select your gender.");
            return;
          }

          // Password
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
              registerPassword
            )
          ) {
            setRegisterError(
              "Password must contain 8+ characters, uppercase, lowercase and a number."
            );
            return;
          }

          // Confirm Password
          if (registerPassword !== confirmPassword) {
            setRegisterError("Passwords do not match.");
            return;
          }

          try {
            const response = await fetch(
              "http://localhost:8080/api/auth/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fullName: fullName,
                  email: email,
                  mobile: mobile,
                  dob: dob,
                  gender: gender,
                  password: registerPassword,
                  role: "Patient",
                }),
              }
            );

            if (!response.ok) {
              const message = await response.text();

              setRegisterError(
                message || "Registration failed."
              );

              return;
            }

            setRegisterSuccess(
              "Account created successfully. Please login."
            );

            e.currentTarget.reset();

            setRegisterPassword("");
            setConfirmPassword("");

            setTimeout(() => {
              setRegisterSuccess("");
              setRegisterOpen(false);
              openLogin("Patient");
            }, 1500);

          } catch (error) {
            console.error("Registration error:", error);

            setRegisterError(
              "Unable to connect to the hospital server."
            );
          }
        }}
      >


        {/* ================= FULL NAME ================= */}

        <div className="register-field">

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            maxLength="50"
            required
          />

        </div>


        {/* ================= EMAIL ================= */}

        <div className="register-field">

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
          />

        </div>


        {/* ================= MOBILE ================= */}

        <div className="register-field">

          <label>
            Mobile Number
          </label>

          <div className="mobile-input">

            <span>
              +91
            </span>

            <input
              type="tel"
              name="mobile"
              placeholder="10-digit mobile number"
              inputMode="numeric"
              maxLength="10"
              pattern="[6-9][0-9]{9}"
              onInput={(e) => {
                e.target.value =
                  e.target.value.replace(/\D/g, "");
              }}
              required
            />

          </div>

        </div>


        {/* ================= DATE OF BIRTH ================= */}

        <div className="register-field">

          <label>
            Date of Birth
          </label>

          <input
            type="date"
            name="dob"
            max={new Date().toISOString().split("T")[0]}
            required
          />

        </div>


        {/* ================= GENDER ================= */}

        <div className="register-field">

          <label>
            Gender
          </label>

          <select
            name="gender"
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>

            <option value="other">
              Other
            </option>

          </select>

        </div>


        {/* ================= PASSWORD ================= */}

        <div className="register-field">

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={registerPassword}
            onChange={(e) =>
              setRegisterPassword(e.target.value)
            }
            required
          />

          <small className="password-hint">
            8+ characters • Uppercase • Lowercase • Number
          </small>

        </div>


        {/* ================= CONFIRM PASSWORD ================= */}

        <div className="register-field">

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

        </div>


        {/* ================= ERROR ================= */}

        {registerError && (
          <div className="register-error">
            ⚠️ {registerError}
          </div>
        )}


        {/* ================= SUCCESS ================= */}

        {registerSuccess && (
          <div className="login-success">
            ✅ {registerSuccess}
          </div>
        )}


        {/* ================= CREATE ACCOUNT ================= */}

        <button
          type="submit"
          className="register-submit"
        >
          Create Account
        </button>

      </form>


      {/* ================= LOGIN ================= */}

      <p className="already-account">

        Already have an account?

        <button
          type="button"
          onClick={() => {
            setRegisterOpen(false);
            openLogin("Patient");
          }}
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

export default Home;