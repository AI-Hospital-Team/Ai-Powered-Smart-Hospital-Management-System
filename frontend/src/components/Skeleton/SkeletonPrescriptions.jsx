import Skeleton from "./Skeleton";

function SkeletonPrescriptions() {
  return (
    <div className="skeleton-prescriptions">

      {/* HEADER */}
      <div className="skeleton-prescriptions-header">

        <div className="skeleton-prescriptions-title-row">

          <Skeleton
            type="avatar"
            className="skeleton-prescriptions-title-icon"
          />

          <div>
            <Skeleton
              type="text"
              className="skeleton-prescriptions-label"
            />

            <Skeleton
              type="title"
              className="skeleton-prescriptions-title"
            />

            <Skeleton
              type="subtitle"
              className="skeleton-prescriptions-description"
            />
          </div>

        </div>

        <Skeleton
          type="button"
          className="skeleton-prescriptions-refresh"
        />

      </div>


      {/* SUMMARY */}
      <div className="skeleton-prescriptions-summary">

        <Skeleton
          type="avatar"
          className="skeleton-prescriptions-summary-icon"
        />

        <div>
          <Skeleton
            type="text"
            className="skeleton-prescriptions-summary-label"
          />

          <Skeleton
            type="title"
            className="skeleton-prescriptions-summary-number"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-prescriptions-summary-small"
          />
        </div>

      </div>


      {/* TOOLBAR */}
      <div className="skeleton-prescriptions-toolbar">

        <div>
          <Skeleton
            type="title"
            className="skeleton-prescriptions-directory-title"
          />

          <Skeleton
            type="subtitle"
            className="skeleton-prescriptions-directory-description"
          />
        </div>

        <Skeleton
          type="input"
          className="skeleton-prescriptions-search"
        />

      </div>


      {/* PRESCRIPTION GRID */}
      <div className="skeleton-prescriptions-grid">

        {Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-prescription-card"
            key={index}
          >

            {/* MEDICINE HEADER */}
            <div className="skeleton-prescription-card-top">

              <Skeleton
                type="avatar"
                className="skeleton-prescription-medicine-icon"
              />

              <div className="skeleton-prescription-card-title">

                <Skeleton
                  type="text"
                  className="skeleton-prescription-medicine-name"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-prescription-id"
                />

              </div>

            </div>


            {/* PATIENT */}
            <div className="skeleton-prescription-person">

              <Skeleton
                type="small-avatar"
                className="skeleton-prescription-person-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-prescription-person-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-prescription-person-name"
                />
              </div>

            </div>


            {/* DOCTOR */}
            <div className="skeleton-prescription-person">

              <Skeleton
                type="small-avatar"
                className="skeleton-prescription-person-icon"
              />

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-prescription-person-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-prescription-person-name"
                />

                <Skeleton
                  type="text"
                  className="skeleton-prescription-specialization"
                />
              </div>

            </div>


            {/* MEDICINE DETAILS */}
            <div className="skeleton-prescription-details">

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-prescription-detail-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-prescription-detail-value"
                />
              </div>

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-prescription-detail-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-prescription-detail-value"
                />
              </div>

              <div>
                <Skeleton
                  type="text"
                  className="skeleton-prescription-detail-label"
                />

                <Skeleton
                  type="subtitle"
                  className="skeleton-prescription-detail-value"
                />
              </div>

            </div>


            {/* DATE */}
            <div className="skeleton-prescription-date">

              <Skeleton
                type="small-avatar"
                className="skeleton-prescription-date-icon"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-prescription-date-value"
              />

            </div>


            {/* DIAGNOSIS */}
            <div className="skeleton-prescription-diagnosis">

              <Skeleton
                type="text"
                className="skeleton-prescription-diagnosis-label"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-prescription-diagnosis-line"
              />

              <Skeleton
                type="subtitle"
                className="skeleton-prescription-diagnosis-line-short"
              />

            </div>


            {/* VIEW BUTTON */}
            <Skeleton
              type="button"
              className="skeleton-prescription-view"
            />

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkeletonPrescriptions;