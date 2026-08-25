import { useEffect, useState } from "react";
import {
  Pill,
  UserRound,
  ClipboardList,
  Clock3,
  CalendarDays,
  Activity,
  AlertCircle,
  FileText,
} from "lucide-react";
import "./Prescriptions.css";

function Prescriptions() {
  const [user, setUser] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError(
          "User information not found. Please login again."
        );
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      console.log("Logged-in patient:", parsedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error("Error reading user:", error);

      setError(
        "Unable to read user information."
      );

      setLoading(false);
    }
  }, []);

  // =====================================================
  // FETCH PRESCRIPTIONS
  // =====================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    const patientId = user.patientId;

    if (!patientId) {
      setError("Patient ID is missing.");
      setLoading(false);
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/api/prescriptions/patient/${patientId}`
        );

        if (!response.ok) {
          throw new Error(
            `API failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Patient prescriptions:",
          data
        );

        setPrescriptions(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Error fetching prescriptions:",
          error
        );

        setError(
          "Failed to load prescriptions."
        );

        setPrescriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [user]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const formattedDate = new Date(
      `${date}T00:00:00`
    );

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="prescriptions-page">
        <div className="prescriptions-container">

          <div className="prescriptions-header">
            <div>
              <h1>My Prescriptions</h1>

              <p>
                View medicines prescribed by your
                doctors.
              </p>
            </div>
          </div>

          <div className="prescriptions-loading">
            <div className="prescription-spinner"></div>

            <p>
              Loading prescriptions...
            </p>
          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="prescriptions-page">
        <div className="prescriptions-container">

          <div className="prescriptions-header">
            <div>
              <h1>My Prescriptions</h1>

              <p>
                View medicines prescribed by your
                doctors.
              </p>
            </div>
          </div>

          <div className="prescription-error">

            <div
              className="prescription-error-icon"
              aria-hidden="true"
            >
              <AlertCircle
                size={21}
                strokeWidth={2}
              />
            </div>

            <div>
              <strong>
                Unable to load prescriptions
              </strong>

              <p>{error}</p>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <div className="prescriptions-page">

      <div className="prescriptions-container">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="prescriptions-header">

          <div className="prescriptions-heading">

            <div
              className="prescriptions-heading-icon"
              aria-hidden="true"
            >
              <ClipboardList
                size={27}
                strokeWidth={2}
              />
            </div>

            <div>
              <h1>
                My Prescriptions
              </h1>

              <p>
                View medicines prescribed by your
                doctors.
              </p>
            </div>

          </div>

        </div>

        {/* =================================================
            NO PRESCRIPTIONS
        ================================================= */}

        {prescriptions.length === 0 && (
          <div className="empty-box">

            <div
              className="empty-icon"
              aria-hidden="true"
            >
              <Pill
                size={34}
                strokeWidth={2}
              />
            </div>

            <h2>
              No Prescriptions Found
            </h2>

            <p>
              You do not have any prescriptions yet.
            </p>

          </div>
        )}

        {/* =================================================
            PRESCRIPTION LIST
        ================================================= */}

        <div className="prescription-list">

          {prescriptions.map((prescription) => (

            <div
              className="prescription-card"
              key={prescription.prescriptionId}
            >

              {/* =========================================
                  CARD HEADER
              ========================================= */}

              <div className="prescription-card-header">

                <div className="prescription-title">

                  <div
                    className="medicine-icon"
                    aria-hidden="true"
                  >
                    <Pill
                      size={23}
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <h2>
                      Prescription #
                      {prescription.prescriptionId}
                    </h2>

                    <p>
                      <CalendarDays
                        size={13}
                        strokeWidth={2}
                      />

                      {formatDate(
                        prescription.prescriptionDate
                      )}
                    </p>
                  </div>

                </div>

                <span className="active-badge">

                  <Activity
                    size={14}
                    strokeWidth={2.3}
                  />

                  Active

                </span>

              </div>

         {/* =========================================
                  DOCTOR
          ========================================= */}

           <div className="prescription-info-row">

            {/* DISEASE / DIAGNOSIS */}

            <div className="prescription-info-box">

              <div className="prescription-info-icon">
                <Activity
                  size={20}
                  strokeWidth={2}
                />
              </div>

              <div>
                <span>
                  Disease / Diagnosis
                </span>

                <strong>
                  {prescription.diagnosis ||
                    prescription.disease ||
                    "Not specified"}
                </strong>
              </div>

            </div>


            {/* DOCTOR */}

            <div className="prescription-info-box">

              <div className="prescription-info-icon">
                <UserRound
                  size={20}
                  strokeWidth={2}
                />
              </div>

              <div>
                <span>
                  Prescribed By
                </span>

                <strong>
                  {prescription.doctorName ||
                    `Doctor #${prescription.doctorId}`}
                </strong>
              </div>

            </div>

          </div>
              {/* =========================================
                  MEDICINES
              ========================================= */}

              <div className="medicine-section">

                <div className="section-heading">

                  <Pill
                    size={17}
                    strokeWidth={2}
                  />

                  <h3>
                    Medicines
                  </h3>

                </div>

                <div className="medicine-details">

                  {/* MEDICINE */}

                  <div className="medicine-detail">

                    <span>
                      Medicine
                    </span>

                    <strong>
                      {prescription.medicineName ||
                        "Not specified"}
                    </strong>

                  </div>

                  {/* DOSAGE */}

                  <div className="medicine-detail">

                    <span>
                      Dosage
                    </span>

                    <strong>
                      {prescription.dosage ||
                        "Not specified"}
                    </strong>

                  </div>

                  {/* FREQUENCY */}

                  <div className="medicine-detail">

                    <span>
                      Frequency
                    </span>

                    <strong>
                      {prescription.frequency ||
                        "Not specified"}
                    </strong>

                  </div>

                  {/* DURATION */}

                  <div className="medicine-detail">

                    <span>
                      Duration
                    </span>

                    <strong>
                      {prescription.duration ||
                        "Not specified"}
                    </strong>

                  </div>

                </div>

              </div>

              {/* =========================================
                  INSTRUCTIONS
              ========================================= */}

              <div className="instructions-section">

                <div className="instructions-heading">

                  <FileText
                    size={17}
                    strokeWidth={2}
                  />

                  <h3>
                    Instructions
                  </h3>

                </div>

                <p>
                  {prescription.instructions ||
                    "No instructions provided."}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Prescriptions;