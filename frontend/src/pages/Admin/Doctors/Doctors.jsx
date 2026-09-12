import { useEffect, useMemo, useState } from "react";
import {
  Stethoscope,
  Search,
  RefreshCw,
  Mail,
  X,
  ArrowRight,
  BadgeCheck,
  Activity,
  Check,
  Ban,
} from "lucide-react";

import "./Doctors.css";

const API_BASE_URL = "http://localhost:8080/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [updatingDoctorId, setUpdatingDoctorId] = useState(null);

  // =====================================================
  // LOAD DOCTORS
  // =====================================================

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/doctors`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await response.json();

      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Doctors error:", err);

      setError(
        "Unable to load doctors. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredDoctors = useMemo(() => {
    if (!searchTerm.trim()) {
      return doctors;
    }

    const search = searchTerm.toLowerCase();

    return doctors.filter((doctor) =>
      [
        doctor.name,
        doctor.specialization,
        doctor.doctorId,
        doctor.email,
        doctor.status,
        doctor.qualification,
        doctor.medicalRegistrationNo,
        doctor.hospitalAssociation,
      ]
        .map((value) =>
          String(value ?? "").toLowerCase()
        )
        .some((value) => value.includes(search))
    );
  }, [doctors, searchTerm]);

  // =====================================================
  // INITIAL
  // =====================================================

  const getInitial = (name) => {
    return (
      name?.trim()?.charAt(0)?.toUpperCase() || "D"
    );
  };

  // =====================================================
  // APPROVE DOCTOR
  // =====================================================

  const handleApprove = async (doctor) => {
    const confirmed = window.confirm(
      `Approve ${doctor.name || "this doctor"}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingDoctorId(doctor.doctorId);

      const response = await fetch(
        `${API_BASE_URL}/doctors/${doctor.doctorId}/approve`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data || "Failed to approve doctor"
        );
      }

      setDoctors((previousDoctors) =>
        previousDoctors.map((currentDoctor) =>
          currentDoctor.doctorId === doctor.doctorId
            ? data
            : currentDoctor
        )
      );

      setSelectedDoctor(data);

      alert(
        "Doctor approved successfully. The doctor can now login."
      );
    } catch (err) {
      console.error("Approve doctor error:", err);

      alert(
        err.message ||
          "Failed to approve doctor."
      );
    } finally {
      setUpdatingDoctorId(null);
    }
  };

  // =====================================================
  // REJECT DOCTOR
  // =====================================================

  const handleReject = async (doctor) => {
    const confirmed = window.confirm(
      `Reject ${doctor.name || "this doctor"} application?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingDoctorId(doctor.doctorId);

      const response = await fetch(
        `${API_BASE_URL}/doctors/${doctor.doctorId}/reject`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data || "Failed to reject doctor"
        );
      }

      setDoctors((previousDoctors) =>
        previousDoctors.map((currentDoctor) =>
          currentDoctor.doctorId === doctor.doctorId
            ? data
            : currentDoctor
        )
      );

      setSelectedDoctor(data);

      alert(
        "Doctor application rejected."
      );
    } catch (err) {
      console.error("Reject doctor error:", err);

      alert(
        err.message ||
          "Failed to reject doctor."
      );
    } finally {
      setUpdatingDoctorId(null);
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="admin-doctors-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="doctors-page-header">

        <div className="doctors-page-title">

          <div className="doctors-title-icon">
            <Stethoscope size={27} />
          </div>

          <div>

            <div className="doctors-section-label">
              Doctor Management
            </div>

            <h1>Doctors</h1>

            <p>
              View and manage all registered hospital
              doctors.
            </p>

          </div>

        </div>

        <button
          className="doctors-refresh-button"
          onClick={loadDoctors}
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
        <div className="doctors-error">

          <div>

            <strong>
              Unable to load doctors
            </strong>

            <p>{error}</p>

          </div>

          <button onClick={loadDoctors}>
            Try Again
          </button>

        </div>
      )}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="doctors-summary-card">

        <div className="doctors-summary-icon">
          <Stethoscope size={24} />
        </div>

        <div>

          <span>
            Total Registered Doctors
          </span>

          <strong>
            {doctors.length}
          </strong>

          <small>
            {filteredDoctors.length} doctors currently
            displayed
          </small>

        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="doctors-toolbar">

        <div className="doctors-toolbar-heading">

          <h2>Doctor Directory</h2>

          <p>
            Search and view registered medical
            professionals.
          </p>

        </div>

        <div className="doctors-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              className="doctors-clear-search"
              onClick={() => setSearchTerm("")}
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

        <div className="doctors-loading">

          <div className="doctors-spinner"></div>

          <h3>Loading doctors...</h3>

          <p>
            Please wait while we fetch doctor data.
          </p>

        </div>

      ) : doctors.length === 0 ? (

        <div className="doctors-empty">

          <div className="doctors-empty-icon">
            <Stethoscope size={36} />
          </div>

          <h3>No Doctors Found</h3>

          <p>
            There are no registered doctors in the
            hospital system yet.
          </p>

          <button onClick={loadDoctors}>
            <RefreshCw size={15} />
            Refresh
          </button>

        </div>

      ) : filteredDoctors.length === 0 ? (

        <div className="doctors-empty">

          <div className="doctors-empty-icon">
            <Search size={34} />
          </div>

          <h3>No Matching Doctors</h3>

          <p>
            Try searching with a different name,
            specialization or doctor ID.
          </p>

          <button
            onClick={() => setSearchTerm("")}
          >
            Clear Search
          </button>

        </div>

      ) : (

        <div className="doctors-grid">

          {filteredDoctors.map(
            (doctor, index) => {

              const status =
                String(
                  doctor.status || "PENDING"
                ).toUpperCase();

              const isPending =
                status === "PENDING";

              const isRejected =
                status === "REJECTED";

              const isApproved =
                status === "APPROVED" ||
                status === "ACTIVE";

              const isUpdating =
                updatingDoctorId ===
                doctor.doctorId;

              return (

                <div
                  className="admin-doctor-card"
                  key={
                    doctor.doctorId ?? index
                  }
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >

                  {/* CARD TOP */}

                  <div className="doctor-card-top">

                    <div className="doctor-avatar">
                      {getInitial(doctor.name)}
                    </div>

                    <div className="doctor-card-name">

                      <h3>
                        {doctor.name ||
                          `Doctor #${doctor.doctorId}`}
                      </h3>

                      <span>
                        Doctor ID: #
                        {doctor.doctorId ?? "-"}
                      </span>

                    </div>

                    <div
                      className={`doctor-active ${
                        isPending
                          ? "doctor-pending"
                          : isRejected
                          ? "doctor-rejected"
                          : ""
                      }`}
                    >
                      <span></span>
                    </div>

                  </div>

                  {/* SPECIALIZATION */}

                  <div className="doctor-specialization">

                    <div className="doctor-specialization-icon">
                      <Stethoscope size={17} />
                    </div>

                    <div>

                      <small>
                        Specialization
                      </small>

                      <strong>
                        {doctor.specialization ||
                          "General Physician"}
                      </strong>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div className="doctor-status-row">

                    <div className="doctor-status-icon">
                      <Activity size={15} />
                    </div>

                    <div>

                      <small>
                        Account Status
                      </small>

                      <strong
                        className={
                          isPending
                            ? "doctor-pending-text"
                            : isRejected
                            ? "doctor-rejected-text"
                            : "doctor-active-text"
                        }
                      >
                        {status}
                      </strong>

                    </div>

                    {isApproved && (
                      <BadgeCheck
                        size={18}
                        className="doctor-verified-icon"
                      />
                    )}

                    {isPending && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        Awaiting Review
                      </span>
                    )}

                  </div>

                  {/* VIEW */}

                  <button
                    className="doctor-view-button"
                    onClick={() =>
                      setSelectedDoctor(doctor)
                    }
                  >
                    View Doctor
                    <ArrowRight size={15} />
                  </button>

                  {/* APPROVE / REJECT */}

                  {isPending && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >

                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          handleApprove(doctor)
                        }
                        style={{
                          flex: 1,
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px",
                          background: "#16a34a",
                          color: "#fff",
                          fontWeight: "700",
                          cursor: isUpdating
                            ? "not-allowed"
                            : "pointer",
                          opacity: isUpdating
                            ? 0.6
                            : 1,
                        }}
                      >
                        <Check
                          size={15}
                          style={{
                            verticalAlign:
                              "middle",
                            marginRight: "5px",
                          }}
                        />
                        Approve
                      </button>

                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          handleReject(doctor)
                        }
                        style={{
                          flex: 1,
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px",
                          background: "#dc2626",
                          color: "#fff",
                          fontWeight: "700",
                          cursor: isUpdating
                            ? "not-allowed"
                            : "pointer",
                          opacity: isUpdating
                            ? 0.6
                            : 1,
                        }}
                      >
                        <Ban
                          size={15}
                          style={{
                            verticalAlign:
                              "middle",
                            marginRight: "5px",
                          }}
                        />
                        Reject
                      </button>

                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

      {/* =================================================
          DOCTOR DETAILS MODAL
      ================================================= */}

      {selectedDoctor && (

        <div
          className="doctor-modal-overlay"
          onClick={() =>
            setSelectedDoctor(null)
          }
        >

          <div
            className="doctor-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="doctor-modal-header">

              <div className="doctor-modal-title">

                <div className="doctor-modal-avatar">
                  {getInitial(
                    selectedDoctor.name
                  )}
                </div>

                <div>

                  <h2>
                    {selectedDoctor.name ||
                      "Doctor"}
                  </h2>

                  <p>
                    Doctor ID: #
                    {selectedDoctor.doctorId ||
                      "-"}
                  </p>

                </div>

              </div>

              <button
                className="doctor-modal-close"
                onClick={() =>
                  setSelectedDoctor(null)
                }
              >
                <X size={19} />
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="doctor-modal-content">

              {/* PROFESSIONAL + PERSONAL INFORMATION */}

              <div className="doctor-detail-section">

                <h3>
                  Doctor Verification Details
                </h3>

                <div className="doctor-detail-grid">

                  {/* PERSONAL INFORMATION */}

                  <div>
                    <small>
                      Full Name
                    </small>

                    <strong>
                      {selectedDoctor.name || "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Doctor ID
                    </small>

                    <strong>
                      #{selectedDoctor.doctorId || "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Date of Birth
                    </small>

                    <strong>
                      {selectedDoctor.dob || "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Gender
                    </small>

                    <strong>
                      {selectedDoctor.gender || "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Phone
                    </small>

                    <strong>
                      {selectedDoctor.phone || "-"}
                    </strong>
                  </div>

                  {/* PROFESSIONAL INFORMATION */}

                  <div>
                    <small>
                      Specialization
                    </small>

                    <strong>
                      {selectedDoctor.specialization ||
                        "General Physician"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Qualification
                    </small>

                    <strong>
                      {selectedDoctor.qualification || "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Medical Registration No.
                    </small>

                    <strong>
                      {selectedDoctor.medicalRegistrationNo ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Hospital Association
                    </small>

                    <strong>
                      {selectedDoctor.hospitalAssociation ||
                        "-"}
                    </strong>
                  </div>

                  {/* ACCOUNT STATUS */}

                  <div>
                    <small>
                      Account Status
                    </small>

                    <strong
                      className={
                        String(
                          selectedDoctor.status || ""
                        ).toUpperCase() === "PENDING"
                          ? "doctor-pending-text"
                          : String(
                              selectedDoctor.status || ""
                            ).toUpperCase() === "REJECTED"
                          ? "doctor-rejected-text"
                          : "doctor-active-text"
                      }
                    >
                      {String(
                        selectedDoctor.status ||
                          "PENDING"
                      ).toUpperCase()}
                    </strong>
                  </div>

                  {/* ADDRESS */}

                  <div
                    style={{
                      gridColumn: "1 / -1",
                    }}
                  >
                    <small>
                      Address
                    </small>

                    <strong>
                      {selectedDoctor.address || "-"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* EMAIL */}

              {selectedDoctor.email && (
                <div className="doctor-email-detail">

                  <Mail size={15} />

                  <div>

                    <small>
                      Email
                    </small>

                    <strong>
                      {selectedDoctor.email}
                    </strong>

                  </div>

                </div>
              )}

              {/* VERIFICATION MESSAGE */}

              <div className="doctor-care-message">

                <Stethoscope size={18} />

                <p>
                  {String(
                    selectedDoctor.status || ""
                  ).toUpperCase() === "PENDING"
                    ? "Doctor application is awaiting Admin verification and approval. Please verify the registration number and hospital association before approving."
                    : String(
                        selectedDoctor.status || ""
                      ).toUpperCase() === "REJECTED"
                    ? "Doctor application has been rejected. This account cannot login."
                    : "Doctor account is registered and active in the hospital management system."}
                </p>

              </div>

            </div>

            {/* FOOTER */}

            <div className="doctor-modal-footer">

              {String(
                selectedDoctor.status || ""
              ).toUpperCase() === "PENDING" && (

                <>

                  <button
                    type="button"
                    onClick={() =>
                      handleApprove(
                        selectedDoctor
                      )
                    }
                    disabled={
                      updatingDoctorId ===
                      selectedDoctor.doctorId
                    }
                    style={{
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 18px",
                      fontWeight: "700",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ✓ Approve
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleReject(
                        selectedDoctor
                      )
                    }
                    disabled={
                      updatingDoctorId ===
                      selectedDoctor.doctorId
                    }
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 18px",
                      fontWeight: "700",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ✕ Reject
                  </button>

                </>
              )}

              <button
                onClick={() =>
                  setSelectedDoctor(null)
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

export default Doctors;