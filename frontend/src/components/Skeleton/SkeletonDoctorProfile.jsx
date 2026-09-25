import Skeleton from "./Skeleton";

function SkeletonDoctorProfile() {
  return (
    <div className="skeleton-doctor-profile">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="skeleton-doctor-profile-header">

        <div className="skeleton-doctor-profile-title">

          <Skeleton
            type="avatar"
            className="skeleton-doctor-profile-title-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-doctor-profile-title-text"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-profile-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-doctor-profile-edit"
        />

      </div>


      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="skeleton-doctor-profile-layout">

        {/* =================================================
            LEFT PROFILE CARD
        ================================================= */}

        <aside className="skeleton-doctor-profile-side">

          <Skeleton
            type="avatar"
            className="skeleton-doctor-profile-avatar"
          />

          <Skeleton
            type="text"
            className="skeleton-doctor-profile-name"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-doctor-profile-specialization"
          />

          <Skeleton
            type="button"
            className="skeleton-doctor-profile-active"
          />

          <div className="skeleton-doctor-profile-divider"></div>


          {/* Doctor ID */}

          <div className="skeleton-doctor-profile-side-info">

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-side-label"
            />

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-side-value"
            />

          </div>


          {/* Specialization */}

          <div className="skeleton-doctor-profile-side-info">

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-side-label"
            />

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-side-value skeleton-side-value-wide"
            />

          </div>


          {/* Shift */}

          <div className="skeleton-doctor-profile-side-info">

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-side-label"
            />

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-side-value"
            />

          </div>


          <div className="skeleton-doctor-profile-side-message">

            <Skeleton
              type="avatar"
              className="skeleton-doctor-profile-message-icon"
            />

            <div>
              <Skeleton
                type="subtitle"
                className="skeleton-doctor-profile-message-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-doctor-profile-message-line skeleton-message-short"
              />
            </div>

          </div>

        </aside>


        {/* =================================================
            RIGHT PROFILE CARD
        ================================================= */}

        <section className="skeleton-doctor-profile-card">

          {/* CARD HEADING */}

          <div className="skeleton-doctor-profile-card-heading">

            <Skeleton
              type="text"
              className="skeleton-doctor-profile-card-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-profile-card-description"
            />

          </div>


          {/* PROFESSIONAL INFORMATION */}

          <div className="skeleton-doctor-profile-grid">

            {Array.from({ length: 10 }).map((_, index) => (

              <div
                className={`skeleton-doctor-profile-field ${
                  index === 9
                    ? "skeleton-doctor-profile-field-full"
                    : ""
                }`}
                key={index}
              >

                <Skeleton
                  type="text"
                  className="skeleton-doctor-profile-field-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-profile-field-value"
                />

              </div>

            ))}

          </div>


          {/* ACCOUNT INFORMATION */}

          <div className="skeleton-doctor-account-section">

            <Skeleton
              type="text"
              className="skeleton-doctor-account-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-doctor-account-description"
            />


            {/* EMAIL */}

            <div className="skeleton-doctor-account-row">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-account-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-account-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-account-value skeleton-email-value"
                />
              </div>

            </div>


            {/* ROLE */}

            <div className="skeleton-doctor-account-row">

              <Skeleton
                type="avatar"
                className="skeleton-doctor-account-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-doctor-account-label"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-account-value"
                />
              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default SkeletonDoctorProfile;