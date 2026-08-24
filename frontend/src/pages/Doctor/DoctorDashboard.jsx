import { useEffect, useState } from "react";

function DoctorDashboard() {
  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [prescriptionsLoading, setPrescriptionsLoading] =
    useState(true);

  const [appointmentsError, setAppointmentsError] = useState("");
  const [recordsError, setRecordsError] = useState("");
  const [prescriptionsError, setPrescriptionsError] =
    useState("");

  // =====================================================
  // MEDICAL RECORD FORM
  // =====================================================

  const [showRecordForm, setShowRecordForm] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [recordMessage, setRecordMessage] = useState("");

  const [recordForm, setRecordForm] = useState({
    patientId: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
    notes: "",
    recordDate: "",
  });

  // =====================================================
  // PRESCRIPTION FORM
  // =====================================================

  const [showPrescriptionForm, setShowPrescriptionForm] =
    useState(false);

  const [editingPrescriptionId, setEditingPrescriptionId] =
    useState(null);

  const [prescriptionMessage, setPrescriptionMessage] =
    useState("");

  const [prescriptionForm, setPrescriptionForm] = useState({
    patientId: "",
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    prescriptionDate: "",
  });

  // =====================================================
  // LOAD LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error("No user found in localStorage");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      console.log("Logged-in doctor:", parsedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error("Error reading user:", error);
    }
  }, []);

  // =====================================================
  // DOCTOR ID
  // =====================================================

  const doctorId = user?.doctorId;

  // =====================================================
  // TODAY
  // =====================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =====================================================
  // FETCH APPOINTMENTS
  // =====================================================

  useEffect(() => {
    if (!doctorId) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setAppointmentsError("");

        const response = await fetch(
          `http://localhost:8080/api/appointments/doctor/${doctorId}`
        );

        if (!response.ok) {
          throw new Error(
            `Appointments API failed: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Doctor appointments:", data);

        setAppointments(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Error fetching appointments:",
          error
        );

        setAppointmentsError(
          "Failed to load appointments."
        );

        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  // =====================================================
  // FETCH MEDICAL RECORDS
  // =====================================================

  useEffect(() => {
    if (!doctorId) {
      setRecordsLoading(false);
      return;
    }

    const fetchMedicalRecords = async () => {
      try {
        setRecordsLoading(true);
        setRecordsError("");

        const response = await fetch(
          `http://localhost:8080/api/medical-records/doctor/${doctorId}`
        );

        if (!response.ok) {
          throw new Error(
            `Medical records API failed: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Doctor medical records:", data);

        setMedicalRecords(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Error fetching medical records:",
          error
        );

        setRecordsError(
          "Failed to load medical records."
        );

        setMedicalRecords([]);
      } finally {
        setRecordsLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [doctorId]);

  // =====================================================
  // FETCH PRESCRIPTIONS
  // =====================================================

  useEffect(() => {
    if (!doctorId) {
      setPrescriptionsLoading(false);
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        setPrescriptionsLoading(true);
        setPrescriptionsError("");

        const response = await fetch(
          `http://localhost:8080/api/prescriptions/doctor/${doctorId}`
        );

        if (!response.ok) {
          throw new Error(
            `Prescriptions API failed: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Doctor prescriptions:", data);

        setPrescriptions(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Error fetching prescriptions:",
          error
        );

        setPrescriptionsError(
          "Failed to load prescriptions."
        );

        setPrescriptions([]);
      } finally {
        setPrescriptionsLoading(false);
      }
    };

    fetchPrescriptions();
  }, [doctorId]);

  // =====================================================
  // TODAY'S APPOINTMENTS
  // =====================================================

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentDate === today
  );

  // =====================================================
  // UPCOMING APPOINTMENTS
  // =====================================================

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentDate >= today
  );

  // =====================================================
  // UNIQUE PATIENTS
  // =====================================================

  const patientIds = [
    ...new Set(
      appointments
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

  // =====================================================
  // UPDATE APPOINTMENT STATUS
  // =====================================================

  const handleAppointmentStatus = async (
    appointmentId,
    status
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Appointment status API error:",
          errorText
        );

        throw new Error(
          `Failed to update appointment: ${response.status}`
        );
      }

      const updatedAppointment =
        await response.json();

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.appointmentId ===
          appointmentId
            ? updatedAppointment
            : appointment
        )
      );
    } catch (error) {
      console.error(
        "Error updating appointment status:",
        error
      );

      alert(
        "Failed to update appointment status."
      );
    }
  };

  // =====================================================
  // MEDICAL RECORD FORM CHANGE
  // =====================================================

  const handleRecordChange = (event) => {
    const { name, value } = event.target;

    setRecordForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD MEDICAL RECORD
  // =====================================================

  const openAddRecordForm = () => {
    setEditingRecordId(null);

    setRecordForm({
      patientId: "",
      diagnosis: "",
      symptoms: "",
      treatment: "",
      notes: "",
      recordDate: today,
    });

    setRecordMessage("");
    setShowRecordForm(true);
  };

  // =====================================================
  // OPEN EDIT MEDICAL RECORD
  // =====================================================

  const openEditRecordForm = (record) => {
    setEditingRecordId(record.recordId);

    setRecordForm({
      patientId: record.patientId || "",
      diagnosis: record.diagnosis || "",
      symptoms: record.symptoms || "",
      treatment: record.treatment || "",
      notes: record.notes || "",
      recordDate:
        record.recordDate || today,
    });

    setRecordMessage("");
    setShowRecordForm(true);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CANCEL MEDICAL RECORD FORM
  // =====================================================

  const cancelRecordForm = () => {
    setShowRecordForm(false);
    setEditingRecordId(null);
    setRecordMessage("");

    setRecordForm({
      patientId: "",
      diagnosis: "",
      symptoms: "",
      treatment: "",
      notes: "",
      recordDate: "",
    });
  };

  // =====================================================
  // ADD / UPDATE MEDICAL RECORD
  // =====================================================

  const handleRecordSubmit = async (event) => {
    event.preventDefault();

    setRecordMessage("");

    if (!recordForm.patientId) {
      setRecordMessage(
        "Patient ID is required."
      );
      return;
    }

    if (!recordForm.diagnosis.trim()) {
      setRecordMessage(
        "Diagnosis is required."
      );
      return;
    }

    try {
      const isEditing =
        editingRecordId !== null;

      const url = isEditing
        ? `http://localhost:8080/api/medical-records/${editingRecordId}`
        : "http://localhost:8080/api/medical-records";

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: Number(
            recordForm.patientId
          ),
          doctorId: Number(doctorId),
          diagnosis:
            recordForm.diagnosis,
          symptoms:
            recordForm.symptoms,
          treatment:
            recordForm.treatment,
          notes:
            recordForm.notes,
          recordDate:
            recordForm.recordDate ||
            today,
        }),
      });

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Medical record API error:",
          errorText
        );

        throw new Error(
          `Medical record API failed: ${response.status}`
        );
      }

      const savedRecord =
        await response.json();

      if (isEditing) {
        setMedicalRecords((previous) =>
          previous.map((record) =>
            record.recordId ===
            editingRecordId
              ? savedRecord
              : record
          )
        );

        setRecordMessage(
          "Medical record updated successfully."
        );
      } else {
        setMedicalRecords((previous) => [
          ...previous,
          savedRecord,
        ]);

        setRecordMessage(
          "Medical record added successfully."
        );
      }

      setRecordForm({
        patientId: "",
        diagnosis: "",
        symptoms: "",
        treatment: "",
        notes: "",
        recordDate: "",
      });

      setEditingRecordId(null);
      setShowRecordForm(false);
    } catch (error) {
      console.error(
        "Error saving medical record:",
        error
      );

      setRecordMessage(
        isEditing
          ? "Failed to update medical record."
          : "Failed to add medical record."
      );
    }
  };

  // =====================================================
  // PRESCRIPTION FORM CHANGE
  // =====================================================

  const handlePrescriptionChange = (
    event
  ) => {
    const { name, value } = event.target;

    setPrescriptionForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD PRESCRIPTION
  // =====================================================

  const openAddPrescriptionForm = () => {
    setEditingPrescriptionId(null);

    setPrescriptionForm({
      patientId: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      prescriptionDate: today,
    });

    setPrescriptionMessage("");
    setShowPrescriptionForm(true);
  };

  // =====================================================
  // OPEN EDIT PRESCRIPTION
  // =====================================================

  const openEditPrescriptionForm = (
    prescription
  ) => {
    setEditingPrescriptionId(
      prescription.prescriptionId
    );

    setPrescriptionForm({
      patientId:
        prescription.patientId || "",
      medicineName:
        prescription.medicineName || "",
      dosage:
        prescription.dosage || "",
      frequency:
        prescription.frequency || "",
      duration:
        prescription.duration || "",
      instructions:
        prescription.instructions || "",
      prescriptionDate:
        prescription.prescriptionDate ||
        today,
    });

    setPrescriptionMessage("");
    setShowPrescriptionForm(true);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CANCEL PRESCRIPTION FORM
  // =====================================================

  const cancelPrescriptionForm = () => {
    setShowPrescriptionForm(false);
    setEditingPrescriptionId(null);
    setPrescriptionMessage("");

    setPrescriptionForm({
      patientId: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      prescriptionDate: "",
    });
  };

  // =====================================================
  // ADD / UPDATE PRESCRIPTION
  // =====================================================

  const handlePrescriptionSubmit = async (
    event
  ) => {
    event.preventDefault();

    setPrescriptionMessage("");

    if (!prescriptionForm.patientId) {
      setPrescriptionMessage(
        "Patient ID is required."
      );
      return;
    }

    if (
      !prescriptionForm.medicineName.trim()
    ) {
      setPrescriptionMessage(
        "Medicine name is required."
      );
      return;
    }

    try {
      const isEditing =
        editingPrescriptionId !== null;

      const url = isEditing
        ? `http://localhost:8080/api/prescriptions/${editingPrescriptionId}`
        : "http://localhost:8080/api/prescriptions";

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: Number(
            prescriptionForm.patientId
          ),
          doctorId: Number(doctorId),
          medicineName:
            prescriptionForm.medicineName,
          dosage:
            prescriptionForm.dosage,
          frequency:
            prescriptionForm.frequency,
          duration:
            prescriptionForm.duration,
          instructions:
            prescriptionForm.instructions,
          prescriptionDate:
            prescriptionForm.prescriptionDate ||
            today,
        }),
      });

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Prescription API error:",
          errorText
        );

        throw new Error(
          `Prescription API failed: ${response.status}`
        );
      }

      const savedPrescription =
        await response.json();

      if (isEditing) {
        setPrescriptions((previous) =>
          previous.map((prescription) =>
            prescription.prescriptionId ===
            editingPrescriptionId
              ? savedPrescription
              : prescription
          )
        );

        setPrescriptionMessage(
          "Prescription updated successfully."
        );
      } else {
        setPrescriptions((previous) => [
          ...previous,
          savedPrescription,
        ]);

        setPrescriptionMessage(
          "Prescription added successfully."
        );
      }

      setPrescriptionForm({
        patientId: "",
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
        prescriptionDate: "",
      });

      setEditingPrescriptionId(null);
      setShowPrescriptionForm(false);
    } catch (error) {
      console.error(
        "Error saving prescription:",
        error
      );

      setPrescriptionMessage(
        isEditing
          ? "Failed to update prescription."
          : "Failed to add prescription."
      );
    }
  };

  // =====================================================
  // USER NOT FOUND
  // =====================================================

  if (!user) {
    return (
      <div className="doctor-dashboard">
        <div className="dashboard-section">
          <h2>Doctor Dashboard</h2>

          <p>
            Doctor information not found.
            Please login again.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // DOCTOR ID NOT FOUND
  // =====================================================

  if (!doctorId) {
    return (
      <div className="doctor-dashboard">
        <div className="dashboard-section">
          <h2>Doctor Dashboard</h2>

          <p>
            Doctor ID is missing from the
            logged-in user.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="doctor-dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <h1>Doctor Dashboard</h1>

          <p>
            Welcome, Doctor #{doctorId}
          </p>
        </div>
      </div>

      {/* =================================================
          DASHBOARD CARDS
      ================================================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">
            📅
          </div>

          <div>
            <h3>
              Today's Appointments
            </h3>

            <p>
              {loading
                ? "..."
                : todayAppointments.length}
            </p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            👥
          </div>

          <div>
            <h3>My Patients</h3>

            <p>
              {loading
                ? "..."
                : patientIds.length}
            </p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            📋
          </div>

          <div>
            <h3>Medical Records</h3>

            <p>
              {recordsLoading
                ? "..."
                : medicalRecords.length}
            </p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            💊
          </div>

          <div>
            <h3>Prescriptions</h3>

            <p>
              {prescriptionsLoading
                ? "..."
                : prescriptions.length}
            </p>
          </div>
        </div>

      </div>

      {/* =================================================
          TODAY'S APPOINTMENTS
      ================================================= */}

      <div className="dashboard-section">

        <h2>Today's Appointments</h2>

        <div className="table-container">

          {loading ? (
            <p>
              Loading appointments...
            </p>
          ) : appointmentsError ? (
            <p>{appointmentsError}</p>
          ) : todayAppointments.length === 0 ? (
            <p>
              No appointments today.
            </p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {todayAppointments.map(
                  (appointment) => (

                    <tr
                      key={
                        appointment.appointmentId
                      }
                    >

                      <td>
                        Patient #
                        {appointment.patientId}
                      </td>

                      <td>
                        {
                          appointment.appointmentTime
                        }
                      </td>

                      <td>
                        {appointment.reason ||
                          "-"}
                      </td>

                      <td>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems:
                              "center",
                            flexWrap: "wrap",
                          }}
                        >

                          <span>
                            {
                              appointment.status ||
                              "-"
                            }
                          </span>

                          {appointment.status !==
                            "Completed" &&
                            appointment.status !==
                              "Cancelled" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentStatus(
                                      appointment.appointmentId,
                                      "Completed"
                                    )
                                  }
                                >
                                  Complete
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentStatus(
                                      appointment.appointmentId,
                                      "Cancelled"
                                    )
                                  }
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

      {/* =================================================
          UPCOMING APPOINTMENTS
      ================================================= */}

      <div className="dashboard-section">

        <h2>Upcoming Appointments</h2>

        <div className="table-container">

          {loading ? (
            <p>
              Loading appointments...
            </p>
          ) : appointmentsError ? (
            <p>{appointmentsError}</p>
          ) : upcomingAppointments.length ===
            0 ? (
            <p>
              No upcoming appointments.
            </p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {upcomingAppointments.map(
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
                        Patient #
                        {appointment.patientId}
                      </td>

                      <td>
                        {
                          appointment.appointmentTime
                        }
                      </td>

                      <td>
                        {appointment.reason ||
                          "-"}
                      </td>

                      <td>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems:
                              "center",
                            flexWrap: "wrap",
                          }}
                        >

                          <span>
                            {
                              appointment.status ||
                              "-"
                            }
                          </span>

                          {appointment.status !==
                            "Completed" &&
                            appointment.status !==
                              "Cancelled" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentStatus(
                                      appointment.appointmentId,
                                      "Completed"
                                    )
                                  }
                                >
                                  Complete
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentStatus(
                                      appointment.appointmentId,
                                      "Cancelled"
                                    )
                                  }
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

      {/* =================================================
          MEDICAL RECORDS
      ================================================= */}

      <div className="dashboard-section">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >

          <h2>Medical Records</h2>

          <button
            type="button"
            onClick={() => {
              if (showRecordForm) {
                cancelRecordForm();
              } else {
                openAddRecordForm();
              }
            }}
          >
            {showRecordForm
              ? "Cancel"
              : "+ Add Medical Record"}
          </button>

        </div>

        {recordMessage && (
          <p>{recordMessage}</p>
        )}

        {/* =================================================
            MEDICAL RECORD FORM
        ================================================= */}

        {showRecordForm && (
          <form
            onSubmit={handleRecordSubmit}
            style={{
              padding: "20px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fafafa",
            }}
          >

            <h3>
              {editingRecordId
                ? "Edit Medical Record"
                : "Add Medical Record"}
            </h3>

            {/* PATIENT ID */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Patient ID
              </label>

              <input
                type="number"
                name="patientId"
                value={
                  recordForm.patientId
                }
                onChange={
                  handleRecordChange
                }
                placeholder="Enter patient ID"
                required
                disabled={
                  editingRecordId !== null
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* DIAGNOSIS */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Diagnosis
              </label>

              <input
                type="text"
                name="diagnosis"
                value={
                  recordForm.diagnosis
                }
                onChange={
                  handleRecordChange
                }
                placeholder="e.g. Fever"
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* SYMPTOMS */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Symptoms
              </label>

              <textarea
                name="symptoms"
                value={
                  recordForm.symptoms
                }
                onChange={
                  handleRecordChange
                }
                placeholder="Enter symptoms"
                rows="3"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* TREATMENT */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Treatment
              </label>

              <textarea
                name="treatment"
                value={
                  recordForm.treatment
                }
                onChange={
                  handleRecordChange
                }
                placeholder="Enter treatment"
                rows="3"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* NOTES */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Notes
              </label>

              <textarea
                name="notes"
                value={
                  recordForm.notes
                }
                onChange={
                  handleRecordChange
                }
                placeholder="Enter notes"
                rows="3"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* DATE */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Record Date
              </label>

              <input
                type="date"
                name="recordDate"
                value={
                  recordForm.recordDate
                }
                onChange={
                  handleRecordChange
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            <button type="submit">
              {editingRecordId
                ? "Save Changes"
                : "Save Medical Record"}
            </button>

            {editingRecordId && (
              <button
                type="button"
                onClick={
                  cancelRecordForm
                }
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            )}

          </form>
        )}

        {/* =================================================
            MEDICAL RECORD TABLE
        ================================================= */}

        <div className="table-container">

          {recordsLoading ? (
            <p>
              Loading medical records...
            </p>
          ) : recordsError ? (
            <p>{recordsError}</p>
          ) : medicalRecords.length === 0 ? (
            <p>
              No medical records found.
            </p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Diagnosis</th>
                  <th>Symptoms</th>
                  <th>Treatment</th>
                  <th>Notes</th>
                  <th>Action</th>
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
                        Patient #
                        {record.patientId}
                      </td>

                      <td>
                        {record.diagnosis ||
                          "-"}
                      </td>

                      <td>
                        {record.symptoms ||
                          "-"}
                      </td>

                      <td>
                        {record.treatment ||
                          "-"}
                      </td>

                      <td>
                        {record.notes ||
                          "-"}
                      </td>

                      <td>

                        <button
                          type="button"
                          onClick={() =>
                            openEditRecordForm(
                              record
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

      {/* =================================================
          PRESCRIPTIONS
      ================================================= */}

      <div className="dashboard-section">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >

          <h2>Prescriptions</h2>

          <button
            type="button"
            onClick={() => {
              if (showPrescriptionForm) {
                cancelPrescriptionForm();
              } else {
                openAddPrescriptionForm();
              }
            }}
          >
            {showPrescriptionForm
              ? "Cancel"
              : "+ Add Prescription"}
          </button>

        </div>

        {prescriptionMessage && (
          <p>{prescriptionMessage}</p>
        )}

        {/* =================================================
            PRESCRIPTION FORM
        ================================================= */}

        {showPrescriptionForm && (
          <form
            onSubmit={
              handlePrescriptionSubmit
            }
            style={{
              padding: "20px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fafafa",
            }}
          >

            <h3>
              {editingPrescriptionId
                ? "Edit Prescription"
                : "Add Prescription"}
            </h3>

            {/* PATIENT ID */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Patient ID
              </label>

              <input
                type="number"
                name="patientId"
                value={
                  prescriptionForm.patientId
                }
                onChange={
                  handlePrescriptionChange
                }
                placeholder="Enter patient ID"
                required
                disabled={
                  editingPrescriptionId !==
                  null
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* MEDICINE */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Medicine Name
              </label>

              <input
                type="text"
                name="medicineName"
                value={
                  prescriptionForm.medicineName
                }
                onChange={
                  handlePrescriptionChange
                }
                placeholder="e.g. Paracetamol"
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* DOSAGE */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Dosage
              </label>

              <input
                type="text"
                name="dosage"
                value={
                  prescriptionForm.dosage
                }
                onChange={
                  handlePrescriptionChange
                }
                placeholder="e.g. 500 mg"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* FREQUENCY */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Frequency
              </label>

              <input
                type="text"
                name="frequency"
                value={
                  prescriptionForm.frequency
                }
                onChange={
                  handlePrescriptionChange
                }
                placeholder="e.g. Twice a day"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* DURATION */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Duration
              </label>

              <input
                type="text"
                name="duration"
                value={
                  prescriptionForm.duration
                }
                onChange={
                  handlePrescriptionChange
                }
                placeholder="e.g. 5 days"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* INSTRUCTIONS */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Instructions
              </label>

              <textarea
                name="instructions"
                value={
                  prescriptionForm.instructions
                }
                onChange={
                  handlePrescriptionChange
                }
                placeholder="e.g. Take after food"
                rows="4"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            {/* DATE */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <label>
                Prescription Date
              </label>

              <input
                type="date"
                name="prescriptionDate"
                value={
                  prescriptionForm.prescriptionDate
                }
                onChange={
                  handlePrescriptionChange
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

            <button type="submit">
              {editingPrescriptionId
                ? "Save Changes"
                : "Save Prescription"}
            </button>

            {editingPrescriptionId && (
              <button
                type="button"
                onClick={
                  cancelPrescriptionForm
                }
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            )}

          </form>
        )}

        {/* =================================================
            PRESCRIPTION TABLE
        ================================================= */}

        <div className="table-container">

          {prescriptionsLoading ? (
            <p>
              Loading prescriptions...
            </p>
          ) : prescriptionsError ? (
            <p>{prescriptionsError}</p>
          ) : prescriptions.length === 0 ? (
            <p>
              No prescriptions found.
            </p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Instructions</th>
                  <th>Action</th>
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
                        Patient #
                        {prescription.patientId}
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

                      <td>

                        <button
                          type="button"
                          onClick={() =>
                            openEditPrescriptionForm(
                              prescription
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

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

export default DoctorDashboard;