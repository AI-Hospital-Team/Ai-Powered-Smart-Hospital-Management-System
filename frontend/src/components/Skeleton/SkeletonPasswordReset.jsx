import Skeleton from "./Skeleton";

function SkeletonPasswordReset() {
  return (
    <div className="skeleton-password-reset">

      {/* HEADER */}
      <div className="skeleton-password-reset-header">

        <div className="skeleton-password-reset-title-row">

          <Skeleton
            type="avatar"
            className="skeleton-password-reset-icon"
          />

          <div>
            <Skeleton
              type="title"
              className="skeleton-password-reset-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-password-reset-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-password-reset-refresh"
        />

      </div>


      {/* SUMMARY */}
      <div className="skeleton-password-reset-summary">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            className="skeleton-password-reset-summary-card"
            key={index}
          >

            <Skeleton
              type="avatar"
              className="skeleton-password-reset-summary-icon"
            />

            <div>
              <Skeleton
                type="text"
                className="skeleton-password-reset-summary-label"
              />

              <Skeleton
                type="title"
                className="skeleton-password-reset-summary-number"
              />
            </div>

          </div>

        ))}

      </div>


      {/* REQUESTS CARD */}
      <div className="skeleton-password-reset-card">

        {/* CARD HEADER */}
        <div className="skeleton-password-reset-card-header">

          <div>
            <Skeleton
              type="title"
              className="skeleton-password-reset-card-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-password-reset-card-description"
            />
          </div>

          <Skeleton
            type="button"
            className="skeleton-password-reset-total"
          />

        </div>


        {/* TABLE */}
        <div className="skeleton-password-reset-table-wrapper">

          {/* TABLE HEADER */}
          <div className="skeleton-password-reset-table-head">

            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />

          </div>


          {/* TABLE ROWS */}
          {Array.from({ length: 6 }).map((_, index) => (

            <div
              className="skeleton-password-reset-table-row"
              key={index}
            >

              {/* Request */}
              <Skeleton
                type="text"
                className="skeleton-reset-request-id"
              />

              {/* User */}
              <div className="skeleton-reset-user">

                <Skeleton
                  type="small-avatar"
                  className="skeleton-reset-user-icon"
                />

                <div>
                  <Skeleton
                    type="text"
                    className="skeleton-reset-user-email"
                  />

                  <Skeleton
                    type="subtitle"
                    className="skeleton-reset-user-subtitle"
                  />
                </div>

              </div>


              {/* Role */}
              <Skeleton
                type="button"
                className="skeleton-reset-role"
              />


              {/* Code */}
              <Skeleton
                type="text"
                className="skeleton-reset-code"
              />


              {/* Requested */}
              <Skeleton
                type="text"
                className="skeleton-reset-date"
              />


              {/* Status */}
              <Skeleton
                type="button"
                className="skeleton-reset-status"
              />


              {/* Reviewed */}
              <Skeleton
                type="text"
                className="skeleton-reset-date"
              />


              {/* Action */}
              <div className="skeleton-reset-actions">

                <Skeleton
                  type="button"
                  className="skeleton-reset-action"
                />

                <Skeleton
                  type="button"
                  className="skeleton-reset-action"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SkeletonPasswordReset;