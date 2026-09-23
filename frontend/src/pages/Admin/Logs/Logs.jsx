import { useEffect, useState } from "react";
import "./Logs.css";
import {
  RefreshCw,
  ClipboardList,
  Stethoscope,
} from "lucide-react";

import SkeletonLogs from "../../../components/Skeleton/SkeletonLogs";

const API_BASE_URL = "http://localhost:8080/api";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/doctor-approval-logs`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch admin logs");
      }

      const data = await response.json();
      setLogs(data);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError(err.message || "Unable to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "—";

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return dateTime;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="admin-logs-page">

      {/* ================= HEADER ================= */}
      <div className="logs-header">
        <div>
          <h1>Admin Logs</h1>

          <p>
            Doctor approval and rejection history
          </p>
        </div>

        <button
          className="bills-refresh-button"
          onClick={fetchLogs}
          disabled={loading}
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <SkeletonLogs />
      )}
      {/* ================= ERROR ================= */}
      {error && !loading && (
        <div className="logs-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && !error && logs.length === 0 && (
        <div className="logs-empty">

          <div className="empty-icon">
            <ClipboardList
              size={40}
              strokeWidth={1.8}
            />
          </div>

          <h3>No Admin Logs Found</h3>

          <p>
            Doctor approval or rejection actions will appear here.
          </p>

        </div>
      )}

      {/* ================= LOG TABLE ================= */}
      {!loading && !error && logs.length > 0 && (
        <div className="logs-card">

          <div className="logs-table-wrapper">

            <table className="logs-table">

              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Doctor ID</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>

                {logs.map((log) => (
                  <tr key={log.logId}>

                    <td>
                      #{log.logId}
                    </td>

                    <td>
                      #{log.doctorId}
                    </td>

                    <td>
                      <div className="doctor-name-cell">

                        <span className="doctor-log-icon">
                          <Stethoscope
                            size={20}
                            strokeWidth={1.8}
                          />
                        </span>

                        <span>
                          {log.doctorName || "—"}
                        </span>

                      </div>
                    </td>

                    <td>
                      {log.specialization || "—"}
                    </td>

                    <td>
                      {log.email || "—"}
                    </td>

                    <td>
                      <span
                        className={`log-action ${
                          log.action?.toUpperCase() === "APPROVED"
                            ? "approved"
                            : "rejected"
                        }`}
                      >
                        {log.action || "—"}
                      </span>
                    </td>

                    <td>
                      {formatDateTime(log.actionDateTime)}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

export default Logs;