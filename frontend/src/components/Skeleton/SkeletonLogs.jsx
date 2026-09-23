import Skeleton from "./Skeleton";

function SkeletonLogs() {
  return (
    <div className="skeleton-logs">

      {/* HEADER */}
      <div className="skeleton-logs-header">

        <div>
          <Skeleton
            type="title"
            className="skeleton-logs-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-logs-description"
          />
        </div>

        <Skeleton
          type="button"
          className="skeleton-logs-refresh"
        />

      </div>


      {/* LOG CARD */}
      <div className="skeleton-logs-card">

        <div className="skeleton-logs-table-wrapper">

          {/* TABLE HEADER */}
          <div className="skeleton-logs-table-head">

            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />

          </div>


          {/* TABLE ROWS */}
          {Array.from({ length: 7 }).map((_, index) => (

            <div
              className="skeleton-logs-table-row"
              key={index}
            >

              {/* LOG ID */}
              <Skeleton
                type="text"
                className="skeleton-log-id"
              />

              {/* DOCTOR ID */}
              <Skeleton
                type="text"
                className="skeleton-doctor-id"
              />

              {/* DOCTOR NAME */}
              <div className="skeleton-doctor-name">

                <Skeleton
                  type="small-avatar"
                  className="skeleton-doctor-icon"
                />

                <Skeleton
                  type="text"
                  className="skeleton-doctor-name-text"
                />

              </div>

              {/* SPECIALIZATION */}
              <Skeleton
                type="text"
                className="skeleton-specialization"
              />

              {/* EMAIL */}
              <Skeleton
                type="text"
                className="skeleton-log-email"
              />

              {/* ACTION */}
              <Skeleton
                type="button"
                className="skeleton-log-action"
              />

              {/* DATE */}
              <Skeleton
                type="text"
                className="skeleton-log-date"
              />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SkeletonLogs;