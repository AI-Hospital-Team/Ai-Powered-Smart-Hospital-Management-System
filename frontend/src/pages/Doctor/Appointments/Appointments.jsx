import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  UserRound,
  BadgeInfo,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import "./Appointments.css";
import SkeletonDoctorAppointments from "../../../components/Skeleton/SkeletonDoctorAppointments";

function Appointments() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError(
          "Doctor information not found. Please login again."
        );
        setLoading(false);
        return;
      }

      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error reading user:", error);

      setError(
        "Unable to read doctor information."
      );

      setLoading(false);
    }
  }, []);

  const doctorId = user?.doctorId;

  // =====================================================
  // FETCH DOCTOR APPOINTMENTS + PATIENTS
  // =====================================================

  useEffect(() => {
    if (!doctorId) {
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          appointmentsResponse,
          patientsResponse,
        ] = await Promise.all([
          fetch(
            `http://localhost:8080/api/appointments/doctor/${doctorId}`
          ),

          fetch(
            "http://localhost:8080/api/patients"
          ),
        ]);

        // ---------------------------------------------
        // APPOINTMENTS
        // ---------------------------------------------

        if (!appointmentsResponse.ok) {
          throw new Error(
            `Failed to fetch appointments: ${appointmentsResponse.status}`
          );
        }

        const appointmentsData =
          await appointmentsResponse.json();

        // ---------------------------------------------
        // PATIENTS
        // ---------------------------------------------

        const patientsData =
          patientsResponse.ok
            ? await patientsResponse.json()
            : [];

        // ---------------------------------------------
        // SAVE DATA
        // ---------------------------------------------

        setAppointments(
          Array.isArray(appointmentsData)
            ? appointmentsData
            : []
        );

        setPatients(
          Array.isArray(patientsData)
            ? patientsData
            : []
        );

      } catch (error) {
        console.error(
          "Error fetching doctor appointments:",
          error
        );

        setError(
          "Unable to load appointments. Please try again."
        );

        setAppointments([]);
        setPatients([]);

      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  // =====================================================
  // GET PATIENT NAME
  // =====================================================

  const getPatientName = (patientId) => {
    if (!patientId) {
      return "Unknown Patient";
    }

    const patient = patients.find(
      (item) =>
        Number(item.patientId) ===
        Number(patientId)
    );

    if (!patient) {
      return `Patient #${patientId}`;
    }

    return (
      patient.name ||
      patient.fullName ||
      patient.patientName ||
      `Patient #${patientId}`
    );
  };

  // =====================================================
  // UPDATE APPOINTMENT STATUS
  // =====================================================

  const updateStatus = async (
    appointmentId,
    status
  ) => {
    if (!appointmentId) {
      return;
    }

    try {
      setUpdatingId(appointmentId);
      setError("");

      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update appointment: ${response.status}`
        );
      }

      const updatedAppointment =
        await response.json();

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? {
                ...appointment,
                ...updatedAppointment,
                status,
              }
            : appointment
        )
      );

    } catch (error) {
      console.error(
        "Error updating appointment:",
        error
      );

      setError(
        "Unable to update appointment status. Please try again."
      );

    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (
      (status || "Pending").toLowerCase()
    ) {
      case "confirmed":
        return "status-confirmed";

      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      case "expired":
        return "status-expired";

      case "pending":
      default:
        return "status-pending";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

if (loading) {
  return (
    <div className="doctor-appointments-page">
      <SkeletonDoctorAppointments />
    </div>
  );
}

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="doctor-appointments-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="doctor-appointments-header">

        <div className="appointments-title-wrap">

          <div className="appointments-title-icon">
            <CalendarDays size={25} />
          </div>

          <div>

            <h1>
              Appointments
            </h1>

            <p>
              View and manage your patient appointments.
            </p>

          </div>

        </div>

        <div className="appointment-count">
          {appointments.length} Appointments
        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="doctor-appointments-error">
          {error}
        </div>
      )}


      {/* =================================================
          EMPTY
      ================================================= */}

      {!error &&
        appointments.length === 0 && (
          <div className="no-doctor-appointments">

            <div className="no-appointments-icon">
              <CalendarDays size={30} />
            </div>

            <h2>
              No Appointments Found
            </h2>

            <p>
              You currently don't have any patient appointments.
            </p>

          </div>
        )}


      {/* =================================================
          APPOINTMENTS
      ================================================= */}

      <div className="doctor-appointments-list">

        {appointments.map((appointment) => {

          const appointmentId =
            appointment.appointmentId;

          const status =
            appointment.status || "Pending";

          const statusLower =
            status.toLowerCase();

          const isUpdating =
            updatingId === appointmentId;

          const canConfirm =
            statusLower === "pending";

          const canComplete =
            statusLower === "confirmed";

          const canCancel =
            statusLower === "pending" ||
            statusLower === "confirmed";

          return (
            <div
              className="doctor-appointment-card"
              key={appointmentId}
            >

              {/* =========================================
                  PATIENT
              ========================================= */}

              <div className="doctor-appointment-card-header">

                <div className="patient-info">

                  <div className="patient-icon">
                    <UserRound size={25} />
                  </div>

                  <div className="patient-text">

                    <h2>
                      {getPatientName(
                        appointment.patientId
                      )}
                    </h2>

                    <p>
                      Patient ID:{" "}
                      {appointment.patientId ||
                        "N/A"}
                    </p>

                  </div>

                </div>


                {/* STATUS */}

                <span
                  className={`appointment-status ${getStatusClass(
                    status
                  )}`}
                >

                  {statusLower ===
                    "confirmed" && (
                    <CheckCircle2 size={15} />
                  )}

                  {statusLower ===
                    "cancelled" && (
                    <XCircle size={15} />
                  )}

                  <span>
                    {status}
                  </span>

                </span>

              </div>


              {/* =========================================
                  DETAILS
              ========================================= */}

              <div className="doctor-appointment-details">

                {/* DATE */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    <CalendarDays size={20} />
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
                    <Clock3 size={20} />
                  </span>

                  <div>

                    <span className="detail-label">
                      Time
                    </span>

                    <strong>
                      {appointment.appointmentTime ||
                        "-"}
                    </strong>

                  </div>

                </div>


                {/* PATIENT ID */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    <UserRound size={20} />
                  </span>

                  <div>

                    <span className="detail-label">
                      Patient ID
                    </span>

                    <strong>
                      #
                      {appointment.patientId ||
                        "N/A"}
                    </strong>

                  </div>

                </div>


                {/* APPOINTMENT ID */}

                <div className="appointment-detail">

                  <span className="detail-icon">
                    <BadgeInfo size={20} />
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

              <div className="doctor-appointment-reason">

                <strong>
                  Reason
                </strong>

                <p>
                  {appointment.reason ||
                    "No reason provided."}
                </p>

              </div>


              {/* =========================================
                  ACTIONS
              ========================================= */}

              <div className="doctor-appointment-actions">

                {/* CONFIRM */}

                {canConfirm && (
                  <button
                    type="button"
                    className="appointment-action confirm-btn"
                    disabled={isUpdating}
                    onClick={() =>
                      updateStatus(
                        appointmentId,
                        "Confirmed"
                      )
                    }
                  >

                    <CheckCircle2 size={16} />

                    {isUpdating
                      ? "Updating..."
                      : "Confirm"}

                  </button>
                )}


                {/* COMPLETE */}

                {canComplete && (
                  <button
                    type="button"
                    className="appointment-action complete-btn"
                    disabled={isUpdating}
                    onClick={() =>
                      updateStatus(
                        appointmentId,
                        "Completed"
                      )
                    }
                  >

                    <CheckCircle2 size={16} />

                    {isUpdating
                      ? "Updating..."
                      : "Complete"}

                  </button>
                )}


                {/* CANCEL */}

                {canCancel && (
                  <button
                    type="button"
                    className="appointment-action cancel-btn"
                    disabled={isUpdating}
                    onClick={() =>
                      updateStatus(
                        appointmentId,
                        "Cancelled"
                      )
                    }
                  >

                    <XCircle size={16} />

                    {isUpdating
                      ? "Updating..."
                      : "Cancel"}

                  </button>
                )}


                {/* COMPLETED INFO */}

                {statusLower ===
                  "completed" && (
                  <div className="appointment-info completed-info">
                    Appointment completed.
                  </div>
                )}


                {/* CANCELLED INFO */}

                {statusLower ===
                  "cancelled" && (
                  <div className="appointment-info cancelled-info">
                    Appointment cancelled.
                  </div>
                )}


                {/* EXPIRED INFO */}

                {statusLower ===
                  "expired" && (
                  <div className="appointment-info expired-info">
                    Appointment expired. Patient must reschedule the appointment.
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