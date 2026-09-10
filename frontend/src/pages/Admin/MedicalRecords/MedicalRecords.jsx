import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Search,
  RefreshCw,
  UserRound,
  Stethoscope,
  CalendarDays,
  FileText,
  Activity,
  X,
  ArrowRight,
  Pencil,
  Save,
} from "lucide-react";

import {
  fetchMedicalRecords,
  fetchPatients,
  fetchDoctors,
} from "../adminApi";

import "./MedicalRecords.css";

const API_BASE_URL = "http://localhost:8080/api";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRecord, setSelectedRecord] =
    useState(null);

  const [editingRecord, setEditingRecord] =
    useState(null);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    recordDate: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        recordsData,
        patientsData,
        doctorsData,
      ] = await Promise.all([
        fetchMedicalRecords(),
        fetchPatients(),
        fetchDoctors(),
      ]);

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

      setDoctors(
        Array.isArray(doctorsData)
          ? doctorsData
          : []
      );
    } catch (err) {
      console.error(
        "Medical records error:",
        err
      );

      setError(
        "Unable to load medical records. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     HELPERS
  ===================================================== */

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (item) =>
        Number(item.patientId) ===
        Number(patientId)
    );

    return (
      patient?.name ||
      `Patient #${patientId ?? "-"}`
    );
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) ===
        Number(doctorId)
    );

    return (
      doctor?.name ||
      `Doctor #${doctorId ?? "-"}`
    );
  };

  const getDoctorSpecialization = (
    doctorId
  ) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) ===
        Number(doctorId)
    );

    return doctor?.specialization || "";
  };

  const getInitial = (name) => {
    return (
      name?.trim()?.charAt(0)?.toUpperCase() ||
      "P"
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(
        `${date}T00:00:00`
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) {
      return records;
    }

    const search =
      searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const patientName =
        getPatientName(record.patientId);

      const doctorName =
        getDoctorName(record.doctorId);

      const specialization =
        getDoctorSpecialization(
          record.doctorId
        );

      const searchableText = [
        record.recordId,
        record.patientId,
        record.doctorId,
        patientName,
        doctorName,
        specialization,
        record.diagnosis,
        record.symptoms,
        record.treatment,
        record.notes,
        record.recordDate,
      ]
        .map((value) =>
          String(value ?? "").toLowerCase()
        )
        .join(" ");

      return searchableText.includes(search);
    });
  }, [
    records,
    patients,
    doctors,
    searchTerm,
  ]);

  /* =====================================================
     EDIT
  ===================================================== */

  const openEditForm = (record) => {
    setEditingRecord(record);

    setFormData({
      patientId: record.patientId ?? "",
      doctorId: record.doctorId ?? "",
      recordDate:
        record.recordDate || "",
      diagnosis:
        record.diagnosis || "",
      symptoms:
        record.symptoms || "",
      treatment:
        record.treatment || "",
      notes:
        record.notes || "",
    });
  };

  const closeEditForm = () => {
    setEditingRecord(null);

    setFormData({
      patientId: "",
      doctorId: "",
      recordDate: "",
      diagnosis: "",
      symptoms: "",
      treatment: "",
      notes: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editingRecord?.recordId) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const body = {
        patientId:
          Number(formData.patientId),
        doctorId:
          Number(formData.doctorId),
        recordDate:
          formData.recordDate,
        diagnosis:
          formData.diagnosis.trim(),
        symptoms:
          formData.symptoms.trim(),
        treatment:
          formData.treatment.trim(),
        notes:
          formData.notes.trim(),
      };

      const response = await fetch(
        `${API_BASE_URL}/medical-records/${editingRecord.recordId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update medical record"
        );
      }

      const updatedRecord =
        await response.json();

      setRecords((previous) =>
        previous.map((record) =>
          record.recordId ===
          editingRecord.recordId
            ? updatedRecord
            : record
        )
      );

      setSelectedRecord(
        updatedRecord
      );

      closeEditForm();
    } catch (err) {
      console.error(
        "Medical record update error:",
        err
      );

      setError(
        "Unable to update medical record."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-medical-records-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="medical-records-page-header">

        <div className="medical-records-page-title">

          <div className="medical-records-title-icon">
            <ClipboardList size={27} />
          </div>

          <div>

            <div className="medical-records-section-label">
              Medical Record Management
            </div>

            <h1>Medical Records</h1>

            <p>
              View and manage patient medical
              history and treatment information.
            </p>

          </div>

        </div>

        <button
          className="medical-records-refresh"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="medical-records-error">

          <div>
            <strong>
              Something went wrong
            </strong>

            <p>{error}</p>
          </div>

          <button onClick={loadData}>
            Try Again
          </button>

        </div>
      )}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="medical-records-summary">

        <div className="medical-records-summary-icon">
          <FileText size={23} />
        </div>

        <div>

          <span>
            Total Medical Records
          </span>

          <strong>
            {records.length}
          </strong>

          <small>
            Patient clinical records stored
            in the system
          </small>

        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="medical-records-toolbar">

        <div>

          <h2>Medical Record Directory</h2>

          <p>
            Search records by patient, doctor,
            diagnosis or treatment.
          </p>

        </div>

        <div className="medical-records-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search medical records..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() =>
                setSearchTerm("")
              }
            >
              <X size={15} />
            </button>
          )}

        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      {loading ? (

        <div className="medical-records-loading">

          <div className="medical-records-spinner"></div>

          <h3>
            Loading medical records...
          </h3>

          <p>
            Please wait while we fetch the
            clinical information.
          </p>

        </div>

      ) : filteredRecords.length === 0 ? (

        <div className="medical-records-empty">

          <div className="medical-records-empty-icon">
            <ClipboardList size={36} />
          </div>

          <h3>
            {records.length === 0
              ? "No Medical Records Found"
              : "No Matching Records"}
          </h3>

          <p>
            {records.length === 0
              ? "There are no medical records available yet."
              : "Try searching with a different keyword."}
          </p>

          {searchTerm && (
            <button
              onClick={() =>
                setSearchTerm("")
              }
            >
              Clear Search
            </button>
          )}

        </div>

      ) : (

        <div className="medical-records-grid">

          {filteredRecords.map(
            (record, index) => {

              const patientName =
                getPatientName(
                  record.patientId
                );

              const doctorName =
                getDoctorName(
                  record.doctorId
                );

              const specialization =
                getDoctorSpecialization(
                  record.doctorId
                );

              return (
                <div
                  className="admin-medical-record-card"
                  key={
                    record.recordId ??
                    index
                  }
                  style={{
                    animationDelay:
                      `${index * 0.05}s`,
                  }}
                >

                  {/* CARD HEADER */}

                  <div className="medical-record-card-top">

                    <div className="medical-record-patient-avatar">
                      {getInitial(
                        patientName
                      )}
                    </div>

                    <div className="medical-record-patient-info">

                      <h3>
                        {patientName}
                      </h3>

                      <span>
                        Patient #
                        {record.patientId ??
                          "-"}
                      </span>

                    </div>

                    <div className="medical-record-id">
                      #{record.recordId}
                    </div>

                  </div>

                  {/* DATE */}

                  <div className="medical-record-date">

                    <CalendarDays size={15} />

                    <span>
                      Record Date
                    </span>

                    <strong>
                      {formatDate(
                        record.recordDate
                      )}
                    </strong>

                  </div>

                  {/* DOCTOR */}

                  <div className="medical-record-doctor">

                    <div className="medical-record-doctor-icon">
                      <Stethoscope size={16} />
                    </div>

                    <div>

                      <small>
                        Attending Doctor
                      </small>

                      <strong>
                        {doctorName}
                      </strong>

                      {specialization && (
                        <span>
                          {specialization}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* DIAGNOSIS */}

                  <div className="medical-record-diagnosis">

                    <div className="diagnosis-icon">
                      <Activity size={16} />
                    </div>

                    <div>

                      <small>
                        Diagnosis
                      </small>

                      <strong>
                        {record.diagnosis ||
                          "Not specified"}
                      </strong>

                    </div>

                  </div>

                  {/* TREATMENT */}

                  <div className="medical-record-treatment">

                    <small>
                      Treatment
                    </small>

                    <p>
                      {record.treatment ||
                        "No treatment information available."}
                    </p>

                  </div>

                  {/* ACTION */}

                  <button
                    className="medical-record-view-button"
                    onClick={() =>
                      setSelectedRecord(
                        record
                      )
                    }
                  >
                    View Record
                    <ArrowRight size={15} />
                  </button>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {selectedRecord && (

        <div
          className="medical-record-modal-overlay"
          onClick={() =>
            setSelectedRecord(null)
          }
        >

          <div
            className="medical-record-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="medical-record-modal-header">

              <div className="medical-record-modal-title">

                <div className="medical-record-modal-icon">
                  <ClipboardList size={22} />
                </div>

                <div>

                  <h2>
                    Medical Record
                  </h2>

                  <p>
                    Record #
                    {selectedRecord.recordId}
                  </p>

                </div>

              </div>

              <button
                className="medical-record-modal-close"
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                <X size={18} />
              </button>

            </div>

            <div className="medical-record-modal-content">

              {/* PATIENT */}

              <div className="medical-record-modal-patient">

                <div className="modal-patient-avatar">
                  {getInitial(
                    getPatientName(
                      selectedRecord.patientId
                    )
                  )}
                </div>

                <div>

                  <small>Patient</small>

                  <strong>
                    {getPatientName(
                      selectedRecord.patientId
                    )}
                  </strong>

                  <span>
                    Patient #
                    {selectedRecord.patientId}
                  </span>

                </div>

              </div>

              {/* INFORMATION */}

              <div className="medical-record-detail-grid">

                <div>

                  <small>Doctor</small>

                  <strong>
                    {getDoctorName(
                      selectedRecord.doctorId
                    )}
                  </strong>

                </div>

                <div>

                  <small>Record Date</small>

                  <strong>
                    {formatDate(
                      selectedRecord.recordDate
                    )}
                  </strong>

                </div>

                <div>

                  <small>Diagnosis</small>

                  <strong>
                    {selectedRecord.diagnosis ||
                      "-"}
                  </strong>

                </div>

                <div>

                  <small>Specialization</small>

                  <strong>
                    {getDoctorSpecialization(
                      selectedRecord.doctorId
                    ) || "-"}
                  </strong>

                </div>

              </div>

              {/* SYMPTOMS */}

              <div className="medical-record-detail-box">

                <small>
                  Symptoms
                </small>

                <p>
                  {selectedRecord.symptoms ||
                    "No symptoms recorded."}
                </p>

              </div>

              {/* TREATMENT */}

              <div className="medical-record-detail-box">

                <small>
                  Treatment
                </small>

                <p>
                  {selectedRecord.treatment ||
                    "No treatment recorded."}
                </p>

              </div>

              {/* NOTES */}

              <div className="medical-record-detail-box">

                <small>
                  Clinical Notes
                </small>

                <p>
                  {selectedRecord.notes ||
                    "No additional notes."}
                </p>

              </div>

            </div>

            <div className="medical-record-modal-footer">

              <button
                className="medical-record-edit-button"
                onClick={() => {
                  const record =
                    selectedRecord;

                  setSelectedRecord(
                    null
                  );

                  openEditForm(record);
                }}
              >
                <Pencil size={14} />
                Edit Record
              </button>

              <button
                className="medical-record-close-button"
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {editingRecord && (

        <div
          className="medical-record-modal-overlay"
          onClick={closeEditForm}
        >

          <div
            className="medical-record-edit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="medical-record-modal-header">

              <div className="medical-record-modal-title">

                <div className="medical-record-modal-icon">
                  <Pencil size={20} />
                </div>

                <div>

                  <h2>
                    Edit Medical Record
                  </h2>

                  <p>
                    Record #
                    {editingRecord.recordId}
                  </p>

                </div>

              </div>

              <button
                className="medical-record-modal-close"
                onClick={closeEditForm}
              >
                <X size={18} />
              </button>

            </div>

            <form
              className="medical-record-edit-form"
              onSubmit={handleUpdate}
            >

              <div className="medical-record-form-grid">

                <div className="medical-record-form-group">

                  <label>
                    Patient
                  </label>

                  <select
                    name="patientId"
                    value={
                      formData.patientId
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >

                    <option value="">
                      Select Patient
                    </option>

                    {patients.map(
                      (patient) => (
                        <option
                          key={
                            patient.patientId
                          }
                          value={
                            patient.patientId
                          }
                        >
                          {patient.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="medical-record-form-group">

                  <label>
                    Doctor
                  </label>

                  <select
                    name="doctorId"
                    value={
                      formData.doctorId
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >

                    <option value="">
                      Select Doctor
                    </option>

                    {doctors.map(
                      (doctor) => (
                        <option
                          key={
                            doctor.doctorId
                          }
                          value={
                            doctor.doctorId
                          }
                        >
                          {doctor.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="medical-record-form-group">

                  <label>
                    Record Date
                  </label>

                  <input
                    type="date"
                    name="recordDate"
                    value={
                      formData.recordDate
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="medical-record-form-group">

                  <label>
                    Diagnosis
                  </label>

                  <input
                    type="text"
                    name="diagnosis"
                    value={
                      formData.diagnosis
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter diagnosis"
                    required
                  />

                </div>

                <div className="medical-record-form-group full-width">

                  <label>
                    Symptoms
                  </label>

                  <textarea
                    name="symptoms"
                    value={
                      formData.symptoms
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter symptoms"
                    rows="3"
                  />

                </div>

                <div className="medical-record-form-group full-width">

                  <label>
                    Treatment
                  </label>

                  <textarea
                    name="treatment"
                    value={
                      formData.treatment
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter treatment"
                    rows="3"
                  />

                </div>

                <div className="medical-record-form-group full-width">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={
                      formData.notes
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter clinical notes"
                    rows="3"
                  />

                </div>

              </div>

              <div className="medical-record-edit-footer">

                <button
                  type="button"
                  className="medical-record-cancel-button"
                  onClick={closeEditForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="medical-record-save-button"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="save-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save Changes
                    </>
                  )}
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