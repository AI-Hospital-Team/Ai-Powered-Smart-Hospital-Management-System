import Skeleton from "./Skeleton";

function SkeletonDoctorMedicalRecords() {
  return (
    <div className="skeleton-doctor-records">

      {/* PAGE HEADER */}

      <div className="skeleton-doctor-records-header">

        <div className="skeleton-doctor-records-title-wrap">

          <Skeleton
            type="avatar"
            className="skeleton-doctor-records-title-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-doctor-records-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-records-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-doctor-records-add-button"
        />

      </div>


      {/* RECORD CARDS */}

      <div className="skeleton-doctor-records-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-doctor-record-card"
            key={index}
          >

            {/* RECORD HEADER */}

            <div className="skeleton-doctor-record-card-header">

              <div className="skeleton-doctor-record-title">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-record-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-record-name"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-record-date"
                  />
                </div>

              </div>

              <div className="skeleton-doctor-record-actions">

                <Skeleton
                  type="button"
                  className="skeleton-doctor-record-id"
                />

                <Skeleton
                  type="button"
                  className="skeleton-doctor-record-delete"
                />

              </div>

            </div>


            {/* PATIENT */}

            <div className="skeleton-doctor-record-patient">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-record-patient-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-record-patient-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-record-patient-name"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-record-patient-id"
                />
              </div>

            </div>


            {/* RECORD DATE */}

            <div className="skeleton-doctor-record-info">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-record-info-icon"
              />

              <Skeleton
                type="text"
                className="skeleton-doctor-record-info-text"
              />

            </div>


            {/* FOLLOW-UP */}

            <div className="skeleton-doctor-record-info">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-record-info-icon"
              />

              <Skeleton
                type="text"
                className="skeleton-doctor-record-info-text skeleton-followup-text"
              />

            </div>


            {/* CONTENT */}

            <div className="skeleton-doctor-record-section">

              <Skeleton
                type="text"
                className="skeleton-doctor-record-section-title"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-record-section-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-record-section-line skeleton-line-short"
              />

            </div>


            <div className="skeleton-doctor-record-section">

              <Skeleton
                type="text"
                className="skeleton-doctor-record-section-title"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-record-section-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-record-section-line skeleton-line-medium"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonDoctorMedicalRecords;