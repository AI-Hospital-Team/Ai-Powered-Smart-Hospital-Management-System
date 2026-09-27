import Skeleton from "./Skeleton";

function SkeletonPatientMedicalRecords() {
  return (
    <div className="skeleton-patient-medical-records">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="skeleton-patient-medical-records-header">
        <div>
          <Skeleton
            type="title"
            className="skeleton-patient-records-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-patient-records-description"
          />
        </div>
      </div>


      {/* =====================================================
          RECORDS
      ===================================================== */}

      <div className="skeleton-patient-records-container">

        {[1, 2, 3, 4].map((item) => (
          <div
            className="skeleton-patient-record-card"
            key={item}
          >

            {/* Record Header */}

            <div className="skeleton-patient-record-header">

              <div className="skeleton-patient-record-title">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-record-icon"
                />

                <div>
                  <Skeleton
                    type="title"
                    className="skeleton-patient-record-name"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-date"
                  />
                </div>

              </div>


              <div className="skeleton-patient-record-actions">

                <Skeleton
                  type="button"
                  className="skeleton-patient-record-id"
                />

                <Skeleton
                  type="button"
                  className="skeleton-patient-record-delete"
                />

              </div>

            </div>


            {/* Record Information */}

            <div className="skeleton-patient-record-details">

              <div className="skeleton-patient-record-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-record-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-detail-value"
                  />
                </div>

              </div>


              <div className="skeleton-patient-record-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-record-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-detail-value"
                  />
                </div>

              </div>


              <div className="skeleton-patient-record-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-record-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-record-detail-value"
                  />
                </div>

              </div>

            </div>


            {/* Diagnosis */}

            <div className="skeleton-patient-record-section">

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-title"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-line"
              />

            </div>


            {/* Symptoms */}

            <div className="skeleton-patient-record-section">

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-title"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-line"
              />

            </div>


            {/* Treatment */}

            <div className="skeleton-patient-record-section">

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-title"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-line"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-record-section-line-short"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SkeletonPatientMedicalRecords;