import { useEffect, useState } from "react";
import {
  Pill,
  UserRound,
  CalendarDays,
  Plus,
  Pencil,
  X,
  AlertCircle,
  Clock,
  ClipboardList,
} from "lucide-react";
import "./Prescriptions.css";

function Prescriptions() {
  const [user, setUser] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    diagnosis: "",
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    prescriptionDate: new Date()
      .toISOString()
      .split("T")[0],
  });

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError(
          "Doctor information not found. Please login again."
        );
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

      const [prescriptionsResponse, patientsResponse] =
        await Promise.all([
          fetch(
            `http://localhost:8080/api/prescriptions/doctor/${doctorId}`
          ),
          fetch("http://localhost:8080/api/patients"),
        ]);

      if (!prescriptionsResponse.ok) {
        throw new Error("Failed to load prescriptions.");
      }

      const prescriptionsData =
        await prescriptionsResponse.json();

      const patientsData = patientsResponse.ok
        ? await patientsResponse.json()
        : [];

      setPrescriptions(
        Array.isArray(prescriptionsData)
          ? prescriptionsData
          : []
      );

      setPatients(
        Array.isArray(patientsData)
          ? patientsData
          : []
      );
    } catch (err) {
      console.error(
        "Prescription error:",
        err
      );

      setError(
        "Unable to load prescriptions. Please try again."
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
        Number(item.patientId) ===
        Number(patientId)
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
  // ADD FORM
  // =====================================================

  const openAddForm = () => {
    setEditingPrescription(null);

    setFormData({
      patientId: "",
      diagnosis: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      prescriptionDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setError("");
    setShowForm(true);
  };

  // =====================================================
  // EDIT FORM
  // =====================================================

  const openEditForm = (prescription) => {
    setEditingPrescription(prescription);

    setFormData({
      patientId:
        prescription.patientId || "",

      diagnosis:
        prescription.diagnosis || "",

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
    setEditingPrescription(null);
  };

  // =====================================================
  // SAVE PRESCRIPTION
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.patientId) {
      setError("Please select a patient.");
      return;
    }

    if (!formData.medicineName.trim()) {
      setError("Medicine name is required.");
      return;
    }

    if (!formData.dosage.trim()) {
      setError("Dosage is required.");
      return;
    }

    if (!formData.frequency.trim()) {
      setError("Frequency is required.");
      return;
    }

    if (!formData.duration.trim()) {
      setError("Duration is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const isEditing =
        Boolean(editingPrescription);

      const url = isEditing
        ? `http://localhost:8080/api/prescriptions/${editingPrescription.prescriptionId}`
        : "http://localhost:8080/api/prescriptions";

      const method = isEditing
        ? "PUT"
        : "POST";

      const body = {
        prescriptionId:
          editingPrescription?.prescriptionId,

        patientId:
          Number(formData.patientId),

        doctorId:
          Number(doctorId),

        diagnosis:
          formData.diagnosis.trim(),

        medicineName:
          formData.medicineName.trim(),

        dosage:
          formData.dosage.trim(),

        frequency:
          formData.frequency.trim(),

        duration:
          formData.duration.trim(),

        instructions:
          formData.instructions.trim(),

        prescriptionDate:
          formData.prescriptionDate,
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
          `Failed to save prescription: ${response.status}`
        );
      }

      setShowForm(false);
      setEditingPrescription(null);

      await fetchData();
    } catch (err) {
      console.error(
        "Save prescription error:",
        err
      );

      setError(
        "Unable to save prescription. Please try again."
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
      <div className="doctor-prescriptions-page">

        <div className="prescriptions-page-header">

          <div className="prescriptions-title-wrap">

            <div className="prescriptions-title-icon">
              <Pill size={25} />
            </div>

            <div>
              <h1>Prescriptions</h1>

              <p>
                Manage prescriptions for your patients.
              </p>
            </div>

          </div>

        </div>

        <div className="doctor-prescriptions-message">

          <div className="doctor-prescriptions-loader"></div>

          <p>Loading prescriptions...</p>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="doctor-prescriptions-page">

      {/* HEADER */}

      <div className="prescriptions-page-header">

        <div className="prescriptions-title-wrap">

          <div className="prescriptions-title-icon">
            <Pill size={25} />
          </div>

          <div>
            <h1>Prescriptions</h1>

            <p>
              Create and manage patient prescriptions.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="add-prescription-button"
          onClick={openAddForm}
        >
          <Plus size={17} />
          Add Prescription
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="doctor-prescriptions-error">

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

      {prescriptions.length === 0 && !error && (
        <div className="no-doctor-prescriptions">

          <div className="no-prescriptions-icon">
            <Pill size={30} />
          </div>

          <h2>No Prescriptions Found</h2>

          <p>
            Start by creating a prescription for your patient.
          </p>

          <button
            type="button"
            onClick={openAddForm}
          >
            <Plus size={16} />
            Add First Prescription
          </button>

        </div>
      )}

      {/* PRESCRIPTION CARDS */}

      {prescriptions.length > 0 && (
        <div className="doctor-prescriptions-container">

          {prescriptions.map((prescription) => (

            <div
              className="doctor-prescription-card"
              key={prescription.prescriptionId}
            >

              {/* CARD HEADER */}

              <div className="doctor-prescription-header">

                <div className="doctor-prescription-title">

                  <div className="doctor-prescription-icon">
                    <Pill size={22} />
                  </div>

                  <div>

                    <h2>
                      {prescription.medicineName ||
                        "Medicine"}
                    </h2>

                    <p>
                      {prescription.diagnosis ||
                        "Prescription"}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="edit-prescription-button"
                  onClick={() =>
                    openEditForm(prescription)
                  }
                  title="Edit Prescription"
                >
                  <Pencil size={15} />
                </button>

              </div>

              {/* PATIENT */}

              <div className="doctor-prescription-patient">

                <div className="prescription-patient-icon">
                  <UserRound size={18} />
                </div>

                <div>

                  <small>Patient</small>

                  <strong>
                    {getPatientName(
                      prescription.patientId
                    )}
                  </strong>

                  <span>
                    Patient #
                    {prescription.patientId || "N/A"}
                  </span>

                </div>

              </div>

              {/* DATE */}

              <div className="doctor-prescription-date">

                <CalendarDays size={16} />

                <span>
                  {formatDate(
                    prescription.prescriptionDate
                  )}
                </span>

              </div>

              {/* MEDICINE INFO */}

              <div className="prescription-details-grid">

                <div className="prescription-detail-box">

                  <span>Dosage</span>

                  <strong>
                    {prescription.dosage ||
                      "Not specified"}
                  </strong>

                </div>

                <div className="prescription-detail-box">

                  <span>Frequency</span>

                  <strong>
                    {prescription.frequency ||
                      "Not specified"}
                  </strong>

                </div>

                <div className="prescription-detail-box">

                  <span>Duration</span>

                  <strong>
                    {prescription.duration ||
                      "Not specified"}
                  </strong>

                </div>

              </div>

              {/* DIAGNOSIS */}

              {prescription.diagnosis && (
                <div className="prescription-section">

                  <h3>
                    <ClipboardList size={14} />
                    Diagnosis
                  </h3>

                  <p>
                    {prescription.diagnosis}
                  </p>

                </div>
              )}

              {/* INSTRUCTIONS */}

              {prescription.instructions && (
                <div className="prescription-section">

                  <h3>
                    <Clock size={14} />
                    Instructions
                  </h3>

                  <p>
                    {prescription.instructions}
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
          className="doctor-prescription-modal-overlay"
          onClick={closeForm}
        >

          <div
            className="doctor-prescription-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="doctor-prescription-modal-header">

              <div>
                <h2>
                  {editingPrescription
                    ? "Edit Prescription"
                    : "Add Prescription"}
                </h2>

                <p>
                  Enter medicine and treatment details.
                </p>
              </div>

              <button
                type="button"
                className="close-prescription-modal"
                onClick={closeForm}
                disabled={saving}
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              className="doctor-prescription-form"
              onSubmit={handleSubmit}
            >

              {/* PATIENT */}

              <div className="prescription-form-group">

                <label>Patient</label>

                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  disabled={Boolean(editingPrescription)}
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
                      )}{" "}
                      — #{patient.patientId}
                    </option>

                  ))}

                </select>

              </div>

              {/* DIAGNOSIS */}

              <div className="prescription-form-group">

                <label>Diagnosis</label>

                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  placeholder="Enter diagnosis"
                />

              </div>

              {/* MEDICINE */}

              <div className="prescription-form-group">

                <label>Medicine Name</label>

                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleChange}
                  placeholder="Enter medicine name"
                  required
                />

              </div>

              {/* TWO COLUMNS */}

              <div className="prescription-form-row">

                <div className="prescription-form-group">

                  <label>Dosage</label>

                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    placeholder="e.g. 500 mg"
                    required
                  />

                </div>

                <div className="prescription-form-group">

                  <label>Frequency</label>

                  <input
                    type="text"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    placeholder="e.g. Twice daily"
                    required
                  />

                </div>

              </div>

              {/* DURATION + DATE */}

              <div className="prescription-form-row">

                <div className="prescription-form-group">

                  <label>Duration</label>

                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 7 days"
                    required
                  />

                </div>

                <div className="prescription-form-group">

                  <label>Prescription Date</label>

                  <input
                    type="date"
                    name="prescriptionDate"
                    value={formData.prescriptionDate}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* INSTRUCTIONS */}

              <div className="prescription-form-group">

                <label>Instructions</label>

                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="e.g. Take after meals"
                  rows="3"
                />

              </div>

              {/* ACTIONS */}

              <div className="doctor-prescription-form-actions">

                <button
                  type="button"
                  className="prescription-cancel-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="prescription-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingPrescription
                    ? "Update Prescription"
                    : "Save Prescription"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Prescriptions;