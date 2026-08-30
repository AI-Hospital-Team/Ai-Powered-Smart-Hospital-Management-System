import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Home.responsive.css";
import { useDarkMode } from "../../theme/DarkMode";

/* =====================================================
   REUSABLE SVG ICON
===================================================== */

const Icon = ({ name, size = 24, strokeWidth = 1.8 }) => {

  const icons = {

    healthcare: (
      <>
        <path d="M12 21s-7-4.35-9.2-8.3C1.1 9.65 3.1 5 7.2 5c2.1 0 3.7 1.2 4.8 2.7C13.1 6.2 14.7 5 16.8 5c4.1 0 6.1 4.65 4.4 7.7C19 16.65 12 21 12 21Z" />
        <path d="M12 9v6M9 12h6" />
      </>
    ),

    appointment: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M7 2v4M17 2v4M3 9h18" />
        <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
      </>
    ),

    doctor: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-4.2 3.4-6.5 8-6.5s7.2 2.3 8 6.5" />
        <path d="M17 5h4M19 3v4" />
      </>
    ),

    records: (
      <>
        <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5" />
        <path d="M8 12h8M8 16h6" />
      </>
    ),

    pharmacy: (
      <>
        <path d="m7 4 13 13" />
        <path d="m17 4-13 13" />
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="M9 12h6M12 9v6" />
      </>
    ),

    diagnostic: (
      <>
        <path d="M8 3h8v5c0 3-2 4-4 5s-4 2-4 5v3h8" />
        <path d="M6 21h12" />
        <path d="M9 7h6" />
      </>
    ),

    ai: (
      <>
        <rect x="5" y="6" width="14" height="13" rx="3" />
        <path d="M9 3v3M15 3v3M9 19v2M15 19v2" />
        <circle cx="9.5" cy="12" r="1" />
        <circle cx="14.5" cy="12" r="1" />
        <path d="M9 15c2 1.2 4 1.2 6 0" />
      </>
    ),

    bot: (
  <>
    <rect x="5" y="6" width="14" height="13" rx="3" />
    <path d="M9 3v3M15 3v3" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <path d="M9 16h6" />
  </>
),

    hospital: (
      <>
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-5h6v5" />
        <path d="M12 7v5M9.5 9.5h5" />
      </>
    ),

    heart: (
      <>
        <path d="M20.8 8.8c0 5.4-8.8 10.5-8.8 10.5S3.2 14.2 3.2 8.8A5 5 0 0 1 12 6.2a5 5 0 0 1 8.8 2.6Z" />
      </>
    ),

    brain: (
      <>
        <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3" />
        <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3" />
        <path d="M9 4v16M15 4v16M9 9h6M9 15h6" />
      </>
    ),

    bone: (
      <>
        <path d="M7 5a3 3 0 1 0-4 4l12 12a3 3 0 1 0 4-4L7 5Z" />
        <path d="m5 7 2-2M17 19l2-2" />
      </>
    ),

    child: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6 21c.5-4.3 2.5-7 6-7s5.5 2.7 6 7" />
        <path d="M9 17h6" />
      </>
    ),

    lungs: (
      <>
        <path d="M12 5v14" />
        <path d="M11 9C7 7 4 8 4 13c0 4 2 7 6 7 1 0 2-1 2-3V9Z" />
        <path d="M13 9c4-2 7-1 7 4 0 4-2 7-6 7-1 0-2-1-2-3V9Z" />
      </>
    ),

    skin: (
      <>
        <path d="M12 3c-3 3-7 6-7 10a7 7 0 0 0 14 0c0-4-4-7-7-10Z" />
        <path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
      </>
    ),

    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" />
        <path d="m8.5 12 2.3 2.3 4.8-5" />
      </>
    ),

    star: (
      <>
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    phone: (
      <>
        <path d="M5 4h4l2 5-2.5 2c1.2 2.5 2.8 4.1 5.3 5.3l2-2.5 5 2v4c0 1-1 2-2 2C10 21 3 14 3 6c0-1 1-2 2-2Z" />
      </>
    ),

    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),

    emergency: (
      <>
        <path d="M12 3 21 20H3L12 3Z" />
        <path d="M12 9v5M12 17v.5" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),

    github: (
      <>
        <path d="M9 19c-4 1-4-2-5-2m10 5v-3.9c0-1.1.1-1.5-.5-2.1 3.4-.4 7-1.7 7-7.5a5.8 5.8 0 0 0-1.5-4C19.4 3.1 19.5 2 19.5 2s-1.1-.3-3.6 1.5a12.3 12.3 0 0 0-7.8 0C5.6 1.7 4.5 2 4.5 2s.1 1.1.5 2.5a5.8 5.8 0 0 0-1.5 4c0 5.8 3.6 7.1 7 7.5-.6.5-.6 1.1-.6 2.1V22" />
      </>
    ),

    sparkle: (
      <>
        <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" />
        <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(`Section #${sectionId} not found`);
      setMobileMenuOpen(false);
      return;
    }

    const headerOffset = window.innerWidth <= 768 ? 76 : 90;
    const elementPosition =
      section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, elementPosition - headerOffset),
      behavior: "smooth",
    });

    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    window.history.replaceState(null, "", `#${sectionId}`);
  };

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
      const marker = window.scrollY + (window.innerWidth <= 768 ? 110 : 140);
      let currentSection = "home";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= marker) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timer = setTimeout(() => {
      scrollToSection(hash);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useDarkMode();
  /* =====================================================
   AI HEALTHCARE CHATBOT
===================================================== */
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
    <div className="home-page">

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
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("home");
      }}
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

