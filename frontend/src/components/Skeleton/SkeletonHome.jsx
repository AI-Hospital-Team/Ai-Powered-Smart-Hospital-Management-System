import Skeleton from "./Skeleton";

function SkeletonHome() {
  return (
    <div className="skeleton-home">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="skeleton-home-header">
        <div className="skeleton-home-brand">
          <Skeleton type="avatar" className="skeleton-home-logo" />

          <div>
            <Skeleton type="title" className="skeleton-home-brand-title" />
            <Skeleton
              type="subtitle"
              className="skeleton-home-brand-subtitle"
            />
          </div>
        </div>

        <nav className="skeleton-home-nav">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              type="text"
              className="skeleton-home-nav-item"
            />
          ))}
        </nav>

        <div className="skeleton-home-actions">
          <Skeleton type="button" className="skeleton-home-action-btn" />
          <Skeleton type="button" className="skeleton-home-action-btn" />
        </div>
      </header>

{/* =====================================================
    PROJECT INTRODUCTION
===================================================== */}
<section className="skeleton-home-project">

  {/* TOP ROW */}
  <div className="skeleton-project-top">

    {/* EDUCATIONAL PROJECT */}
    <div className="skeleton-project-badge">
      <Skeleton
        type="avatar"
        className="skeleton-project-badge-icon"
      />

      <Skeleton
        type="text"
        className="skeleton-project-badge-text"
      />
    </div>


    {/* PROJECT TEAM */}
    <div className="skeleton-project-team">

      <Skeleton
        type="avatar"
        className="skeleton-project-team-icon"
      />

      <div className="skeleton-project-team-info">
        <Skeleton
          type="text"
          className="skeleton-project-team-label"
        />

        <Skeleton
          type="title"
          className="skeleton-project-team-name"
        />
      </div>

    </div>


    {/* GITHUB */}
    <div className="skeleton-project-github">

      <Skeleton
        type="avatar"
        className="skeleton-project-github-icon"
      />

      <Skeleton
        type="title"
        className="skeleton-project-github-text"
      />

      <Skeleton
        type="text"
        className="skeleton-project-github-arrow"
      />

    </div>

  </div>


  {/* MAIN CONTENT */}
  <div className="skeleton-project-main">

    {/* LEFT */}
    <div className="skeleton-project-heading">

      <Skeleton
        type="subtitle"
        className="skeleton-project-kicker"
      />

      <Skeleton
        type="title"
        className="skeleton-project-welcome"
      />

    </div>


    {/* RIGHT */}
    <div className="skeleton-project-description">

      <Skeleton
        type="subtitle"
        className="skeleton-project-paragraph"
      />

      <Skeleton
        type="subtitle"
        className="skeleton-project-paragraph"
      />

    </div>

  </div>


  {/* THREE HIGHLIGHT CARDS */}
  <div className="skeleton-project-highlights">

    {/* AI & TECHNOLOGY */}
    <div className="skeleton-project-highlight">

      <Skeleton
        type="avatar"
        className="skeleton-project-highlight-icon"
      />

      <div className="skeleton-project-highlight-content">

        <Skeleton
          type="title"
          className="skeleton-project-highlight-title"
        />

        <Skeleton
          type="subtitle"
          className="skeleton-project-highlight-text"
        />

        <Skeleton
          type="subtitle"
          className="skeleton-project-highlight-text short"
        />

      </div>

    </div>


    {/* DIGITAL HEALTHCARE */}
    <div className="skeleton-project-highlight">

      <Skeleton
        type="avatar"
        className="skeleton-project-highlight-icon"
      />

      <div className="skeleton-project-highlight-content">

        <Skeleton
          type="title"
          className="skeleton-project-highlight-title"
        />

        <Skeleton
          type="subtitle"
          className="skeleton-project-highlight-text"
        />

        <Skeleton
          type="subtitle"
          className="skeleton-project-highlight-text short"
        />

      </div>

    </div>


    {/* LEARNING & INNOVATION */}
    <div className="skeleton-project-highlight">

      <Skeleton
        type="avatar"
        className="skeleton-project-highlight-icon"
      />

      <div className="skeleton-project-highlight-content">

        <Skeleton
          type="title"
          className="skeleton-project-highlight-title"
        />

        <Skeleton
          type="subtitle"
          className="skeleton-project-highlight-text"
        />

        <Skeleton
          type="subtitle"
          className="skeleton-project-highlight-text short"
        />

      </div>

    </div>

  </div>

