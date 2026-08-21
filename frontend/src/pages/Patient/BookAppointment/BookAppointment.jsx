import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==============================
  // GET TODAY'S DATE
  // ==============================
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==============================
  // FETCH DOCTORS
  // ==============================
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/doctors"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await response.json();

      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Doctor fetch error:", err);
      setError("Unable to load doctors. Please try again.");
    } finally {
      setLoadingDoctors(false);
    }
  };

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  // ==============================
  // VALIDATE FORM
  // ==============================
  const validateForm = () => {
    if (!formData.doctorId) {
      return "Please select a doctor.";
    }

    if (!formData.appointmentDate) {
      return "Please select an appointment date.";
    }

    if (!formData.appointmentTime) {
      return "Please select an appointment time.";
    }

    if (!formData.reason.trim()) {
      return "Please enter the reason for your appointment.";
    }

    if (formData.reason.trim().length < 3) {
      return "Reason must contain at least 3 characters.";
    }

    const today = getTodayDate();

    if (formData.appointmentDate < today) {
      return "Appointment date cannot be in the past.";
    }

    // Check time if appointment is today
    if (formData.appointmentDate === today) {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      const currentTime = `${hours}:${minutes}`;

      if (formData.appointmentTime <= currentTime) {
        return "Please select a future time for today's appointment.";
      }
    }

    return "";
  };

  // ==============================
  // SUBMIT APPOINTMENT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setMessage("");

    // Get logged-in patient
    const userData = localStorage.getItem("user");

    if (!userData) {
      setError("Patient information not found. Please login again.");
      return;
    }

    let user;

    try {
      user = JSON.parse(userData);
    } catch (err) {
      console.error("User parsing error:", err);
      setError("Invalid user information. Please login again.");
      return;
    }

    if (!user.patientId) {
      setError("Patient ID not found. Please login again.");
      return;
    }

    // Validate form
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const appointmentData = {
        patientId: Number(user.patientId),
        doctorId: Number(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason.trim(),
      };

      console.log("Booking appointment:", appointmentData);

      const response = await fetch(
        "http://localhost:8080/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to book appointment.";

        try {
          const errorText = await response.text();

          if (errorText) {
            errorMessage = errorText;
          }
        } catch (err) {
          console.error("Error reading response:", err);
        }

        throw new Error(errorMessage);
      }

      // Success
      setMessage("Appointment booked successfully!");

      setFormData({
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });

      // Redirect after successful booking
      setTimeout(() => {
        navigate("/patient/appointments");
      }, 1000);

    } catch (err) {
      console.error("Booking error:", err);

      setError(
        err.message ||
          "Unable to book appointment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==============================
  // CANCEL / BACK
  // ==============================
  const handleCancel = () => {
    navigate("/patient/appointments");
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="book-appointment-page">

      {/* ==============================
          PAGE HEADER
      ============================== */}
      <div className="book-page-header">

        <div>
          <h1>Book Appointment</h1>

          <p>
            Schedule an appointment with one of our doctors.
          </p>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={handleCancel}
        >
          ← My Appointments
        </button>

      </div>

      {/* ==============================
          BOOKING CARD
      ============================== */}
      <div className="booking-card">

        <form onSubmit={handleSubmit}>

          {/* ==============================
              DOCTOR
          ============================== */}
          <div className="form-group">

            <label htmlFor="doctorId">
              Select Doctor
            </label>

            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              disabled={
                loadingDoctors || submitting
              }
              required
            >

              <option value="">
                {loadingDoctors
                  ? "Loading doctors..."
                  : doctors.length === 0
                  ? "No doctors available"
                  : "Select a doctor"}
              </option>

              {doctors.map((doctor) => {

                const doctorId =
                  doctor.doctorId || doctor.id;

                const doctorName =
                  doctor.name ||
                  doctor.doctorName ||
                  `Doctor #${doctorId}`;

                return (
                  <option
                    key={doctorId}
                    value={doctorId}
                  >
                    {doctorName}

                    {doctor.specialization
                      ? ` - ${doctor.specialization}`
                      : ""}
                  </option>
                );
              })}

            </select>

          </div>

          {/* ==============================
              DATE
          ============================== */}
          <div className="form-group">

            <label htmlFor="appointmentDate">
              Appointment Date
            </label>

            <input
              id="appointmentDate"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={getTodayDate()}
              disabled={submitting}
              required
            />

          </div>

          {/* ==============================
              TIME
          ============================== */}
          <div className="form-group">

            <label htmlFor="appointmentTime">
              Appointment Time
            </label>

            <input
              id="appointmentTime"
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              disabled={submitting}
              required
            />

          </div>

          {/* ==============================
              REASON
          ============================== */}
          <div className="form-group">

            <label htmlFor="reason">
              Reason for Visit
            </label>

            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter the reason for your appointment..."
              rows={5}
              maxLength={500}
              disabled={submitting}
              required
            />

            <small>
              {formData.reason.length}/500 characters
            </small>

          </div>

          {/* ==============================
              ERROR
          ============================== */}
          {error && (
            <div className="booking-error">
              {error}
            </div>
          )}

          {/* ==============================
              SUCCESS
          ============================== */}
          {message && (
            <div className="booking-success">
              {message}
            </div>
          )}

          {/* ==============================
              BUTTONS
          ============================== */}
          <div className="form-actions">

            {/* CANCEL BUTTON */}
            <button
              type="button"
              className="cancel-form-btn"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>

            {/* BOOK BUTTON */}
            <button
              type="submit"
              className="submit-booking-btn"
              disabled={
                submitting ||
                loadingDoctors ||
                doctors.length === 0
              }
            >
              {submitting
                ? "Booking..."
                : "Book Appointment"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BookAppointment;