import { useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  ClipboardList,
  Pill,
  UserRound,
  Clock3,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [patientLoading, setPatientLoading] = useState(false);

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Doctor information not found.");
        setLoading(false);
        return;
      }

      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("User error:", err);
      setError("Unable to load doctor information.");
      setLoading(false);
    }
  }, []);

  const doctorId = user?.doctorId;

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    if (!doctorId) return;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          doctorResponse,
          appointmentsResponse,
          patientsResponse,
          recordsResponse,
          prescriptionsResponse,
        ] = await Promise.all([
          fetch(
            `http://localhost:8080/api/doctors/${doctorId}`
          ),
          fetch(
            `http://localhost:8080/api/appointments/doctor/${doctorId}`
          ),
          fetch(
            "http://localhost:8080/api/patients"
          ),
          fetch(
            `http://localhost:8080/api/medical-records/doctor/${doctorId}`
          ),
          fetch(
            `http://localhost:8080/api/prescriptions/doctor/${doctorId}`
          ),
        ]);

        const doctorData = doctorResponse.ok
          ? await doctorResponse.json()
          : null;

        const appointmentsData =
          appointmentsResponse.ok
            ? await appointmentsResponse.json()
            : [];

        const patientsData =
          patientsResponse.ok
            ? await patientsResponse.json()
            : [];

        const recordsData =
          recordsResponse.ok
            ? await recordsResponse.json()
            : [];

        const prescriptionsData =
          prescriptionsResponse.ok
            ? await prescriptionsResponse.json()
            : [];

        setDoctor(doctorData);

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
      } catch (err) {
        console.error(
          "Dashboard loading error:",
          err
        );

        setError(
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [doctorId]);

  // =====================================================
  // TODAY
  // =====================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =====================================================
  // TODAY'S APPOINTMENTS
  // =====================================================

  const todayAppointments =
    appointments.filter(
      (appointment) =>
        appointment.appointmentDate === today
    );

  // =====================================================
  // UPCOMING APPOINTMENTS
  // =====================================================

  const upcomingAppointments =
    appointments
      .filter(
        (appointment) =>
          appointment.appointmentDate >= today
      )
      .sort((a, b) => {
        const first =
          `${a.appointmentDate || ""} ${
            a.appointmentTime || ""
          }`;

        const second =
          `${b.appointmentDate || ""} ${
            b.appointmentTime || ""
          }`;

        return first.localeCompare(second);
      })
      .slice(0, 5);

  // =====================================================
  // MY PATIENTS
  // =====================================================

  const doctorPatientIds = [
    ...new Set(
      appointments
        .map(
          (appointment) =>
            appointment.patientId
        )
        .filter(Boolean)
    ),
  ];

  const myPatients = doctorPatientIds
    .map((patientId) =>
      patients.find(
        (patient) =>
          Number(patient.patientId) ===
          Number(patientId)
      )
    )
    .filter(Boolean);

  // =====================================================
  // PATIENT NAME
  // =====================================================

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (item) =>
        Number(item.patientId) ===
        Number(patientId)
    );

    if (!patient) {
      return `Patient #${patientId || "-"}`;
    }

    return (
      patient.name ||
      patient.fullName ||
      patient.patientName ||
      `Patient #${patientId}`
    );
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // =====================================================
  // OPEN PATIENT DETAILS
  // =====================================================

  const openPatientDetails = async (patient) => {
    setSelectedPatient(patient);
    setPatientLoading(true);

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
        "Patient details error:",
        err
      );
    } finally {
      setPatientLoading(false);
    }
  };

  // =====================================================
  // CLOSE PATIENT DETAILS
  // =====================================================

  const closePatientDetails = () => {
    setSelectedPatient(null);
    setPatientAppointments([]);
    setPatientRecords([]);
    setPatientPrescriptions([]);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="doctor-dashboard-page">

        <div className="doctor-dashboard-loading">
          <div className="doctor-dashboard-spinner"></div>
          <p>Loading Doctor Dashboard...</p>
        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="doctor-dashboard-page">

      {/* =================================================
          WELCOME
      ================================================= */}

      <section className="doctor-welcome-card">

        <div className="doctor-welcome-content">

          <div className="doctor-welcome-badge">
            <Stethoscope size={14} />
            Doctor Workspace
          </div>

          <h1>
            Welcome back,{" "}
            <span>
              {(() => {
                const doctorName =
                  doctor?.name ||
                  user?.name ||
                  user?.fullName ||
                  "Doctor";

                return doctorName.startsWith("Dr.")
                  ? doctorName
                  : `Dr. ${doctorName}`;
              })()}
            </span>
          </h1>

          <p>
            Manage your patients, appointments and
            clinical information from one place.
          </p>

          <div className="doctor-welcome-info">

            <div>
              <small>Doctor ID</small>
              <strong>
                #{doctor?.doctorId || doctorId || "-"}
              </strong>
            </div>

            <div>
              <small>Specialization</small>
              <strong>
                {doctor?.specialization ||
                  "Medical Specialist"}
              </strong>
            </div>

          </div>

        </div>

        <div className="doctor-welcome-icon">
          <Stethoscope size={70} />
        </div>

      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="doctor-dashboard-error">
          {error}
        </div>
      )}

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="doctor-stat-grid">

        <div className="doctor-stat-card appointments-stat">

          <div className="doctor-stat-icon">
            <CalendarDays size={24} />
          </div>

          <div>
            <span>Today's Appointments</span>
            <strong>
              {todayAppointments.length}
            </strong>
          </div>

        </div>

        <div className="doctor-stat-card patients-stat">

          <div className="doctor-stat-icon">
            <Users size={24} />
          </div>

          <div>
            <span>My Patients</span>
            <strong>
              {myPatients.length}
            </strong>
          </div>

        </div>

        <div className="doctor-stat-card records-stat">

          <div className="doctor-stat-icon">
            <ClipboardList size={24} />
          </div>

          <div>
            <span>Medical Records</span>
            <strong>
              {medicalRecords.length}
            </strong>
          </div>

        </div>

        <div className="doctor-stat-card prescriptions-stat">

          <div className="doctor-stat-icon">
            <Pill size={24} />
          </div>

          <div>
            <span>Prescriptions</span>
            <strong>
              {prescriptions.length}
            </strong>
          </div>

        </div>

      </section>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <section className="doctor-dashboard-grid">

        {/* =================================================
            UPCOMING APPOINTMENTS
        ================================================= */}

        <div className="doctor-dashboard-card">

          <div className="doctor-card-header">

            <div>
              <h2>Upcoming Appointments</h2>
              <p>
                Your next scheduled appointments.
              </p>
            </div>

            <a
              href="/doctor/appointments"
              className="doctor-view-all"
            >
              View All
              <ArrowRight size={15} />
            </a>

          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="doctor-empty-small">

              <CalendarDays size={28} />

              <p>
                No upcoming appointments.
              </p>

            </div>
          ) : (
            <div className="doctor-appointment-list">

              {upcomingAppointments.map(
                (appointment) => (

                  <div
                    className="doctor-appointment-item"
                    key={appointment.appointmentId}
                  >

                    <div className="appointment-date-box">
                      <CalendarDays size={18} />
                    </div>

                    <div className="appointment-main">

                      <strong>
                        {getPatientName(
                          appointment.patientId
                        )}
                      </strong>

                      <span>
                        {formatDate(
                          appointment.appointmentDate
                        )}
                        {" • "}
                        {appointment.appointmentTime ||
                          "Time not set"}
                      </span>

                    </div>

                    <div
                      className={`doctor-status ${
                        (
                          appointment.status ||
                          "Pending"
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {appointment.status ||
                        "Pending"}
                    </div>

                  </div>

                )
              )}

            </div>
          )}

        </div>

        {/* =================================================
            MY PATIENTS
        ================================================= */}

        <div className="doctor-dashboard-card">

          <div className="doctor-card-header">

            <div>
              <h2>My Patients</h2>
              <p>
                Patients with appointments with you.
              </p>
            </div>

            <a
              href="/doctor/patients"
              className="doctor-view-all"
            >
              View All
              <ArrowRight size={15} />
            </a>

          </div>

          {myPatients.length === 0 ? (
            <div className="doctor-empty-small">

              <Users size={28} />

              <p>
                No patients found.
              </p>

            </div>
          ) : (
            <div className="doctor-patient-list">

              {myPatients
                .slice(0, 5)
                .map((patient) => (

                  <div
                    className="doctor-patient-item"
                    key={patient.patientId}
                  >

                    <div className="doctor-patient-avatar">
                      <UserRound size={19} />
                    </div>

                    <div className="doctor-patient-main">

                      <strong>
                        {getPatientName(
                          patient.patientId
                        )}
                      </strong>

                      <span>
                        Patient #{patient.patientId}
                      </span>

                    </div>

                    <button
                      type="button"
                      className="doctor-patient-view"
                      onClick={() =>
                        openPatientDetails(patient)
                      }
                    >
                      View
                      <ArrowRight size={14} />
                    </button>

                  </div>

                ))}

            </div>
          )}

        </div>

      </section>

      {/* =================================================
          PATIENT DETAILS MODAL
      ================================================= */}

      {selectedPatient && (
        <div
          className="doctor-patient-modal-overlay"
          onClick={closePatientDetails}
        >

          <div
            className="doctor-patient-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="doctor-patient-modal-header">

              <div className="doctor-modal-patient-title">

                <div className="doctor-modal-avatar">
                  <UserRound size={25} />
                </div>

                <div>
                  <h2>
                    {getPatientName(
                      selectedPatient.patientId
                    )}
                  </h2>

                  <p>
                    Patient #
                    {selectedPatient.patientId}
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="doctor-modal-close"
                onClick={closePatientDetails}
              >
                ×
              </button>

            </div>

            {patientLoading ? (
              <div className="doctor-modal-loading">

                <div className="doctor-dashboard-spinner"></div>

                <p>
                  Loading patient details...
                </p>

              </div>
            ) : (
              <div className="doctor-modal-content">

                {/* BASIC INFORMATION */}

                <div className="doctor-patient-basic-grid">

                  <div>
                    <span>Gender</span>
                    <strong>
                      {selectedPatient.gender ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Blood Group</span>
                    <strong>
                      {selectedPatient.bloodGroup ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Age</span>
                    <strong>
                      {selectedPatient.age
                        ? `${selectedPatient.age} years`
                        : "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Mobile</span>
                    <strong>
                      {selectedPatient.mobile ||
                        selectedPatient.phone ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* SUMMARY */}

                <div className="doctor-modal-summary">

                  <div>
                    <CalendarDays size={17} />
                    <span>
                      {patientAppointments.length}
                    </span>
                    <small>
                      Appointments
                    </small>
                  </div>

                  <div>
                    <ClipboardList size={17} />
                    <span>
                      {patientRecords.length}
                    </span>
                    <small>
                      Medical Records
                    </small>
                  </div>

                  <div>
                    <Pill size={17} />
                    <span>
                      {patientPrescriptions.length}
                    </span>
                    <small>
                      Prescriptions
                    </small>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default DoctorDashboard;