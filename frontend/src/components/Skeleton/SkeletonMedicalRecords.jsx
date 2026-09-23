import Skeleton from "./Skeleton";

function SkeletonMedicalRecords() {
  return (
    <div className="skeleton-medical-records">

      {/* HEADER */}
      <div className="skeleton-medical-records-header">

        <div className="skeleton-medical-records-title-row">

          <Skeleton
            type="avatar"
            className="skeleton-medical-title-icon"
          />

          <div>
            <Skeleton
              type="text"
              className="skeleton-medical-label"
            />

            <Skeleton
              type="title"
              className="skeleton-medical-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-medical-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-medical-refresh"
        />

      </div>


      {/* SUMMARY */}
      <div className="skeleton-medical-summary">

        <Skeleton
          type="avatar"
          className="skeleton-medical-summary-icon"
        />

        <div>
          <Skeleton
            type="text"
            className="skeleton-medical-summary-label"
          />

          <Skeleton
            type="title"
            className="skeleton-medical-summary-number"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-medical-summary-small"
          />
        </div>

      </div>


      {/* TOOLBAR */}
      <div className="skeleton-medical-toolbar">

        <div>
          <Skeleton
            type="title"
            className="skeleton-medical-directory-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-medical-directory-description"
          />
        </div>

        <Skeleton
          type="input"
          className="skeleton-medical-search"
        />

      </div>


      {/* RECORD GRID */}
      <div className="skeleton-medical-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-medical-card"
            key={index}
          >

            {/* CARD HEADER */}
            <div className="skeleton-medical-card-top">

              <Skeleton
                type="avatar"
                className="skeleton-medical-patient-avatar"
              />

              <div className="skeleton-medical-patient-info">

                <Skeleton
                  type="text"
                  className="skeleton-medical-patient-name"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-medical-patient-id"
                />

              </div>

              <Skeleton
                type="text"
                className="skeleton-medical-record-id"
              />

            </div>


            {/* RECORD DATE */}
            <div className="skeleton-medical-date">

              <Skeleton
                type="small-avatar"
                className="skeleton-medical-small-icon"
              />

              <Skeleton
                type="text"
                className="skeleton-medical-date-label"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-medical-date-value"
              />

            </div>


            {/* DOCTOR */}
            <div className="skeleton-medical-doctor">

              <Skeleton
                type="small-avatar"
                className="skeleton-medical-doctor-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-medical-info-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-medical-doctor-name"
                />

                <Skeleton
                  type="text"
                  className="skeleton-medical-specialization"
                />
              </div>

            </div>


            {/* DIAGNOSIS */}
            <div className="skeleton-medical-diagnosis">

              <Skeleton
                type="small-avatar"
                className="skeleton-medical-diagnosis-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-medical-info-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-medical-diagnosis-value"
                />
              </div>

            </div>


            {/* TREATMENT */}
            <div className="skeleton-medical-treatment">

              <Skeleton
                type="text"
                className="skeleton-medical-treatment-label"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-medical-treatment-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-medical-treatment-line-short"
              />

            </div>


            {/* VIEW BUTTON */}
            <Skeleton
              type="button"
              className="skeleton-medical-view"
            />

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonMedicalRecords;