import "./Skeleton.css";

export default function SkeletonInfoPage() {
  return (
    <div className="skeleton-info-page">
      <header className="skeleton-info-header">
        <div className="skeleton skeleton-info-back" />
        <div className="skeleton skeleton-info-header-label" />
      </header>

      <main className="skeleton-info-container">
        <section className="skeleton-info-hero">
          <div className="skeleton skeleton-info-badge" />
          <div className="skeleton skeleton-info-hero-title" />
          <div className="skeleton skeleton-info-hero-title second" />
          <div className="skeleton skeleton-info-hero-text" />
          <div className="skeleton skeleton-info-hero-text second" />
        </section>

        <section className="skeleton-info-team-grid">
          {[1, 2].map((item) => (
            <div className="skeleton-info-team-card" key={item}>
              <div className="skeleton skeleton-info-avatar" />
              <div className="skeleton skeleton-info-role" />
              <div className="skeleton skeleton-info-name" />
              <div className="skeleton skeleton-info-line" />
              <div className="skeleton skeleton-info-line" />
              <div className="skeleton skeleton-info-line short" />

              <div className="skeleton-info-tags">
                <div className="skeleton skeleton-info-tag" />
                <div className="skeleton skeleton-info-tag" />
                <div className="skeleton skeleton-info-tag" />
              </div>

              <div className="skeleton-info-links">
                <div className="skeleton skeleton-info-link" />
                <div className="skeleton skeleton-info-link" />
              </div>

              <div className="skeleton skeleton-info-resume" />
            </div>
          ))}
        </section>

        <section className="skeleton-info-academic">
          <div className="skeleton skeleton-info-academic-title" />
          <div className="skeleton-info-academic-grid">
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