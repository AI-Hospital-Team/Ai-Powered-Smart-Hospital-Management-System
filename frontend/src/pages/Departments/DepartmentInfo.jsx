import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
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
        <HeartPulse size={42} />

        <h1>Department Not Found</h1>

        <p>
          The requested medical department could not be found.
        </p>

        <button onClick={() => navigate("/#departments")}>
          <ArrowLeft size={16} />
          Back to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="department-page">

      {/* HEADER */}

      <header className="department-header">

        <Link to="/" className="department-logo">
          <div className="department-logo-icon">
            <HeartPulse size={20} />
          </div>

          <div>
            <strong>AI Smart Hospital</strong>
            <span>Intelligent Healthcare Management</span>
          </div>
        </Link>

        <button
          className="department-back"
          onClick={() => navigate("/#departments")}
        >
          <ArrowLeft size={16} />
          Departments
        </button>

      </header>


      {/* HERO */}

      <section className="department-hero">

        <div className="department-hero-content">

          <div className="department-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Departments</span>
            <span>/</span>
            <strong>{data.name}</strong>
          </div>

          <span className="department-label">
            SPECIALIZED MEDICAL CARE
          </span>

          <h1>{data.name}</h1>

          <h2>{data.shortName}</h2>

          <p>{data.description}</p>

          <div className="department-actions">

            <button
              className="primary-btn"
              onClick={() => navigate("/#contact")}
            >
              <CalendarDays size={17} />
              Book Appointment
              <ArrowRight size={15} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/#doctors")}
            >
              <Stethoscope size={17} />
              Find Doctors
            </button>

          </div>

        </div>


        {/* ONLY MAIN IMAGE */}

        <div className="department-hero-image">

          <img
            src={data.image}
            alt={`${data.name} medical care`}
          />

          <div className="hero-image-overlay">
            <span>{data.icon}</span>

            <div>
              <small>MEDICAL DEPARTMENT</small>
              <strong>{data.name}</strong>
            </div>
          </div>

        </div>

      </section>


      {/* DISCLAIMER */}

      <div className="department-disclaimer">

        <TriangleAlert size={16} />

        <span>
          This page provides general educational information
          and does not replace professional medical diagnosis
          or treatment.
        </span>

      </div>


      {/* CONTENT */}

      <main className="department-content">


        {/* ABOUT */}

        <section className="department-section about-section">

          <div className="section-heading">
            <span>OVERVIEW</span>
            <h2>About {data.name}</h2>
          </div>

          <p>{data.overview}</p>

        </section>


        {/* CONDITIONS */}

        <section className="department-section">

          <div className="section-heading">
            <span>COMMON CONDITIONS</span>
            <h2>Conditions We Treat</h2>
          </div>

          <div className="department-list-grid">

            {data.conditions.map((condition) => (

              <div
                className="department-list-card"
                key={condition}
              >
                <CheckCircle2 size={18} />

                <span>{condition}</span>
              </div>

            ))}

          </div>

        </section>


        {/* TESTS */}

        <section className="department-section">

          <div className="section-heading">

            <span>DIAGNOSIS</span>

            <h2>Common Tests & Assessments</h2>

          </div>

          <div className="department-list-grid">

            {data.tests.map((test) => (

              <div
                className="department-list-card test-card"
                key={test}
              >

                <Microscope size={18} />

                <span>{test}</span>

              </div>

            ))}

          </div>

        </section>


        {/* TREATMENTS */}

        <section className="department-section">

          <div className="section-heading">

            <span>CARE & TREATMENT</span>

            <h2>Treatment & Care Options</h2>

          </div>

          <div className="treatment-grid">

            {data.treatments.map(
              (treatment, index) => (

                <div
                  className="treatment-card"
                  key={treatment}
                >

                  <div className="treatment-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>

                    <h3>{treatment}</h3>

                    <p>
                      Treatment is selected according
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


        {/* WHEN TO VISIT */}

        <section className="visit-section">

          <div className="visit-heading">

            <div className="visit-icon">
              <TriangleAlert size={21} />
            </div>

            <div>

              <span>WHEN TO SEEK CARE</span>

              <h2>
                When Should You Consult a Doctor?
              </h2>

            </div>

          </div>


          <div className="visit-list">

            {data.whenToVisit.map((item) => (

              <div
                className="visit-item"
                key={item}
              >

                <CheckCircle2 size={16} />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </section>


        {/* CTA */}

        <section className="department-cta">

          <div>

            <span>NEED MEDICAL CARE?</span>

            <h2>
              Ready to schedule a consultation?
            </h2>

            <p>
              Connect with the appropriate healthcare
              service through our hospital system.
            </p>

          </div>


          <button
            onClick={() => navigate("/#contact")}
          >
            Book Appointment
            <ArrowRight size={16} />
          </button>

        </section>


        {/* RESOURCE */}

        <section className="department-resource">

          <div className="resource-icon">
            <ExternalLink size={18} />
          </div>

          <div>

            <span>TRUSTED RESOURCE</span>

            <h3>{data.resourceTitle}</h3>

            <p>
              Learn more about this medical specialty
              from a trusted health information source.
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


      {/* FOOTER */}

      <footer className="department-footer">

        <strong>AI Smart Hospital</strong>

        <Link to="/">
          Back to Home
          <ArrowRight size={14} />
        </Link>

      </footer>

    </div>
  );
}

export default DepartmentInfo;