import Skeleton from "./Skeleton";

function SkeletonPatients() {
  return (
    <div className="skeleton-patients">

      {/* Page Header */}
      <div className="skeleton-patients-header">
        <div className="skeleton-patients-heading">
          <Skeleton
            type="title"
            className="skeleton-patients-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-patients-description"
          />
        </div>

        <Skeleton
          type="button"
          className="skeleton-patients-refresh"
        />
      </div>

      {/* Total Patients */}
      <div className="skeleton-patients-summary">
        <Skeleton
          type="avatar"
          className="skeleton-summary-icon"
        />

        <div className="skeleton-summary-content">
          <Skeleton
            type="text"
            className="skeleton-summary-label"
          />

          <Skeleton
            type="title"
            className="skeleton-summary-number"
          />
        </div>
      </div>

      {/* Search / Toolbar */}
      <div className="skeleton-patients-toolbar">
        <Skeleton
          type="input"
          className="skeleton-patients-search"
        />
      </div>

      {/* Patient Cards */}
      <div className="skeleton-patients-grid">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="skeleton-patient-card"
            key={index}
          >

            {/* Card Header */}
            <div className="skeleton-patient-card-header">

              <Skeleton
                type="avatar"
                className="skeleton-patient-avatar"
              />

              <div className="skeleton-patient-name">
                <Skeleton
                  type="text"
                  className="skeleton-patient-name-line"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-patient-id"
                />
              </div>

            </div>

            {/* Patient Information */}
            <div className="skeleton-patient-info">

              <div className="skeleton-patient-info-item">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>

              <div className="skeleton-patient-info-item">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>

              <div className="skeleton-patient-info-item">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>

              <div className="skeleton-patient-info-item">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>

            </div>

            {/* Email */}
            <div className="skeleton-patient-email">
              <Skeleton type="text" />
            </div>

            {/* Actions */}
            <div className="skeleton-patient-actions">
              <Skeleton
                type="button"
                className="skeleton-patient-action"
              />

              <Skeleton
                type="button"
                className="skeleton-patient-action"
              />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SkeletonPatients;