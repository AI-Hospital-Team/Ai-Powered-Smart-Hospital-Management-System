import "./About.css";

function About() {
  return (
    <div className="about-page">

      <header className="about-page-header">
        <a href="/" className="about-back">
          ← AI Smart Hospital
        </a>

        <span>About Us</span>
      </header>


      <main className="about-container">

        <section className="about-hero">

          <span className="about-badge">
            ✨ MEET THE TEAM
          </span>

          <h1>
            The People Behind
            <span> the Project</span>
          </h1>

          <p>
            We are developing the AI-Powered Smart Hospital
            Management System as an academic project with
            the goal of creating a smarter and more organized
            healthcare experience.
          </p>

        </section>


        <section className="team-grid">

          {/* Radheshyam */}
          <article className="team-card">

            <div className="team-avatar">
              RW
            </div>

            <span className="team-role">
              Backend Developer
            </span>

            <h2>Radheshyam Wayal</h2>

            <p>
              Working on backend development, database
              management and system integration while
              collaborating on the overall project.
            </p>

            <div className="team-skills">
              <span>Frontend</span>
              <span>Git & GitHub</span>
              <span>Java</span>
              <span>MySQL</span>
            </div>

            <div className="team-links">

              <a
                href="https://www.linkedin.com/in/radheshyam-wayal-203ab3416/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/Radheshamwayal7"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://www.instagram.com/___sham.68/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

              <a href="mailto:shamwayal7@gmail.com">
                Email
              </a>

            </div>

            <button className="resume-button">
              View Resume →
            </button>

          </article>


          {/* Prathmesh */}
          <article className="team-card">

            <div className="team-avatar">
              PP
            </div>

            <span className="team-role">
              Frontend Developer
            </span>

            <h2>Prathmesh Panmand</h2>

            <p>
              Working on frontend development, user experience
              and interface design while collaborating on the
              overall project.
            </p>

            <div className="team-skills">
              <span>Frontend</span>
              <span>Git & GitHub</span>
              <span>MySQL</span>
              <span>MongoDB</span>
              <span>Postman API</span>
            </div>

            <div className="team-links">

              <a
                href="https://www.linkedin.com/in/prathmesh-panmand-aa696316/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/prathmesh235"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://www.instagram.com/prathmesh_235/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

            </div>

            <button className="resume-button">
              View Resume →
            </button>

          </article>

        </section>


        <section className="academic-section">

          <span className="about-badge">
            🎓 ACADEMIC INFORMATION
          </span>

          <h2>Our Academic Journey</h2>

          <div className="academic-grid">

            <div>
              <strong>College</strong>
              <span>
                Samarth College Of Computer Sci, Belhe
              </span>
            </div>

            <div>
              <strong>Course</strong>
              <span>BCA — Third Year</span>
            </div>

            <div>
              <strong>Duration</strong>
              <span>2024 – 2027</span>
            </div>

            <div>
              <strong>Project Guide</strong>
              <span>Miss K. Y. Yendhe Mam</span>
            </div>

            <div>
              <strong>Academic Year</strong>
              <span>2026 – 27</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default About;