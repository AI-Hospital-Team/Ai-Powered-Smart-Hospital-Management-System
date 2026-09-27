import Skeleton from "./Skeleton";

function SkeletonPatientProfile() {
  return (
    <div className="skeleton-patient-profile">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="skeleton-patient-profile-header">

        <div className="skeleton-patient-profile-title">

          <Skeleton
            type="avatar"
            width="46px"
            height="46px"
            className="skeleton-patient-profile-title-icon"
          />

          <div>
            <Skeleton
              type="text"
              width="145px"
              height="27px"
            />

            <Skeleton
              type="text"
              width="285px"
              height="12px"
              className="skeleton-patient-profile-header-description"
            />
          </div>

        </div>

        <Skeleton
          type="rounded"
          width="125px"
          height="38px"
          className="skeleton-patient-profile-edit-button"
        />

      </div>


      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="skeleton-patient-profile-layout">

        {/* ===================================================
            LEFT HEALTH CARD
        =================================================== */}

        <aside className="skeleton-patient-profile-health-card">

          <Skeleton
            type="avatar"
            width="66px"
            height="66px"
            className="skeleton-patient-profile-health-icon"
          />

          <Skeleton
            type="text"
            width="145px"
            height="21px"
          />

          <Skeleton
            type="text"
            width="185px"
            height="12px"
            className="skeleton-patient-profile-health-intro"
          />

          {/* FEATURE 1 */}

          <div className="skeleton-patient-profile-feature">

            <Skeleton
              type="avatar"
              width="43px"
              height="43px"
            />

            <div>
              <Skeleton
                type="text"
                width="82px"
                height="13px"
              />

              <Skeleton
                type="text"
                width="145px"
                height="10px"
                className="skeleton-patient-profile-feature-text"
              />

              <Skeleton
                type="text"
                width="125px"
                height="10px"
              />
            </div>

          </div>


          {/* FEATURE 2 */}

          <div className="skeleton-patient-profile-feature">

            <Skeleton
              type="avatar"
              width="43px"
              height="43px"
            />

            <div>
              <Skeleton
                type="text"
                width="92px"
                height="13px"
              />

              <Skeleton
                type="text"
                width="150px"
                height="10px"
                className="skeleton-patient-profile-feature-text"
              />

              <Skeleton
                type="text"
                width="118px"
                height="10px"
              />
            </div>

          </div>


          {/* FEATURE 3 */}

          <div className="skeleton-patient-profile-feature">

            <Skeleton
              type="avatar"
              width="43px"
              height="43px"
            />

            <div>
              <Skeleton
                type="text"
                width="85px"
                height="13px"
              />

              <Skeleton
                type="text"
                width="148px"
                height="10px"
                className="skeleton-patient-profile-feature-text"
              />

              <Skeleton
                type="text"
                width="120px"
                height="10px"
              />
            </div>

          </div>


          {/* MOTIVATIONAL MESSAGE */}

          <div className="skeleton-patient-profile-health-message">

            <Skeleton
              type="avatar"
              width="16px"
              height="16px"
            />

            <div>
              <Skeleton
                type="text"
                width="150px"
                height="10px"
              />

              <Skeleton
                type="text"
                width="125px"
                height="10px"
              />
            </div>

          </div>

        </aside>


        {/* ===================================================
            RIGHT PROFILE CARD
        =================================================== */}

        <section className="skeleton-patient-profile-card">

          {/* PROFILE TOP */}

          <div className="skeleton-patient-profile-card-top">

            <Skeleton
              type="avatar"
              width="52px"
              height="52px"
              className="skeleton-patient-profile-avatar"
            />

            <div className="skeleton-patient-profile-user">

              <Skeleton
                type="text"
                width="145px"
                height="17px"
              />

              <Skeleton
                type="text"
                width="105px"
                height="10px"
                className="skeleton-patient-profile-user-id"
              />

            </div>

            <Skeleton
              type="rounded"
              width="105px"
              height="28px"
              className="skeleton-patient-profile-status"
            />

          </div>


          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="skeleton-patient-profile-section">

            <div className="skeleton-patient-profile-section-heading">

              <Skeleton
                type="text"
                width="145px"
                height="14px"
              />

              <Skeleton
                type="text"
                width="205px"
                height="9px"
                className="skeleton-patient-profile-section-description"
              />

            </div>


            <div className="skeleton-patient-profile-grid">

              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  className="skeleton-patient-profile-field"
                  key={index}
                >

                  <Skeleton
                    type="text"
                    width={
                      index % 2 === 0
                        ? "72px"
                        : "58px"
                    }
                    height="8px"
                  />

                  <Skeleton
                    type="text"
                    width={
                      index % 3 === 0
                        ? "125px"
                        : "95px"
                    }
                    height="12px"
                    className="skeleton-patient-profile-field-value"
                  />

                </div>
              ))}

            </div>

          </div>


          {/* =================================================
              ADDRESS
          ================================================= */}

          <div className="skeleton-patient-profile-section">

            <div className="skeleton-patient-profile-section-heading">

              <Skeleton
                type="text"
                width="70px"
                height="14px"
              />

              <Skeleton
                type="text"
                width="230px"
                height="9px"
                className="skeleton-patient-profile-section-description"
              />

            </div>


            <div className="skeleton-patient-profile-address">

              <Skeleton
                type="avatar"
                width="34px"
                height="34px"
              />

              <div>

                <Skeleton
                  type="text"
                  width="125px"
                  height="8px"
                />

                <Skeleton
                  type="text"
                  width="280px"
                  height="12px"
                  className="skeleton-patient-profile-address-value"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}

          <div className="skeleton-patient-profile-section">

            <div className="skeleton-patient-profile-section-heading">

              <Skeleton
                type="text"
                width="150px"
                height="14px"
              />

              <Skeleton
                type="text"
                width="260px"
                height="9px"
                className="skeleton-patient-profile-section-description"
              />

            </div>


            <div className="skeleton-patient-profile-account-grid">

              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="skeleton-patient-profile-account-item"
                  key={index}
                >

                  <Skeleton
                    type="text"
                    width="65px"
                    height="8px"
                  />

                  <Skeleton
                    type="text"
                    width={
                      index === 3
                        ? "55px"
                        : "75px"
                    }
                    height="11px"
                    className="skeleton-patient-profile-account-value"
                  />

                </div>
              ))}

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default SkeletonPatientProfile;