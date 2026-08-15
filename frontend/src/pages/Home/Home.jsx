import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  const [loginRole, setLoginRole] = useState("Patient");

  const [ayushmanInfo, setAyushmanInfo] = useState("coverage");
  const [showAyushmanDetails, setShowAyushmanDetails] = useState(false);

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

  /* =====================================================
     AYUSHMAN INTERACTIVE INFO
  ===================================================== */

  const ayushmanContent = {
    coverage: {
      icon: "💰",
      title: "₹5 Lakh Coverage",
      text: "Eligible families can receive health coverage of up to ₹5 lakh per family per year for eligible secondary and tertiary hospitalization.",
      points: [
        "Up to ₹5 lakh annual coverage",
        "Family-based health protection",
        "Applicable to eligible hospitalization expenses",
      ],
    },

    eligibility: {
      icon: "👨‍👩‍👧‍👦",
      title: "Eligibility",
      text: "Eligibility is based on government-defined beneficiary criteria and applicable PM-JAY rules.",
      points: [
        "Eligibility depends on beneficiary criteria",
        "Family members may be covered",
        "Government rules determine eligibility",
      ],
    },

    benefits: {
      icon: "🏥",
      title: "Key Benefits",
      text: "PM-JAY provides financial protection for eligible beneficiaries receiving treatment at empanelled hospitals.",
      points: [
        "Cashless hospitalization",
        "Access to eligible hospital treatment",
        "Reduced financial burden",
      ],
    },
  };

  const activeAyushman = ayushmanContent[ayushmanInfo];

  return (
    <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="home-header">

      <div className="hospital-brand">

        <a
          href="#home"
          className="hospital-home-link"
          aria-label="Go to Home"
        >
          <div className="logo-symbol">
            🏥
          </div>
        </a>

        <div className="hospital-brand-text">
          <h2>AI Smart Hospital</h2>
          <p>Intelligent Healthcare Management</p>
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
            title="Change Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="login-dropdown">

            <button
              className="login-btn"
              onClick={() => setLoginMenuOpen(!loginMenuOpen)}
            >
              Login ▾
            </button>

            {loginMenuOpen && (
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
          📞 Call Emergency - 108
        </a>

      </div>


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
          TRUST BAR
      ===================================================== */}

      <section className="trust-bar">

        <div>
          <span>🔐</span>
          <strong>Secure Records</strong>
          <small>Your medical data stays protected</small>
        </div>

        <div>
          <span>🤖</span>
          <strong>AI Assistance</strong>
          <small>Smart healthcare technology</small>
        </div>

        <div>
          <span>👨‍⚕️</span>
          <strong>Qualified Doctors</strong>
          <small>Experienced medical professionals</small>
        </div>

        <div>
          <span>🚑</span>
          <strong>Emergency Care</strong>
          <small>24/7 emergency assistance</small>
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

            <a href="#ai">
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


      {/* =====================================================
          AYUSHMAN BHARAT
          NO AYUSHMAN CARD IMAGE
      ===================================================== */}

      <section className="insurance-section" id="ayushman">

        <div className="insurance-content">

          {/* LEFT ICON */}

          <div className="insurance-icon">
            🏥
          </div>


          {/* MAIN CONTENT */}

          <div className="insurance-text">

            <p className="section-label">
              AYUSHMAN BHARAT • HEALTHCARE SUPPORT
            </p>

            <h2>
              Get Free Healthcare Treatment
              <span> Up To ₹5 Lakh</span>
            </h2>

            <p>
              Ayushman Bharat Pradhan Mantri Jan Arogya Yojana
              (PM-JAY) provides eligible families with health
              coverage of up to ₹5 lakh per family per year for
              eligible secondary and tertiary hospitalization.
            </p>


            <div className="insurance-features">

              <div>
                <span>✓</span>
                <strong>Up to ₹5 Lakh Coverage</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Cashless Hospitalization</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Eligible Family Members</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Hospital Treatment Support</strong>
              </div>

            </div>


            <button
              className="insurance-btn"
              onClick={() =>
                setShowAyushmanDetails(!showAyushmanDetails)
              }
            >
              🪪 Check Ayushman Details
              {showAyushmanDetails ? " ↑" : " →"}
            </button>

            <small className="insurance-note">
              * Benefits and eligibility depend on applicable
              government scheme rules and beneficiary eligibility.
            </small>

          </div>


          {/* =================================================
              INTERACTIVE INFORMATION CARD
          ================================================= */}

          <div className="ayushman-card">

            <div className="ayushman-card-header">

              <div className="ayushman-shield">
                🛡️
              </div>

              <div>
                <strong>
                  Ayushman Bharat
                </strong>

                <span>
                  PM-JAY Health Protection
                </span>
              </div>

            </div>


            {/* TABS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "7px",
                marginBottom: "18px",
              }}
            >

              <button
                onClick={() => setAyushmanInfo("coverage")}
                style={{
                  padding: "10px 5px",
                  border: "1px solid #d9e9ed",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  background:
                    ayushmanInfo === "coverage"
                      ? "#087f8c"
                      : "#f7fbfc",
                  color:
                    ayushmanInfo === "coverage"
                      ? "white"
                      : "#36556d",
                }}
              >
                💰 Coverage
              </button>


              <button
                onClick={() => setAyushmanInfo("eligibility")}
                style={{
                  padding: "10px 5px",
                  border: "1px solid #d9e9ed",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  background:
                    ayushmanInfo === "eligibility"
                      ? "#087f8c"
                      : "#f7fbfc",
                  color:
                    ayushmanInfo === "eligibility"
                      ? "white"
                      : "#36556d",
                }}
              >
                👨‍👩‍👧 Eligibility
              </button>


              <button
                onClick={() => setAyushmanInfo("benefits")}
                style={{
                  padding: "10px 5px",
                  border: "1px solid #d9e9ed",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  background:
                    ayushmanInfo === "benefits"
                      ? "#087f8c"
                      : "#f7fbfc",
                  color:
                    ayushmanInfo === "benefits"
                      ? "white"
                      : "#36556d",
                }}
              >
                🎁 Benefits
              </button>

            </div>


            {/* ACTIVE INFORMATION */}

            <div
              style={{
                padding: "22px",
                background: "#f3fafb",
                borderRadius: "14px",
                border: "1px solid #dcecef",
                minHeight: "205px",
              }}
            >

              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                }}
              >
                {activeAyushman.icon}
              </div>

              <h3
                style={{
                  color: "#087f8c",
                  fontSize: "20px",
                  marginBottom: "9px",
                }}
              >
                {activeAyushman.title}
              </h3>

              <p
                style={{
                  color: "#607887",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  marginBottom: "13px",
                }}
              >
                {activeAyushman.text}
              </p>


              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                }}
              >

                {activeAyushman.points.map((point, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "11px",
                      color: "#36556d",
                    }}
                  >
                    <span
                      style={{
                        width: "19px",
                        height: "19px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "#d8f6ef",
                        color: "#087f8c",
                        fontWeight: "900",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>

                    {point}

                  </div>
                ))}

              </div>

            </div>


            {/* DETAILS BUTTON */}

            <button
              onClick={() =>
                setShowAyushmanDetails(!showAyushmanDetails)
              }
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                border: "none",
                borderRadius: "9px",
                background: "#087f8c",
                color: "white",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              {showAyushmanDetails
                ? "Hide Scheme Details ↑"
                : "View Scheme Details →"}
            </button>


            {/* EXPANDED DETAILS */}

            {showAyushmanDetails && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "17px",
                  background: "#eef9fb",
                  borderRadius: "12px",
                  border: "1px solid #d8ebef",
                }}
              >

                <h4
                  style={{
                    color: "#17445c",
                    marginBottom: "9px",
                  }}
                >
                  📌 Important Information
                </h4>

                <p
                  style={{
                    color: "#647f8e",
                    fontSize: "11px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                  }}
                >
                  PM-JAY is a government healthcare scheme designed
                  to provide financial protection to eligible
                  beneficiary families.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                  }}
                >

                  <span
                    style={{
                      color: "#36556d",
                      fontSize: "11px",
                    }}
                  >
                    💰 Coverage: Up to ₹5 lakh per family per year
                  </span>

                  <span
                    style={{
                      color: "#36556d",
                      fontSize: "11px",
                    }}
                  >
                    🏥 Treatment: Eligible hospitalization services
                  </span>

                  <span
                    style={{
                      color: "#36556d",
                      fontSize: "11px",
                    }}
                  >
                    💳 Payment: Cashless treatment at eligible
                    empanelled hospitals
                  </span>

                  <span
                    style={{
                      color: "#36556d",
                      fontSize: "11px",
                    }}
                  >
                    👨‍👩‍👧 Family: Eligible family members as per
                    applicable rules
                  </span>

                </div>

                <a
                  href="https://beneficiary.nha.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "13px",
                    color: "#087f8c",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  Check Official Information →
                </a>

              </div>
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          AYUSHMAN BENEFITS
      ===================================================== */}

      <section className="ayushman-details-section">

        <div className="section-heading">

          <p>PM-JAY BENEFITS</p>

          <h2>
            Understanding Your
            <br />
            Healthcare Support
          </h2>

          <span>
            Key features of Ayushman Bharat health protection
            for eligible beneficiaries.
          </span>

        </div>


        <div className="ayushman-benefits-grid">

          <div className="ayushman-benefit-card">

            <span>💰</span>

            <h3>₹5 Lakh Coverage</h3>

            <p>
              Health coverage of up to ₹5 lakh per family per year
              for eligible beneficiaries.
            </p>

          </div>


          <div className="ayushman-benefit-card">

            <span>💳</span>

            <h3>Cashless Treatment</h3>

            <p>
              Eligible beneficiaries can receive cashless
              treatment at applicable empanelled hospitals.
            </p>

          </div>


          <div className="ayushman-benefit-card">

            <span>🏥</span>

            <h3>Hospitalization</h3>

            <p>
              Support for eligible secondary and tertiary
              hospitalization services.
            </p>

          </div>


          <div className="ayushman-benefit-card">

            <span>👨‍👩‍👧‍👦</span>

            <h3>Family Protection</h3>

            <p>
              Eligible family members can receive healthcare
              protection according to applicable rules.
            </p>

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
          FACILITIES
      ===================================================== */}

      <section className="facilities-section">

        <div className="section-heading">

          <p>OUR FACILITIES</p>

          <h2>
            Everything You Need
          </h2>

          <span>
            Modern facilities designed for efficient and
            comfortable healthcare delivery.
          </span>

        </div>


        <div className="facilities-grid">

          <div className="facility-card">
            <div>🚑</div>
            <div>
              <h3>24/7 Emergency</h3>
              <p>Round-the-clock emergency medical support.</p>
            </div>
          </div>

          <div className="facility-card">
            <div>🧪</div>
            <div>
              <h3>Advanced Laboratory</h3>
              <p>Modern diagnostic and laboratory facilities.</p>
            </div>
          </div>

          <div className="facility-card">
            <div>💊</div>
            <div>
              <h3>Hospital Pharmacy</h3>
              <p>Convenient access to prescribed medicines.</p>
            </div>
          </div>

          <div className="facility-card">
            <div>🛏️</div>
            <div>
              <h3>Comfortable Rooms</h3>
              <p>Clean and comfortable patient accommodation.</p>
            </div>
          </div>

          <div className="facility-card">
            <div>🩻</div>
            <div>
              <h3>Imaging Services</h3>
              <p>Advanced medical imaging and diagnostics.</p>
            </div>
          </div>

          <div className="facility-card">
            <div>🩺</div>
            <div>
              <h3>Specialist Care</h3>
              <p>Access to multiple medical specialties.</p>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="why-section">

        <div className="section-heading">

          <p>WHY CHOOSE US</p>

          <h2>
            Healthcare With Intelligence
          </h2>

          <span>
            Combining technology, medical expertise and patient
            care in one platform.
          </span>

        </div>


        <div className="why-grid">

          <div className="why-card">
            <div>🤖</div>
            <h3>AI Powered</h3>
            <p>
              Intelligent tools assist healthcare professionals
              and patients.
            </p>
          </div>

          <div className="why-card">
            <div>🔐</div>
            <h3>Secure</h3>
            <p>
              Medical information is managed through a secure
              digital system.
            </p>
          </div>

          <div className="why-card">
            <div>⚡</div>
            <h3>Fast</h3>
            <p>
              Quickly access appointments, doctors and medical
              information.
            </p>
          </div>

          <div className="why-card">
            <div>❤️</div>
            <h3>Patient First</h3>
            <p>
              Every feature is designed around better patient
              experience.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section className="about-section" id="about">

        <div className="about-content">

          <p className="section-label">
            ABOUT AI SMART HOSPITAL
          </p>

          <h2>
            Building the Future of
            <span> Healthcare</span>
          </h2>

          <p>
            AI Smart Hospital is a modern hospital management
            platform designed to connect patients, doctors and
            hospital administrators through a single digital
            system.
          </p>

          <p>
            Our goal is to simplify healthcare management,
            improve accessibility and use technology to support
            better medical decisions.
          </p>


          <div className="about-points">

            <span>✓ Digital Appointment Management</span>

            <span>✓ Secure Medical Records</span>

            <span>✓ Doctor Management</span>

            <span>✓ AI Healthcare Assistance</span>

          </div>

        </div>


        <div className="about-card">

          <div className="about-medical-icon">
            🤖
          </div>

          <h3>
            Smart Healthcare Platform
          </h3>

          <p>
            One platform for patients, doctors and hospital
            administration.
          </p>


          <div className="about-stat">
            <strong>10K+</strong>
            <span>Patients Served</span>
          </div>

          <div className="about-stat">
            <strong>50+</strong>
            <span>Healthcare Professionals</span>
          </div>

          <div className="about-stat">
            <strong>24/7</strong>
            <span>Healthcare Support</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          AI SECTION
      ===================================================== */}

      <section className="ai-section" id="ai">

        <div className="ai-content">

          <div className="ai-icon">
            🤖
          </div>

          <div>

            <p className="section-label">
              ARTIFICIAL INTELLIGENCE
            </p>

            <h2>
              Smarter Healthcare With AI
            </h2>

            <p>
              Our platform can integrate intelligent healthcare
              features that help patients and healthcare
              professionals access useful medical information
              faster.
            </p>


            <div className="ai-features">

              <span>🧠 Symptom Analysis</span>

              <span>⚠️ Risk Alerts</span>

              <span>📄 Record Summarization</span>

              <span>💡 Smart Recommendations</span>

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

            <h2>Hospital Hours</h2>

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
              <strong>24 / 7</strong>
            </div>

          </div>

        </div>


        <div className="information-card">

          <div className="information-icon">
            📍
          </div>

          <div>

            <h2>Hospital Location</h2>

            <p className="location-text">
              AI Smart Hospital
              <br />
              Pune, Maharashtra, India
            </p>

            <p className="location-text">
              Easily accessible healthcare services for
              patients and families.
            </p>

            <a
              className="map-button"
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
            >
              📍 Open Maps
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="testimonials-section">

        <div className="section-heading">

          <p>PATIENT REVIEWS</p>

          <h2>
            What Our Patients Say
          </h2>

          <span>
            Feedback from patients who experienced our healthcare
            services.
          </span>

        </div>


        <div className="testimonial-grid">

          <div className="testimonial-card">

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              "The appointment booking process was very simple.
              I could quickly find a doctor and manage my
              appointment."
            </p>

            <div className="testimonial-user">

              <div>👤</div>

              <div>
                <strong>Rahul Sharma</strong>
                <small>Patient</small>
              </div>

            </div>

          </div>


          <div className="testimonial-card">

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              "The digital medical record system makes it much
              easier to keep track of prescriptions and reports."
            </p>

            <div className="testimonial-user">

              <div>👩</div>

              <div>
                <strong>Neha Joshi</strong>
                <small>Patient</small>
              </div>

            </div>

          </div>


          <div className="testimonial-card">

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              "A clean and modern healthcare platform with useful
              digital features."
            </p>

            <div className="testimonial-user">

              <div>👨</div>

              <div>
                <strong>Amit Verma</strong>
                <small>Patient</small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PARTNERS
      ===================================================== */}

      <section className="partners-section">

        <div className="section-heading">

          <p>HEALTHCARE NETWORK</p>

          <h2>
            Our Healthcare Ecosystem
          </h2>

          <span>
            Connecting healthcare services and technology.
          </span>

        </div>


        <div className="partners-grid">

          <div>🏥 Hospital Network</div>

          <div>🧪 Diagnostic Labs</div>

          <div>💊 Pharmacy Partners</div>

          <div>🤖 AI Technology</div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="contact-section" id="contact">

        <div className="contact-icon">
          📞
        </div>

        <p className="section-label">
          NEED HELP?
        </p>

        <h2>
          We're Here For You
        </h2>

        <p>
          Have questions about appointments, doctors or
          healthcare services? Our support team is ready to help.
        </p>


        <div className="contact-buttons">

          <a
            href="tel:+919999999999"
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

              <div className="logo-symbol">
                🏥
              </div>

              <div>
                <h3>AI Smart Hospital</h3>
                <p>Intelligent Healthcare Management</p>
              </div>

            </div>


            <p className="footer-description">
              A modern healthcare management platform connecting
              patients, doctors and hospital services through
              technology.
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


          <div className="footer-contact">

            <h4>Contact Us</h4>

            <p>📍 Pune, Maharashtra, India</p>

            <p>📞 +91 99999 99999</p>

            <p>✉️ support@aismarthospital.com</p>


            <div className="footer-hours">

              <strong>Emergency Support</strong>

              <span>
                Available 24 hours / 7 days
              </span>

            </div>

          </div>

        </div>

{/* =====================================================
    ABOUT OUR PROJECT
===================================================== */}

<div className="footer-project-info">

  <span className="footer-project-badge">
    ✨ OUR PROJECT
  </span>

  <h3>
    AI-Powered Smart Hospital
    <span> Management System</span>
  </h3>

  <p>
    A modern academic project focused on smarter,
    organized and technology-driven healthcare.
  </p>

  <div className="footer-project-buttons">

    <a href="/about">
      About Us →
    </a>

    <a href="/project">
      Our Project →
    </a>

  </div>

</div>

        <div className="footer-bottom">

          <span>
            © 2026 AI-Smart Hospital by Prathmesh Panmand & Radhesham Wayal. All Rights Reserved.
          </span>

          <div>
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

            <button
              className="close-login"
              onClick={() => setLoginOpen(false)}
            >
              ×
            </button>


            <div className="hospital-login-logo">

              <div className="large-logo">
                🏥
              </div>

            </div>


            <h1>
              {loginRole} Login
            </h1>

            <p className="login-subtitle">
              Login to AI Smart Hospital
            </p>


            <div className="role-tabs">

              <button
                className={loginRole === "Patient" ? "active" : ""}
                onClick={() => setLoginRole("Patient")}
              >
                Patient
              </button>

              <button
                className={loginRole === "Doctor" ? "active" : ""}
                onClick={() => setLoginRole("Doctor")}
              >
                Doctor
              </button>

              <button
                className={loginRole === "Admin" ? "active" : ""}
                onClick={() => setLoginRole("Admin")}
              >
                Admin
              </button>

            </div>
            
