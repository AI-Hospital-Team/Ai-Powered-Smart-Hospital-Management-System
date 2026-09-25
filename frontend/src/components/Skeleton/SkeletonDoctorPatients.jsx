import Skeleton from "./Skeleton";

function SkeletonDoctorPatients() {
  return (
    <div className="skeleton-doctor-patients">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="skeleton-doctor-patients-header">

        <div className="skeleton-doctor-patients-title-wrap">

          <Skeleton
            type="avatar"
            className="skeleton-doctor-patients-title-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-doctor-patients-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-patients-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-doctor-patients-count"
        />

      </div>


      {/* =================================================
          PATIENT CARDS
      ================================================= */}

      <div className="skeleton-doctor-patients-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-doctor-patient-card"
            key={index}
          >

            {/* Card Header */}

            <div className="skeleton-doctor-patient-card-header">

              <div className="skeleton-doctor-patient-title">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-patient-avatar"
                />

                <div className="skeleton-doctor-patient-name-wrap">

                  <Skeleton
                    type="text"
                    className="skeleton-doctor-patient-name"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-patient-id"
                  />

                </div>

              </div>

              <Skeleton
                type="text"
                className="skeleton-doctor-patient-card-id"
              />

            </div>


            {/* Patient Details */}

            <div className="skeleton-doctor-patient-details">

              <div className="skeleton-doctor-patient-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-patient-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-patient-detail-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-patient-detail-value"
                  />
                </div>

              </div>


              <div className="skeleton-doctor-patient-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-patient-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-patient-detail-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-patient-detail-value"
                  />
                </div>

              </div>

            </div>


            {/* View Patient */}

            <div className="skeleton-doctor-patient-view">

              <Skeleton
                type="button"
                className="skeleton-doctor-patient-view-button"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonDoctorPatients;