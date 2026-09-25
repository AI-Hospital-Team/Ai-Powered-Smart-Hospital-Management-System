import Skeleton from "./Skeleton";

function SkeletonDoctorDashboard() {
  return (
    <div className="skeleton-doctor-dashboard">

      <section className="skeleton-doctor-welcome">
        <div className="skeleton-doctor-welcome-content">
          <Skeleton type="button" className="skeleton-doctor-badge" />

          <Skeleton type="title" className="skeleton-doctor-welcome-title" />

          <Skeleton type="subtitle" className="skeleton-doctor-welcome-description" />

          <div className="skeleton-doctor-welcome-info">
            <div>
              <Skeleton type="text" className="skeleton-doctor-info-label" />
              <Skeleton type="text" className="skeleton-doctor-info-value" />
            </div>

            <div>
              <Skeleton type="text" className="skeleton-doctor-info-label" />
              <Skeleton type="text" className="skeleton-doctor-info-value skeleton-doctor-info-value-wide" />
            </div>
          </div>
        </div>

        <Skeleton type="avatar" className="skeleton-doctor-welcome-icon" />
      </section>

      <section className="skeleton-doctor-stat-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="skeleton-doctor-stat-card" key={item}>
            <Skeleton type="avatar" className="skeleton-doctor-stat-icon" />
            <div className="skeleton-doctor-stat-content">
              <Skeleton type="text" className="skeleton-doctor-stat-label" />
              <Skeleton type="title" className="skeleton-doctor-stat-number" />
            </div>
          </div>
        ))}
      </section>

      <section className="skeleton-doctor-dashboard-grid">

        <div className="skeleton-doctor-dashboard-card">
          <div className="skeleton-doctor-card-header">
            <div>
              <Skeleton type="text" className="skeleton-doctor-card-title" />
              <Skeleton type="text" className="skeleton-doctor-card-subtitle" />
            </div>
            <Skeleton type="button" className="skeleton-doctor-view-all" />
          </div>

          <div className="skeleton-doctor-appointment-list">
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="skeleton-doctor-appointment-item" key={item}>
                <Skeleton type="avatar" className="skeleton-doctor-appointment-icon" />

                <div className="skeleton-doctor-appointment-main">
                  <Skeleton type="text" className="skeleton-doctor-appointment-name" />
                  <Skeleton type="text" className="skeleton-doctor-appointment-meta" />
                </div>

                <Skeleton type="button" className="skeleton-doctor-status" />
              </div>
            ))}
          </div>
        </div>

        <div className="skeleton-doctor-dashboard-card">
          <div className="skeleton-doctor-card-header">
            <div>
              <Skeleton type="text" className="skeleton-doctor-card-title" />
              <Skeleton type="text" className="skeleton-doctor-card-subtitle" />
            </div>
            <Skeleton type="button" className="skeleton-doctor-view-all" />
          </div>

          <div className="skeleton-doctor-patient-list">
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="skeleton-doctor-patient-item" key={item}>
                <Skeleton type="avatar" className="skeleton-doctor-patient-avatar" />

                <div className="skeleton-doctor-patient-main">
                  <Skeleton type="text" className="skeleton-doctor-patient-name" />
                  <Skeleton type="text" className="skeleton-doctor-patient-id" />
                </div>

                <Skeleton type="button" className="skeleton-doctor-patient-view" />
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}

export default SkeletonDoctorDashboard;
