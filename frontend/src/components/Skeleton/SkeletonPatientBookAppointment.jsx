import Skeleton from "./Skeleton";

function SkeletonPatientBookAppointment() {
  return (
    <div className="skeleton-patient-book-appointment">

      {/* HEADER */}
      <div className="skeleton-book-header">

        <div className="skeleton-book-title-section">
          <Skeleton
            type="avatar"
            className="skeleton-book-title-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-book-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-book-description"
            />
          </div>
        </div>

        <Skeleton
          type="button"
          className="skeleton-book-back-button"
        />

      </div>


      {/* CONTENT */}
      <div className="skeleton-book-content">

        {/* HEALTH CARD */}
        <div className="skeleton-book-health-card">

          <Skeleton
            type="avatar"
            className="skeleton-book-health-icon"
          />

          <Skeleton
            type="title"
            className="skeleton-book-health-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-book-health-description"
          />

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="skeleton-book-health-feature"
              key={index}
            >
              <Skeleton
                type="small-avatar"
                className="skeleton-book-feature-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-book-feature-title"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-book-feature-text"
                />
              </div>
            </div>
          ))}

        </div>


        {/* BOOKING FORM */}
        <div className="skeleton-book-form-card">

          <Skeleton
            type="subtitle"
            className="skeleton-book-form-label"
          />

          <Skeleton
            type="input"
            className="skeleton-book-input"
          />


          <div className="skeleton-book-date-time">

            <div>
              <Skeleton
                type="subtitle"
                className="skeleton-book-form-label"
              />

              <Skeleton
                type="input"
                className="skeleton-book-input"
              />
            </div>

            <div>
              <Skeleton
                type="subtitle"
                className="skeleton-book-form-label"
              />

              <Skeleton
                type="input"
                className="skeleton-book-input"
              />
            </div>

          </div>


          <Skeleton
            type="subtitle"
            className="skeleton-book-form-label"
          />

          <Skeleton
            type="card"
            className="skeleton-book-textarea"
          />


          {/* NOTE */}
          <Skeleton
            type="subtitle"
            className="skeleton-book-note"
          />


          {/* ACTIONS */}
          <div className="skeleton-book-actions">

            <Skeleton
              type="button"
              className="skeleton-book-cancel"
            />

            <Skeleton
              type="button"
              className="skeleton-book-submit"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default SkeletonPatientBookAppointment;