import Skeleton from "./Skeleton";

function SkeletonDoctorPrescriptions() {
  return (
    <div className="skeleton-doctor-prescriptions">

      {/* HEADER */}

      <div className="skeleton-doctor-prescriptions-header">

        <div className="skeleton-doctor-prescriptions-title-wrap">

          <Skeleton
            type="avatar"
            className="skeleton-doctor-prescriptions-title-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-doctor-prescriptions-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-prescriptions-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-doctor-prescriptions-add-button"
        />

      </div>


      {/* PRESCRIPTION CARDS */}

      <div className="skeleton-doctor-prescriptions-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-doctor-prescription-card"
            key={index}
          >

            {/* CARD HEADER */}

            <div className="skeleton-doctor-prescription-header">

              <div className="skeleton-doctor-prescription-title">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-prescription-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-prescription-medicine"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-prescription-diagnosis"
                  />
                </div>

              </div>

              <div className="skeleton-doctor-prescription-actions">

                <Skeleton
                  type="button"
                  className="skeleton-doctor-prescription-id"
                />

                <Skeleton
                  type="button"
                  className="skeleton-doctor-prescription-delete"
                />

              </div>

            </div>


            {/* PATIENT */}

            <div className="skeleton-doctor-prescription-patient">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-prescription-patient-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-patient-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-patient-name"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-prescription-patient-id"
                />
              </div>

            </div>


            {/* START DATE */}

            <div className="skeleton-doctor-prescription-date">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-prescription-date-icon"
              />

              <Skeleton
                type="text"
                className="skeleton-doctor-prescription-date-text"
              />

            </div>


            {/* END DATE */}

            <div className="skeleton-doctor-prescription-date">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-prescription-date-icon"
              />

              <Skeleton
                type="text"
                className="skeleton-doctor-prescription-date-text"
              />

            </div>


            {/* MEDICINE DETAILS */}

            <div className="skeleton-doctor-prescription-details">

              <div className="skeleton-doctor-prescription-detail-box">
                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-detail-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-detail-value"
                />
              </div>

              <div className="skeleton-doctor-prescription-detail-box">
                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-detail-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-detail-value"
                />
              </div>

              <div className="skeleton-doctor-prescription-detail-box">
                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-detail-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-prescription-detail-value"
                />
              </div>

            </div>


            {/* DIAGNOSIS */}

            <div className="skeleton-doctor-prescription-section">

              <Skeleton
                type="text"
                className="skeleton-doctor-prescription-section-title"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-prescription-section-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-prescription-section-line skeleton-prescription-line-short"
              />

            </div>


            {/* INSTRUCTIONS */}

            <div className="skeleton-doctor-prescription-section">

              <Skeleton
                type="text"
                className="skeleton-doctor-prescription-section-title"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-prescription-section-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-prescription-section-line skeleton-prescription-line-medium"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonDoctorPrescriptions;