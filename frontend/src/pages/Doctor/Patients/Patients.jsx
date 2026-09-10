import { useEffect, useState } from "react";
import {
  UserRound,
  CalendarDays,
  ClipboardList,
  Pill,
  BadgeInfo,
  AlertCircle,
} from "lucide-react";
import "./Patients.css";

function Patients() {
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);

  const [patientAppointments, setPatientAppointments] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Doctor information not found. Please login again.");
        setLoading(false);
        return;
      }

      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Error reading user:", err);
      setError("Unable to read doctor information.");
      setLoading(false);
    }
  }, []);

  const doctorId = user?.doctorId;

  // =====================================================
  // FETCH MY PATIENTS
  // =====================================================

  useEffect(() => {
    if (!doctorId) {
      return;
    }

    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");

        const [patientsResponse, appointmentsResponse] =
          await Promise.all([
            fetch("http://localhost:8080/api/patients"),
            fetch(
              `http://localhost:8080/api/appointments/doctor/${doctorId}`
            ),
          ]);

        if (!patientsResponse.ok) {
          throw new Error("Failed to fetch patients.");
        }

        if (!appointmentsResponse.ok) {
          throw new Error("Failed to fetch appointments.");
        }

        const patientsData = await patientsResponse.json();
        const appointmentsData =
          await appointmentsResponse.json();

        const allPatients = Array.isArray(patientsData)
          ? patientsData
          : [];

        const doctorAppointments = Array.isArray(
          appointmentsData
        )
          ? appointmentsData
          : [];

        // Get unique patient IDs belonging to this doctor
        const patientIds = [
          ...new Set(
            doctorAppointments
              .map(
                (appointment) =>
                  appointment.patientId
              )
              .filter(
                (id) =>
                  id !== null &&
                  id !== undefined
              )
          ),
        ];

        const myPatients = patientIds
          .map((patientId) =>
            allPatients.find(
              (patient) =>
                Number(patient.patientId) ===
                Number(patientId)
            )
          )
          .filter(Boolean);

        setPatients(myPatients);
        setAppointments(doctorAppointments);
      } catch (err) {
        console.error(
          "Error fetching doctor patients:",
          err
        );

        setError(
          "Unable to load your patients. Please try again."
        );

        setPatients([]);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [doctorId]);

  // =====================================================
  // PATIENT DETAILS
  // =====================================================

  const openPatientDetails = async (patient) => {
    setSelectedPatient(patient);
    setPatientLoading(true);

    setPatientAppointments([]);
    setPatientRecords([]);
    setPatientPrescriptions([]);

    try {
      const patientId = patient.patientId;

      const [
        appointmentsResponse,
        recordsResponse,
        prescriptionsResponse,
      ] = await Promise.all([
        fetch(
          `http://localhost:8080/api/appointments/patient/${patientId}`
        ),
        fetch(
          `http://localhost:8080/api/medical-records/patient/${patientId}`
        ),
        fetch(
          `http://localhost:8080/api/prescriptions/patient/${patientId}`
        ),
      ]);

      const appointmentsData =
        appointmentsResponse.ok
          ? await appointmentsResponse.json()
          : [];

      const recordsData =
        recordsResponse.ok
          ? await recordsResponse.json()
          : [];

      const prescriptionsData =
        prescriptionsResponse.ok
          ? await prescriptionsResponse.json()
          : [];

      setPatientAppointments(
        Array.isArray(appointmentsData)
          ? appointmentsData
          : []
      );

      setPatientRecords(
        Array.isArray(recordsData)
          ? recordsData
          : []
      );

      setPatientPrescriptions(
        Array.isArray(prescriptionsData)
          ? prescriptionsData
          : []
      );
    } catch (err) {
      console.error(
        "Error loading patient details:",
        err
      );
    } finally {
      setPatientLoading(false);
    }
  };

  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const closePatientDetails = () => {
    setSelectedPatient(null);
    setPatientAppointments([]);
    setPatientRecords([]);
    setPatientPrescriptions([]);
  };

  // =====================================================
  // GET PATIENT APPOINTMENTS
  // =====================================================

  const getPatientAppointmentCount = (patientId) => {
    return appointments.filter(
      (appointment) =>
        Number(appointment.patientId) ===
        Number(patientId)
    ).length;
  };

  // =====================================================
  // FORMAT NAME
  // =====================================================

  const getPatientName = (patient) => {
    return (
      patient?.name ||
      patient?.fullName ||
      `Patient #${patient?.patientId || "N/A"}`
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="doctor-patients-page">

        <div className="doctor-patients-header">
          <div className="patients-title-wrap">

            <div className="patients-title-icon">
              <UserRound size={25} />
            </div>

            <div>
              <h1>My Patients</h1>
              <p>
                View and manage patients assigned to you.
              </p>
            </div>

          </div>
        </div>

        <div className="patients-message">

          <div className="patients-loader"></div>

          <p>Loading patients...</p>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="doctor-patients-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="doctor-patients-header">

        <div className="patients-title-wrap">

          <div className="patients-title-icon">
            <UserRound size={25} />
          </div>

          <div>
            <h1>My Patients</h1>

            <p>
              View patients who have appointments with you.
            </p>
          </div>

        </div>

        <div className="patients-count">
          {patients.length} Patients
        </div>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="patients-error">

          <AlertCircle size={19} />

          <span>{error}</span>

        </div>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {!error && patients.length === 0 && (
        <div className="no-patients">

          <div className="no-patients-icon">
            <UserRound size={30} />
          </div>

          <h2>No Patients Found</h2>

          <p>
            You don't have any patients with appointments yet.
          </p>

        </div>
      )}

      {/* =================================================
          PATIENT CARDS
      ================================================= */}

      {!error && patients.length > 0 && (
        <div className="patients-container">

          {patients.map((patient) => {

            const patientId = patient.patientId;

            const appointmentCount =
              getPatientAppointmentCount(patientId);

            return (
              <div
                className="patient-card"
                key={patientId}
                onClick={() =>
                  openPatientDetails(patient)
                }
              >

                <div className="patient-card-header">

                  <div className="patient-card-title">

                    <div className="patient-card-icon">
                      <UserRound size={24} />
                    </div>

                    <div>
                      <h2>
                        {getPatientName(patient)}
                      </h2>

                      <p>
                        Patient #{patientId || "N/A"}
                      </p>
                    </div>

                  </div>

                  <span className="patient-card-id">
                    #{patientId}
                  </span>

                </div>

                <div className="patient-card-details">

                  <div className="patient-detail">

                    <span className="patient-detail-icon">
                      <CalendarDays size={18} />
                    </span>

                    <div>
                      <small>Appointments</small>

                      <strong>
                        {appointmentCount}
                      </strong>
                    </div>

                  </div>

                  <div className="patient-detail">

                    <span className="patient-detail-icon">
                      <ClipboardList size={18} />
                    </span>

                    <div>
                      <small>Status</small>

                      <strong>Active Patient</strong>
                    </div>

                  </div>

                </div>

                <div className="view-patient">
                  View Patient Details →
                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* =================================================
          PATIENT DETAILS MODAL
      ================================================= */}

      {selectedPatient && (
        <div
          className="patient-modal-overlay"
          onClick={closePatientDetails}
        >

          <div
            className="patient-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="patient-modal-header">

              <div className="modal-patient-title">

                <div className="modal-patient-icon">
                  <UserRound size={25} />
                </div>

                <div>
                  <h2>
                    {getPatientName(selectedPatient)}
                  </h2>

                  <p>
                    Patient #{selectedPatient.patientId}
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="close-patient-modal"
                onClick={closePatientDetails}
              >
                ×
              </button>

            </div>

            {patientLoading ? (
              <div className="patient-modal-loading">

                <div className="patients-loader"></div>

                <p>
                  Loading patient details...
                </p>

              </div>
            ) : (
              <div className="patient-modal-content">

                {/* BASIC INFORMATION */}

                <div className="patient-section">

                  <h3>Patient Information</h3>

                  <div className="patient-info-grid">

                    <div>
                      <small>Patient ID</small>
                      <strong>
                        #{selectedPatient.patientId}
                      </strong>
                    </div>

                    <div>
                      <small>Name</small>
                      <strong>
                        {getPatientName(selectedPatient)}
                      </strong>
                    </div>

                    <div>
                      <small>Gender</small>
                      <strong>
                        {selectedPatient.gender || "-"}
                      </strong>
                    </div>

                    <div>
                      <small>Blood Group</small>
                      <strong>
                        {selectedPatient.bloodGroup || "-"}
                      </strong>
                    </div>

                  </div>

                </div>

                {/* APPOINTMENTS */}

                <div className="patient-section">

                  <div className="section-heading">

                    <h3>
                      Appointments
                    </h3>

                    <span>
                      {patientAppointments.length}
                    </span>

                  </div>

                  {patientAppointments.length === 0 ? (
                    <p className="section-empty">
                      No appointments found.
                    </p>
                  ) : (
                    <div className="mini-list">

                      {patientAppointments
                        .slice(0, 5)
                        .map((appointment) => (
                          <div
                            className="mini-item"
                            key={
                              appointment.appointmentId
                            }
                          >

                            <CalendarDays size={17} />

                            <div>
                              <strong>
                                {appointment.appointmentDate ||
                                  "-"}
                              </strong>

                              <small>
                                {appointment.appointmentTime ||
                                  "-"}{" "}
                                ·{" "}
                                {appointment.status ||
                                  "Pending"}
                              </small>
                            </div>

                          </div>
                        ))}

                    </div>
                  )}

                </div>

                {/* RECORDS */}

                <div className="patient-section">

                  <div className="section-heading">

                    <h3>
                      Medical Records
                    </h3>

                    <span>
                      {patientRecords.length}
                    </span>

                  </div>

                  {patientRecords.length === 0 ? (
                    <p className="section-empty">
                      No medical records found.
                    </p>
                  ) : (
                    <div className="mini-list">

                      {patientRecords
                        .slice(0, 5)
                        .map((record) => (
                          <div
                            className="mini-item"
                            key={
                              record.recordId
                            }
                          >

                            <ClipboardList size={17} />

                            <div>
                              <strong>
                                {record.diagnosis ||
                                  "Medical Record"}
                              </strong>

                              <small>
                                {record.recordDate ||
                                  "Date unavailable"}
                              </small>
                            </div>

                          </div>
                        ))}

                    </div>
                  )}

                </div>

                {/* PRESCRIPTIONS */}

                <div className="patient-section">

                  <div className="section-heading">

                    <h3>
                      Prescriptions
                    </h3>

                    <span>
                      {patientPrescriptions.length}
                    </span>

                  </div>

                  {patientPrescriptions.length === 0 ? (
                    <p className="section-empty">
                      No prescriptions found.
                    </p>
                  ) : (
                    <div className="mini-list">

                      {patientPrescriptions
                        .slice(0, 5)
                        .map((prescription) => (
                          <div
                            className="mini-item"
                            key={
                              prescription.prescriptionId
                            }
                          >

                            <Pill size={17} />

                            <div>
                              <strong>
                                {prescription.medicineName ||
                                  "Prescription"}
                              </strong>

                              <small>
                                {prescription.dosage ||
                                  "-"}
                              </small>
                            </div>

                          </div>
                        ))}

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Patients;