import Skeleton from "./Skeleton";

function SkeletonPatientDashboard() {
  return (
    <div className="skeleton-patient-dashboard">

      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}

      <section className="skeleton-patient-welcome">

        <div className="skeleton-patient-welcome-content">

          <Skeleton
            type="text"
            className="skeleton-patient-welcome-label"
          />

          <Skeleton
            type="title"
            className="skeleton-patient-welcome-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-patient-welcome-description"
          />

          <Skeleton
            type="button"
            className="skeleton-patient-id"
          />

          <div className="skeleton-patient-welcome-actions">
            <Skeleton
              type="button"
              className="skeleton-patient-action-primary"
            />

            <Skeleton
              type="button"
              className="skeleton-patient-action-secondary"
            />
          </div>

        </div>

        <Skeleton
          type="avatar"
          className="skeleton-patient-welcome-icon"
        />

      </section>


      {/* =====================================================
          HEALTH OVERVIEW
      ===================================================== */}

      <section className="skeleton-patient-overview">

        <div className="skeleton-patient-section-heading">
          <Skeleton
            type="text"
            className="skeleton-patient-section-label"
          />

          <Skeleton
            type="title"
            className="skeleton-patient-section-title"
          />
        </div>

        <div className="skeleton-patient-overview-grid">

          {[1, 2, 3, 4].map((item) => (
            <div
              className="skeleton-patient-overview-card"
              key={item}
            >
              <Skeleton
                type="avatar"
                className="skeleton-patient-overview-icon"
              />

              <div className="skeleton-patient-overview-content">

                <Skeleton
                  type="text"
                  className="skeleton-patient-overview-label"
                />

                <Skeleton
                  type="title"
                  className="skeleton-patient-overview-number"
                />

                <Skeleton
                  type="text"
                  className="skeleton-patient-overview-link"
                />

              </div>
            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <section className="skeleton-patient-main-grid">

        {/* Upcoming Appointment */}

        <div className="skeleton-patient-panel">

          <div className="skeleton-patient-panel-header">

            <div>
              <Skeleton
                type="text"
                className="skeleton-patient-panel-label"
              />

              <Skeleton
                type="title"
                className="skeleton-patient-panel-title"
              />
            </div>

            <Skeleton
              type="button"
              className="skeleton-patient-view-all"
            />

          </div>

          <div className="skeleton-patient-appointment">

            <Skeleton
              type="card"
              className="skeleton-patient-date-box"
            />

            <div className="skeleton-patient-appointment-info">

              <Skeleton
                type="text"
                className="skeleton-patient-doctor-name"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-specialization"
              />

              <Skeleton
                type="text"
                className="skeleton-patient-appointment-meta"
              />

              <Skeleton
                type="button"
                className="skeleton-patient-status"
              />

            </div>

          </div>

        </div>


        {/* Billing Summary */}

        <div className="skeleton-patient-panel">

          <div className="skeleton-patient-panel-header">

            <div>
              <Skeleton
                type="text"
                className="skeleton-patient-panel-label"
              />

              <Skeleton
                type="title"
                className="skeleton-patient-panel-title"
              />
            </div>

            <Skeleton
              type="button"
              className="skeleton-patient-view-all"
            />

          </div>

          <div className="skeleton-patient-billing">

            <div className="skeleton-patient-billing-total">

              <Skeleton
                type="avatar"
                className="skeleton-patient-billing-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-patient-billing-label"
                />

                <Skeleton
                  type="title"
                  className="skeleton-patient-billing-amount"
                />
              </div>

            </div>

            <div className="skeleton-patient-billing-stats">

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-patient-billing-stat-label"
                />

                <Skeleton
                  type="title"
                  className="skeleton-patient-billing-stat-number"
                />
              </div>

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-patient-billing-stat-label"
                />

                <Skeleton
                  type="title"
                  className="skeleton-patient-billing-stat-number"
                />
              </div>

            </div>

            <div className="skeleton-patient-mini-bills">

              {[1, 2, 3].map((item) => (
                <div
                  className="skeleton-patient-mini-bill"
                  key={item}
                >
                  <div>
                    <Skeleton
                      type="text"
                      className="skeleton-patient-mini-bill-title"
                    />

                    <Skeleton
                      type="text"
                      className="skeleton-patient-mini-bill-date"
                    />
                  </div>

                  <div>
                    <Skeleton
                      type="text"
                      className="skeleton-patient-mini-bill-amount"
                    />

                    <Skeleton
                      type="button"
                      className="skeleton-patient-mini-bill-status"
                    />
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          RECENT HEALTH DATA
      ===================================================== */}

      <section className="skeleton-patient-recent-grid">

        {/* Medical Records */}

        <div className="skeleton-patient-panel">

          <div className="skeleton-patient-panel-header">

            <div>
              <Skeleton
                type="text"
                className="skeleton-patient-panel-label"
              />

              <Skeleton
                type="title"
                className="skeleton-patient-panel-title"
              />
            </div>

            <Skeleton
              type="button"
              className="skeleton-patient-view-all"
            />

          </div>

          <div className="skeleton-patient-recent-list">

            {[1, 2, 3, 4].map((item) => (
              <div
                className="skeleton-patient-recent-item"
                key={item}
              >

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-recent-icon"
                />

                <div className="skeleton-patient-recent-content">

                  <Skeleton
                    type="text"
                    className="skeleton-patient-recent-title"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-recent-description"
                  />

                </div>

                <Skeleton
                  type="text"
                  className="skeleton-patient-recent-date"
                />

              </div>
            ))}

          </div>

        </div>


        {/* Prescriptions */}

        <div className="skeleton-patient-panel">

          <div className="skeleton-patient-panel-header">

            <div>
              <Skeleton
                type="text"
                className="skeleton-patient-panel-label"
              />

              <Skeleton
                type="title"
                className="skeleton-patient-panel-title"
              />
            </div>

            <Skeleton
              type="button"
              className="skeleton-patient-view-all"
            />

          </div>

          <div className="skeleton-patient-recent-list">

            {[1, 2, 3, 4].map((item) => (
              <div
                className="skeleton-patient-recent-item"
                key={item}
              >

                <Skeleton
                  type="avatar"
                  className="skeleton-patient-recent-icon"
                />

                <div className="skeleton-patient-recent-content">

                  <Skeleton
                    type="text"
                    className="skeleton-patient-recent-title"
                  />

                  <Skeleton
                    type="text"
                    className="skeleton-patient-recent-description"
                  />

                </div>

                <Skeleton
                  type="text"
                  className="skeleton-patient-recent-date"
                />

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          AI HEALTH ASSISTANT
      ===================================================== */}

      <section className="skeleton-patient-ai-panel">

        <div className="skeleton-patient-panel-header">

          <div>
            <Skeleton
              type="text"
              className="skeleton-patient-panel-label"
            />

            <Skeleton
              type="title"
              className="skeleton-patient-ai-title"
            />
          </div>

        </div>

        <Skeleton
          type="text"
          className="skeleton-patient-ai-description"
        />

        <Skeleton
          type="input"
          className="skeleton-patient-ai-input"
        />

        <Skeleton
          type="button"
          className="skeleton-patient-ai-button"
        />

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="skeleton-patient-quick-actions">

        <div className="skeleton-patient-section-heading">

          <Skeleton
            type="text"
            className="skeleton-patient-section-label"
          />

          <Skeleton
            type="title"
            className="skeleton-patient-section-title"
          />

        </div>

        <div className="skeleton-patient-quick-grid">

          {[1, 2, 3, 4].map((item) => (
            <div
              className="skeleton-patient-quick-card"
              key={item}
            >

              <Skeleton
                type="avatar"
                className="skeleton-patient-quick-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-patient-quick-title"
                />

                <Skeleton
                  type="text"
                  className="skeleton-patient-quick-description"
                />
              </div>

              <Skeleton
                type="text"
                className="skeleton-patient-quick-arrow"
              />

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default SkeletonPatientDashboard;