</section>

       {/* =====================================================
          HERO
      ===================================================== */}
      <section className="skeleton-home-hero">

        <div className="skeleton-hero-content">

          <Skeleton
            type="subtitle"
            className="skeleton-hero-badge"
          />

          <Skeleton
            type="title"
            className="skeleton-hero-title"
          />

          <Skeleton
            type="title"
            className="skeleton-hero-title short"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-hero-description"
          />

          <div className="skeleton-hero-actions">
            <Skeleton type="button" />
            <Skeleton type="button" />
          </div>

          <div className="skeleton-hero-features">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                type="text"
                className="skeleton-hero-feature"
              />
            ))}
          </div>
        </div>


        <div className="skeleton-hero-card">

          <Skeleton
            type="avatar"
            className="skeleton-hero-card-logo"
          />

          <Skeleton
            type="title"
            className="skeleton-hero-card-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-hero-card-text"
          />

          <div className="skeleton-hero-tools">
            <Skeleton type="card" />
            <Skeleton type="card" />
          </div>

          <Skeleton
            type="subtitle"
            className="skeleton-hero-card-footer"
          />
        </div>

      </section>


      {/* =====================================================
          SERVICES HEADING
      ===================================================== */}
      <div className="skeleton-home-section-heading">
        <Skeleton type="subtitle" />
        <Skeleton type="title" />
        <Skeleton type="subtitle" />
      </div>


      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section className="skeleton-home-services">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="skeleton-service-card"
            key={index}
          >
            <Skeleton
              type="avatar"
              className="skeleton-service-icon"
            />

            <Skeleton
              type="title"
              className="skeleton-service-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-service-text"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-service-text short"
            />

            <Skeleton
              type="text"
              className="skeleton-service-link"
            />
          </div>
        ))}

      </section>


      {/* =====================================================
          HEALTHCARE GALLERY
      ===================================================== */}
      <section className="skeleton-home-gallery">

        <div className="skeleton-gallery-large">
          <Skeleton type="card" />
        </div>

        <div className="skeleton-gallery-small">
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>

      </section>


      {/* =====================================================
          AYUSHMAN / INSURANCE
      ===================================================== */}
      <section className="skeleton-home-insurance">

        <div className="skeleton-insurance-content">

          <Skeleton
            type="subtitle"
            className="skeleton-insurance-label"
          />

          <Skeleton
            type="title"
            className="skeleton-insurance-title"
          />

          <Skeleton
            type="title"
            className="skeleton-insurance-title short"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-insurance-text"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-insurance-text"
          />

          <Skeleton
            type="button"
            className="skeleton-insurance-button"
          />

        </div>

        <Skeleton
          type="card"
          className="skeleton-insurance-image"
        />

      </section>


      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}
      <div className="skeleton-home-section-heading">
        <Skeleton type="subtitle" />
        <Skeleton type="title" />
        <Skeleton type="subtitle" />
      </div>

      <section className="skeleton-home-departments">

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className="skeleton-department-card"
            key={index}
          >
            <Skeleton
              type="avatar"
              className="skeleton-department-icon"
            />

            <Skeleton
              type="title"
              className="skeleton-department-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-department-text"
            />

            <Skeleton
              type="text"
              className="skeleton-department-link"
            />
          </div>
        ))}

      </section>


      {/* =====================================================
          DOCTORS
      ===================================================== */}
      <div className="skeleton-home-section-heading">
        <Skeleton type="subtitle" />
        <Skeleton type="title" />
        <Skeleton type="subtitle" />
      </div>

      <section className="skeleton-home-doctors">

        {Array.from({ length: 4 }).map((_, index) => (
          <article
            className="skeleton-doctor-card"
            key={index}
          >
            <Skeleton
              type="avatar"
              className="skeleton-doctor-photo"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-status"
            />

            <Skeleton
              type="title"
              className="skeleton-doctor-name"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-specialization"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-description"
            />

            <div className="skeleton-doctor-bottom">
              <Skeleton type="text" />
              <Skeleton type="text" />
            </div>
          </article>
        ))}

      </section>


      {/* =====================================================
          DOCTOR AVAILABILITY
      ===================================================== */}
      <div className="skeleton-home-section-heading">
        <Skeleton type="subtitle" />
        <Skeleton type="title" />
        <Skeleton type="subtitle" />
      </div>

      <section className="skeleton-home-availability">

        {/* DAY SHIFT */}
        <div className="skeleton-shift-column">

          <div className="skeleton-shift-header">

            <Skeleton
              type="avatar"
              className="skeleton-shift-header-icon"
            />

            <div>
              <Skeleton type="title" />
              <Skeleton type="subtitle" />
            </div>

          </div>


          <div className="skeleton-shift-doctor-list">

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className="skeleton-shift-doctor"
                key={index}
              >
                <Skeleton
                  type="avatar"
                  className="skeleton-shift-avatar"
                />

                <div className="skeleton-shift-info">
                  <Skeleton type="text" />
                  <Skeleton type="subtitle" />
                </div>

                <Skeleton
                  type="text"
                  className="skeleton-shift-status"
                />
              </div>
            ))}

          </div>

        </div>


        {/* NIGHT SHIFT */}
        <div className="skeleton-shift-column">

          <div className="skeleton-shift-header">

            <Skeleton
              type="avatar"
              className="skeleton-shift-header-icon"
            />

            <div>
              <Skeleton type="title" />
              <Skeleton type="subtitle" />
            </div>

          </div>


          <div className="skeleton-shift-doctor-list">

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className="skeleton-shift-doctor"
                key={index}
              >
                <Skeleton
                  type="avatar"
                  className="skeleton-shift-avatar"
                />

                <div className="skeleton-shift-info">
                  <Skeleton type="text" />
                  <Skeleton type="subtitle" />
                </div>

                <Skeleton
                  type="text"
                  className="skeleton-shift-status"
                />
              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT AI SMART HOSPITAL
      ===================================================== */}
      <section className="skeleton-home-about">

        <div className="skeleton-about-content">

          <Skeleton type="subtitle" />

          <Skeleton type="title" />
          <Skeleton
            type="title"
            className="short"
          />

          <Skeleton type="subtitle" />
          <Skeleton type="subtitle" />

          <div className="skeleton-about-features">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="skeleton-about-feature"
                key={index}
              >
                <Skeleton type="small-avatar" />

                <div>
                  <Skeleton type="text" />
                  <Skeleton type="subtitle" />
                </div>
              </div>
            ))}

          </div>

        </div>


        <div className="skeleton-about-card">

          <Skeleton type="avatar" />
          <Skeleton type="title" />
          <Skeleton type="subtitle" />

          <Skeleton
            type="card"
            className="skeleton-about-inner-card"
          />

        </div>

      </section>


      {/* =====================================================
          AI HEALTHCARE CHATBOT
      ===================================================== */}
      <section className="skeleton-home-chat">

        <div className="skeleton-chat-intro">

          <Skeleton type="avatar" />

          <div>
            <Skeleton type="subtitle" />
            <Skeleton type="title" />
            <Skeleton type="subtitle" />
          </div>

        </div>


        <div className="skeleton-chat-window">

          <div className="skeleton-chat-header">

            <Skeleton type="avatar" />

            <div>
              <Skeleton type="text" />
              <Skeleton type="subtitle" />
            </div>

            <Skeleton
              type="button"
              className="skeleton-chat-clear"
            />

          </div>


          <div className="skeleton-chat-messages">

            <Skeleton
              type="card"
              className="skeleton-message bot"
            />

            <Skeleton
              type="card"
              className="skeleton-message user"
            />

            <Skeleton
              type="card"
              className="skeleton-message bot"
            />

          </div>


          <div className="skeleton-chat-input">

            <Skeleton type="input" />

            <Skeleton type="button" />

          </div>

        </div>

      </section>


      {/* =====================================================
          HOSPITAL INFORMATION
      ===================================================== */}
      <section className="skeleton-home-info">

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="skeleton-info-card"
            key={index}
          >
            <Skeleton type="avatar" />
            <Skeleton type="title" />
            <Skeleton type="subtitle" />
            <Skeleton type="subtitle" />
            <Skeleton type="text" />
          </div>
        ))}

      </section>


      {/* =====================================================
          AI HEALTHCARE
      ===================================================== */}
      <section className="skeleton-home-ai">

        <div className="skeleton-ai-content">

          <Skeleton type="subtitle" />

          <Skeleton type="title" />

          <Skeleton
            type="title"
            className="short"
          />

          <Skeleton type="subtitle" />
          <Skeleton type="subtitle" />

          <Skeleton type="button" />

        </div>


        <div className="skeleton-ai-visual">

          <Skeleton
            type="avatar"
            className="skeleton-ai-core"
          />

          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              type="card"
              className={`skeleton-ai-feature skeleton-ai-feature-${index + 1}`}
            />
          ))}

        </div>

      </section>


      {/* =====================================================
          PATIENT SUPPORT / CONTACT
      ===================================================== */}
      <section className="skeleton-home-support">

        <div className="skeleton-support-heading">

          <Skeleton type="subtitle" />
          <Skeleton type="title" />
          <Skeleton type="subtitle" />

        </div>


        <div className="skeleton-support-cards">

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="skeleton-support-card"
              key={index}
            >
              <Skeleton type="avatar" />

              <div>
                <Skeleton type="subtitle" />
                <Skeleton type="title" />
                <Skeleton type="text" />
              </div>
            </div>
          ))}

        </div>


        <Skeleton
          type="subtitle"
          className="skeleton-support-footer"
        />

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="skeleton-home-footer">

        <div className="skeleton-footer-main">

          {/* BRAND */}
          <div className="skeleton-footer-brand">

            <div className="skeleton-footer-logo">

              <Skeleton type="avatar" />

              <div>
                <Skeleton type="title" />
                <Skeleton type="subtitle" />
              </div>

            </div>

            <Skeleton type="subtitle" />
            <Skeleton type="subtitle" />

            <Skeleton
              type="button"
              className="skeleton-footer-social"
            />

          </div>


          {/* QUICK LINKS */}
          <div className="skeleton-footer-column">

            <Skeleton type="title" />

            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                type="text"
                key={index}
              />
            ))}

          </div>


          {/* SERVICES */}
          <div className="skeleton-footer-column">

            <Skeleton type="title" />

            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                type="text"
                key={index}
              />
            ))}

          </div>


          {/* CONTACT */}
          <div className="skeleton-footer-contact">

            <Skeleton type="title" />

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="skeleton-footer-contact-item"
                key={index}
              >
                <Skeleton type="small-avatar" />
                <Skeleton type="text" />
              </div>
            ))}

            <Skeleton
              type="card"
              className="skeleton-footer-emergency"
            />

          </div>

        </div>


        {/* PROJECT FOOTER */}
        <div className="skeleton-footer-project">

          <Skeleton type="subtitle" />
          <Skeleton type="title" />
          <Skeleton type="subtitle" />

        </div>


        {/* FOOTER BOTTOM */}
        <div className="skeleton-footer-bottom">

          <Skeleton type="text" />
          <Skeleton type="text" />
          <Skeleton type="text" />

        </div>

      </footer>

    </div>
  );
}

export default SkeletonHome;