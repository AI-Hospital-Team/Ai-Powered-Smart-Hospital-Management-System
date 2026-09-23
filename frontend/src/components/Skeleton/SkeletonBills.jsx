import Skeleton from "./Skeleton";

function SkeletonBills() {
  return (
    <div className="skeleton-bills">

      {/* HEADER */}
      <div className="skeleton-bills-header">

        <div className="skeleton-bills-title-row">

          <Skeleton
            type="avatar"
            className="skeleton-bills-title-icon"
          />

          <div>
            <Skeleton
              type="text"
              className="skeleton-bills-label"
            />

            <Skeleton
              type="title"
              className="skeleton-bills-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-bills-description"
            />
          </div>

        </div>

        <div className="skeleton-bills-header-actions">

          <Skeleton
            type="button"
            className="skeleton-bills-refresh"
          />

          <Skeleton
            type="button"
            className="skeleton-bills-create"
          />

        </div>

      </div>


      {/* STATISTICS */}
      <div className="skeleton-bills-stats">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            className="skeleton-bill-stat"
            key={index}
          >

            <Skeleton
              type="avatar"
              className="skeleton-bill-stat-icon"
            />

            <div className="skeleton-bill-stat-content">

              <Skeleton
                type="text"
                className="skeleton-bill-stat-label"
              />

              <Skeleton
                type="title"
                className="skeleton-bill-stat-number"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-bill-stat-small"
              />

            </div>

          </div>

        ))}

      </div>


      {/* TOOLBAR */}
      <div className="skeleton-bills-toolbar">

        <div>
          <Skeleton
            type="title"
            className="skeleton-bills-directory-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-bills-directory-description"
          />
        </div>

        <Skeleton
          type="input"
          className="skeleton-bills-search"
        />

      </div>


      {/* FILTERS */}
      <div className="skeleton-bills-filters">

        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            type="button"
            className="skeleton-bill-filter"
            key={index}
          />
        ))}

      </div>


      {/* BILL GRID */}
      <div className="skeleton-bills-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-bill-card"
            key={index}
          >

            {/* CARD HEADER */}
            <div className="skeleton-bill-card-top">

              <Skeleton
                type="avatar"
                className="skeleton-bill-icon"
              />

              <div className="skeleton-bill-title">
                <Skeleton
                  type="text"
                  className="skeleton-bill-type"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-bill-id"
                />
              </div>

              <Skeleton
                type="button"
                className="skeleton-bill-status"
              />

            </div>


            {/* AMOUNT */}
            <div className="skeleton-bill-amount">

              <Skeleton
                type="text"
                className="skeleton-bill-amount-label"
              />

              <Skeleton
                type="title"
                className="skeleton-bill-amount-value"
              />

            </div>


            {/* PATIENT */}
            <div className="skeleton-bill-person">

              <Skeleton
                type="small-avatar"
                className="skeleton-bill-person-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-bill-person-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-bill-person-name"
                />
              </div>

            </div>


            {/* DOCTOR */}
            <div className="skeleton-bill-person">

              <Skeleton
                type="small-avatar"
                className="skeleton-bill-person-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-bill-person-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-bill-person-name"
                />

                <Skeleton
                  type="text"
                  className="skeleton-bill-specialization"
                />
              </div>

            </div>


            {/* DATE */}
            <div className="skeleton-bill-date">

              <Skeleton
                type="small-avatar"
                className="skeleton-bill-date-icon"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-bill-date-value"
              />

            </div>


            {/* DESCRIPTION */}
            <div className="skeleton-bill-description">

              <Skeleton
                type="text"
                className="skeleton-bill-description-label"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-bill-description-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-bill-description-short"
              />

            </div>


            {/* ACTIONS */}
            <div className="skeleton-bill-actions">

              <Skeleton
                type="button"
                className="skeleton-bill-action"
              />

              <Skeleton
                type="button"
                className="skeleton-bill-action"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonBills;