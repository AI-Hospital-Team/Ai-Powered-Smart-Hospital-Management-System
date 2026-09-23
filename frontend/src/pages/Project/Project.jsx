import { useState } from "react";
import "./Project.css";

function Project() {
  const [activeDocument, setActiveDocument] = useState(null);

  const closeDocument = () => {
    setActiveDocument(null);
  };

  return (
    <div className="project-page">

      {/* Header */}
      <header className="project-page-header">
        <a href="/" className="project-back">
          ← AI Smart Hospital
        </a>

        <span>Our Project</span>
      </header>


      <main className="project-container">

        {/* Hero */}
        <section className="project-hero">

          <span className="project-badge">
            ✨ OUR PROJECT
          </span>

          <h1>
            AI-Powered Smart Hospital
            <span> Management System</span>
          </h1>

          <p>
            A modern healthcare management system designed
            to connect patients, doctors and hospital services
            through smart digital technology.
          </p>

        </section>


        {/* Project Content */}
        <section className="project-content">

          {/* Project Overview */}
          <div className="project-card">

            <h2>Project Overview</h2>

            <p>
              Our project focuses on developing a smart hospital
              management platform that helps organize healthcare
              services and provides a better digital experience
              for patients, doctors and hospital staff.
            </p>

          </div>


          {/* Objectives */}
          <div className="project-card">

            <h2>Project Objectives</h2>

            <ul>
              <li>Improve hospital management and organization.</li>
              <li>Provide convenient digital healthcare services.</li>
              <li>Manage appointments and medical records.</li>
              <li>Connect patients with healthcare professionals.</li>
              <li>Explore AI-assisted healthcare solutions.</li>
            </ul>

          </div>


          {/* Technologies */}
          <div className="project-card">

            <h2>Technologies Used</h2>

            <div className="technology-list">
              <span>React</span>
              <span>Java</span>
              <span>Spring Boot</span>
              <span>MySQL</span>
              <span>Git</span>
              <span>GitHub</span>
              <span>REST API</span>
              <span>Ollama</span>
              <span>Llama 3.2</span>
              <span>Vite</span>
            </div>

          </div>


          {/* Documentation */}
          <div className="project-card">

            <h2>Theory & Documentation</h2>

            <p>
              This section contains our project theory,
              documentation, research work, system design,
              objectives and other academic materials.
            </p>

            <div className="document-buttons">

              <button
                onClick={() => setActiveDocument("report")}
              >
                📄 Project Report
              </button>

              <button
                onClick={() => setActiveDocument("theory")}
              >
                📚 Theory Work
              </button>

              <button
                onClick={() => setActiveDocument("presentation")}
              >
                📊 Project Presentation
              </button>

            </div>

          </div>


          {/* Future Scope */}
          <div className="project-card">

            <h2>Future Scope</h2>

            <p>
              The system can be further enhanced with advanced
              AI capabilities, intelligent recommendations,
              improved analytics and additional digital
              healthcare services.
            </p>

          </div>

        </section>

      </main>


      {/* =====================================================
          DOCUMENT MODAL
      ===================================================== */}

      {activeDocument && (

        <div
          className="document-modal-overlay"
          onClick={closeDocument}
        >

          <div
            className="document-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="document-modal-header">

              <div>
                {activeDocument === "report" && (
                  <>
                    <h2>📄 Project Report</h2>
                    <p>
                      AI-Powered Smart Hospital Management System
                    </p>
                  </>
                )}

                {activeDocument === "theory" && (
                  <>
                    <h2>📚 Theory Work</h2>
                    <p>
                      Technologies and concepts used in the project
                    </p>
                  </>
                )}

                {activeDocument === "presentation" && (
                  <>
                    <h2>📊 Project Presentation</h2>
                    <p>
                      Project presentation and viva preparation
                    </p>
                  </>
                )}
              </div>

              <button
                className="document-close-btn"
                onClick={closeDocument}
                aria-label="Close"
              >
                ✕
              </button>

            </div>


            {/* =================================================
                PROJECT REPORT
            ================================================= */}

            {activeDocument === "report" && (

              <div className="document-modal-content">

                <section>
                  <h3>1. Project Overview</h3>

                  <p>
                    The AI-Powered Smart Hospital Management System
                    is a full-stack healthcare management application
                    designed to digitally manage hospital operations
                    and connect Administrators, Doctors and Patients
                    through a centralized platform.
                  </p>

                  <p>
                    The system provides modules for patient management,
                    doctor management, appointments, medical records,
                    prescriptions, billing, password reset and
                    AI-assisted healthcare support.
                  </p>
                </section>


                <section>
                  <h3>2. Problem Statement</h3>

                  <p>
                    Traditional hospital management processes may
                    involve manual handling of patient records,
                    appointments, prescriptions and billing.
                    This can make information management difficult
                    and time-consuming.
                  </p>

                  <ul>
                    <li>Difficulty managing patient information.</li>
                    <li>Manual appointment management.</li>
                    <li>Difficulty tracking medical records.</li>
                    <li>Manual prescription management.</li>
                    <li>Manual billing processes.</li>
                    <li>Limited intelligent healthcare assistance.</li>
                  </ul>
                </section>


                <section>
                  <h3>3. Project Objectives</h3>

                  <ul>
                    <li>Develop a centralized hospital management system.</li>
                    <li>Digitally manage patient information.</li>
                    <li>Manage doctors and their profiles.</li>
                    <li>Provide appointment booking and management.</li>
                    <li>Manage medical records and prescriptions.</li>
                    <li>Provide digital billing and payment tracking.</li>
                    <li>Implement role-based access.</li>
                    <li>Provide secure login and password reset.</li>
                    <li>Maintain doctor approval logs.</li>
                    <li>Integrate an AI Health Assistant.</li>
                  </ul>
                </section>


                <section>
                  <h3>4. Scope of the Project</h3>

                  <p>
                    The system covers hospital management activities
                    for Admin, Doctor and Patient users.
                  </p>

                  <ul>
                    <li>Patient Management</li>
                    <li>Doctor Management</li>
                    <li>Appointment Management</li>
                    <li>Medical Records</li>
                    <li>Prescriptions</li>
                    <li>Billing & Payments</li>
                    <li>Password Reset</li>
                    <li>Doctor Approval Logs</li>
                    <li>AI Health Assistant</li>
                  </ul>
                </section>


                <section>
                  <h3>5. User Roles</h3>

                  <h4>Admin</h4>

                  <p>
                    Admin manages patients, doctors, appointments,
                    bills, medical records, prescriptions, password
                    reset requests and doctor approval logs.
                  </p>

                  <h4>Doctor</h4>

                  <p>
                    Doctors can manage appointments, patients,
                    medical records, prescriptions and their profile.
                  </p>

                  <h4>Patient</h4>

                  <p>
                    Patients can book appointments, view medical
                    records, prescriptions and bills, manage their
                    profile and use the AI Health Assistant.
                  </p>
                </section>


                <section>
                  <h3>6. Technologies Used</h3>

                  <div className="document-tech-list">
                    <span>React.js</span>
                    <span>Vite</span>
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>MySQL</span>
                    <span>REST API</span>
                    <span>Ollama</span>
                    <span>Llama 3.2</span>
                    <span>Git</span>
                    <span>GitHub</span>
                  </div>
                </section>


                <section>
                  <h3>7. System Architecture</h3>

                  <div className="architecture-box">
                    <div>User</div>
                    <span>↓</span>
                    <div>React + Vite Frontend</div>
                    <span>↓</span>
                    <div>REST API</div>
                    <span>↓</span>
                    <div>Spring Boot Backend</div>
                    <span>↓</span>
                    <div>MySQL Database</div>
                    <span>+</span>
                    <div>Ollama + Llama 3.2</div>
                  </div>
                </section>


                <section>
                  <h3>8. Major Modules</h3>

                  <ul>
                    <li>Authentication Module</li>
                    <li>Admin Module</li>
                    <li>Doctor Module</li>
                    <li>Patient Module</li>
                    <li>Appointment Module</li>
                    <li>Medical Records Module</li>
                    <li>Prescription Module</li>
                    <li>Billing Module</li>
                    <li>Password Reset Module</li>
                    <li>AI Health Assistant Module</li>
                  </ul>
                </section>


                <section>
                  <h3>9. Appointment Management</h3>

                  <p>
                    Patients can book appointments with available
                    doctors. Doctors and Admins can manage appointment
                    status.
                  </p>

                  <div className="status-flow">
                    Pending → Confirmed → Completed
                  </div>

                  <div className="status-flow">
                    Pending / Confirmed → Cancelled
                  </div>
                </section>


                <section>
                  <h3>10. Medical Records</h3>

                  <p>
                    The Medical Records module allows healthcare
                    information to be stored and accessed digitally.
                    Patients can view their medical records while
                    authorized healthcare users can manage relevant
                    information.
                  </p>
                </section>


                <section>
                  <h3>11. Prescription Management</h3>

                  <p>
                    Doctors can create prescriptions for patients.
                    Patients can view their prescriptions through
                    their dashboard.
                  </p>
                </section>


                <section>
                  <h3>12. Billing & Payments</h3>

                  <p>
                    Admins can create patient bills and patients can
                    view total amount, paid amount, remaining amount
                    and payment status.
                  </p>
                </section>


                <section>
                  <h3>13. Doctor Management</h3>

                  <ul>
                    <li>Doctor information</li>
                    <li>Specialization</li>
                    <li>Qualification</li>
                    <li>Medical registration number</li>
                    <li>Hospital association</li>
                    <li>Shift information</li>
                    <li>Approval / Rejection</li>
                  </ul>
                </section>


                <section>
                  <h3>14. Password Reset</h3>

                  <p>
                    The system provides a controlled password reset
                    workflow where password reset requests can be
                    reviewed and processed by the Admin.
                  </p>
                </section>


                <section>
                  <h3>15. Role-Based Security</h3>

                  <p>
                    The application provides protected access for
                    different user roles.
                  </p>

                  <div className="role-box">
                    <div>Admin → /dashboard/*</div>
                    <div>Doctor → /doctor/*</div>
                    <div>Patient → /patient/*</div>
                  </div>
                </section>


                <section>
                  <h3>16. AI Health Assistant</h3>

                  <p>
                    The AI Health Assistant allows patients to enter
                    symptoms and receive an AI-generated informational
                    response.
                  </p>

                  <div className="ai-flow">
                    Symptoms → Spring Boot → Ollama → Llama 3.2 → Response
                  </div>

                  <p className="document-note">
                    The AI Health Assistant is an informational support
                    feature and does not replace professional medical
                    diagnosis or treatment.
                  </p>
                </section>


                <section>
                  <h3>17. Database</h3>

                  <p>
                    MySQL is used as the relational database for
                    storing users, patients, doctors, appointments,
                    medical records, prescriptions, bills and
                    password reset information.
                  </p>
                </section>


                <section>
                  <h3>18. REST API</h3>

                  <p>
                    The Spring Boot backend provides REST APIs that
                    allow the React frontend to communicate with the
                    database and application services.
                  </p>
                </section>


                <section>
                  <h3>19. Git & GitHub</h3>

                  <p>
                    Git and GitHub are used for version control,
                    collaboration, branch management and tracking
                    project development.
                  </p>
                </section>


                <section>
                  <h3>20. Advantages</h3>

                  <ul>
                    <li>Centralized hospital management.</li>
                    <li>Digital patient records.</li>
                    <li>Easy appointment management.</li>
                    <li>Digital prescriptions.</li>
                    <li>Digital billing.</li>
                    <li>Role-based access.</li>
                    <li>AI-assisted healthcare support.</li>
                    <li>Reduced manual paperwork.</li>
                  </ul>
                </section>


                <section>
                  <h3>21. Limitations</h3>

                  <ul>
                    <li>AI responses depend on the language model.</li>
                    <li>
                      AI assistance should not replace professional
                      medical advice.
                    </li>
                    <li>
                      Production deployment requires additional
                      security and infrastructure configuration.
                    </li>
                  </ul>
                </section>


                <section>
                  <h3>22. Future Scope</h3>

                  <ul>
                    <li>Advanced AI healthcare features.</li>
                    <li>Intelligent recommendations.</li>
                    <li>Advanced healthcare analytics.</li>
                    <li>Online payment gateway integration.</li>
                    <li>Video consultation.</li>
                    <li>Cloud deployment.</li>
                    <li>Mobile application.</li>
                  </ul>
                </section>


                <section>
                  <h3>23. Testing</h3>

                  <ul>
                    <li>Authentication testing</li>
                    <li>Admin module testing</li>
                    <li>Doctor module testing</li>
                    <li>Patient module testing</li>
                    <li>Appointment testing</li>
                    <li>Billing testing</li>
                    <li>AI Health Assistant testing</li>
                    <li>Role-based security testing</li>
                  </ul>
                </section>


                <section>
                  <h3>24. Project Outcome</h3>

                  <p>
                    The project provides a centralized digital
                    platform for managing important hospital
                    activities while combining hospital management
                    functionality with AI-assisted healthcare support.
                  </p>
                </section>


                <section>
                  <h3>25. Conclusion</h3>

                  <p>
                    The AI-Powered Smart Hospital Management System
                    demonstrates how modern web technologies and
                    Artificial Intelligence can be combined to create
                    an organized digital healthcare management
                    platform.
                  </p>

                  <p>
                    The project demonstrates practical implementation
                    of Java, Spring Boot, React, MySQL, REST APIs,
                    Git/GitHub, Ollama and Llama 3.2.
                  </p>
                </section>

              </div>
            )}


            {/* =================================================
                THEORY WORK
            ================================================= */}

            {activeDocument === "theory" && (

              <div className="document-modal-content">

                <section>
                  <h3>📚 Java</h3>

                  <p>
                    Java is an object-oriented programming language
                    used for backend application development. In this
                    project Java is used to implement backend business
                    logic and application services.
                  </p>
                </section>


                <section>
                  <h3>🌱 Spring Boot</h3>

                  <p>
                    Spring Boot is used to develop the backend of the
                    hospital management system. It provides REST API
                    development, application configuration and backend
                    service management.
                  </p>
                </section>


                <section>
                  <h3>⚛️ React.js</h3>

                  <p>
                    React.js is used to develop the interactive
                    frontend interface. Different dashboards and
                    pages are created for Admin, Doctor and Patient
                    users.
                  </p>
                </section>


                <section>
                  <h3>🗄️ MySQL</h3>

                  <p>
                    MySQL is used to store and manage the application's
                    relational data including users, doctors, patients,
                    appointments, prescriptions, medical records and
                    billing information.
                  </p>
                </section>


                <section>
                  <h3>🔗 REST API</h3>

                  <p>
                    REST APIs provide communication between the React
                    frontend and Spring Boot backend.
                  </p>
                </section>


                <section>
                  <h3>🤖 Artificial Intelligence</h3>

                  <p>
                    Artificial Intelligence is integrated into the
                    project through the AI Health Assistant to provide
                    informational responses based on user-provided
                    symptoms.
                  </p>
                </section>


                <section>
                  <h3>🦙 Ollama & Llama 3.2</h3>

                  <p>
                    Ollama is used to run the Llama 3.2 language model
                    locally. The model processes the user's symptom
                    input and generates an AI response.
                  </p>
                </section>


                <section>
                  <h3>🔐 Role-Based Access</h3>

                  <p>
                    Role-based access ensures that Admin, Doctor and
                    Patient users access only the areas assigned to
                    their respective roles.
                  </p>
                </section>


                <section>
                  <h3>📊 Hospital Management Concepts</h3>

                  <ul>
                    <li>Patient Management</li>
                    <li>Doctor Management</li>
                    <li>Appointment Management</li>
                    <li>Medical Record Management</li>
                    <li>Prescription Management</li>
                    <li>Billing Management</li>
                  </ul>
                </section>

              </div>
            )}


            {/* =================================================
                PRESENTATION
            ================================================= */}

            {activeDocument === "presentation" && (

              <div className="document-modal-content">

                <section>
                  <h3>Slide 1 — Project Title</h3>

                  <p>
                    <strong>
                      AI-Powered Smart Hospital Management System
                    </strong>
                  </p>

                  <p>
                    Intelligent Healthcare Management
                  </p>
                </section>


                <section>
                  <h3>Slide 2 — Team Members</h3>

                  <ul>
                    <li>Prathmesh Panmand</li>
                    <li>Radheshyam Wayal</li>
                  </ul>
                </section>


                <section>
                  <h3>Slide 3 — Introduction</h3>

                  <p>
                    A modern digital hospital management platform
                    designed to connect patients, doctors and
                    hospital administration.
                  </p>
                </section>


                <section>
                  <h3>Slide 4 — Problem Statement</h3>

                  <p>
                    Manual management of appointments, patient
                    records, prescriptions and billing can make
                    healthcare management difficult.
                  </p>
                </section>


                <section>
                  <h3>Slide 5 — Objectives</h3>

                  <ul>
                    <li>Digital hospital management</li>
                    <li>Appointment management</li>
                    <li>Medical record management</li>
                    <li>Digital billing</li>
                    <li>AI-assisted healthcare support</li>
                  </ul>
                </section>


                <section>
                  <h3>Slide 6 — Technologies</h3>

                  <div className="document-tech-list">
                    <span>React</span>
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>MySQL</span>
                    <span>REST API</span>
                    <span>Ollama</span>
                    <span>Llama 3.2</span>
                    <span>GitHub</span>
                  </div>
                </section>


                <section>
                  <h3>Slide 7 — System Architecture</h3>

                  <p>
                    React Frontend → Spring Boot Backend →
                    MySQL Database
                  </p>

                  <p>
                    AI Health Assistant → Ollama → Llama 3.2
                  </p>
                </section>


                <section>
                  <h3>Slide 8 — Main Modules</h3>

                  <ul>
                    <li>Admin</li>
                    <li>Doctor</li>
                    <li>Patient</li>
                    <li>Appointments</li>
                    <li>Medical Records</li>
                    <li>Prescriptions</li>
                    <li>Billing</li>
                    <li>AI Health Assistant</li>
                  </ul>
                </section>


                <section>
                  <h3>Slide 9 — AI Health Assistant</h3>

                  <p>
                    The AI Health Assistant uses Ollama and Llama 3.2
                    to generate informational responses based on
                    user-provided symptoms.
                  </p>
                </section>


                <section>
                  <h3>Slide 10 — Security</h3>

                  <ul>
                    <li>Authentication</li>
                    <li>Role-based access</li>
                    <li>Protected routes</li>
                    <li>Logout session clearing</li>
                    <li>Password reset</li>
                  </ul>
                </section>


                <section>
                  <h3>Slide 11 — Database</h3>

                  <p>
                    MySQL is used for storing and managing the
                    application's hospital data.
                  </p>
                </section>


                <section>
                  <h3>Slide 12 — Testing</h3>

                  <ul>
                    <li>Login testing</li>
                    <li>Appointment testing</li>
                    <li>Billing testing</li>
                    <li>Medical record testing</li>
                    <li>Prescription testing</li>
                    <li>Role security testing</li>
                    <li>AI testing</li>
                  </ul>
                </section>


                <section>
                  <h3>Slide 13 — Project Outcome</h3>

                  <p>
                    A centralized digital platform for managing
                    hospital activities and providing AI-assisted
                    healthcare support.
                  </p>
                </section>


                <section>
                  <h3>Slide 14 — Conclusion</h3>

                  <p>
                    The project demonstrates the practical use of
                    full-stack development and Artificial Intelligence
                    in healthcare management.
                  </p>
                </section>


                <section>
                  <h3>Slide 15 — Thank You</h3>

                  <p className="presentation-thank-you">
                    Thank You
                  </p>

                </section>

              </div>
            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Project;