<nav className={`main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>

  <a
    href="#home"
    className={`nav-link ${
      activeSection === "home" ? "active" : ""
    }`}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("home");
    }}
  >
    Home
  </a>

  <a
    href="#services"
    className={`nav-link ${
      activeSection === "services" ? "active" : ""
    }`}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("services");
    }}
  >
    Services
  </a>

  <a
    href="#departments"
    className={`nav-link ${
      activeSection === "departments" ? "active" : ""
    }`}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("departments");
    }}
  >
    Departments
  </a>

  <a
    href="#doctors"
    className={`nav-link ${
      activeSection === "doctors" ? "active" : ""
    }`}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("doctors");
    }}
  >
    Doctors
  </a>

  <a
    href="#about"
    className={`nav-link ${
      activeSection === "about" ? "active" : ""
    }`}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("about");
    }}
  >
    About
  </a>

  <a
    href="#contact"
    className={`nav-link ${
      activeSection === "contact" ? "active" : ""
    }`}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("contact");
    }}
  >
    Contact
  </a>


  <div className="mobile-nav-actions">
    <button type="button" className="login-btn" onClick={() => openLogin("Patient")}>Login</button>
    <button type="button" className="register-btn" onClick={openRegister}>Register</button>
  </div>

</nav>

    <button
      type="button"
      className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
      onClick={() => setMobileMenuOpen((open) => !open)}
      aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={mobileMenuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    {/* =================================================
        RIGHT — ACTIONS
    ================================================= */}

    <div className="header-actions">


      {/* THEME */}

      <button
        type="button"
        className="theme-toggle"
        onClick={() => setDarkMode((current) => !current)}
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
          PROJECT INTRODUCTION
          Academic / Educational Project
      ===================================================== */}

      <section className="project-intro-section" id="project-intro">

        <div className="project-intro-glow project-glow-one"></div>
        <div className="project-intro-glow project-glow-two"></div>

        <div className="project-intro-container">

          {/* TOP BAR */}

          <div className="project-intro-top">

            <div className="project-intro-badge">

              <span className="project-intro-badge-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 8.5 12 4l9 4.5L12 13 3 8.5Z" />
                  <path d="M6 11.5v4.2c3.7 2.5 8.3 2.5 12 0v-4.2" />
                  <path d="M21 9v5" />
                </svg>
              </span>

              <span>
                EDUCATIONAL COLLEGE PROJECT
              </span>

            </div>


            <div className="project-team">

              <span className="project-team-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
                  <circle cx="17.5" cy="9" r="2.5" />
                  <path d="M15.5 20a4.5 4.5 0 0 1 5-4.4" />
                </svg>
              </span>

              <div>
                <span>PROJECT TEAM</span>

                <strong>
                  Prathmesh Panmand &amp; Radheshyam Wayal
                </strong>
                
              </div>
              

            </div>
        
        {/* ================= GITHUB ================= */}

        <a
          href="https://github.com/AI-Hospital-Team/Ai-Powered-Smart-Hospital-Management-System"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-github-link"
        >

          <span className="github-mark">

            <Icon
              name="github"
              size={17}
            />

          </span>

          <span>
            View project on GitHub
          </span>

          <Icon
            name="arrow"
            size={15}
          />

        </a>
          </div>


          {/* MAIN PROJECT CONTENT */}

          <div className="project-intro-main">

            <div className="project-intro-heading">

              <span className="project-intro-kicker">
                SMART HEALTHCARE&nbsp; • &nbsp;AI&nbsp; • &nbsp;WEB TECHNOLOGY
              </span>

              <h2>
                Welcome to
                <span> AI Smart Hospital</span>
              </h2>

              <p className="project-intro-lead">
                A college project created for educational and learning
                purposes, exploring how Artificial Intelligence and
                modern web technologies can be applied to build a
                smarter digital healthcare management environment.
              </p>

            </div>


            <div className="project-intro-description">

              <p>
                The project brings patients, doctors and hospital
                administrators together through one connected platform
                for appointments, medical records, prescriptions and
                essential healthcare services.
              </p>

              <p>
                It demonstrates how technology can help organize
                healthcare workflows, improve digital accessibility
                and provide a foundation for intelligent healthcare
                solutions.
              </p>

            </div>

          </div>


          {/* PROJECT HIGHLIGHTS */}

          <div className="project-highlights">

            <div className="project-highlight-card">

              <div className="project-highlight-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.5 4.5a3.5 3.5 0 0 0-6 2.5v1a3.5 3.5 0 0 0 0 6v1a3.5 3.5 0 0 0 6 2.5" />
                  <path d="M15.5 4.5a3.5 3.5 0 0 1 6 2.5v1a3.5 3.5 0 0 1 0 6v1a3.5 3.5 0 0 1-6 2.5" />
                  <path d="M8.5 4.5v15M15.5 4.5v15M8.5 9h7M8.5 15h7" />
                </svg>
              </div>

              <div>
                <strong>AI &amp; Technology</strong>

                <small>
                  Exploring intelligent technology and its role
                  in modern healthcare.
                </small>
              </div>

            </div>


            <div className="project-highlight-card">

              <div className="project-highlight-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 21V6.5L12 3l8 3.5V21" />
                  <path d="M9 21v-5h6v5M12 7v5M9 9h6" />
                </svg>
              </div>

              <div>
                <strong>Digital Healthcare</strong>

                <small>
                  Connecting patients, doctors and hospital
                  services through one platform.
                </small>
              </div>

            </div>


            <div className="project-highlight-card">

              <div className="project-highlight-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 1 3.5 10.9c-.9.7-1.5 1.7-1.5 3.1h-4c0-1.4-.6-2.4-1.5-3.1A6 6 0 0 1 12 3Z" />
                  <path d="M9.5 20h5M10 17h4" />
                </svg>
              </div>

              <div>
                <strong>Learning &amp; Innovation</strong>

                <small>
                  Built as a college project to develop practical
                  technical skills and experimentation.
                </small>
              </div>

            </div>
            

          </div>


          {/* PROJECT FOOTER */}

          <div className="project-intro-footer">

            <div className="project-purpose">

              <span className="project-purpose-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 1 3.5 10.9c-.9.7-1.5 1.7-1.5 3.1h-4c0-1.4-.6-2.4-1.5-3.1A6 6 0 0 1 12 3Z" />
                  <path d="M9.5 20h5M10 17h4" />
                </svg>
              </span>

              <div>
                <span>PROJECT PURPOSE</span>

                <strong>
                  Learning • Experimentation • Innovation
                </strong>
              </div>

            </div>


            <div className="project-academic-note">

              <span className="project-academic-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 8.5 12 4l9 4.5L12 13 3 8.5Z" />
                  <path d="M6 11.5v4.2c3.7 2.5 8.3 2.5 12 0v-4.2" />
                </svg>
              </span>

              <span>
                Created for educational and academic purposes
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ANNOUNCEMENT
      ===================================================== */}

      <div className="announcement">

        <span className="announcement-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
            <path d="M10 21h4" />
          </svg>
        </span>

        <span>
          <strong>Smart Healthcare:</strong> Book appointments,
          manage medical records and connect with doctors digitally.
        </span>

      </div>


    {/* ================= Hero ================= */}

<section className="hero-section" id="home">

  <div className="hero-background-overlay"></div>

  <div className="hero-container">

    {/* ================= LEFT CONTENT ================= */}

    <div className="hero-content">

      <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        <span>AI-POWERED SMART HEALTHCARE</span>
      </div>

      <h1 className="hero-title">
        Better Healthcare.
        <span className="highlight">
          Smarter Future.
        </span>
      </h1>

      <p className="hero-description">
        Experience modern healthcare powered by technology,
        intelligent medical systems and compassionate doctors.
        Manage appointments, medical records and healthcare
        services from one secure platform.
      </p>

      <div className="hero-actions">

        <a
          href="#contact"
          className="hero-primary"
          onClick={(e) => {
            e.preventDefault();
            openLogin("Patient");
          }}
        >
          <Icon name="appointment" size={17} />
          <span>Book Appointment</span>
        </a>

        <a
          href="#services"
          className="hero-secondary"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("services");
          }}
        >
          <span>Explore Services</span>
          <Icon name="arrow" size={17} />
        </a>

      </div>

      <div className="hero-features">

        <span className="hero-feature">
          <Icon name="shield" size={15} />
          AI Assisted Healthcare
        </span>

        <span className="hero-feature">
          <Icon name="records" size={15} />
          Secure Medical Records
        </span>

        <span className="hero-feature">
          <Icon name="clock" size={15} />
          24/7 Emergency Support
        </span>

      </div>

    </div>

    {/* RIGHT — YOUR EXISTING SMART CARE CARD */}
    <div className="hero-card-wrapper">

      <div className="hero-card compact-hero-card">

  {/* Decorative texture */}
  <div className="hero-card-texture"></div>

  {/* HEADER */}
  <div className="hero-card-brand">

    <div className="hero-card-logo">
      <img
        src="/github-logo.jpeg"
        alt="AI Smart Hospital"
      />
    </div>

    <div className="hero-card-heading">
      <span className="hero-card-label">
        AI SMART HOSPITAL
      </span>

      <h2>Smart Care</h2>

      <p>Intelligent healthcare management</p>
    </div>

  </div>


  {/* PLATFORM */}
  <div className="hero-card-message">

    <div className="hero-card-message-icon">
      <Icon
        name="healthcare"
        size={22}
        strokeWidth={1.8}
      />
    </div>

    <div className="hero-card-message-content">
      <strong>Your Healthcare Platform</strong>

      <p>
        Appointments, records, doctors & services.
      </p>
    </div>

  </div>


  {/* ASSISTANTS */}
  <div className="hero-assistants">

    {/* HOSPITAL ASSISTANT */}
    <button
      type="button"
      className="hero-assistant-card hospital-assistant"
      onClick={() => {
        document
          .getElementById("about")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      }}
    >

      <span className="assistant-icon hospital-icon">
        <Icon
          name="bot"
          size={22}
          strokeWidth={1.8}
        />
      </span>

      <span className="assistant-content">
        <strong>AI Hospital Management System</strong>
      </span>

      <span className="assistant-arrow">
        <Icon
          name="arrow"
          size={17}
        />
      </span>

    </button>


    {/* =====================================================
    HEALTH ASSISTANT
===================================================== */}

<button
  type="button"
  className="hero-assistant-card health-assistant"
  onClick={() => navigate("/ai-health-assistant")}
>
  <span className="assistant-icon health-icon">
    <Icon
      name="ai"
      size={24}
      strokeWidth={1.8}
    />
  </span>

  <span className="assistant-content">
    <strong>AI Healthcare Assistant</strong>
  </span>

  <span className="assistant-arrow">
    <Icon
      name="arrow"
      size={17}
    />
  </span>
</button>

  </div>


<div className="hero-card-footer">
  <div className="footer-status">
    <span className="status-dot"></span>

    <strong>2 Smart Healthcare Tools</strong>
  </div>

  <span className="footer-separator"></span>

  <span className="footer-text">
    One connected healthcare experience
  </span>
</div>

      </div>

    </div>

  </div>

</section>


      {/* =====================================================
          HEALTHCARE STATISTICS
      ===================================================== */}

      <section className="home-stats-section">

        <div className="home-stat-card">

          <div className="home-stat-icon">
            <Icon name="doctor" size={27} />
          </div>

          <strong>50+</strong>

          <span>
            Expert Doctors
          </span>

        </div>


        <div className="home-stat-card">

          <div className="home-stat-icon">
            <Icon name="hospital" size={27} />
          </div>

          <strong>15+</strong>

          <span>
            Departments
          </span>

        </div>


        <div className="home-stat-card">

          <div className="home-stat-icon">
            <Icon name="heart" size={27} />
          </div>

          <strong>10K+</strong>

          <span>
            Happy Patients
          </span>

        </div>


        <div className="home-stat-card">

          <div className="home-stat-icon">
            <Icon name="star" size={27} />
          </div>

          <strong>4.9/5</strong>

          <span>
            Patient Rating
          </span>

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

            <a
              href="#doctors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("doctors");
              }}
            >
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
            href="tel:+919999999999"
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
            href="mailto:support@aismarthospital.com"
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
          <p>Smart Hospital Management System</p>
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

      <a href="#insurance">
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

    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>
      <span>About Us</span>
      <b>→</b>
    </a>

    <a href="#project-intro" onClick={(e) => { e.preventDefault(); scrollToSection("project-intro"); }}>
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
      className="hospital-login"
      onClick={(e) => e.stopPropagation()}
    >

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