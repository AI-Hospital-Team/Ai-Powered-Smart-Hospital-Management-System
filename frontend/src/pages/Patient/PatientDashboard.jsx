import { useEffect, useState } from "react";

function PatientDashboard() {
  // ==========================================
  // USER
  // ==========================================

  const [user, setUser] = useState(null);

  // ==========================================
  // APPOINTMENTS
  // ==========================================

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] =
    useState(true);
  const [appointmentsError, setAppointmentsError] =
    useState("");

  // ==========================================
  // MEDICAL RECORDS
  // ==========================================

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] =
    useState(true);
  const [recordsError, setRecordsError] = useState("");

  // ==========================================
  // PRESCRIPTIONS
  // ==========================================

  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsLoading, setPrescriptionsLoading] =
    useState(true);
  const [prescriptionsError, setPrescriptionsError] =
    useState("");

  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error(
          "No user found in localStorage"
        );

        setAppointmentsLoading(false);
        setRecordsLoading(false);
        setPrescriptionsLoading(false);

        return;
      }

      const parsedUser = JSON.parse(storedUser);

      console.log(
        "Logged-in patient:",
        parsedUser
      );

      setUser(parsedUser);
    } catch (error) {
      console.error(
        "Error reading user:",
        error
      );

      setAppointmentsLoading(false);
      setRecordsLoading(false);
      setPrescriptionsLoading(false);
    }
  }, []);

  // ==========================================
  // FETCH PATIENT DATA
  // ==========================================

  useEffect(() => {
    if (!user?.patientId) {
      return;
    }

    const patientId = user.patientId;

    console.log(
      "Fetching data for Patient ID:",
      patientId
    );

    // ========================================
    // FETCH APPOINTMENTS
    // ========================================

    setAppointmentsLoading(true);
    setAppointmentsError("");

    fetch(
      `http://localhost:8080/api/appointments/patient/${patientId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Appointments API failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Patient appointments:",
          data
        );

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      })
      .catch((error) => {
        console.error(
          "Appointments error:",
          error
        );

        setAppointmentsError(
          "Failed to load appointments."
        );

        setAppointments([]);
      })
      .finally(() => {
        setAppointmentsLoading(false);
      });

    // ========================================
    // FETCH MEDICAL RECORDS
    // ========================================

    setRecordsLoading(true);
    setRecordsError("");

    fetch(
      `http://localhost:8080/api/medical-records/patient/${patientId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Medical records API failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Patient medical records:",
          data
        );

        if (Array.isArray(data)) {
          setMedicalRecords(data);
        } else {
          setMedicalRecords([]);
        }
      })
      .catch((error) => {
        console.error(
          "Medical records error:",
          error
        );

        setRecordsError(
          "Failed to load medical records."
        );

        setMedicalRecords([]);
      })
      .finally(() => {
        setRecordsLoading(false);
      });

    // ========================================
    // FETCH PRESCRIPTIONS
    // ========================================

    setPrescriptionsLoading(true);
    setPrescriptionsError("");

    fetch(
      `http://localhost:8080/api/prescriptions/patient/${patientId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Prescriptions API failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Patient prescriptions:",
          data
        );

        if (Array.isArray(data)) {
          setPrescriptions(data);
        } else {
          setPrescriptions([]);
        }
      })
      .catch((error) => {
        console.error(
          "Prescriptions error:",
          error
        );

        setPrescriptionsError(
          "Failed to load prescriptions."
        );

        setPrescriptions([]);
      })
      .finally(() => {
        setPrescriptionsLoading(false);
      });
  }, [user]);

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="patient-dashboard">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="page-header">

        <div>

          <h1>
            Patient Dashboard
          </h1>

          <p>
            Welcome, Patient
          </p>

        </div>

      </div>

      {/* ======================================
          DASHBOARD CARDS
      ====================================== */}

      <div className="dashboard-cards">

        {/* ====================================
            APPOINTMENTS CARD
        ==================================== */}

        <div className="dashboard-card">

          <div className="card-icon">
            📅
          </div>

          <div>

            <h3>
              Appointments
            </h3>

            <p>
              {appointmentsLoading
                ? "..."
                : appointments.length}
            </p>

          </div>

        </div>

        {/* ====================================
            MEDICAL RECORDS CARD
        ==================================== */}

        <div className="dashboard-card">

          <div className="card-icon">
            📋
          </div>

          <div>

            <h3>
              Medical Records
            </h3>

            <p>
              {recordsLoading
                ? "..."
                : medicalRecords.length}
            </p>

          </div>

        </div>

        {/* ====================================
            PRESCRIPTIONS CARD
        ==================================== */}

        <div className="dashboard-card">

          <div className="card-icon">
            💊
          </div>

          <div>

            <h3>
              Prescriptions
            </h3>

            <p>
              {prescriptionsLoading
                ? "..."
                : prescriptions.length}
            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          MY APPOINTMENTS
      ====================================== */}

      <div className="dashboard-section">

        <h2>
          My Appointments
        </h2>

        <div className="table-container">

          {/* LOADING */}

          {appointmentsLoading ? (

            <p>
              Loading appointments...
            </p>

          ) : appointmentsError ? (

            /* ERROR */

            <p>
              {appointmentsError}
            </p>

          ) : appointments.length === 0 ? (

            /* EMPTY */

            <p>
              No appointments found.
            </p>

          ) : (

            /* TABLE */

            <table>

              <thead>

                <tr>

                  <th>
                    Date
                  </th>

                  <th>
                    Doctor
                  </th>

                  <th>
                    Time
                  </th>

                  <th>
                    Reason
                  </th>

                  <th>
                    Status
                  </th>

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
                          appointment.reason ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          appointment.status ||
                          "-"
                        }
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* ======================================
          MY MEDICAL RECORDS
      ====================================== */}

      <div className="dashboard-section">

        <h2>
          My Medical Records
        </h2>

        <div className="table-container">

          {/* LOADING */}

          {recordsLoading ? (

            <p>
              Loading medical records...
            </p>

          ) : recordsError ? (

            /* ERROR */

            <p>
              {recordsError}
            </p>

          ) : medicalRecords.length === 0 ? (

            /* EMPTY */

            <p>
              No medical records found.
            </p>

          ) : (

            /* TABLE */

            <table>

              <thead>

                <tr>

                  <th>
                    Date
                  </th>

                  <th>
                    Doctor
                  </th>

                  <th>
                    Diagnosis
                  </th>

                  <th>
                    Symptoms
                  </th>

                  <th>
                    Treatment
                  </th>

                  <th>
                    Notes
                  </th>

                </tr>

              </thead>

              <tbody>

                {medicalRecords.map(
                  (record) => (

                    <tr
                      key={
                        record.recordId
                      }
                    >

                      <td>
                        {
                          record.recordDate
                        }
                      </td>

                      <td>
                        Doctor #
                        {
                          record.doctorId
                        }
                      </td>

                      <td>
                        {
                          record.diagnosis ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          record.symptoms ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          record.treatment ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          record.notes ||
                          "-"
                        }
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* ======================================
          MY PRESCRIPTIONS
      ====================================== */}

      <div className="dashboard-section">

        <h2>
          My Prescriptions
        </h2>

        <div className="table-container">

          {/* LOADING */}

          {prescriptionsLoading ? (

            <p>
              Loading prescriptions...
            </p>

          ) : prescriptionsError ? (

            /* ERROR */

            <p>
              {prescriptionsError}
            </p>

          ) : prescriptions.length === 0 ? (

            /* EMPTY */

            <p>
              No prescriptions found.
            </p>

          ) : (

            /* TABLE */

            <table>

              <thead>

                <tr>

                  <th>
                    Date
                  </th>

                  <th>
                    Doctor
                  </th>

                  <th>
                    Medicine
                  </th>

                  <th>
                    Dosage
                  </th>

                  <th>
                    Frequency
                  </th>

                  <th>
                    Duration
                  </th>

                  <th>
                    Instructions
                  </th>

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
                          prescription.medicineName
                        }
                      </td>

                      <td>
                        {
                          prescription.dosage ||
                          "-"
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

          )}

        </div>

      </div>

    </div>
  );
}

export default PatientDashboard;