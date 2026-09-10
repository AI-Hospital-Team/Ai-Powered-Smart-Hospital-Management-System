import { useEffect, useState } from "react";
import {
  ClipboardList,
  UserRound,
  CalendarDays,
  Plus,
  Pencil,
  X,
  AlertCircle,
} from "lucide-react";
import "./MedicalRecords.css";

function MedicalRecords() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [saving, setSaving] = useState(false);

 const [formData, setFormData] = useState({
  patientId: "",
  diagnosis: "",
  symptoms: "",
  treatment: "",
  notes: "",
  recordDate: new Date().toISOString().split("T")[0],
});

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
      console.error(err);
      setError("Unable to read doctor information.");
      setLoading(false);
    }
  }, []);

  const doctorId = user?.doctorId;

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    if (!doctorId) return;

    fetchData();
  }, [doctorId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [recordsResponse, patientsResponse] =
        await Promise.all([
          fetch(
            `http://localhost:8080/api/medical-records/doctor/${doctorId}`
          ),
          fetch("http://localhost:8080/api/patients"),
        ]);

      if (!recordsResponse.ok) {
        throw new Error("Failed to load medical records.");
      }

      const recordsData = await recordsResponse.json();

      const patientsData = patientsResponse.ok
        ? await patientsResponse.json()
        : [];

      setRecords(
        Array.isArray(recordsData)
          ? recordsData
          : []
      );

      setPatients(
        Array.isArray(patientsData)
          ? patientsData
          : []
      );
    } catch (err) {
      console.error(
        "Medical records error:",
        err
      );

      setError(
        "Unable to load medical records. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PATIENT NAME
  // =====================================================

  const getPatientName = (patientId) => {
  const patient = patients.find(
    (item) =>
      Number(item.patientId) === Number(patientId)
  );

  if (!patient) {
    return `Patient #${patientId || "N/A"}`;
  }

  return (
    patient.name ||
    patient.fullName ||
    patient.patientName ||
    `Patient #${patientId}`
  );
};

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD
  // =====================================================

const openAddForm = () => {
  setEditingRecord(null);

  setFormData({
    patientId: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
    notes: "",
    recordDate: new Date().toISOString().split("T")[0],
  });

  setError("");
  setShowForm(true);
};

  // =====================================================
  // OPEN EDIT
  // =====================================================

 const openEditForm = (record) => {
  setEditingRecord(record);

  setFormData({
    patientId:
      record.patientId ||
      record.patient?.patientId ||
      "",

    diagnosis:
      record.diagnosis || "",

    symptoms:
      record.symptoms || "",

    treatment:
      record.treatment || "",

    notes:
      record.notes || "",

    recordDate:
      record.recordDate ||
      new Date().toISOString().split("T")[0],
  });

  setError("");
  setShowForm(true);
};

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingRecord(null);
  };

  // =====================================================
  // SAVE RECORD
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.patientId) {
      setError("Please select a patient.");
      return;
    }

    if (!formData.diagnosis.trim()) {
      setError("Diagnosis is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const isEditing = Boolean(editingRecord);

      const url = isEditing
        ? `http://localhost:8080/api/medical-records/${editingRecord.recordId}`
        : "http://localhost:8080/api/medical-records";

      const method = isEditing
        ? "PUT"
        : "POST";

     const body = {
        patientId: Number(formData.patientId),
        doctorId: Number(doctorId),
        diagnosis: formData.diagnosis.trim(),
        symptoms: formData.symptoms.trim(),
        treatment: formData.treatment.trim(),
        notes: formData.notes.trim(),
        recordDate: formData.recordDate,
      };

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save record: ${response.status}`
        );
      }

      setShowForm(false);
      setEditingRecord(null);

      setFormData({
        patientId: "",
        diagnosis: "",
        symptoms: "",
        treatment: "",
        notes: "",
      });

      await fetchData();
    } catch (err) {
      console.error(
        "Save medical record error:",
        err
      );

      setError(
        "Unable to save medical record. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

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
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="doctor-records-page">

        <div className="doctor-records-header">

          <div className="records-title-wrap">

            <div className="records-title-icon">
              <ClipboardList size={25} />
            </div>

            <div>
              <h1>Medical Records</h1>

              <p>
                Manage your patients' medical records.
              </p>
            </div>

          </div>

        </div>

        <div className="doctor-records-message">

          <div className="doctor-records-loader"></div>

          <p>
            Loading medical records...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="doctor-records-page">

      {/* HEADER */}

      <div className="doctor-records-header">

        <div className="records-title-wrap">

          <div className="records-title-icon">
            <ClipboardList size={25} />
          </div>

          <div>
            <h1>Medical Records</h1>

            <p>
              Create and manage patient medical records.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="add-record-button"
          onClick={openAddForm}
        >
          <Plus size={17} />
          Add Record
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="doctor-records-error">

          <AlertCircle size={18} />

          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
          >
            ×
          </button>

        </div>
      )}

      {/* EMPTY */}

      {records.length === 0 && !error && (
        <div className="no-doctor-records">

          <div className="no-records-icon">
            <ClipboardList size={30} />
          </div>

          <h2>No Medical Records Found</h2>

          <p>
            Start by adding a medical record for your patient.
          </p>

          <button
            type="button"
            onClick={openAddForm}
          >
            <Plus size={16} />
            Add First Record
          </button>

        </div>
      )}

      {/* RECORDS */}

      {records.length > 0 && (
        <div className="doctor-records-container">

          {records.map((record) => (

            <div
              className="doctor-record-card"
              key={record.recordId}
            >

              <div className="doctor-record-header">

                <div className="doctor-record-title">

                  <div className="doctor-record-icon">
                    <ClipboardList size={23} />
                  </div>

                  <div>

                    <h2>
                      {record.diagnosis ||
                        "Medical Record"}
                    </h2>

                    <p>
                      {formatDate(
                        record.recordDate ||
                          record.createdAt
                      )}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="edit-record-button"
                  onClick={() =>
                    openEditForm(record)
                  }
                  title="Edit Record"
                >
                  <Pencil size={15} />
                </button>

              </div>

              {/* PATIENT */}

              <div className="doctor-record-patient">

                <div className="record-patient-icon">
                  <UserRound size={18} />
                </div>

                <div>
                  <small>Patient</small>

                  <strong>
                    {getPatientName(
                      record.patientId
                    )}
                  </strong>

                  <span>
                    Patient #
                    {record.patientId || "N/A"}
                  </span>
                </div>

              </div>

              {/* DATE */}

              <div className="doctor-record-date">

                <CalendarDays size={16} />

                <span>
                  {formatDate(
                    record.recordDate ||
                      record.createdAt
                  )}
                </span>

              </div>

              {/* DETAILS */}

              {record.symptoms && (
                <div className="doctor-record-section">

                  <h3>Symptoms</h3>

                  <p>
                    {record.symptoms}
                  </p>

                </div>
              )}

              {record.treatment && (
                <div className="doctor-record-section">

                  <h3>Treatment</h3>

                  <p>
                    {record.treatment}
                  </p>

                </div>
              )}

              {record.notes && (
                <div className="doctor-record-section">

                  <h3>Doctor's Notes</h3>

                  <p>
                    {record.notes}
                  </p>

                </div>
              )}

            </div>

          ))}

        </div>
      )}

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showForm && (
        <div
          className="doctor-record-modal-overlay"
          onClick={closeForm}
        >

          <div
            className="doctor-record-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="doctor-record-modal-header">

              <div>
                <h2>
                  {editingRecord
                    ? "Edit Medical Record"
                    : "Add Medical Record"}
                </h2>

                <p>
                  Enter the patient's medical information.
                </p>
              </div>

              <button
                type="button"
                className="close-record-modal"
                onClick={closeForm}
                disabled={saving}
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="doctor-record-form"
              onSubmit={handleSubmit}
            >

              {/* PATIENT */}

              <div className="record-form-group">

                <label>
                  Patient
                </label>

                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  disabled={Boolean(editingRecord)}
                  required
                >

                  <option value="">
                    Select Patient
                  </option>

                  {patients.map((patient) => (

                    <option
                        key={patient.patientId}
                        value={patient.patientId}
                    >
                        {getPatientName(patient.patientId)}
                        {" "}
                        — #{patient.patientId}
                    </option>

                    ))}

                </select>

              </div>

              <div className="record-form-group"> 
                <label>Record Date</label> 
              
                <input 
                  type="date" 
                  name="recordDate" 
                  value={formData.recordDate} 
                  onChange={handleChange} 
                  required 
                /> 
              </div>

              {/* DIAGNOSIS */}

              <div className="record-form-group">

                <label>
                  Diagnosis
                </label>

                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  placeholder="Enter diagnosis"
                  required
                />

              </div>

              {/* SYMPTOMS */}

              <div className="record-form-group">

                <label>
                  Symptoms
                </label>

                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Enter patient symptoms"
                  rows="3"
                />

              </div>

              {/* TREATMENT */}

              <div className="record-form-group">

                <label>
                  Treatment
                </label>

                <textarea
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  placeholder="Enter treatment details"
                  rows="3"
                />

              </div>

              {/* NOTES */}

              <div className="record-form-group">

                <label>
                  Doctor's Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add additional notes"
                  rows="3"
                />

              </div>

              {/* ACTIONS */}

              <div className="doctor-record-form-actions">

                <button
                  type="button"
                  className="record-cancel-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="record-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingRecord
                    ? "Update Record"
                    : "Save Record"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default MedicalRecords;