import Skeleton from "./Skeleton";

function SkeletonPatientAppointments() {
  return (
    <div className="skeleton-patient-appointments">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="skeleton-patient-appointments-header">

        <div>
          <Skeleton
            type="title"
            className="skeleton-patient-appointments-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-patient-appointments-description"
          />
        </div>

        <Skeleton
          type="button"
          className="skeleton-patient-book-button"
        />

      </div>


      {/* =====================================================
          APPOINTMENT CARDS
      ===================================================== */}

      <div className="skeleton-patient-appointments-list">

        {[1, 2, 3].map((item) => (
          <div
            className="skeleton-patient-appointment-card"
            key={item}
          >

            {/* Card Header */}

            <div className="skeleton-patient-appointment-card-header">

              <div className="skeleton-patient-doctor-info">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-doctor-icon"
                />

                <div className="skeleton-patient-doctor-text">

                  <Skeleton
                    type="title"
                    className="skeleton-patient-doctor-name"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-doctor-specialization"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-doctor-id"
                  />

                </div>

              </div>

              <Skeleton
                type="button"
                className="skeleton-patient-appointment-status"
              />

            </div>


            {/* Appointment Details */}

            <div className="skeleton-patient-appointment-details">

              <div className="skeleton-patient-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-value"
                  />
                </div>

              </div>


              <div className="skeleton-patient-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-value"
                  />
                </div>

              </div>


              <div className="skeleton-patient-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-value"
                  />
                </div>

              </div>


              <div className="skeleton-patient-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-label"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-detail-value"
                  />
                </div>

              </div>

            </div>


            {/* Card Footer / Actions */}

            <div className="skeleton-patient-appointment-actions">

              <Skeleton
                type="button"
                className="skeleton-patient-reschedule-button"
              />

              <Skeleton
                type="button"
                className="skeleton-patient-cancel-button"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SkeletonPatientAppointments;