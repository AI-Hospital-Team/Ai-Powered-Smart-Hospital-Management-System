import "./Project.css";

function Project() {
  return (
    <div className="project-page">

      <header className="project-page-header">

        <a href="/" className="project-back">
          ← AI Smart Hospital
        </a>

        <span>Our Project</span>

      </header>


      <main className="project-container">

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


        <section className="project-content">

          <div className="project-card">

            <h2>Project Overview</h2>

            <p>
              Our project focuses on developing a smart hospital
              management platform that helps organize healthcare
              services and provides a better digital experience
              for patients, doctors and hospital staff.
            </p>

          </div>


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
            </div>

          </div>


          <div className="project-card">

            <h2>Theory & Documentation</h2>

            <p>
              This section will contain our project theory,
              documentation, research work, system design,
              objectives and other academic materials.
            </p>

            <div className="document-buttons">

              <button>
                📄 Project Report
              </button>

              <button>
                📚 Theory Work
              </button>

              <button>
                📊 Project Presentation
              </button>

            </div>

          </div>


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

    </div>
  );
}

export default Project;