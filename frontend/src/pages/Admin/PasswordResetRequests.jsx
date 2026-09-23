import { useEffect, useState } from "react";
import {
  KeyRound,
  Check,
  X,
  RefreshCw,
  Clock,
  Mail,
  UserRound,
} from "lucide-react";

import "./PasswordResetRequests.css";
import SkeletonPasswordReset from "../../components/Skeleton/SkeletonPasswordReset";

const API_URL = "http://localhost:8080/api";

function PasswordResetRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD REQUESTS
  // ==========================================

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/admin/password-reset/requests`
      );

      if (!response.ok) {
        throw new Error("Failed to load password reset requests.");
      }

      const data = await response.json();

      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Password Reset Requests Error:", err);

      setError(
        "Unable to load password reset requests. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadRequests();
  }, []);

  // ==========================================
  // APPROVE
  // ==========================================

  const handleApprove = async (requestId) => {
    try {
      setActionLoading(requestId);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/admin/password-reset/requests/${requestId}/approve`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : "Unable to approve request."
        );
      }

      setSuccess("Password reset request approved successfully.");

      await loadRequests();
    } catch (err) {
      console.error("Approve Request Error:", err);

      setError(
        err.message || "Unable to approve password reset request."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // REJECT
  // ==========================================

  const handleReject = async (requestId) => {
    try {
      setActionLoading(requestId);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/admin/password-reset/requests/${requestId}/reject`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : "Unable to reject request."
        );
      }

      setSuccess("Password reset request rejected.");

      await loadRequests();
    } catch (err) {
      console.error("Reject Request Error:", err);

      setError(
        err.message || "Unable to reject password reset request."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (String(status || "").toUpperCase()) {
      case "PENDING":
        return "reset-status pending";

      case "APPROVED":
        return "reset-status approved";

      case "REJECTED":
        return "reset-status rejected";

      case "COMPLETED":
        return "reset-status completed";

      default:
        return "reset-status";
    }
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDateTime = (date) => {
    if (!date) {
      return "-";
    }

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

if (loading) {
  return (
    <div className="password-reset-page">
      <SkeletonPasswordReset />
    </div>
  );
}

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="password-reset-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="password-reset-header">

        <div className="password-reset-title-wrapper">

          <div className="password-reset-title-icon">
            <KeyRound size={25} />
          </div>

          <div>
            <h1>Password Reset Requests</h1>

            <p>
              Review and manage patient and doctor password
              reset requests.
            </p>
          </div>

        </div>

        <button
  className="bills-refresh-button"
  onClick={loadRequests}
  disabled={loading}
>
  <RefreshCw size={15} />
  Refresh
</button>

      </div>

      {/* ======================================
          SUCCESS
      ====================================== */}

      {success && (
        <div className="password-reset-success">
          <Check size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div className="password-reset-error">
          <X size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* ======================================
          SUMMARY
      ====================================== */}

      <div className="password-reset-summary">

        <div className="password-reset-summary-card">
          <div className="summary-card-icon pending">
            <Clock size={20} />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    String(request.status).toUpperCase() ===
                    "PENDING"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="password-reset-summary-card">
          <div className="summary-card-icon approved">
            <Check size={20} />
          </div>

          <div>
            <span>Approved</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    String(request.status).toUpperCase() ===
                    "APPROVED"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="password-reset-summary-card">
          <div className="summary-card-icon rejected">
            <X size={20} />
          </div>

          <div>
            <span>Rejected</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    String(request.status).toUpperCase() ===
                    "REJECTED"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="password-reset-summary-card">
          <div className="summary-card-icon completed">
            <KeyRound size={20} />
          </div>

          <div>
            <span>Completed</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    String(request.status).toUpperCase() ===
                    "COMPLETED"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* ======================================
          REQUESTS TABLE
      ====================================== */}

      <div className="password-reset-card">

        <div className="password-reset-card-header">

          <div>
            <h2>Reset Requests</h2>

            <p>
              Admin approval is required before a password
              can be changed.
            </p>
          </div>

          <span className="password-reset-total">
            {requests.length} Requests
          </span>

        </div>

        {requests.length === 0 ? (
          <div className="password-reset-empty">

            <div className="password-reset-empty-icon">
              <KeyRound size={30} />
            </div>

            <h3>No Password Reset Requests</h3>

            <p>
              New password reset requests will appear here.
            </p>

          </div>
        ) : (
          <div className="password-reset-table-wrapper">

            <table className="password-reset-table">

              <thead>
                <tr>
                  <th>Request</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Request Code</th>
                  <th>Requested At</th>
                  <th>Status</th>
                  <th>Reviewed At</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {requests.map((request) => {

                  const isPending =
                    String(request.status).toUpperCase() ===
                    "PENDING";

                  const isProcessing =
                    actionLoading === request.requestId;

                  return (
                    <tr key={request.requestId}>

                      {/* REQUEST ID */}

                      <td>
                        <div className="reset-request-id">
                          #{request.requestId}
                        </div>
                      </td>

                      {/* USER */}

                      <td>
                        <div className="reset-user">

                          <div className="reset-user-icon">
                            <UserRound size={17} />
                          </div>

                          <div>
                            <strong>
                              {request.email}
                            </strong>

                            <span>
                              <Mail size={12} />
                              Password reset request
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* ROLE */}

                      <td>
                        <span className="reset-role">
                          {request.role || "-"}
                        </span>
                      </td>

                      {/* CODE */}

                      <td>
                        <span className="reset-request-code">
                          {request.requestCode || "-"}
                        </span>
                      </td>

                      {/* REQUESTED */}

                      <td>
                        <span className="reset-date">
                          {formatDateTime(
                            request.requestedAt
                          )}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={getStatusClass(
                            request.status
                          )}
                        >
                          {request.status || "-"}
                        </span>
                      </td>

                      {/* REVIEWED */}

                      <td>
                        <span className="reset-date">
                          {formatDateTime(
                            request.reviewedAt
                          )}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td>

                        {isPending ? (
                          <div className="reset-action-buttons">

                            <button
                              type="button"
                              className="reset-approve-button"
                              onClick={() =>
                                handleApprove(
                                  request.requestId
                                )
                              }
                              disabled={isProcessing}
                              title="Approve Request"
                            >
                              {isProcessing ? (
                                <span className="reset-action-spinner"></span>
                              ) : (
                                <Check size={15} />
                              )}

                              Approve
                            </button>

                            <button
                              type="button"
                              className="reset-reject-button"
                              onClick={() =>
                                handleReject(
                                  request.requestId
                                )
                              }
                              disabled={isProcessing}
                              title="Reject Request"
                            >
                              {isProcessing ? (
                                <span className="reset-action-spinner"></span>
                              ) : (
                                <X size={15} />
                              )}

                              Reject
                            </button>

                          </div>
                        ) : (
                          <span className="reset-no-action">
                            No action
                          </span>
                        )}

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default PasswordResetRequests;