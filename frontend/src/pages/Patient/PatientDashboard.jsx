import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [patientId, setPatientId] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET USER FROM LOCAL STORAGE
  // ==========================================
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("User information not found. Please login again.");
        setLoading(false);
        return;
      }

      const loggedUser = JSON.parse(storedUser);

      console.log("Logged user:", loggedUser);

      setUser(loggedUser);

      // If patientId is already available
      if (loggedUser.patientId) {
        setPatientId(loggedUser.patientId);
      }
    } catch (error) {
      console.error("User data error:", error);
      setError("Unable to read login information.");
      setLoading(false);
    }
  }, []);

  // ==========================================
  // FIND PATIENT ID USING EMAIL
  // ==========================================
  useEffect(() => {
    if (!user) {
      return;
    }

    // Already have patient ID
    if (user.patientId) {
      return;
    }

    // Need email to find patient
    if (!user.email) {
      setError("Patient email is missing.");
      setLoading(false);
      return;
    }

    console.log("Finding patient by email:", user.email);

    fetch(
      `${API_URL}/patients/email/${encodeURIComponent(user.email)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Patient API returned ${response.status}`
          );
        }

        return response.json();
      })
      .then((patient) => {
        console.log("Patient response:", patient);

        if (!patient || !patient.patientId) {
          throw new Error("Patient record not found.");
        }

        const id = patient.patientId;

        console.log("Patient ID found:", id);

        setPatientId(id);

        // Save patientId for future dashboard visits
        const updatedUser = {
          ...user,
          patientId: id,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
      })
      .catch((error) => {
        console.error("Patient lookup failed:", error);

        setError(
          "Patient record not found for this account."
        );

        setLoading(false);
      });
  }, [user]);

  // ==========================================
  // LOAD ALL PATIENT DATA
  // ==========================================
  useEffect(() => {
    if (!patientId) {
      return;
    }

    console.log(
      "Loading patient dashboard for ID:",
      patientId
    );

    setLoading(true);
    setError("");

    const loadAppointments = fetch(
      `${API_URL}/appointments/patient/${patientId}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Appointments error: ${response.status}`
        );
      }

      return response.json();
    });

    const loadMedicalRecords = fetch(
      `${API_URL}/medical-records/patient/${patientId}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Medical records error: ${response.status}`
        );
      }

      return response.json();
    });

    const loadPrescriptions = fetch(
      `${API_URL}/prescriptions/patient/${patientId}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Prescriptions error: ${response.status}`
        );
      }

      return response.json();
    });

    Promise.all([
      loadAppointments,
      loadMedicalRecords,
      loadPrescriptions,
    ])
      .then(
        ([
          appointmentsData,
          recordsData,
          prescriptionsData,
        ]) => {
          console.log(
            "Appointments:",
            appointmentsData
          );

          console.log(
            "Medical Records:",
            recordsData
          );

          console.log(
            "Prescriptions:",
            prescriptionsData
          );

          setAppointments(
            Array.isArray(appointmentsData)
              ? appointmentsData
              : []
          );

          setMedicalRecords(
            Array.isArray(recordsData)
              ? recordsData
              : []
          );

          setPrescriptions(
            Array.isArray(prescriptionsData)
              ? prescriptionsData
              : []
          );
        }
      )
      .catch((error) => {
        console.error(
          "Dashboard loading error:",
          error
        );

        setError(
          "Unable to load patient information."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]);

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="patient-dashboard">
        <div className="dashboard-section">
          <h2>Patient Dashboard</h2>

          <p>{error}</p>

          <p>
            Please return to the Home page and login
            again.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // INITIAL LOADING
  // ==========================================
  if (loading && !patientId) {
    return (
      <div className="patient-dashboard">
        <div className="dashboard-section">
          <h2>Patient Dashboard</h2>
          <p>Loading patient information...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  return (
    <div className="patient-dashboard">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Patient Dashboard</h1>

          <p>
            Welcome, {user?.name || "Patient"}
          </p>

          {patientId && (
            <small>
              Patient ID: {patientId}
            </small>
          )}
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">
            📅
          </div>

          <div>
            <h3>Appointments</h3>
            <p>{appointments.length}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            📋
          </div>

          <div>
            <h3>Medical Records</h3>
            <p>{medicalRecords.length}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            💊
          </div>

          <div>
            <h3>Prescriptions</h3>
            <p>{prescriptions.length}</p>
          </div>
        </div>

      </div>

      {/* APPOINTMENTS */}
      <div className="dashboard-section">

        <h2>My Appointments</h2>

        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {appointments.map(
                  (appointment) => (
                    <tr
                      key={
                        appointment.appointmentId
                      }
                    >
                      <td>
                        {
                          appointment.appointmentDate
                        }
                      </td>

                      <td>
                        Doctor #
                        {
                          appointment.doctorId
                        }
                      </td>

                      <td>
                        {
                          appointment.appointmentTime
                        }
                      </td>

                      <td>
                        {
                          appointment.reason || "-"
                        }
                      </td>

                      <td>
                        {
                          appointment.status || "-"
                        }
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* MEDICAL RECORDS */}
      <div className="dashboard-section">

        <h2>My Medical Records</h2>

        {loading ? (
          <p>Loading medical records...</p>
        ) : medicalRecords.length === 0 ? (
          <p>No medical records found.</p>
        ) : (
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Diagnosis</th>
                  <th>Symptoms</th>
                  <th>Treatment</th>
                  <th>Notes</th>
                </tr>
              </thead>

              <tbody>

                {medicalRecords.map(
                  (record) => (
                    <tr
                      key={record.recordId}
                    >
                      <td>
                        {record.recordDate}
                      </td>

                      <td>
                        Doctor #
                        {record.doctorId}
                      </td>

                      <td>
                        {
                          record.diagnosis || "-"
                        }
                      </td>

                      <td>
                        {
                          record.symptoms || "-"
                        }
                      </td>

                      <td>
                        {
                          record.treatment || "-"
                        }
                      </td>

                      <td>
                        {
                          record.notes || "-"
                        }
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* PRESCRIPTIONS */}
      <div className="dashboard-section">

        <h2>My Prescriptions</h2>

        {loading ? (
          <p>Loading prescriptions...</p>
        ) : prescriptions.length === 0 ? (
          <p>No prescriptions found.</p>
        ) : (
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Instructions</th>
                </tr>
              </thead>

              <tbody>

                {prescriptions.map(
                  (prescription) => (
                    <tr
                      key={
                        prescription.prescriptionId
                      }
                    >
                      <td>
                        {
                          prescription.prescriptionDate
                        }
                      </td>

                      <td>
                        Doctor #
                        {
                          prescription.doctorId
                        }
                      </td>

                      <td>
                        {
                          prescription.medicineName ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          prescription.dosage || "-"
                        }
                      </td>

                      <td>
                        {
                          prescription.frequency ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          prescription.duration ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          prescription.instructions ||
                          "-"
                        }
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default PatientDashboard;