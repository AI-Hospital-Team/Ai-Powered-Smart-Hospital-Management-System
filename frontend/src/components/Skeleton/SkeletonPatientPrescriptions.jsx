import Skeleton from "./Skeleton";

function SkeletonPatientPrescriptions() {
  return (
    <div className="skeleton-patient-prescriptions">

      {/* PAGE HEADER */}
      <div className="skeleton-patient-prescriptions-header">
        <div className="skeleton-patient-prescriptions-heading">

          <Skeleton
            type="avatar"
            className="skeleton-patient-prescriptions-header-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-patient-prescriptions-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-patient-prescriptions-description"
            />
          </div>

        </div>
      </div>

      {/* PRESCRIPTION CARDS */}
      <div className="skeleton-patient-prescription-list">

        {[1, 2, 3].map((item) => (
          <div
            className="skeleton-patient-prescription-card"
            key={item}
          >

            {/* CARD HEADER */}
            <div className="skeleton-patient-prescription-card-header">

              <div className="skeleton-patient-prescription-title">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-medicine-icon"
                />

                <div>
                  <Skeleton
                    type="title"
                    className="skeleton-patient-prescription-name"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-prescription-start"
                  />
                </div>

              </div>

              <div className="skeleton-patient-prescription-actions">

                <Skeleton
                  type="button"
                  className="skeleton-patient-prescription-status"
                />

                <Skeleton
                  type="button"
                  className="skeleton-patient-prescription-delete"
                />

              </div>

            </div>

            {/* START / END DATE */}
            <div className="skeleton-patient-prescription-dates">

              {[1, 2].map((date) => (
                <div
                  className="skeleton-patient-prescription-date-box"
                  key={date}
                >

                  <Skeleton
                    type="avatar"
                    className="skeleton-patient-prescription-date-icon"
                  />

                  <div>
                    <Skeleton
                      type="text"
                      className="skeleton-patient-prescription-date-label"
                    />

                    <Skeleton
                      type="text"
                      className="skeleton-patient-prescription-date-value"
                    />
                  </div>

                </div>
              ))}

            </div>

            {/* DIAGNOSIS / DOCTOR */}
            <div className="skeleton-patient-prescription-info">

              {[1, 2].map((info) => (
                <div
                  className="skeleton-patient-prescription-info-box"
                  key={info}
                >

                  <Skeleton
                    type="avatar"
                    className="skeleton-patient-prescription-info-icon"
                  />

                  <div>
                    <Skeleton
                      type="text"
                      className="skeleton-patient-prescription-info-label"
                    />

                    <Skeleton
                      type="text"
                      className="skeleton-patient-prescription-info-value"
                    />
                  </div>

                </div>
              ))}

            </div>

            {/* MEDICINES */}
            <div className="skeleton-patient-medicine-section">

              <div className="skeleton-patient-section-heading">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-section-icon"
                />

                <Skeleton
                  type="text"
                  className="skeleton-patient-section-title"
                />

              </div>

              <div className="skeleton-patient-medicine-details">

                {[1, 2, 3, 4].map((medicine) => (
                  <div
                    className="skeleton-patient-medicine-detail"
                    key={medicine}
                  >

                    <Skeleton
                      type="text"
                      className="skeleton-patient-medicine-label"
                    />

                    <Skeleton
                      type="text"
                      className="skeleton-patient-medicine-value"
                    />

                  </div>
                ))}

              </div>

            </div>

            {/* INSTRUCTIONS */}
            <div className="skeleton-patient-instructions-section">

              <div className="skeleton-patient-section-heading">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-section-icon"
                />

                <Skeleton
                  type="text"
                  className="skeleton-patient-section-title"
                />

              </div>

              <Skeleton
                type="text"
                className="skeleton-patient-instruction-line"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-instruction-line-short"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SkeletonPatientPrescriptions;