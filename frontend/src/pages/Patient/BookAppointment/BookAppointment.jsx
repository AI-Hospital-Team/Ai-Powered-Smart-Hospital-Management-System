import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);

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
      setError("Unable to load doctors.");
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const userData = localStorage.getItem("user");

    if (!userData) {
      setError("Patient information not found. Please login again.");
      return;
    }

    let user;

    try {
      user = JSON.parse(userData);
    } catch (err) {
      setError("Invalid user information. Please login again.");
      return;
    }

    if (!user.patientId) {
      setError("Patient ID not found. Please login again.");
      return;
    }

    if (!formData.doctorId) {
      setError("Please select a doctor.");
      return;
    }

    if (!formData.appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }

    if (!formData.appointmentTime) {
      setError("Please select an appointment time.");
      return;
    }

    try {
      const appointmentData = {
        patientId: user.patientId,
        doctorId: Number(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
      };

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
        const errorText = await response.text();
        throw new Error(errorText || "Failed to book appointment");
      }

      setMessage("Appointment booked successfully!");

      setFormData({
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });

    } catch (err) {
      console.error("Booking error:", err);
      setError(
        "Unable to book appointment. Please check the backend API."
      );
    }
  };

  return (
    <div className="book-appointment-page">

      {/* HEADER */}
      <div className="book-page-header">

        <div>
          <h1>Book Appointment</h1>
          <p>
            Schedule an appointment with one of our doctors.
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/patient/appointments")}
        >
          ← My Appointments
        </button>

      </div>

      {/* FORM CARD */}
      <div className="booking-card">

        <form onSubmit={handleSubmit}>

          {/* DOCTOR */}
          <div className="form-group">

            <label htmlFor="doctorId">
              Select Doctor
            </label>

            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              disabled={loadingDoctors}
            >
              <option value="">
                {loadingDoctors
                  ? "Loading doctors..."
                  : "Select a doctor"}
              </option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.doctorId || doctor.id}
                  value={doctor.doctorId || doctor.id}
                >
                  {doctor.name || doctor.doctorName}
                  {doctor.specialization
                    ? ` - ${doctor.specialization}`
                    : ""}
                </option>
              ))}
            </select>

          </div>

          {/* DATE */}
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
              min={new Date().toISOString().split("T")[0]}
            />

          </div>

          {/* TIME */}
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
            />

          </div>

          {/* REASON */}
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
              rows="5"
            />

          </div>

          {/* ERROR */}
          {error && (
            <div className="booking-error">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {message && (
            <div className="booking-success">
              {message}
            </div>
          )}

          {/* BUTTONS */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-form-btn"
              onClick={() => navigate("/patient/appointments")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-booking-btn"
            >
              Book Appointment
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BookAppointment;