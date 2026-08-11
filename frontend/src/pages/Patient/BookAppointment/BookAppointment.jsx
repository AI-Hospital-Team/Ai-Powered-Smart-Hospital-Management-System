import { useState } from "react";

function BookAppointment() {
  const [formData, setFormData] = useState({
    doctor: "",
    department: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Appointment booked successfully!");

    console.log("Appointment Data:", formData);
  };

  return (
    <div className="appointments-page">

      <div className="page-header">
        <div>
          <h1>Book Appointment</h1>
          <p>Schedule an appointment with a doctor</p>
        </div>
      </div>

      <div className="dashboard-section">

        <h2>Appointment Details</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Doctor</label>

            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Sharma">Dr. Sharma</option>
              <option value="Dr. Patil">Dr. Patil</option>
              <option value="Dr. Kulkarni">Dr. Kulkarni</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Book Appointment
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookAppointment;