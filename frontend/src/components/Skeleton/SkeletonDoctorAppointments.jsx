import Skeleton from "./Skeleton";

function SkeletonDoctorAppointments() {
  return (
    <div className="skeleton-doctor-appointments">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="skeleton-doctor-appointments-header">

        <div className="skeleton-doctor-appointments-title-wrap">

          <Skeleton
            type="avatar"
            className="skeleton-doctor-appointments-title-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-doctor-appointments-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-appointments-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-doctor-appointments-count"
        />

      </div>


      {/* =================================================
          APPOINTMENT LIST
      ================================================= */}

      <div className="skeleton-doctor-appointments-list">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-doctor-appointment-card"
            key={index}
          >

            {/* Patient */}

            <div className="skeleton-doctor-appointment-patient">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-appointment-patient-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-appointment-patient-name"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-doctor-appointment-patient-id"
                />
              </div>

            </div>


            {/* Details */}

            <div className="skeleton-doctor-appointment-details">

              {/* Date */}

              <div className="skeleton-doctor-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-appointment-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-appointment-detail-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-appointment-detail-value"
                  />
                </div>

              </div>


              {/* Time */}

              <div className="skeleton-doctor-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-appointment-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-appointment-detail-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-appointment-detail-value"
                  />
                </div>

              </div>


              {/* Patient ID */}

              <div className="skeleton-doctor-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-appointment-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-appointment-detail-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-appointment-detail-value"
                  />
                </div>

              </div>


              {/* Appointment ID */}

              <div className="skeleton-doctor-appointment-detail">

                <Skeleton
                  type="avatar"
                  className="skeleton-doctor-appointment-detail-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-doctor-appointment-detail-label"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-doctor-appointment-detail-value"
                  />
                </div>

              </div>

            </div>


            {/* Status */}

            <Skeleton
              type="button"
              className="skeleton-doctor-appointment-status"
            />


            {/* Actions */}

            <div className="skeleton-doctor-appointment-actions">

              <Skeleton
                type="button"
                className="skeleton-doctor-appointment-action"
              />

              <Skeleton
                type="button"
                className="skeleton-doctor-appointment-action"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonDoctorAppointments;