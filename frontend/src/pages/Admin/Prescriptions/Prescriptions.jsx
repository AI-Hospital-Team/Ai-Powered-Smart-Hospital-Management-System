import { useEffect, useMemo, useState } from "react";
import {
  Pill,
  Search,
  RefreshCw,
  UserRound,
  Stethoscope,
  CalendarDays,
  Clock3,
  FileText,
  Eye,
  Pencil,
  X,
  ArrowRight,
} from "lucide-react";

import {
  fetchPrescriptions,
  fetchPatients,
  fetchDoctors,
} from "../adminApi";

import "./Prescriptions.css";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPrescription, setSelectedPrescription] =
    useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [prescriptionData, patientData, doctorData] =
        await Promise.all([
          fetchPrescriptions(),
          fetchPatients(),
          fetchDoctors(),
        ]);

      setPrescriptions(
        Array.isArray(prescriptionData)
          ? prescriptionData
          : []
      );

      setPatients(
        Array.isArray(patientData)
          ? patientData
          : []
      );

      setDoctors(
        Array.isArray(doctorData)
          ? doctorData
          : []
      );
    } catch (err) {
      console.error("Prescription error:", err);
      setError(
        "Unable to load prescriptions. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (item) =>
        Number(item.patientId) === Number(patientId)
    );

    return (
      patient?.name ||
      `Patient #${patientId ?? "-"}`
    );
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) === Number(doctorId)
    );

    return (
      doctor?.name ||
      `Doctor #${doctorId ?? "-"}`
    );
  };

  const getDoctorSpecialization = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) === Number(doctorId)
    );

    return doctor?.specialization || "";
  };

  const getInitial = (name) =>
    name?.trim()?.charAt(0)?.toUpperCase() || "P";

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(`${date}T00:00:00`).toLocaleDateString(
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

  const filteredPrescriptions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return prescriptions;

    return prescriptions.filter((prescription) => {
      const patientName = getPatientName(
        prescription.patientId
      );

      const doctorName = getDoctorName(
        prescription.doctorId
      );

      const text = [
        prescription.prescriptionId,
        prescription.patientId,
        prescription.doctorId,
        patientName,
        doctorName,
        prescription.diagnosis,
        prescription.medicineName,
        prescription.dosage,
        prescription.frequency,
        prescription.duration,
        prescription.instructions,
        prescription.prescriptionDate,
      ]
        .map((value) =>
          String(value ?? "").toLowerCase()
        )
        .join(" ");

      return text.includes(search);
    });
  }, [
    prescriptions,
    patients,
    doctors,
    searchTerm,
  ]);

  return (
    <div className="admin-prescriptions-page">

      {/* HEADER */}

      <div className="prescriptions-page-header">

        <div className="prescriptions-page-title">

          <div className="prescriptions-title-icon">
            <Pill size={27} />
          </div>

          <div>
            <div className="prescriptions-section-label">
              Prescription Management
            </div>

            <h1>Prescriptions</h1>

            <p>
              View prescriptions issued by hospital
              doctors.
            </p>
          </div>

        </div>

        <button
          className="prescriptions-refresh"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="prescriptions-error">

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

      {/* SUMMARY */}

      <div className="prescriptions-summary">

        <div className="prescriptions-summary-icon">
          <Pill size={23} />
        </div>

        <div>
          <span>Total Prescriptions</span>

          <strong>
            {prescriptions.length}
          </strong>

          <small>
            Prescriptions stored in the hospital
            system
          </small>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="prescriptions-toolbar">

        <div>
          <h2>Prescription Directory</h2>

          <p>
            Search by patient, doctor, medicine or
            diagnosis.
          </p>
        </div>

        <div className="prescriptions-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
            >
              <X size={15} />
            </button>
          )}

        </div>

      </div>

      {/* CONTENT */}

      {loading ? (

        <div className="prescriptions-loading">

          <div className="prescriptions-spinner" />

          <h3>
            Loading prescriptions...
          </h3>

          <p>
            Please wait while we fetch prescription
            data.
          </p>

        </div>

      ) : filteredPrescriptions.length === 0 ? (

        <div className="prescriptions-empty">

          <div className="prescriptions-empty-icon">
            <Pill size={36} />
          </div>

          <h3>
            {prescriptions.length === 0
              ? "No Prescriptions Found"
              : "No Matching Prescriptions"}
          </h3>

          <p>
            {prescriptions.length === 0
              ? "There are no prescriptions available yet."
              : "Try a different search term."}
          </p>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          )}

        </div>

      ) : (

        <div className="prescriptions-grid">

          {filteredPrescriptions.map(
            (prescription, index) => {

              const patientName =
                getPatientName(
                  prescription.patientId
                );

              const doctorName =
                getDoctorName(
                  prescription.doctorId
                );

              const specialization =
                getDoctorSpecialization(
                  prescription.doctorId
                );

              return (
                <div
                  className="admin-prescription-card"
                  key={
                    prescription.prescriptionId ??
                    index
                  }
                  style={{
                    animationDelay:
                      `${index * 0.05}s`,
                  }}
                >

                  {/* TOP */}

                  <div className="prescription-card-top">

                    <div className="prescription-medicine-icon">
                      <Pill size={22} />
                    </div>

                    <div className="prescription-card-title">

                      <h3>
                        {prescription.medicineName ||
                          "Medicine"}
                      </h3>

                      <span>
                        Prescription #
                        {prescription.prescriptionId ??
                          "-"}
                      </span>

                    </div>

                  </div>

                  {/* PATIENT */}

                  <div className="prescription-person">

                    <div className="prescription-person-icon patient">
                      <UserRound size={15} />
                    </div>

                    <div>
                      <small>Patient</small>

                      <strong>
                        {patientName}
                      </strong>
                    </div>

                  </div>

                  {/* DOCTOR */}

                  <div className="prescription-person">

                    <div className="prescription-person-icon doctor">
                      <Stethoscope size={15} />
                    </div>

                    <div>
                      <small>Doctor</small>

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

                  {/* MEDICINE DETAILS */}

                  <div className="prescription-details">

                    <div>
                      <small>Dosage</small>
                      <strong>
                        {prescription.dosage || "-"}
                      </strong>
                    </div>

                    <div>
                      <small>Frequency</small>
                      <strong>
                        {prescription.frequency ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <small>Duration</small>
                      <strong>
                        {prescription.duration ||
                          "-"}
                      </strong>
                    </div>

                  </div>

                  {/* DATE */}

                  <div className="prescription-date">

                    <CalendarDays size={14} />

                    <span>
                      {formatDate(
                        prescription.prescriptionDate
                      )}
                    </span>

                  </div>

                  {/* DIAGNOSIS */}

                  <div className="prescription-diagnosis">

                    <small>
                      Diagnosis
                    </small>

                    <p>
                      {prescription.diagnosis ||
                        "No diagnosis provided."}
                    </p>

                  </div>

                  {/* BUTTON */}

                  <button
                    className="prescription-view-button"
                    onClick={() =>
                      setSelectedPrescription(
                        prescription
                      )
                    }
                  >
                    <Eye size={14} />
                    View Prescription
                    <ArrowRight size={14} />
                  </button>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* DETAILS MODAL */}

      {selectedPrescription && (

        <div
          className="prescription-modal-overlay"
          onClick={() =>
            setSelectedPrescription(null)
          }
        >

          <div
            className="prescription-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="prescription-modal-header">

              <div className="prescription-modal-title">

                <div className="prescription-modal-icon">
                  <Pill size={22} />
                </div>

                <div>

                  <h2>
                    Prescription Details
                  </h2>

                  <p>
                    Prescription #
                    {
                      selectedPrescription.prescriptionId
                    }
                  </p>

                </div>

              </div>

              <button
                className="prescription-modal-close"
                onClick={() =>
                  setSelectedPrescription(null)
                }
              >
                <X size={18} />
              </button>

            </div>

            <div className="prescription-modal-content">

              {/* PATIENT */}

              <div className="prescription-modal-patient">

                <div className="modal-prescription-avatar">
                  {getInitial(
                    getPatientName(
                      selectedPrescription.patientId
                    )
                  )}
                </div>

                <div>

                  <small>Patient</small>

                  <strong>
                    {getPatientName(
                      selectedPrescription.patientId
                    )}
                  </strong>

                  <span>
                    Patient #
                    {
                      selectedPrescription.patientId
                    }
                  </span>

                </div>

              </div>

              {/* DOCTOR */}

              <div className="prescription-modal-doctor">

                <Stethoscope size={16} />

                <div>

                  <small>Doctor</small>

                  <strong>
                    {getDoctorName(
                      selectedPrescription.doctorId
                    )}
                  </strong>

                  <span>
                    {getDoctorSpecialization(
                      selectedPrescription.doctorId
                    )}
                  </span>

                </div>

              </div>

              {/* MEDICINE */}

              <div className="prescription-medicine-box">

                <div className="medicine-box-icon">
                  <Pill size={19} />
                </div>

                <div>

                  <small>Medicine</small>

                  <strong>
                    {
                      selectedPrescription.medicineName
                    }
                  </strong>

                </div>

              </div>

              {/* DETAILS */}

              <div className="prescription-detail-grid">

                <div>
                  <small>Dosage</small>
                  <strong>
                    {selectedPrescription.dosage ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <small>Frequency</small>
                  <strong>
                    {
                      selectedPrescription.frequency ||
                      "-"
                    }
                  </strong>
                </div>

                <div>
                  <small>Duration</small>
                  <strong>
                    {
                      selectedPrescription.duration ||
                      "-"
                    }
                  </strong>
                </div>

                <div>
                  <small>Date</small>
                  <strong>
                    {formatDate(
                      selectedPrescription.prescriptionDate
                    )}
                  </strong>
                </div>

              </div>

              {/* DIAGNOSIS */}

              <div className="prescription-detail-box">

                <small>Diagnosis</small>

                <p>
                  {selectedPrescription.diagnosis ||
                    "No diagnosis provided."}
                </p>

              </div>

              {/* INSTRUCTIONS */}

              <div className="prescription-detail-box">

                <small>Instructions</small>

                <p>
                  {
                    selectedPrescription.instructions ||
                    "No instructions provided."
                  }
                </p>

              </div>

            </div>

            <div className="prescription-modal-footer">

              <button
                onClick={() =>
                  setSelectedPrescription(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Prescriptions;