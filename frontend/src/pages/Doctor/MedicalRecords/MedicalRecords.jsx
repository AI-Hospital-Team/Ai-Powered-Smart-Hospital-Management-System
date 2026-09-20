import { useEffect, useState } from "react";
import {
  ClipboardList,
  UserRound,
  CalendarDays,
  Plus,
  X,
  AlertCircle,
  Trash2,
} from "lucide-react";
import "./MedicalRecords.css";

function MedicalRecords() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // DELETE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
    notes: "",
    recordDate: new Date().toISOString().split("T")[0],
    followUpDate: "",
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
      console.error("Medical records error:", err);

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
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setFormData({
      patientId: "",
      diagnosis: "",
      symptoms: "",
      treatment: "",
      notes: "",
      recordDate: new Date().toISOString().split("T")[0],
      followUpDate: "",
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
  };

  // =====================================================
  // SAVE MEDICAL RECORD
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

      const body = {
        patientId: Number(formData.patientId),
        doctorId: Number(doctorId),
        diagnosis: formData.diagnosis.trim(),
        symptoms: formData.symptoms.trim(),
        treatment: formData.treatment.trim(),
        notes: formData.notes.trim(),
        recordDate: formData.recordDate,
        followUpDate: formData.followUpDate || null,
      };

      const response = await fetch(
        "http://localhost:8080/api/medical-records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      setFormData({
        patientId: "",
        diagnosis: "",
        symptoms: "",
        treatment: "",
        notes: "",
        recordDate: new Date().toISOString().split("T")[0],
        followUpDate: "",
      });

      await fetchData();
    } catch (err) {
      console.error("Save medical record error:", err);

      setError(
        "Unable to save medical record. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE MEDICAL RECORD
  // =====================================================

  const openDeleteModal = (recordId) => {
    setSelectedRecordId(recordId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setSelectedRecordId(null);
  };

  const handleDeleteRecord = async () => {
    if (!selectedRecordId) return;

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `http://localhost:8080/api/medical-records/${selectedRecordId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete medical record: ${response.status}`
        );
      }

      setRecords((previousRecords) =>
        previousRecords.filter(
          (record) =>
            Number(record.recordId) !==
            Number(selectedRecordId)
        )
      );

      setShowDeleteModal(false);
      setSelectedRecordId(null);
    } catch (err) {
      console.error(
        "Delete medical record error:",
        err
      );

      setError(
        "Unable to delete medical record. Please try again."
      );
    } finally {
      setDeleting(false);
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

              {/* RECORD HEADER */}

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

                <div className="doctor-record-actions">

                  <span className="doctor-record-id">
                    #{record.recordId}
                  </span>

                  <button
                    type="button"
                    className="doctor-delete-record-button"
                    onClick={() =>
                      openDeleteModal(
                        record.recordId
                      )
                    }
                    title="Delete medical record"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

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

              {/* RECORD DATE */}

              <div className="doctor-record-date">

                <CalendarDays size={16} />

                <span>
                  {formatDate(
                    record.recordDate ||
                      record.createdAt
                  )}
                </span>

              </div>

              {/* FOLLOW-UP DATE */}

              {record.followUpDate && (
                <div className="doctor-record-date">

                  <CalendarDays size={16} />

                  <span>
                    Follow-up:{" "}
                    {formatDate(
                      record.followUpDate
                    )}
                  </span>

                </div>
              )}

              {/* SYMPTOMS */}

              {record.symptoms && (
                <div className="doctor-record-section">

                  <h3>Symptoms</h3>

                  <p>
                    {record.symptoms}
                  </p>

                </div>
              )}

              {/* TREATMENT */}

              {record.treatment && (
                <div className="doctor-record-section">

                  <h3>Treatment</h3>

                  <p>
                    {record.treatment}
                  </p>

                </div>
              )}

              {/* NOTES */}

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
          ADD MEDICAL RECORD MODAL
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
                  Add Medical Record
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
                      {getPatientName(
                        patient.patientId
                      )}
                      {" "}
                      — #{patient.patientId}
                    </option>

                  ))}

                </select>

              </div>

              {/* RECORD DATE */}

              <div className="record-form-group">

                <label>
                  Record Date
                </label>

                <input
                  type="date"
                  name="recordDate"
                  value={formData.recordDate}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* FOLLOW-UP DATE */}

              <div className="record-form-group">

                <label>
                  Follow-up Date (Optional)
                </label>

                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleChange}
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
                    : "Save Record"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =================================================
          DELETE MEDICAL RECORD MODAL
      ================================================= */}

      {showDeleteModal && (
        <div
          className="doctor-delete-modal-overlay"
          onClick={closeDeleteModal}
        >

          <div
            className="doctor-delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="doctor-delete-modal-close"
              onClick={closeDeleteModal}
              disabled={deleting}
              title="Close"
            >
              <X size={20} />
            </button>

            <div className="doctor-delete-modal-icon">
              <Trash2 size={27} />
            </div>

            <h2>
              Delete Medical Record?
            </h2>

            <p>
              Are you sure you want to delete
              this medical record?
              <br />
              <span>
                This action cannot be undone.
              </span>
            </p>

            <div className="doctor-delete-modal-actions">

              <button
                type="button"
                className="doctor-delete-cancel-button"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="doctor-delete-confirm-button"
                onClick={handleDeleteRecord}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="doctor-delete-spinner"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete Record
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MedicalRecords;