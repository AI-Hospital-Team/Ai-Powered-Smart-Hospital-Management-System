import { useEffect, useState } from "react";
import "./MedicalRecords.css";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH MEDICAL RECORDS
  // ==========================================

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const userData = localStorage.getItem("user");

      if (!userData) {
        setError(
          "Patient information not found. Please login again."
        );
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);

      if (!user.patientId) {
        setError(
          "Patient ID not found. Please login again."
        );
        setLoading(false);
        return;
      }

      console.log(
        "Fetching medical records for patient:",
        user.patientId
      );

      const response = await fetch(
        `http://localhost:8080/api/medical-records/patient/${user.patientId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch medical records: ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "Patient medical records:",
        data
      );

      setRecords(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Medical records fetch error:",
        err
      );

      setError(
        "Unable to load medical records."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
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
  // PAGE
  // ==========================================

  return (
    <div className="medical-records-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="medical-records-header">

        <div>
          <h1>
            Medical Records
          </h1>

          <p>
            View your medical history, diagnosis
            and treatment records.
          </p>
        </div>

      </div>

      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (
        <div className="records-message">

          <div className="records-loader"></div>

          <p>
            Loading medical records...
          </p>

        </div>
      )}

      {/* ======================================
          ERROR
      ====================================== */}

      {!loading && error && (
        <div className="records-error">

          <div className="error-icon">
            ⚠️
          </div>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={fetchMedicalRecords}
          >
            Try Again
          </button>

        </div>
      )}

      {/* ======================================
          NO RECORDS
      ====================================== */}

      {!loading &&
        !error &&
        records.length === 0 && (
          <div className="no-records">

            <div className="no-records-icon">
              📋
            </div>

            <h2>
              No Medical Records Found
            </h2>

            <p>
              You currently don't have any
              medical records.
            </p>

          </div>
        )}

      {/* ======================================
          RECORDS
      ====================================== */}

      {!loading &&
        !error &&
        records.length > 0 && (

          <div className="records-container">

            {records.map((record) => (

              <div
                className="record-card"
                key={
                  record.recordId ||
                  record.id
                }
              >

                {/* =================================
                    RECORD HEADER
                ================================= */}

                <div className="record-card-header">

                  <div className="record-title">

                    <div className="record-icon">
                      🩺
                    </div>

                    <div>

                      <h2>
                        {record.diagnosis ||
                          record.title ||
                          "Medical Record"}
                      </h2>

                      <p>
                        {formatDate(
                          record.recordDate ||
                            record.date ||
                            record.createdAt
                        )}
                      </p>

                    </div>

                  </div>

                  <span className="record-id">
                    #
                    {record.recordId ||
                      record.id}
                  </span>

                </div>

                {/* =================================
                    RECORD INFORMATION
                ================================= */}

                <div className="record-details">

                  {/* DOCTOR */}

                  <div className="record-detail-item">

                    <span className="record-detail-icon">
                      👨‍⚕️
                    </span>

                    <div>

                      <small>
                        Doctor
                      </small>

                      <strong>
                        {record.doctorName ||
                          record.doctor?.name ||
                          "Doctor"}
                      </strong>

                    </div>

                  </div>

                  {/* DEPARTMENT */}

                  <div className="record-detail-item">

                    <span className="record-detail-icon">
                      🏥
                    </span>

                    <div>

                      <small>
                        Department
                      </small>

                      <strong>
                        {record.department ||
                          record.doctor?.specialization ||
                          "General"}
                      </strong>

                    </div>

                  </div>

                  {/* DATE */}

                  <div className="record-detail-item">

                    <span className="record-detail-icon">
                      📅
                    </span>

                    <div>

                      <small>
                        Date
                      </small>

                      <strong>
                        {formatDate(
                          record.recordDate ||
                            record.date ||
                            record.createdAt
                        )}
                      </strong>

                    </div>

                  </div>

                </div>

                {/* =================================
                    DIAGNOSIS
                ================================= */}

                {record.diagnosis && (
                  <div className="record-section">

                    <h3>
                      Diagnosis
                    </h3>

                    <p>
                      {record.diagnosis}
                    </p>

                  </div>
                )}

                {/* =================================
                    SYMPTOMS
                ================================= */}

                {record.symptoms && (
                  <div className="record-section">

                    <h3>
                      Symptoms
                    </h3>

                    <p>
                      {record.symptoms}
                    </p>

                  </div>
                )}

                {/* =================================
                    TREATMENT
                ================================= */}

                {record.treatment && (
                  <div className="record-section">

                    <h3>
                      Treatment
                    </h3>

                    <p>
                      {record.treatment}
                    </p>

                  </div>
                )}

                {/* =================================
                    NOTES
                ================================= */}

                {record.notes && (
                  <div className="record-section">

                    <h3>
                      Doctor's Notes
                    </h3>

                    <p>
                      {record.notes}
                    </p>

                  </div>
                )}

              </div>

            ))}

          </div>
        )}

    </div>
  );
}

export default MedicalRecords;