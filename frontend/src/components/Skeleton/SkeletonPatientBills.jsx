import Skeleton from "./Skeleton";

function SkeletonPatientBills() {
  return (
    <div className="skeleton-patient-bills">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="skeleton-patient-bills-header">

        <div className="skeleton-patient-bills-title-row">

          <Skeleton
            type="avatar"
            width="52px"
            height="52px"
            className="skeleton-patient-bills-title-icon"
          />

          <div className="skeleton-patient-bills-title-content">

            <Skeleton
              type="text"
              width="220px"
              height="28px"
              className="skeleton-patient-bills-title"
            />

            <Skeleton
              type="text"
              width="330px"
              height="14px"
              className="skeleton-patient-bills-description"
            />

            <Skeleton
              type="text"
              width="105px"
              height="12px"
              className="skeleton-patient-bills-patient-id"
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="skeleton-patient-bills-summary">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="skeleton-patient-bill-summary-card"
            key={index}
          >

            <Skeleton
              type="avatar"
              width="46px"
              height="46px"
              className="skeleton-patient-bill-summary-icon"
            />

            <div className="skeleton-patient-bill-summary-content">

              <Skeleton
                type="text"
                width="88px"
                height="12px"
              />

              <Skeleton
                type="text"
                width="90px"
                height="21px"
                className="skeleton-patient-bill-summary-value"
              />

            </div>

          </div>
        ))}

      </div>


      {/* =====================================================
          BILLING HISTORY CARD
      ===================================================== */}

      <div className="skeleton-patient-bills-history">

        {/* HEADER */}

        <div className="skeleton-patient-bills-history-header">

          <div>

            <Skeleton
              type="text"
              width="155px"
              height="20px"
            />

            <Skeleton
              type="text"
              width="255px"
              height="13px"
              className="skeleton-patient-bills-history-description"
            />

          </div>

          <Skeleton
            type="rounded"
            width="65px"
            height="32px"
            className="skeleton-patient-bills-count"
          />

        </div>


        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="skeleton-patient-bills-table-wrapper">

          {/* TABLE HEADER */}

          <div className="skeleton-patient-bills-table-head">

            <Skeleton type="text" width="48px" height="11px" />
            <Skeleton type="text" width="70px" height="11px" />
            <Skeleton type="text" width="58px" height="11px" />
            <Skeleton type="text" width="65px" height="11px" />
            <Skeleton type="text" width="78px" height="11px" />
            <Skeleton type="text" width="42px" height="11px" />
            <Skeleton type="text" width="52px" height="11px" />
            <Skeleton type="text" width="52px" height="11px" />

          </div>


          {/* TABLE ROWS */}

          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              className="skeleton-patient-bills-table-row"
              key={rowIndex}
            >

              <Skeleton
                type="rounded"
                width="52px"
                height="30px"
              />

              <Skeleton
                type="text"
                width="105px"
                height="13px"
              />

              <Skeleton
                type="rounded"
                width="90px"
                height="30px"
              />

              <Skeleton
                type="text"
                width="72px"
                height="15px"
              />

              <Skeleton
                type="text"
                width="125px"
                height="13px"
              />

              <Skeleton
                type="text"
                width="78px"
                height="13px"
              />

              <Skeleton
                type="rounded"
                width="76px"
                height="30px"
              />

              <Skeleton
                type="rounded"
                width="78px"
                height="30px"
              />

            </div>
          ))}

        </div>

      </div>


      {/* =====================================================
          EDUCATIONAL NOTE
      ===================================================== */}

      <div className="skeleton-patient-bills-note">

        <Skeleton
          type="avatar"
          width="40px"
          height="40px"
        />

        <div className="skeleton-patient-bills-note-content">

          <Skeleton
            type="text"
            width="185px"
            height="14px"
          />

          <Skeleton
            type="text"
            width="100%"
            height="12px"
          />

          <Skeleton
            type="text"
            width="92%"
            height="12px"
          />

          <Skeleton
            type="text"
            width="70%"
            height="12px"
          />

        </div>

      </div>


      {/* =====================================================
          HELP SECTION
      ===================================================== */}

      <div className="skeleton-patient-bills-help">

        <Skeleton
          type="avatar"
          width="42px"
          height="42px"
        />

        <div className="skeleton-patient-bills-help-content">

          <Skeleton
            type="text"
            width="145px"
            height="14px"
          />

          <Skeleton
            type="text"
            width="320px"
            height="12px"
          />

        </div>

      </div>

    </div>
  );
}

export default SkeletonPatientBills;