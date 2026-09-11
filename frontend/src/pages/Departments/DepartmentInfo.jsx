import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  HeartPulse,
  Microscope,
  Stethoscope,
  TriangleAlert,
  Activity,
  Brain,
  ShieldCheck,
  ClipboardCheck,
  CircleHelp,
} from "lucide-react";

import departmentData from "./departmentData";
import "./DepartmentInfo.css";

const DepartmentInfo = () => {
  const { department } = useParams();
  const navigate = useNavigate();

  const [openFaq, setOpenFaq] = useState(null);

  const data = departmentData[department];

  if (!data) {
    return (
      <div className="department-not-found">
        <div className="not-found-orbit">
          <CircleHelp size={38} />
        </div>

        <span>DEPARTMENT NOT FOUND</span>

        <h1>Department unavailable</h1>

        <p>
          The requested department could not be found in the hospital system.
        </p>

        <button onClick={() => navigate("/departments")}>
          <ArrowLeft size={15} />
          Back to Departments
        </button>
      </div>
    );
  }

  const conditions = Array.isArray(data.conditions)
    ? data.conditions
    : [];

  const tests = Array.isArray(data.tests)
    ? data.tests
    : [];

  const treatments = Array.isArray(data.treatments)
    ? data.treatments
    : [];

  const whenToVisit = Array.isArray(data.whenToVisit)
    ? data.whenToVisit
    : [];

  const medicalResources = Array.isArray(data.medicalResources)
    ? data.medicalResources
    : [];

  const faqs = [
    {
      question: `What does the ${data.name} department treat?`,
      answer:
        data.description ||
        `The ${data.name} department provides evaluation, diagnosis and treatment for conditions related to this medical specialty.`,
    },
    {
      question: "What happens during the first consultation?",
      answer:
        "The doctor reviews your symptoms and medical history, performs an appropriate examination and may recommend tests or further evaluation.",
    },
    {
      question: "Do I need tests before visiting?",
      answer:
        "Not necessarily. The doctor can decide which tests are appropriate after understanding your symptoms and medical history.",
    },
    {
      question: "When should I seek urgent medical care?",
      answer:
        "Sudden severe symptoms or rapidly worsening conditions may require urgent medical attention. In an emergency, contact local emergency services or visit the nearest emergency department.",
    },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="department-page">

      {/* =========================================
          TOP BAR
      ========================================= */}

      <header className="department-topbar">

        <Link
          to="/departments"
          className="department-brand"
        >
          <div className="department-brand-icon">
            <HeartPulse size={22} />
          </div>

          <div>
            <strong>Smart Hospital</strong>
            <span>AI-Powered Healthcare System</span>
          </div>
        </Link>

        <div className="department-topbar-actions">

          <div className="department-status-pill">
            <span className="status-dot" />
            Department Information
          </div>

          <button
            className="department-back-button"
            onClick={() => navigate("/departments")}
          >
            <ArrowLeft size={14} />
            Departments
          </button>

        </div>
      </header>


      {/* =========================================
          HERO
      ========================================= */}

      <section className="department-hero">

        <div className="hero-grid-lines" />

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />


        <div className="department-hero-content">

          <div className="department-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/departments">Departments</Link>
            <span>/</span>
            <strong>{data.name}</strong>
          </div>


          <div className="department-kicker">
            <Activity size={12} />
            SPECIALIZED MEDICAL CARE
          </div>


          <h1>{data.name}</h1>

          <h2>{data.shortName}</h2>

          <p>{data.description}</p>


          <div className="department-hero-actions">

            <button
              className="department-primary-button"
              onClick={() => navigate("/appointments")}
            >
              <CalendarDays size={15} />
              Book Appointment
            </button>

            <button
              className="department-secondary-button"
              onClick={() => scrollToSection("medical-information")}
            >
              <ExternalLink size={15} />
              Medical Information
            </button>

          </div>


          <div className="hero-trust-row">

            <div>
              <ShieldCheck size={13} />
              Specialist-focused care
            </div>

            <div>
              <ClipboardCheck size={13} />
              Evidence-based information
            </div>

            <div>
              <HeartPulse size={13} />
              Patient-centered approach
            </div>

          </div>

        </div>


        {/* HERO IMAGE */}

        <div className="department-hero-visual">

          <div className="hero-image-frame">

            <img
              src={data.image}
              alt={`${data.name} department`}
              loading="eager"
            />

            <div className="image-scan-line" />

            <div className="image-overlay-label">
              <span>SMART HOSPITAL</span>
              <strong>{data.name}</strong>
            </div>

            <div className="hero-floating-icon">
              {data.icon}
            </div>

          </div>


          <div className="hero-data-card">

            <div className="hero-data-icon">
              <Stethoscope size={20} />
            </div>

            <div>
              <span>DEPARTMENT FOCUS</span>
              <strong>{data.shortName}</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          DISCLAIMER
      ========================================= */}

      <div className="department-disclaimer">

        <TriangleAlert size={14} />

        <div>
          <strong>Medical information:</strong>{" "}
          This page provides general educational information and does not
          replace professional medical advice, diagnosis or treatment.
        </div>

      </div>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="department-content">


        {/* =========================================
            INTRO
        ========================================= */}

        <div className="department-section-intro">

          <div>
            <span className="section-eyebrow">
              DEPARTMENT OVERVIEW
            </span>

            <h2>
              Understanding {data.name}
            </h2>
          </div>

          <p>
            Explore common conditions, diagnostic approaches, treatments
            and trusted medical resources related to this department.
          </p>

        </div>


        {/* =========================================
            STATS
        ========================================= */}

        <div className="department-stat-grid">

          <div className="department-stat-card">

            <div className="stat-icon">
              <HeartPulse size={19} />
            </div>

            <strong>{conditions.length}</strong>

            <span>Common conditions</span>

          </div>


          <div className="department-stat-card">

            <div className="stat-icon purple">
              <Microscope size={19} />
            </div>

            <strong>{tests.length}</strong>

            <span>Diagnostic approaches</span>

          </div>


          <div className="department-stat-card">

            <div className="stat-icon green">
              <Stethoscope size={19} />
            </div>

            <strong>{treatments.length}</strong>

            <span>Treatment approaches</span>

          </div>


          <div className="department-stat-card">

            <div className="stat-icon amber">
              <ExternalLink size={19} />
            </div>

            <strong>{medicalResources.length}</strong>

            <span>Web resources</span>

          </div>

        </div>


        {/* =========================================
            OVERVIEW
        ========================================= */}

        <section className="premium-card department-overview-card">

          <div className="overview-copy">

            <span className="section-eyebrow">
              ABOUT THE DEPARTMENT
            </span>

            <h2>{data.name} Care</h2>

            <p>
              {data.overview}
            </p>


            <div className="overview-highlight">

              <HeartPulse size={18} />

              <div>
                <strong>
                  Specialized healthcare guidance
                </strong>

                <span>
                  Your healthcare provider can determine the appropriate
                  diagnosis and treatment based on your individual needs.
                </span>
              </div>

            </div>

          </div>


          <div className="overview-visual">

            <div className="medical-ring ring-one" />
            <div className="medical-ring ring-two" />

            <div className="overview-center">

              <Brain size={31} />

              <span>{data.name}</span>

              <small>Specialized Care</small>

            </div>

          </div>

        </section>


        {/* =========================================
            CONDITIONS + TESTS
        ========================================= */}

        <div className="department-info-grid">


          {/* CONDITIONS */}

          <section className="premium-card department-info-card">

            <div className="card-heading">

              <div className="department-info-icon condition-icon">
                <HeartPulse size={20} />
              </div>

              <div>
                <span>COMMON AREAS</span>
                <h3>Conditions</h3>
              </div>

            </div>


            <div className="detail-list">

              {conditions.map((condition, index) => {

                const name =
                  typeof condition === "object"
                    ? condition.name
                    : condition;

                return (
                  <div
                    className="detail-item"
                    key={index}
                  >

                    <span className="detail-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <strong>{name}</strong>
                    </div>

                    <CheckCircle2 size={14} />

                  </div>
                );
              })}

            </div>

          </section>


          {/* TESTS */}

          <section className="premium-card department-info-card">

            <div className="card-heading">

              <div className="department-info-icon test-icon">
                <Microscope size={20} />
              </div>

              <div>
                <span>DIAGNOSIS</span>
                <h3>Tests & Evaluation</h3>
              </div>

            </div>


            <div className="detail-list">

              {tests.map((test, index) => (

                <div
                  className="detail-item"
                  key={index}
                >

                  <span className="detail-number purple-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <strong>{test}</strong>
                  </div>

                  <CheckCircle2 size={14} />

                </div>

              ))}

            </div>

          </section>

        </div>


        {/* =========================================
            TREATMENTS
        ========================================= */}

        <section className="premium-card department-treatment-section">

          <div className="section-heading-row">

            <div>

              <span className="section-eyebrow">
                CARE OPTIONS
              </span>

              <h2>Treatment & Management</h2>

            </div>

            <div className="section-heading-badge">
              <ShieldCheck size={12} />
              Personalized care
            </div>

          </div>


          <div className="department-treatment-grid">

            {treatments.map((treatment, index) => (

              <div
                className="department-treatment-card"
                key={index}
              >

                <span className="treatment-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="treatment-icon">
                  <Stethoscope size={17} />
                </div>

                <div>
                  <h3>{treatment}</h3>

                  <p>
                    Treatment decisions depend on the patient's
                    condition, medical history and healthcare provider's
                    assessment.
                  </p>
                </div>

                <ArrowRight size={14} />

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            WHEN TO VISIT
        ========================================= */}

        <section className="department-warning-card">

          <div className="warning-heading">

            <div className="warning-icon">
              <TriangleAlert size={21} />
            </div>

            <div>
              <span>WHEN TO SEEK CARE</span>

              <h2>When should you consult a doctor?</h2>
            </div>

          </div>


          <p className="warning-intro">
            Consider consulting a qualified healthcare professional when
            symptoms are persistent, unusual, worsening or affecting your
            daily activities.
          </p>


          <div className="warning-list">

            {whenToVisit.map((item, index) => (

              <div
                className="warning-item"
                key={index}
              >

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <CheckCircle2 size={13} />

                {item}

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            CARE PATH
        ========================================= */}

        <section className="department-care-path">

          <div className="department-section-intro">

            <div>
              <span className="section-eyebrow">
                PATIENT JOURNEY
              </span>

              <h2>How your care can begin</h2>
            </div>

            <p>
              A typical healthcare journey may include consultation,
              evaluation, diagnosis and an individualized care plan.
            </p>

          </div>


          <div className="care-path-grid">

            <div className="care-step">

              <div className="care-step-top">
                <span>01</span>
                <div className="care-connector" />
              </div>

              <h3>Consultation</h3>

              <p>
                Discuss symptoms, concerns and relevant medical history
                with a healthcare professional.
              </p>

            </div>


            <div className="care-step">

              <div className="care-step-top">
                <span>02</span>
                <div className="care-connector" />
              </div>

              <h3>Evaluation</h3>

              <p>
                The doctor performs an appropriate examination and
                determines whether further testing is needed.
              </p>

            </div>


            <div className="care-step">

              <div className="care-step-top">
                <span>03</span>
                <div className="care-connector" />
              </div>

              <h3>Diagnosis</h3>

              <p>
                Available clinical findings and test results are used
                to understand the condition.
              </p>

            </div>


            <div className="care-step">

              <div className="care-step-top">
                <span>04</span>
              </div>

              <h3>Care Plan</h3>

              <p>
                Your healthcare provider recommends appropriate
                treatment, monitoring or referral.
              </p>

            </div>

          </div>

        </section>


        {/* =========================================
            MEDICAL INFORMATION
        ========================================= */}

        <section
          id="medical-information"
          className="department-faq-section premium-card"
        >

          <div className="section-heading-row">

            <div>

              <span className="section-eyebrow">
                TRUSTED WEB INFORMATION
              </span>

              <h2>Medical Information</h2>

            </div>

            <div className="faq-mark">
              <ExternalLink size={18} />
            </div>

          </div>


          <p
            style={{
              margin: "10px 0 0",
              color: "#748b97",
              fontSize: "10px",
              lineHeight: "1.7",
            }}
          >
            Explore additional health information from established
            medical and public-health organizations. These links open
            in a new browser tab.
          </p>


          <div className="faq-list">

            {medicalResources.map((resource, index) => (

              <div
                className="faq-item"
                key={index}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "17px 4px",
                  }}
                >

                  <div className="resource-icon">
                    <ExternalLink size={17} />
                  </div>

                  <div style={{ flex: 1 }}>

                    <span
                      style={{
                        display: "block",
                        color: "#0795a4",
                        fontSize: "8px",
                        fontWeight: "900",
                        letterSpacing: "1px",
                      }}
                    >
                      MEDICAL RESOURCE
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "4px",
                        color: "#24485a",
                        fontSize: "12px",
                      }}
                    >
                      {resource.title}
                    </strong>

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#80949e",
                        fontSize: "9px",
                        lineHeight: "1.5",
                      }}
                    >
                      {resource.description}
                    </p>

                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${resource.title}`}
                    className="department-resource-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "9px 11px",
                      borderRadius: "9px",
                      background: "#effaf7",
                      color: "#128c70",
                      textDecoration: "none",
                      fontSize: "9px",
                      fontWeight: "850",
                      flexShrink: 0,
                    }}
                  >
                    Open
                    <ArrowRight size={12} />
                  </a>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            FAQ
        ========================================= */}

        <section className="department-faq-section premium-card">

          <div className="section-heading-row">

            <div>

              <span className="section-eyebrow">
                QUICK ANSWERS
              </span>

              <h2>Frequently Asked Questions</h2>

            </div>

            <div className="faq-mark">
              <CircleHelp size={18} />
            </div>

          </div>


          <div className="faq-list">

            {faqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <div
                  className={`faq-item ${
                    isOpen ? "open" : ""
                  }`}
                  key={index}
                >

                  <button
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : index
                      )
                    }
                  >

                    <span>{faq.question}</span>

                    <ChevronDown size={16} />

                  </button>


                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>


        {/* =========================================
            CTA
        ========================================= */}

        <section className="department-cta">

          <div className="cta-glow" />

          <div className="cta-copy">

            <span>
              READY TO TAKE THE NEXT STEP?
            </span>

            <h2>
              Connect with our healthcare team.
            </h2>

            <p>
              Book an appointment and discuss your health concerns
              with an appropriate healthcare professional.
            </p>

          </div>


          <div className="department-cta-actions">

            <button
              onClick={() => navigate("/appointments")}
            >
              <CalendarDays size={14} />
              Book Appointment
            </button>

            <button
              onClick={() => navigate("/departments")}
            >
              <ArrowLeft size={14} />
              All Departments
            </button>

          </div>

        </section>


        {/* =========================================
            RESOURCE
        ========================================= */}

        {data.resourceUrl && (
          <div className="department-resource">

            <div className="resource-icon">
              <ExternalLink size={18} />
            </div>

            <div>

              <span>PRIMARY WEB RESOURCE</span>

              <h3>{data.resourceTitle}</h3>

              <p>
                Additional general medical information from a
                trusted external health information source.
              </p>

            </div>

            <a
              href={data.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Resource
              <ExternalLink size={12} />
            </a>

          </div>
        )}


        {/* =========================================
            RELATED DEPARTMENTS
        ========================================= */}

        <section className="related-departments">

          <div className="department-section-intro">

            <div>
              <span className="section-eyebrow">
                EXPLORE MORE
              </span>

              <h2>Other Departments</h2>
            </div>

            <p>
              Explore other areas of specialized care available in
              the Smart Hospital system.
            </p>

          </div>


          <div className="related-grid">

            {Object.entries(departmentData)
              .filter(([key]) => key !== department)
              .slice(0, 4)
              .map(([key, dept]) => (

                <Link
                  to={`/departments/${key}`}
                  className="related-card"
                  key={key}
                >

                  <div className="related-image">

                    <img
                      src={dept.image}
                      alt={dept.name}
                      loading="lazy"
                    />

                    <span>
                      {dept.icon}
                    </span>

                  </div>


                  <div>

                    <span>DEPARTMENT</span>

                    <h3>{dept.name}</h3>

                    <p>{dept.shortName}</p>

                  </div>


                  <ArrowRight size={15} />

                </Link>

              ))}

          </div>

        </section>

      </main>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="department-footer">

        <div>

          <strong>
            Smart Hospital Management System
          </strong>

          <span>
            AI-powered healthcare information platform
          </span>

        </div>

        <Link to="/departments">
          View all departments
          <ArrowRight size={12} />
        </Link>

      </footer>

    </div>
  );
};

export default DepartmentInfo;