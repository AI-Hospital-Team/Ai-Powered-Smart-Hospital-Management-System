import { useEffect, useMemo, useState } from "react";
import "./AdminTable.css";

function AdminTable({
  title,
  subtitle,
  icon,
  fetchData,
  statusType,
  onStatusUpdate,
  onEdit,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // ==========================================
  // LOAD DATA
  // ==========================================

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchData();

      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Admin table error:", err);

      setError(
        "Unable to load data. Make sure Spring Boot backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // FORMAT LABEL
  // ==========================================

  const formatLabel = (key) => {
    if (!key) {
      return "";
    }

    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/^./, (char) => char.toUpperCase());
  };

  // ==========================================
  // FORMAT VALUE
  // ==========================================

  const formatValue = (value, column) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    if (
      typeof value === "string" &&
      (
        column?.toLowerCase().includes("date") ||
        column?.toLowerCase().includes("time")
      )
    ) {
      return value;
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  // ==========================================
  // GET COLUMNS
  // ==========================================

  const columns = useMemo(() => {
    if (!data.length) {
      return [];
    }

    const columnSet = new Set();

    data.forEach((item) => {
      Object.keys(item || {}).forEach((key) => {
        columnSet.add(key);
      });
    });

    return Array.from(columnSet);
  }, [data]);

  // ==========================================
  // GET STATUS
  // ==========================================

  const getStatusValue = (item) => {
    return (
      item?.status ||
      item?.billStatus ||
      item?.appointmentStatus ||
      ""
    );
  };

  // ==========================================
  // GET ID
  // ==========================================

  const getId = (item) => {
    return (
      item?.appointmentId ??
      item?.billId ??
      item?.patientId ??
      item?.doctorId ??
      item?.recordId ??
      item?.prescriptionId ??
      item?.id ??
      null
    );
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    if (!status) {
      return "";
    }

    return String(status)
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // ==========================================
  // FILTER DATA
  // ==========================================

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const search = searchTerm.toLowerCase();

    return data.filter((item) =>
      Object.values(item || {}).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search)
      )
    );
  }, [data, searchTerm]);

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const handleStatusChange = async (
    item,
    newStatus
  ) => {
    if (!onStatusUpdate) {
      return;
    }

    const id = getId(item);

    if (id === null || id === undefined) {
      alert("ID not found.");
      return;
    }

    try {
      setUpdatingId(id);

      const updated = await onStatusUpdate(
        id,
        newStatus
      );

      setData((previousData) =>
        previousData.map((currentItem) => {
          const currentId = getId(currentItem);

          if (currentId === id) {
            return updated;
          }

          return currentItem;
        })
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // STATUS OPTIONS
  // ==========================================

  const renderStatusOptions = () => {
    if (statusType === "appointment") {
      return (
        <>
          <option value="PENDING">
            Pending
          </option>

          <option value="CONFIRMED">
            Confirmed
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </>
      );
    }

    if (statusType === "bill") {
      return (
        <>
          <option value="PENDING">
            Pending
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </>
      );
    }

    return null;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="admin-module">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="admin-module-header">

        <div className="admin-module-title">

          <div className="admin-module-icon">
            {icon}
          </div>

          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

        </div>

        <button
          className="admin-refresh-btn"
          onClick={loadData}
          disabled={loading}
        >
          {loading
            ? "⏳ Loading..."
            : "🔄 Refresh"}
        </button>

      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="admin-error">

          <span>⚠️</span>

          <div>
            <strong>
              Something went wrong
            </strong>

            <p>{error}</p>
          </div>

          <button onClick={loadData}>
            Try Again
          </button>

        </div>
      )}

      {/* ========================================
          LOADING
      ======================================== */}

      {loading ? (

        <div className="admin-loading">

          <div className="loading-spinner"></div>

          <h3>
            Loading {title.toLowerCase()}...
          </h3>

          <p>
            Please wait while we fetch the data.
          </p>

        </div>

      ) : data.length === 0 ? (

        /* ======================================
           EMPTY
        ====================================== */

        <div className="admin-empty">

          <div className="empty-icon">
            📭
          </div>

          <h3>
            No {title} Found
          </h3>

          <p>
            There is no data available at the
            moment.
          </p>

          <button
            className="admin-empty-refresh"
            onClick={loadData}
          >
            🔄 Refresh
          </button>

        </div>

      ) : (

        /* ======================================
           TABLE
        ====================================== */

        <div className="admin-table-card">

          {/* TABLE TOP */}

          <div className="admin-table-top">

            <div>

              <h3>
                {icon} {title}
              </h3>

              <span>
                Showing {filteredData.length} of{" "}
                {data.length} record
                {data.length !== 1
                  ? "s"
                  : ""}
              </span>

            </div>

            {/* SEARCH */}

            <div className="admin-search-box">

              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  title="Clear search"
                >
                  ✕
                </button>
              )}

            </div>

          </div>

          {/* ====================================
              NO SEARCH RESULTS
          ==================================== */}

          {filteredData.length === 0 ? (

            <div className="admin-no-results">

              <div>🔎</div>

              <h3>
                No matching records
              </h3>

              <p>
                Try searching with a different
                keyword.
              </p>

              <button
                onClick={() =>
                  setSearchTerm("")
                }
              >
                Clear Search
              </button>

            </div>

          ) : (

            /* ==================================
               TABLE
            ================================== */

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    {columns.map((column) => (
                      <th key={column}>
                        {formatLabel(column)}
                      </th>
                    ))}

                    {(statusType || onEdit) && (
                      <th>
                        Action
                      </th>
                    )}

                  </tr>

                </thead>

                <tbody>

                  {filteredData.map(
                    (item, index) => {

                      const id = getId(item);

                      const status =
                        getStatusValue(item);

                      const isUpdating =
                        updatingId === id;

                      return (

                        <tr
                          key={
                            id ?? index
                          }
                        >

                          {columns.map(
                            (column) => {

                              const value =
                                item?.[column];

                              const isStatusColumn =
                                column
                                  .toLowerCase()
                                  .includes(
                                    "status"
                                  );

                              return (

                                <td
                                  key={column}
                                >

                                  {isStatusColumn ? (

                                    <span
                                      className={`status-badge ${getStatusClass(
                                        value
                                      )}`}
                                    >
                                      {String(
                                        value ??
                                          "-"
                                      )}
                                    </span>

                                  ) : (

                                    <span
                                      title={formatValue(
                                        value,
                                        column
                                      )}
                                    >
                                      {formatValue(
                                        value,
                                        column
                                      )}
                                    </span>

                                  )}

                                </td>

                              );
                            }
                          )}

                          {/* =================================
                              ACTION
                          ================================= */}

                          {(statusType ||
                            onEdit) && (

                            <td>

                              {/* EDIT BUTTON */}

                              {onEdit && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    onEdit(item)
                                  }
                                  style={{
                                    border:
                                      "none",
                                    borderRadius:
                                      "8px",
                                    padding:
                                      "8px 12px",
                                    background:
                                      "#2563eb",
                                    color:
                                      "#ffffff",
                                    fontWeight:
                                      "600",
                                    cursor:
                                      "pointer",
                                    marginRight:
                                      "8px",
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                              )}

                              {/* STATUS */}

                              {statusType && (
                                <select
                                  className="status-select"
                                  value={
                                    status ||
                                    ""
                                  }
                                  disabled={
                                    isUpdating
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    handleStatusChange(
                                      item,
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                >

                                  <option
                                    value=""
                                    disabled
                                  >
                                    {isUpdating
                                      ? "Updating..."
                                      : "Change Status"}
                                  </option>

                                  {renderStatusOptions()}

                                </select>
                              )}

                            </td>

                          )}

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default AdminTable;