import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const userData = localStorage.getItem("user");

      if (!userData) {
        setError("Patient information not found. Please login again.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);

      if (!user.patientId) {
        setError("Patient ID not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/appointments/patient/${user.patientId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Appointment fetch error:", err);
      setError("Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    navigate("/patient/book-appointment");
  };

  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/cancel`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      alert("Appointment cancelled successfully.");

      fetchAppointments();
    } catch (err) {
      console.error("Cancel appointment error:", err);
      alert("Unable to cancel appointment.");
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "status-default";

    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";

      case "pending":
        return "status-pending";

      case "cancelled":
        return "status-cancelled";

      case "completed":
        return "status-completed";

      default:
        return "status-default";
    }
  };

  return (
    <div className="appointments-page">

      {/* PAGE HEADER */}
      <div className="appointments-header">
        <div>
          <h1>My Appointments</h1>
          <p>View and manage your hospital appointments.</p>
        </div>

        <button
          className="book-appointment-btn"
          onClick={handleBookAppointment}
        >
          + Book Appointment
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="appointment-message">
          <div className="loader"></div>
          <p>Loading appointments...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="appointment-error">
          <p>{error}</p>

          <button onClick={fetchAppointments}>
            Try Again
          </button>
        </div>
      )}

      {/* NO APPOINTMENTS */}
      {!loading && !error && appointments.length === 0 && (
        <div className="no-appointments">

          <div className="no-appointment-icon">
            📅
          </div>

          <h2>No Appointments Found</h2>

          <p>
            You currently don't have any appointments.
          </p>

          <button
            className="book-appointment-btn"
            onClick={handleBookAppointment}
          >
            Book Your First Appointment
          </button>

        </div>
      )}

      {/* APPOINTMENTS */}
      {!loading && !error && appointments.length > 0 && (
        <div className="appointments-container">

          {appointments.map((appointment) => (
            <div
              className="appointment-card"
              key={appointment.appointmentId}
            >

              {/* CARD HEADER */}
              <div className="appointment-card-header">

                <div className="doctor-info">

                  <div className="doctor-avatar">
                    👨‍⚕️
                  </div>

                  <div>
                    <h2>
                      {appointment.doctorName ||
                        appointment.doctor?.name ||
                        "Doctor"}
                    </h2>

                    <p>
                      {appointment.specialization ||
                        appointment.doctor?.specialization ||
                        "Medical Specialist"}
                    </p>
                  </div>

                </div>

                <span
                  className={`appointment-status ${getStatusClass(
                    appointment.status
                  )}`}
                >
                  {appointment.status || "Pending"}
                </span>

              </div>

              {/* APPOINTMENT DETAILS */}
              <div className="appointment-details">

                <div className="detail-item">
                  <span className="detail-icon">📅</span>

                  <div>
                    <small>Date</small>
                    <strong>
                      {appointment.appointmentDate ||
                        appointment.date ||
                        "Not available"}
                    </strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">⏰</span>

                  <div>
                    <small>Time</small>
                    <strong>
                      {appointment.appointmentTime ||
                        appointment.time ||
                        "Not available"}
                    </strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🏥</span>

                  <div>
                    <small>Department</small>
                    <strong>
                      {appointment.department ||
                        "General"}
                    </strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🆔</span>

                  <div>
                    <small>Appointment ID</small>
                    <strong>
                      #{appointment.appointmentId}
                    </strong>
                  </div>
                </div>

              </div>

              {/* REASON */}
              {appointment.reason && (
                <div className="appointment-reason">
                  <strong>Reason:</strong>
                  <p>{appointment.reason}</p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="appointment-actions">

                {appointment.status?.toLowerCase() !== "cancelled" &&
                  appointment.status?.toLowerCase() !== "completed" && (
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        handleCancelAppointment(
                          appointment.appointmentId
                        )
                      }
                    >
                      Cancel Appointment
                    </button>
                  )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Appointments;