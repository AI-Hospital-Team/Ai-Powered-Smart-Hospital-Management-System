import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  UserRound,
  HeartPulse,
  Stethoscope,
  CalendarPlus,
  ShieldCheck,
  Building2,
  Info,
  X,
  Plus,
} from "lucide-react";
import "./BookAppointment.css";

const API_URL = "http://localhost:8080/api";

function BookAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  // FETCH DOCTORS
  // =====================================================

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        setError("");

        const response = await fetch(
          `${API_URL}/doctors`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch doctors: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Doctors:", data);

        setDoctors(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Error fetching doctors:",
          error
        );

        setError(
          "Unable to load doctors. Please try again."
        );
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const patientId = getPatientId();

    if (!patientId) {
      setError(
        "Patient information not found. Please login again."
      );
      return;
    }

    if (!doctorId) {
      setError("Please select a doctor.");
      return;
    }

    if (!appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }

    if (!appointmentTime) {
      setError("Please select an appointment time.");
      return;
    }

    if (!reason.trim()) {
      setError("Please enter the reason for your visit.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: Number(patientId),
            doctorId: Number(doctorId),
            appointmentDate,
            appointmentTime,
            reason: reason.trim(),
            status: "Pending",
          }),
        }
      );

      if (!response.ok) {
        let message =
          "Unable to book appointment.";

        try {
          const responseText =
            await response.text();

          if (responseText) {
            message = responseText;
          }
        } catch {
          // Keep default message
        }

        throw new Error(message);
      }

      const data = await response.json();

      console.log(
        "Appointment booked:",
        data
      );

      setSuccess(
        "Appointment booked successfully."
      );

      setDoctorId("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");

      setTimeout(() => {
        navigate("/patient/appointments");
      }, 1000);
    } catch (error) {
      console.error(
        "Booking appointment error:",
        error
      );

      setError(
        error.message ||
          "Unable to book appointment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    navigate("/patient/appointments");
  };

  // =====================================================
  // MINIMUM DATE
  // =====================================================

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================================
  // DOCTOR NAME
  // =====================================================

  const getDoctorName = (doctor) => {
    return (
      doctor.name ||
      doctor.fullName ||
      doctor.doctorName ||
      `Doctor #${doctor.doctorId || doctor.id}`
    );
  };

  return (
    <div className="book-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="book-page-header">

        <div className="book-title-section">

          <div className="book-title-icon">
            <CalendarPlus size={30} />
          </div>

          <div>
            <h1>Book Appointment</h1>

            <p>
              Schedule an appointment with one of
              our doctors.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="appointments-back-btn"
          onClick={() =>
            navigate("/patient/appointments")
          }
        >
          <ArrowLeft size={17} />
          My Appointments
        </button>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="book-content">

        {/* =================================================
            INFORMATION CARD
        ================================================= */}

        <aside className="health-card">

          <div className="health-icon">
            <HeartPulse size={30} />
          </div>

          <h2>
            Your Health,
            <br />
            Our Priority
          </h2>

          <p className="health-description">
            Book an appointment in
            few simple steps.
          </p>

          {/* EXPERT DOCTORS */}

          <div className="health-feature">

            <div className="health-feature-icon">
              <Stethoscope size={19} />
            </div>

            <div>
              <strong>
                Expert Doctors
              </strong>

              <span>
                Consult with experienced
                specialists
              </span>
            </div>

          </div>

          {/* QUICK BOOKING */}

          <div className="health-feature">

            <div className="health-feature-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <strong>
                Quick Booking
              </strong>

              <span>
                Schedule your appointment
                in minutes
              </span>
            </div>

          </div>

          {/* BETTER CARE */}

          <div className="health-feature">

            <div className="health-feature-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <strong>
                Better Care
              </strong>

              <span>
                We're here to take care
                of your health
              </span>
            </div>

          </div>

          {/* DECORATION */}

          <div className="health-decoration">
            <CalendarPlus size={105} />
            <Clock3 size={43} />
          </div>

        </aside>

        {/* =================================================
            BOOKING FORM
        ================================================= */}

        <section className="booking-card">

          <form
            onSubmit={handleSubmit}
            className="booking-form"
          >

            {/* ERROR */}

            {error && (
              <div className="booking-message booking-error">
                <Info size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="booking-message booking-success">
                <ShieldCheck size={18} />
                <span>{success}</span>
              </div>
            )}

            {/* =================================================
                DOCTOR
            ================================================= */}

            <div className="form-group full-width">

              <label htmlFor="doctor">
                Select Doctor
              </label>

              <div className="select-wrapper">

                <UserRound
                  className="field-icon"
                  size={19}
                />

                <select
                  id="doctor"
                  value={doctorId}
                  onChange={(event) =>
                    setDoctorId(
                      event.target.value
                    )
                  }
                  disabled={loadingDoctors}
                  required
                >

                  <option value="">
                    {loadingDoctors
                      ? "Loading doctors..."
                      : "Select a doctor"}
                  </option>

                  {doctors.map((doctor) => (
                    <option
                      key={
                        doctor.doctorId ||
                        doctor.id
                      }
                      value={
                        doctor.doctorId ||
                        doctor.id
                      }
                    >
                      {getDoctorName(doctor)}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* =================================================
                DATE + TIME
            ================================================= */}

            <div className="form-row">

              {/* DATE */}

              <div className="form-group">

                <label htmlFor="appointmentDate">
                  Appointment Date
                </label>

                <div className="input-wrapper">

                  <CalendarDays
                    className="field-icon"
                    size={19}
                  />

                  <input
                    id="appointmentDate"
                    type="date"
                    min={getToday()}
                    value={appointmentDate}
                    onChange={(event) =>
                      setAppointmentDate(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* TIME */}

              <div className="form-group">

                <label htmlFor="appointmentTime">
                  Appointment Time
                </label>

                <div className="input-wrapper">

                  <Clock3
                    className="field-icon"
                    size={19}
                  />

                  <input
                    id="appointmentTime"
                    type="time"
                    value={appointmentTime}
                    onChange={(event) =>
                      setAppointmentTime(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                REASON
            ================================================= */}

            <div className="form-group full-width">

              <div className="reason-label-row">

                <label htmlFor="reason">
                  Reason for Visit
                </label>

                <span>
                  {reason.length}/500
                </span>

              </div>

              <textarea
                id="reason"
                value={reason}
                maxLength={500}
                onChange={(event) =>
                  setReason(
                    event.target.value
                  )
                }
                placeholder="Enter the reason for your appointment..."
                rows={5}
                required
              />

            </div>

            {/* =================================================
                NOTE
            ================================================= */}

            <div className="appointment-note">

              <Info size={18} />

              <span>
                <strong>Please Note:</strong>{" "}
                Make sure to arrive 10 minutes
                before your scheduled time.
              </span>

            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="booking-actions">

              <button
                type="button"
                className="cancel-booking-btn"
                onClick={handleCancel}
                disabled={submitting}
              >
                <X size={18} />
                Cancel
              </button>

              <button
                type="submit"
                className="submit-booking-btn"
                disabled={
                  submitting ||
                  loadingDoctors
                }
              >
                {submitting ? (
                  <>
                    <span className="button-spinner" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CalendarPlus size={18} />
                    Book Appointment
                  </>
                )}
              </button>

            </div>

          </form>

        </section>

      </div>

    </div>
  );
}

export default BookAppointment;