<form
  onSubmit={async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("Please enter email and password");
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
            role: loginRole,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        alert(message || "Invalid email, password or role");
        return;
      }

      const user = await response.json();

      localStorage.clear();

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setLoginOpen(false);

      if (user.role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "Doctor") {
        navigate("/doctor", { replace: true });
      } else if (user.role === "Patient") {
        navigate("/patient", { replace: true });
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Cannot connect to the hospital server.");
    }
  }}
>
  <label>
    Email / Username
  </label>

  <input
    type="email"
    name="email"
    placeholder="Enter email or username"
    required
  />

  <label>
    Password
  </label>

  <input
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

            <div className="register-text">

              Don't have an account?

              <button onClick={openRegister}>
                Register
              </button>

            </div>


            <button
              className="forgot-password"
              onClick={() =>
                alert("Password recovery feature will be connected to backend.")
              }
            >
              Forgot Password?
            </button>

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

            <button
              className="close-login"
              onClick={() => setRegisterOpen(false)}
            >
              ×
            </button>


            <div className="register-top">

              <div className="large-logo">
                🏥
              </div>

              <div>

                <h1>
                  Create Account
                </h1>

                <p>
                  Join AI Smart Hospital
                </p>

              </div>

            </div>


            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Registration submitted");
              }}
            >

              <div className="register-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter full name"
                  required
                />

              </div>


              <div className="register-field">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  required
                />

              </div>


              <div className="register-field">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  required
                />

              </div>


              <div className="register-field">

                <label>
                  Date of Birth
                </label>

                <input
                  type="date"
                  required
                />

              </div>


              <div className="register-field">

                <label>
                  Gender
                </label>

                <select required>

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


              <div className="register-field">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create password"
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

              Already have an account?

              <button onClick={() => openLogin("Patient")}>
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