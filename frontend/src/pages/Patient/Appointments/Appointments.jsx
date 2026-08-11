import { Link } from "react-router-dom";

function Appointments() {
  return (
    <div className="appointments-page">

      <div className="page-header">
        <div>
          <h1>My Appointments</h1>
          <p>Manage your hospital appointments</p>
        </div>

        <Link
          to="/patient/book-appointment"
          className="login-button"
        >
          + Book Appointment
        </Link>
      </div>

      <div className="dashboard-section">
        <h2>Upcoming Appointments</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>No appointments</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Appointment Information</h2>

        <p>
          Your booked appointments will appear here.
          You will be able to view doctor details,
          appointment date, time and status.
        </p>
      </div>

    </div>
  );
}

export default Appointments;