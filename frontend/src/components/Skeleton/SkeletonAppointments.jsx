import Skeleton from "./Skeleton";

function SkeletonAppointments() {
  return (
    <div className="skeleton-appointments">

      {/* HEADER */}
      <div className="skeleton-appointments-header">

        <div className="skeleton-appointments-title-row">

          <Skeleton
            type="avatar"
            className="skeleton-appointments-title-icon"
          />

          <div>
            <Skeleton
              type="text"
              className="skeleton-appointments-label"
            />

            <Skeleton
              type="title"
              className="skeleton-appointments-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-appointments-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-appointments-refresh"
        />

      </div>


      {/* STATISTICS */}
      <div className="skeleton-appointment-stats">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="skeleton-appointment-stat"
            key={index}
          >

            <Skeleton
              type="avatar"
              className="skeleton-appointment-stat-icon"
            />

            <div>
              <Skeleton
                type="text"
                className="skeleton-appointment-stat-label"
              />

              <Skeleton
                type="title"
                className="skeleton-appointment-stat-number"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-appointment-stat-small"
              />
            </div>

          </div>
        ))}

      </div>


      {/* TOOLBAR */}
      <div className="skeleton-appointments-toolbar">

        <div>
          <Skeleton
            type="title"
            className="skeleton-appointments-directory-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-appointments-directory-description"
          />
        </div>

        <Skeleton
          type="input"
          className="skeleton-appointments-search"
        />

      </div>


      {/* FILTERS */}
      <div className="skeleton-appointment-filters">

        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            type="button"
            className="skeleton-appointment-filter"
          />
        ))}

      </div>


      {/* APPOINTMENT GRID */}
      <div className="skeleton-appointments-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-appointment-card"
            key={index}
          >

            {/* CARD TOP */}
            <div className="skeleton-appointment-card-top">

              <Skeleton
                type="avatar"
                className="skeleton-appointment-date-icon"
              />

              <div className="skeleton-appointment-main">

                <Skeleton
                  type="text"
                  className="skeleton-appointment-patient"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-appointment-id"
                />

              </div>

              <Skeleton
                type="button"
                className="skeleton-appointment-status"
              />

            </div>


            {/* DOCTOR */}
            <div className="skeleton-appointment-doctor">

              <Skeleton
                type="small-avatar"
                className="skeleton-appointment-small-icon"
              />

              <div>

                <Skeleton
                  type="text"
                  className="skeleton-appointment-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-appointment-doctor-name"
                />

                <Skeleton
                  type="text"
                  className="skeleton-appointment-specialization"
                />

              </div>

            </div>


            {/* DATE / TIME */}
            <div className="skeleton-appointment-info">

              <div>
                <Skeleton
                  type="small-avatar"
                  className="skeleton-appointment-info-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-info-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-info-value"
                  />
                </div>
              </div>

              <div>
                <Skeleton
                  type="small-avatar"
                  className="skeleton-appointment-info-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-info-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-info-value"
                  />
                </div>
              </div>

            </div>


            {/* REASON */}
            <div className="skeleton-appointment-reason">

              <Skeleton
                type="text"
                className="skeleton-reason-label"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-reason-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-reason-line-short"
              />

            </div>


            {/* ACTIONS */}
            <div className="skeleton-appointment-actions">

              <Skeleton
                type="button"
                className="skeleton-appointment-action"
              />

              <Skeleton
                type="button"
                className="skeleton-appointment-action"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonAppointments;