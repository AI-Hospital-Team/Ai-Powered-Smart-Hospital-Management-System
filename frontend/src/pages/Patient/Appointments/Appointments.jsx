import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  // =====================================================
  // GET LOGGED-IN PATIENT
  // =====================================================

  const getPatientId = () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        return null;
      }

      const user = JSON.parse(userData);

      return user?.patientId || user?.id || null;
    } catch (error) {
      console.error("Error reading user:", error);
      return null;
    }
  };

  // =====================================================
  // FETCH PATIENT APPOINTMENTS
  // =====================================================

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const patientId = getPatientId();

      if (!patientId) {
        setError(
          "Patient information not found. Please login again."
        );
        setAppointments([]);
        return;
      }

      console.log("Fetching appointments for patient:", patientId);

      const response = await fetch(
        `http://localhost:8080/api/appointments/patient/${patientId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch appointments: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Patient appointments:", data);

      setAppointments(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error
      );

      setError(
        "Unable to load appointments. Please try again."
      );

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD APPOINTMENTS
  // =====================================================

  useEffect(() => {
    fetchAppointments();
  }, []);

  // =====================================================
  // CANCEL APPOINTMENT
  // =====================================================

  const handleCancelAppointment = async (
    appointmentId
  ) => {
    if (!appointmentId) {
      alert("Appointment ID not found.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancellingId(appointmentId);
      setError("");

      console.log(
        "Cancelling appointment:",
        appointmentId
      );

      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        }
      );

      if (!response.ok) {
        let errorMessage =
          "Unable to cancel appointment.";

        try {
          const errorText = await response.text();

          if (errorText) {
            console.error(
              "Cancel API error:",
              errorText
            );
          }
        } catch (error) {
          console.error(
            "Error reading cancel response:",
            error
          );
        }

        throw new Error(errorMessage);
      }

      const updatedAppointment =
        await response.json();

      console.log(
        "Appointment cancelled:",
        updatedAppointment
      );

      // =================================================
      // UPDATE UI IMMEDIATELY
      // =================================================

      setAppointments((previousAppointments) =>
        previousAppointments.map(
          (appointment) =>
            appointment.appointmentId ===
            appointmentId
              ? {
                  ...appointment,
                  ...updatedAppointment,
                  status: "Cancelled",
                }
              : appointment
        )
      );

      alert("Appointment cancelled successfully.");
    } catch (error) {
      console.error(
        "Cancel appointment error:",
        error
      );

      setError(
        "Unable to cancel appointment. Please try again."
      );

      alert(
        "Unable to cancel appointment. Please try again."
      );
    } finally {
      setCancellingId(null);
    }
  };

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleBookAppointment = () => {
    navigate("/patient/book-appointment");
  };

  // =====================================================
  // GET STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    if (!status) {
      return "status-pending";
    }

    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      case "pending":
        return "status-pending";

      default:
        return "status-pending";
    }
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    return time;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="appointments-page">

        <div className="appointments-header">
          <div>
            <h1>My Appointments</h1>

            <p>
              View and manage your hospital
              appointments.
            </p>
          </div>

          <button
            type="button"
            className="book-appointment-btn"
            onClick={handleBookAppointment}
          >
            + Book Appointment
          </button>
        </div>

        <div className="appointments-loading">
          <div className="loading-spinner">
            ⏳
          </div>

          <p>Loading appointments...</p>
        </div>

      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="appointments-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="appointments-header">

        <div>
          <h1>My Appointments</h1>

          <p>
            View and manage your hospital
            appointments.
          </p>
        </div>

        <button
          type="button"
          className="book-appointment-btn"
          onClick={handleBookAppointment}
        >
          + Book Appointment
        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="appointments-error">
          {error}
        </div>
      )}

      {/* =================================================
          NO APPOINTMENTS
      ================================================= */}

      {!error && appointments.length === 0 && (
        <div className="no-appointments">

          <div className="no-appointments-icon">
            📅
          </div>

          <h2>No Appointments Found</h2>

          <p>
            You don't have any appointments yet.
          </p>

          <button
            type="button"
            className="book-appointment-btn"
            onClick={handleBookAppointment}
          >
            + Book Your First Appointment
          </button>

        </div>
      )}

      {/* =================================================
          APPOINTMENT CARDS
      ================================================= */}

      <div className="appointments-list">

        {appointments.map((appointment) => {

          const appointmentId =
            appointment.appointmentId;

          const status =
            appointment.status || "Pending";

          const isPending =
            status.toLowerCase() ===
            "pending";

          const isCompleted =
            status.toLowerCase() ===
            "completed";

          const isCancelled =
            status.toLowerCase() ===
            "cancelled";

          const isCancelling =
            cancellingId === appointmentId;

          return (
            <div
              className="appointment-card"
              key={appointmentId}
            >

              {/* =========================================
                  CARD HEADER
              ========================================= */}

              <div className="appointment-card-header">

                <div className="doctor-info">

                  <div className="doctor-icon">
                    👨‍⚕️
                  </div>

                  <div>
                    <h2>
                      {appointment.doctorName ||
                        `Doctor #${
                          appointment.doctorId ||
                          "N/A"
                        }`}
                    </h2>

                    <p>
                      {appointment.specialization ||
                        "Medical Specialist"}
                    </p>
                  </div>

                </div>

                <span
                  className={`appointment-status ${getStatusClass(
                    status
                  )}`}
                >
                  {status}
                </span>

              </div>

              {/* =========================================
                  APPOINTMENT DETAILS
              ========================================= */}

              <div className="appointment-details">

                {/* DATE */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    📅
                  </span>

                  <div>
                    <span className="detail-label">
                      Date
                    </span>

                    <strong>
                      {appointment.appointmentDate ||
                        "-"}
                    </strong>
                  </div>

                </div>

                {/* TIME */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    ⏰
                  </span>

                  <div>
                    <span className="detail-label">
                      Time
                    </span>

                    <strong>
                      {formatTime(
                        appointment.appointmentTime
                      )}
                    </strong>
                  </div>

                </div>

                {/* DEPARTMENT */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    🏥
                  </span>

                  <div>
                    <span className="detail-label">
                      Department
                    </span>

                    <strong>
                      {appointment.department ||
                        "General"}
                    </strong>
                  </div>

                </div>

                {/* APPOINTMENT ID */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    🆔
                  </span>

                  <div>
                    <span className="detail-label">
                      Appointment ID
                    </span>

                    <strong>
                      #{appointmentId}
                    </strong>
                  </div>

                </div>

              </div>

              {/* =========================================
                  REASON
              ========================================= */}

              <div className="appointment-reason">

                <strong>Reason:</strong>

                <p>
                  {appointment.reason ||
                    "No reason provided."}
                </p>

              </div>

              {/* =========================================
                  ACTION
              ========================================= */}

              <div className="appointment-actions">

                {isPending && (
                  <button
                    type="button"
                    className="cancel-appointment-btn"
                    onClick={() =>
                      handleCancelAppointment(
                        appointmentId
                      )
                    }
                    disabled={isCancelling}
                  >
                    {isCancelling
                      ? "Cancelling..."
                      : "Cancel Appointment"}
                  </button>
                )}

                {isCompleted && (
                  <div className="appointment-info completed-info">
                    This appointment has been
                    completed.
                  </div>
                )}

                {isCancelled && (
                  <div className="appointment-info cancelled-info">
                    This appointment has been
                    cancelled.
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Appointments;