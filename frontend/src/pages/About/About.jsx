import "./About.css";
import { useEffect, useState } from "react";
import "../../components/Skeleton/Skeleton.css";

function AboutSkeleton() {
  return (
    <div className="about-page skeleton-info-page">
      <header className="about-page-header skeleton-info-header">
        <div className="skeleton skeleton-info-back" />
        <div className="skeleton skeleton-info-header-label" />
      </header>

      <main className="about-container skeleton-info-container">
        <section className="about-hero skeleton-info-hero">
          <div className="skeleton skeleton-info-badge" />
          <div className="skeleton skeleton-info-hero-title" />
          <div className="skeleton skeleton-info-hero-title second" />
          <div className="skeleton skeleton-info-hero-text" />
          <div className="skeleton skeleton-info-hero-text second" />
        </section>

        <section className="team-grid skeleton-info-team-grid">
          {[1, 2].map((item) => (
            <article className="team-card skeleton-info-team-card" key={item}>
              <div className="skeleton skeleton-info-avatar" />
              <div className="skeleton skeleton-info-role" />
              <div className="skeleton skeleton-info-name" />
              <div className="skeleton skeleton-info-line" />
              <div className="skeleton skeleton-info-line" />
              <div className="skeleton skeleton-info-line short" />

              <div className="team-skills skeleton-info-tags">
                {Array.from({ length: 10 }, (_, index) => (
                  <div className="skeleton skeleton-info-tag" key={index} />
                ))}
              </div>

              <div className="team-links skeleton-info-links">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="skeleton skeleton-info-link" key={index} />
                ))}
              </div>

              <div className="skeleton skeleton-info-resume" />
            </article>
          ))}
        </section>

        <section className="academic-section skeleton-info-academic">
          <div className="skeleton skeleton-info-badge" />
          <div className="skeleton skeleton-info-academic-title" />

          <div className="academic-grid skeleton-info-academic-grid">
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="skeleton-info-academic-card" key={item}>
                <div className="skeleton skeleton-info-academic-label" />
                <div className="skeleton skeleton-info-academic-value" />
                <div className="skeleton skeleton-info-academic-value short" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AboutSkeleton />;
  }

  return (
    <div className="about-page">
      <header className="about-page-header">
        <a href="/" className="about-back">
          ← AI Smart Hospital
        </a>

        <span>About Us</span>
      </header>

      <main className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <span className="about-badge">✨ MEET THE TEAM</span>

          <h1>
            The People Behind
            <span> the Project</span>
          </h1>

          <p>
            We are developing the AI-Powered Smart Hospital
            Management System as an academic project with
            the goal of creating a smarter, intelligent and
            organized healthcare experience.
          </p>
        </section>

        {/* Team Section */}
        <section className="team-grid">
          <article className="team-card">
            <div className="team-avatar">PP</div>

            <span className="team-role">
              Java Developer &amp; AI Integration
            </span>

            <h2>Prathmesh Panmand</h2>

            <p>
              Working on Java development, Spring Boot,
              database management and AI integration while
              contributing to REST API development and
              intelligent hospital management features.
            </p>

            <div className="team-skills">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>AI Integration</span>
              <span>REST API</span>
              <span>MySQL</span>
              <span>Git &amp; GitHub</span>
              <span>React.js</span>
              <span>Ollama</span>
              <span>Vite</span>
              <span>LLM</span>
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

              <a href="mailto:prathmeshpanmand23@gmail.com">Email</a>
            </div>

            <a
              href="/resumes/Prathmesh_Panmand_Resume_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              View Resume →
            </a>
          </article>

          <article className="team-card">
            <div className="team-avatar">RW</div>

            <span className="team-role">
              Java Developer &amp; AI Integration
            </span>

            <h2>Radheshyam Wayal</h2>

            <p>
              Working on Java-based application development,
              AI integration, REST APIs and database management
              while contributing to the overall system design
              and intelligent healthcare features.
            </p>

            <div className="team-skills">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>AI Integration</span>
              <span>REST API</span>
              <span>MySQL</span>
              <span>Git &amp; GitHub</span>
              <span>React.js</span>
              <span>Ollama</span>
              <span>Vite</span>
              <span>LLM</span>
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

              <a href="mailto:shamwayal7@gmail.com">Email</a>
            </div>

            <a
              href="/resumes/Radheshyam-ResumeCurrent1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              View Resume →
            </a>
          </article>
        </section>

        {/* Academic Information */}
        <section className="academic-section">
          <span className="about-badge">
            🎓 ACADEMIC INFORMATION
          </span>

          <h2>Our Academic Journey</h2>

          <div className="academic-grid">
            <div>
              <strong>College</strong>
              <span>Samarth College Of Computer Science, Belhe</span>
            </div>

            <div>
              <strong>Course</strong>
              <span>BCA-(Science) Third Year</span>
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
