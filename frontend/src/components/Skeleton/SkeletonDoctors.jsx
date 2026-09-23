import Skeleton from "./Skeleton";

function SkeletonDoctors() {
  return (
    <div className="skeleton-doctors">

      {/* PAGE HEADER */}
      <div className="skeleton-doctors-header">

        <div className="skeleton-doctors-title-area">

          <div className="skeleton-doctors-title-row">
            <Skeleton
              type="avatar"
              className="skeleton-doctors-title-icon"
            />

            <div>
              <Skeleton
                type="text"
                className="skeleton-doctors-section-label"
              />

              <Skeleton
                type="title"
                className="skeleton-doctors-title"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctors-description"
              />
            </div>
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-doctors-refresh"
        />

      </div>


      {/* SUMMARY */}
      <div className="skeleton-doctors-summary">

        <Skeleton
          type="avatar"
          className="skeleton-doctors-summary-icon"
        />

        <div className="skeleton-doctors-summary-content">

          <Skeleton
            type="text"
            className="skeleton-doctors-summary-label"
          />

          <Skeleton
            type="title"
            className="skeleton-doctors-summary-number"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-doctors-summary-small"
          />

        </div>

      </div>


      {/* TOOLBAR */}
      <div className="skeleton-doctors-toolbar">

        <div className="skeleton-doctors-toolbar-heading">

          <Skeleton
            type="title"
            className="skeleton-doctors-directory-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-doctors-directory-description"
          />

        </div>

        <Skeleton
          type="input"
          className="skeleton-doctors-search"
        />

      </div>


      {/* DOCTOR GRID */}
      <div className="skeleton-doctors-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-doctor-card"
            key={index}
          >

            {/* CARD TOP */}
            <div className="skeleton-doctor-card-top">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-avatar"
              />

              <div className="skeleton-doctor-name">

                <Skeleton
                  type="text"
                  className="skeleton-doctor-name-line"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-id"
                />

              </div>

              <Skeleton
                type="small-avatar"
                className="skeleton-doctor-status-dot"
              />

            </div>


            {/* SPECIALIZATION */}
            <div className="skeleton-doctor-info-row">

              <Skeleton
                type="small-avatar"
                className="skeleton-doctor-info-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-info-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-info-value"
                />
              </div>

            </div>


            {/* SHIFT */}
            <div className="skeleton-doctor-info-row">

              <Skeleton
                type="small-avatar"
                className="skeleton-doctor-info-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-info-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-info-value"
                />
              </div>

            </div>


            {/* STATUS */}
            <div className="skeleton-doctor-status-row">

              <Skeleton
                type="small-avatar"
                className="skeleton-doctor-info-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-info-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-status-value"
                />
              </div>

              <Skeleton
                type="small-avatar"
                className="skeleton-doctor-verified"
              />

            </div>


            {/* VIEW BUTTON */}
            <Skeleton
              type="button"
              className="skeleton-doctor-view"
            />


            {/* APPROVE / REJECT */}
            <div className="skeleton-doctor-actions">

              <Skeleton
                type="button"
                className="skeleton-doctor-action"
              />

              <Skeleton
                type="button"
                className="skeleton-doctor-action"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonDoctors;