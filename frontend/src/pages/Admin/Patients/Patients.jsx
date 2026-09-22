import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Phone,
  Mail,
  Droplets,
  CalendarDays,
  VenusAndMars,
  X,
  ArrowRight,
  Trash2,
} from "lucide-react";

import "./Patients.css";

const API_BASE_URL = "http://localhost:8080/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // LOAD PATIENTS
  // ==========================================

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/patients`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();

      setPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Patients error:", err);

      setError(
        "Unable to load patients. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE PATIENT PERMANENTLY
  // ==========================================

  const handleDeletePatient = async (patient) => {
    const patientId = patient?.patientId;

    if (!patientId) {
      alert("Patient ID not found.");
      return;
    }

    const patientName =
      patient?.name || `Patient #${patientId}`;

    const confirmed = window.confirm(
      `⚠️ DELETE PATIENT PERMANENTLY?\n\n` +
        `Patient: ${patientName}\n` +
        `Patient ID: #${patientId}\n\n` +
        `This action cannot be undone.\n\n` +
        `Do you want to permanently delete this patient?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(patientId);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/patients/${patientId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to delete patient."
        );
      }

      // Remove patient from UI immediately
      setPatients((previousPatients) =>
        previousPatients.filter(
          (currentPatient) =>
            currentPatient.patientId !== patientId
        )
      );

      // Close modal if deleted patient was open
      if (
        selectedPatient?.patientId === patientId
      ) {
        setSelectedPatient(null);
      }

      alert(
        `Patient "${patientName}" deleted successfully.`
      );
    } catch (err) {
      console.error(
        "Delete patient error:",
        err
      );

      alert(
        err.message ||
          "Failed to delete patient."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // FILTER
  // ==========================================

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) {
      return patients;
    }

    const search = searchTerm.toLowerCase();

    return patients.filter((patient) =>
      [
        patient.name,
        patient.email,
        patient.phone,
        patient.gender,
        patient.bloodGroup,
        patient.patientId,
      ]
        .map((value) =>
          String(value ?? "").toLowerCase()
        )
        .some((value) =>
          value.includes(search)
        )
    );
  }, [patients, searchTerm]);

  // ==========================================
  // INITIAL
  // ==========================================

  const getInitial = (name) => {
    return (
      name?.trim()?.charAt(0)?.toUpperCase() ||
      "P"
    );
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

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

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-patients-page">
        <div className="admin-patients-loading">
          <div className="patients-spinner"></div>

          <h3>
            Loading patients...
          </h3>

          <p>
            Please wait while we fetch patient data.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="admin-patients-page">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="patients-page-header">

        <div className="patients-page-title">

          <div className="patients-title-icon">
            <Users size={27} />
          </div>

          <div>

            <div className="patients-section-label">
              Patient Management
            </div>

            <h1>Patients</h1>

            <p>
              View and manage all registered hospital
              patients.
            </p>

          </div>

        </div>

        <button
          className="patients-refresh-button"
          onClick={loadPatients}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="patients-error">

          <div>
            <strong>
              Unable to load patients
            </strong>

            <p>{error}</p>
          </div>

          <button onClick={loadPatients}>
            Try Again
          </button>

        </div>
      )}

      {/* ========================================
          SUMMARY
      ======================================== */}

      <div className="patients-summary-card">

        <div className="patients-summary-icon">
          <Users size={24} />
        </div>

        <div>

          <span>
            Total Registered Patients
          </span>

          <strong>
            {patients.length}
          </strong>

          <small>
            {filteredPatients.length} patients currently
            displayed
          </small>

        </div>

      </div>

      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="patients-toolbar">

        <div className="patients-toolbar-heading">

          <h2>
            Patient Directory
          </h2>

          <p>
            Search and view patient information.
          </p>

        </div>

        <div className="patients-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search patients..."
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
              className="patients-clear-search"
            >
              <X size={15} />
            </button>
          )}

        </div>

      </div>

      {/* ========================================
          EMPTY
      ======================================== */}

      {patients.length === 0 ? (

        <div className="patients-empty">

          <div className="patients-empty-icon">
            <Users size={36} />
          </div>

          <h3>
            No Patients Found
          </h3>

          <p>
            There are no registered patients in the
            hospital system yet.
          </p>

          <button onClick={loadPatients}>
            <RefreshCw size={15} />
            Refresh
          </button>

        </div>

      ) : filteredPatients.length === 0 ? (

        <div className="patients-empty">

          <div className="patients-empty-icon">
            <Search size={34} />
          </div>

          <h3>
            No Matching Patients
          </h3>

          <p>
            Try searching with a different name, email,
            phone or patient ID.
          </p>

          <button
            onClick={() =>
              setSearchTerm("")
            }
          >
            Clear Search
          </button>

        </div>

      ) : (

        /* ========================================
            PATIENT GRID
        ======================================== */

        <div className="patients-grid">

          {filteredPatients.map(
            (patient, index) => {

              const isDeleting =
                deletingId === patient.patientId;

              return (
                <div
                  className="admin-patient-card"
                  key={
                    patient.patientId ?? index
                  }
                  style={{
                    animationDelay:
                      `${index * 0.05}s`,
                  }}
                >

                  {/* CARD TOP */}

                  <div className="patient-card-top">

                    <div className="patient-avatar">
                      {getInitial(
                        patient.name
                      )}
                    </div>

                    <div className="patient-card-name">

                      <h3>
                        {patient.name ||
                          `Patient #${patient.patientId}`}
                      </h3>

                      <span>
                        Patient ID: #
                        {patient.patientId ?? "-"}
                      </span>

                    </div>

                    <div className="patient-active-dot">
                      <span></span>
                    </div>

                  </div>

                  {/* PATIENT INFO */}

                  <div className="patient-info-grid">

                    <div className="patient-info-item">

                      <VenusAndMars size={15} />

                      <div>
                        <small>
                          Gender
                        </small>

                        <strong>
                          {patient.gender || "-"}
                        </strong>
                      </div>

                    </div>

                    <div className="patient-info-item">

                      <CalendarDays size={15} />

                      <div>
                        <small>
                          Age
                        </small>

                        <strong>
                          {patient.age
                            ? `${patient.age} years`
                            : "-"}
                        </strong>
                      </div>

                    </div>

                    <div className="patient-info-item">

                      <Droplets size={15} />

                      <div>
                        <small>
                          Blood Group
                        </small>

                        <strong>
                          {patient.bloodGroup || "-"}
                        </strong>
                      </div>

                    </div>

                    <div className="patient-info-item">

                      <Phone size={15} />

                      <div>
                        <small>
                          Phone
                        </small>

                        <strong>
                          {patient.phone || "-"}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* EMAIL */}

                  <div className="patient-email">

                    <Mail size={14} />

                    <span>
                      {patient.email ||
                        "No email available"}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >

                    {/* VIEW */}

                    <button
                      className="patient-view-button"
                      onClick={() =>
                        setSelectedPatient(
                          patient
                        )
                      }
                      disabled={isDeleting}
                      style={{
                        flex: 1,
                      }}
                    >
                      View Patient
                      <ArrowRight size={15} />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeletePatient(
                          patient
                        )
                      }
                      disabled={isDeleting}
                      title="Delete patient permanently"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        border: "none",
                        borderRadius: "10px",
                        padding: "0 14px",
                        background:
                          isDeleting
                            ? "#9ca3af"
                            : "#dc2626",
                        color: "#ffffff",
                        fontWeight: "700",
                        cursor:
                          isDeleting
                            ? "not-allowed"
                            : "pointer",
                        minWidth: "52px",
                        opacity:
                          isDeleting ? 0.7 : 1,
                      }}
                    >

                      <Trash2 size={16} />

                      <span>
                        {isDeleting
                          ? "Deleting..."
                          : "Delete"}
                      </span>

                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* ========================================
          PATIENT DETAILS MODAL
      ======================================== */}

      {selectedPatient && (

        <div
          className="patient-modal-overlay"
          onClick={() =>
            setSelectedPatient(null)
          }
        >

          <div
            className="patient-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="patient-modal-header">

              <div className="patient-modal-title">

                <div className="patient-modal-avatar">
                  {getInitial(
                    selectedPatient.name
                  )}
                </div>

                <div>

                  <h2>
                    {selectedPatient.name ||
                      "Patient"}
                  </h2>

                  <p>
                    Patient ID: #
                    {selectedPatient.patientId ||
                      "-"}
                  </p>

                </div>

              </div>

              <button
                className="patient-modal-close"
                onClick={() =>
                  setSelectedPatient(null)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="patient-modal-content">

              <div className="patient-detail-section">

                <h3>
                  Personal Information
                </h3>

                <div className="patient-detail-grid">

                  <div>
                    <small>
                      Full Name
                    </small>

                    <strong>
                      {selectedPatient.name ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Email
                    </small>

                    <strong>
                      {selectedPatient.email ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Phone
                    </small>

                    <strong>
                      {selectedPatient.phone ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Gender
                    </small>

                    <strong>
                      {selectedPatient.gender ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Age
                    </small>

                    <strong>
                      {selectedPatient.age
                        ? `${selectedPatient.age} years`
                        : "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Blood Group
                    </small>

                    <strong>
                      {selectedPatient.bloodGroup ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Date of Birth
                    </small>

                    <strong>
                      {formatDate(
                        selectedPatient.dateOfBirth
                      )}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Patient ID
                    </small>

                    <strong>
                      #
                      {selectedPatient.patientId ||
                        "-"}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="patient-address">

                <small>
                  Address
                </small>

                <p>
                  {selectedPatient.address ||
                    "No address available."}
                </p>

              </div>

            </div>

            <div className="patient-modal-footer">

              <button
                onClick={() =>
                  setSelectedPatient(null)
                }
              >
                Close
              </button>

              {/* DELETE FROM MODAL */}

              <button
                type="button"
                onClick={() =>
                  handleDeletePatient(
                    selectedPatient
                  )
                }
                disabled={
                  deletingId ===
                  selectedPatient.patientId
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  background:
                    deletingId ===
                    selectedPatient.patientId
                      ? "#9ca3af"
                      : "#dc2626",
                  color: "#ffffff",
                  fontWeight: "700",
                  cursor:
                    deletingId ===
                    selectedPatient.patientId
                      ? "not-allowed"
                      : "pointer",
                }}
              >

                <Trash2 size={16} />

                {deletingId ===
                selectedPatient.patientId
                  ? "Deleting..."
                  : "Delete Permanently"}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Patients;