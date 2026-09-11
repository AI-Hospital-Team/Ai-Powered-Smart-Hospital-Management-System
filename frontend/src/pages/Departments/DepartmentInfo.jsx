import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  HeartPulse,
  Microscope,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";

import "./DepartmentInfo.css";
import departmentData from "./departmentData";

function DepartmentInfo() {
  const { department } = useParams();
  const navigate = useNavigate();

  const data = departmentData[department];

  if (!data) {
    return (
      <div className="department-not-found">
        <div>
          <HeartPulse size={42} />
          <h1>Department Not Found</h1>
          <p>
            The requested medical department could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/#departments")}
          >
            <ArrowLeft size={16} />
            Back to Departments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="department-page">

      {/* ================= HEADER ================= */}

      <header className="department-topbar">
        <Link
          to="/"
          className="department-brand"
        >
          <div className="department-brand-icon">
            <HeartPulse size={20} />
          </div>

          <div>
            <strong>AI Smart Hospital</strong>
            <span>Intelligent Healthcare Management</span>
          </div>
        </Link>

        <button
          type="button"
          className="department-back-button"
          onClick={() => navigate("/#departments")}
        >
          <ArrowLeft size={16} />
          Departments
        </button>
      </header>

      {/* ================= HERO ================= */}

      <section className="department-hero">

        <div className="department-hero-content">

          <span className="department-kicker">
            MEDICAL DEPARTMENT
          </span>

          <h1>
            {data.name}
          </h1>

          <h2>
            {data.shortName}
          </h2>

          <p>
            {data.description}
          </p>

          <div className="department-hero-actions">

            <button
              type="button"
              className="department-primary-button"
              onClick={() =>
                navigate("/#contact")
              }
            >
              <CalendarDays size={17} />
              Book Appointment
            </button>

            <button
              type="button"
              className="department-secondary-button"
              onClick={() =>
                navigate("/#doctors")
              }
            >
              <Stethoscope size={17} />
              Find Doctors
            </button>

          </div>

        </div>

        <div className="department-hero-image">

          <img
            src={data.image}
            alt={`${data.name} medical care`}
          />

          <div className="department-image-badge">
            <span className="department-big-icon">
              {data.icon}
            </span>

            <div>
              <strong>
                {data.name}
              </strong>

              <span>
                Specialized medical care
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* ================= DISCLAIMER ================= */}

      <div className="department-disclaimer">
        <TriangleAlert size={16} />

        <span>
          This page provides general educational
          information and is not a substitute for
          professional medical diagnosis or treatment.
        </span>
      </div>

      {/* ================= OVERVIEW ================= */}

      <main className="department-content">

        <section className="department-overview-card">

          <div className="department-section-heading">

            <span>
              OVERVIEW
            </span>

            <h2>
              About {data.name}
            </h2>

          </div>

          <p>
            {data.overview}
          </p>

        </section>

        {/* ================= TWO COLUMN ================= */}

        <section className="department-info-grid">

          {/* CONDITIONS */}

          <div className="department-info-card">

            <div className="department-info-title">

              <div className="department-info-icon condition-icon">
                <ClipboardList size={20} />
              </div>

              <div>
                <span>
                  COMMON CONDITIONS
                </span>

                <h3>
                  What We Treat
                </h3>
              </div>

            </div>

            <ul>
              {data.conditions.map(
                (condition) => (
                  <li key={condition}>
                    <CheckCircle2 size={15} />
                    {condition}
                  </li>
                )
              )}
            </ul>

          </div>

          {/* TESTS */}

          <div className="department-info-card">

            <div className="department-info-title">

              <div className="department-info-icon test-icon">
                <Microscope size={20} />
              </div>

              <div>
                <span>
                  DIAGNOSIS
                </span>

                <h3>
                  Common Tests
                </h3>
              </div>

            </div>

            <ul>
              {data.tests.map(
                (test) => (
                  <li key={test}>
                    <CheckCircle2 size={15} />
                    {test}
                  </li>
                )
              )}
            </ul>

          </div>

        </section>

        {/* ================= TREATMENTS ================= */}

        <section className="department-treatment-section">

          <div className="department-section-heading">

            <span>
              CARE & TREATMENT
            </span>

            <h2>
              Treatment & Care Options
            </h2>

          </div>

          <div className="department-treatment-grid">

            {data.treatments.map(
              (treatment, index) => (
                <div
                  className="department-treatment-card"
                  key={treatment}
                >
                  <div className="treatment-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div>
                    <h3>
                      {treatment}
                    </h3>

                    <p>
                      Care is selected according
                      to the patient's condition,
                      medical history and doctor's
                      assessment.
                    </p>
                  </div>
                </div>
              )
            )}

          </div>

        </section>

        {/* ================= WHEN TO VISIT ================= */}

        <section className="department-warning-card">

          <div className="warning-heading">

            <div className="warning-icon">
              <TriangleAlert size={21} />
            </div>

            <div>
              <span>
                WHEN TO SEEK CARE
              </span>

              <h2>
                When Should You Consult a Doctor?
              </h2>
            </div>

          </div>

          <div className="warning-list">

            {data.whenToVisit.map(
              (item) => (
                <div
                  key={item}
                  className="warning-item"
                >
                  <CheckCircle2 size={15} />
                  {item}
                </div>
              )
            )}

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="department-cta">

          <div>

            <span>
              NEED MEDICAL CARE?
            </span>

            <h2>
              Ready to schedule a consultation?
            </h2>

            <p>
              Connect with our healthcare team
              through the hospital appointment system.
            </p>

          </div>

          <div className="department-cta-actions">

            <button
              type="button"
              onClick={() =>
                navigate("/#contact")
              }
            >
              Book Appointment
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/#doctors")
              }
            >
              Find a Doctor
              <Stethoscope size={16} />
            </button>

          </div>

        </section>

        {/* ================= EXTERNAL RESOURCE ================= */}

        <section className="department-resource">

          <div className="resource-icon">
            <ExternalLink size={19} />
          </div>

          <div>

            <span>
              LEARN MORE
            </span>

            <h3>
              {data.resourceTitle}
            </h3>

            <p>
              Explore additional educational
              information from a trusted health
              information source.
            </p>

          </div>

          <a
            href={data.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Resource
            <ExternalLink size={14} />
          </a>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="department-footer">

        <div>
          <strong>
            AI Smart Hospital
          </strong>

          <span>
            Educational healthcare management project
          </span>
        </div>

        <Link to="/">
          Back to Home
          <ArrowRight size={14} />
        </Link>

      </footer>

    </div>
  );
}

export default DepartmentInfo;