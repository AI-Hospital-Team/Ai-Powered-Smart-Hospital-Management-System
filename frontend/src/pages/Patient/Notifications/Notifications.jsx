import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const userData = localStorage.getItem("user");

      if (!userData) {
        setError("Patient information not found. Please login again.");
        return;
      }

      const user = JSON.parse(userData);

      if (!user.patientId) {
        setError("Patient ID not found. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/notifications/patient/${user.patientId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Notifications fetch error:", err);
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    if (!type) return "🔔";

    switch (type.toLowerCase()) {
      case "appointment":
        return "📅";

      case "medical":
        return "🩺";

      case "prescription":
        return "💊";

      case "bill":
        return "💳";

      case "success":
        return "✅";

      case "warning":
        return "⚠️";

      case "alert":
        return "🚨";

      default:
        return "🔔";
    }
  };

  const getNotificationClass = (type) => {
    if (!type) return "notification-default";

    switch (type.toLowerCase()) {
      case "appointment":
        return "notification-appointment";

      case "medical":
        return "notification-medical";

      case "prescription":
        return "notification-prescription";

      case "bill":
        return "notification-bill";

      case "success":
        return "notification-success";

      case "warning":
        return "notification-warning";

      case "alert":
        return "notification-alert";

      default:
        return "notification-default";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const markAsRead = (notificationId) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        (notification.notificationId || notification.id) ===
        notificationId
          ? {
              ...notification,
              read: true,
              isRead: true,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
        isRead: true,
      }))
    );
  };

  const unreadCount = notifications.filter(
    (notification) =>
      notification.read === false ||
      notification.isRead === false ||
      notification.read === undefined
  ).length;

  return (
    <div className="notifications-page">

      {/* HEADER */}
      <div className="notifications-header">

        <div>
          <h1>Notifications</h1>

          <p>
            Stay updated with your appointments, medical records and bills.
          </p>
        </div>

        <div className="notification-header-actions">

          {unreadCount > 0 && (
            <button
              className="mark-all-btn"
              onClick={markAllAsRead}
            >
              Mark All as Read
            </button>
          )}

          <button
            className="notification-back-btn"
            onClick={() => navigate("/patient/dashboard")}
          >
            ← Dashboard
          </button>

        </div>

      </div>

      {/* UNREAD COUNT */}
      {!loading && !error && notifications.length > 0 && (
        <div className="notification-summary">

          <div className="summary-icon">
            🔔
          </div>

          <div>
            <strong>
              {unreadCount}
            </strong>

            <span>
              {unreadCount === 1
                ? " unread notification"
                : " unread notifications"}
            </span>
          </div>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="notifications-message">

          <div className="notification-loader"></div>

          <p>
            Loading notifications...
          </p>

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="notifications-error">

          <div className="error-icon">
            ⚠️
          </div>

          <p>{error}</p>

          <button onClick={fetchNotifications}>
            Try Again
          </button>

        </div>
      )}

      {/* NO NOTIFICATIONS */}
      {!loading && !error && notifications.length === 0 && (
        <div className="no-notifications">

          <div className="empty-notification-icon">
            🔔
          </div>

          <h2>No Notifications</h2>

          <p>
            You don't have any notifications right now.
          </p>

        </div>
      )}

      {/* NOTIFICATIONS */}
      {!loading && !error && notifications.length > 0 && (
        <div className="notifications-container">

          {notifications.map((notification) => {

            const notificationId =
              notification.notificationId ||
              notification.id;

            const isUnread =
              notification.read === false ||
              notification.isRead === false ||
              notification.read === undefined;

            return (
              <div
                key={notificationId}
                className={`notification-card ${
                  isUnread ? "unread" : ""
                }`}
                onClick={() => markAsRead(notificationId)}
              >

                <div
                  className={`notification-icon ${getNotificationClass(
                    notification.type
                  )}`}
                >
                  {getNotificationIcon(
                    notification.type
                  )}
                </div>

                <div className="notification-content">

                  <div className="notification-title-row">

                    <h2>
                      {notification.title ||
                        notification.subject ||
                        "Notification"}
                    </h2>

                    {isUnread && (
                      <span className="unread-dot"></span>
                    )}

                  </div>

                  <p>
                    {notification.message ||
                      notification.description ||
                      "You have a new notification."}
                  </p>

                  <small>
                    {formatDate(
                      notification.createdAt ||
                        notification.date ||
                        notification.timestamp
                    )}
                  </small>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Notifications;