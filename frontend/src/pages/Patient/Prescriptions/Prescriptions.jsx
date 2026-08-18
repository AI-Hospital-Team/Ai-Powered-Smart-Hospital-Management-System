import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Prescriptions.css";

function Prescriptions() {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const userData = localStorage.getItem("user");

      if (!userData) {
        setError("Patient information not found. Please login again.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);

      if (!user.patientId) {
        setError("Patient ID not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/prescriptions/patient/${user.patientId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prescriptions");
      }

      const data = await response.json();

      setPrescriptions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Prescriptions fetch error:", err);
      setError("Unable to load prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getMedicineName = (medicine) => {
    return (
      medicine.medicineName ||
      medicine.medicationName ||
      medicine.name ||
      medicine.medicine ||
      "Medicine"
    );
  };

  const getDosage = (medicine) => {
    return (
      medicine.dosage ||
      medicine.dose ||
      "Not specified"
    );
  };

  const getFrequency = (medicine) => {
    return (
      medicine.frequency ||
      medicine.timing ||
      medicine.schedule ||
      "Not specified"
    );
  };

  const getDuration = (medicine) => {
    return (
      medicine.duration ||
      medicine.days ||
      "Not specified"
    );
  };

  return (
    <div className="prescriptions-page">

      {/* HEADER */}
      <div className="prescriptions-header">

        <div>
          <h1>My Prescriptions</h1>

          <p>
            View medicines prescribed by your doctors.
          </p>
        </div>

        <button
          className="prescriptions-back-btn"
          onClick={() => navigate("/patient/dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="prescriptions-message">

          <div className="prescription-loader"></div>

          <p>
            Loading prescriptions...
          </p>

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="prescriptions-error">

          <div className="prescription-error-icon">
            ⚠️
          </div>

          <p>{error}</p>

          <button onClick={fetchPrescriptions}>
            Try Again
          </button>

        </div>
      )}

      {/* NO PRESCRIPTIONS */}
      {!loading && !error && prescriptions.length === 0 && (
        <div className="no-prescriptions">

          <div className="no-prescriptions-icon">
            💊
          </div>

          <h2>No Prescriptions Found</h2>

          <p>
            You currently don't have any prescriptions.
          </p>

        </div>
      )}

      {/* PRESCRIPTIONS */}
      {!loading && !error && prescriptions.length > 0 && (
        <div className="prescriptions-container">

          {prescriptions.map((prescription, index) => {

            const prescriptionId =
              prescription.prescriptionId ||
              prescription.id ||
              index + 1;

            const medicines =
              prescription.medicines ||
              prescription.medications ||
              prescription.items ||
              [];

            return (
              <div
                className="prescription-card"
                key={prescriptionId}
              >

                {/* PRESCRIPTION HEADER */}
                <div className="prescription-card-header">

                  <div className="prescription-title">

                    <div className="prescription-icon">
                      💊
                    </div>

                    <div>
                      <h2>
                        Prescription #{prescriptionId}
                      </h2>

                      <p>
                        {formatDate(
                          prescription.prescriptionDate ||
                          prescription.date ||
                          prescription.createdAt
                        )}
                      </p>
                    </div>

                  </div>

                  <span className="prescription-status">
                    {prescription.status || "Active"}
                  </span>

                </div>

                {/* DOCTOR INFORMATION */}
                <div className="prescription-doctor">

                  <div className="doctor-icon">
                    👨‍⚕️
                  </div>

                  <div>
                    <small>Prescribed By</small>

                    <strong>
                      {prescription.doctorName ||
                        prescription.doctor?.name ||
                        "Doctor"}
                    </strong>

                    {(prescription.specialization ||
                      prescription.doctor?.specialization) && (
                      <span>
                        {prescription.specialization ||
                          prescription.doctor?.specialization}
                      </span>
                    )}
                  </div>

                </div>

                {/* MEDICINES */}
                <div className="medicines-section">

                  <h3>
                    Medicines
                  </h3>

                  {medicines.length > 0 ? (
                    <div className="medicine-list">

                      {medicines.map((medicine, medicineIndex) => (
                        <div
                          className="medicine-item"
                          key={
                            medicine.medicineId ||
                            medicine.id ||
                            medicineIndex
                          }
                        >

                          <div className="medicine-number">
                            {medicineIndex + 1}
                          </div>

                          <div className="medicine-info">

                            <h4>
                              {getMedicineName(medicine)}
                            </h4>

                            <div className="medicine-details">

                              <div>
                                <small>Dosage</small>
                                <strong>
                                  {getDosage(medicine)}
                                </strong>
                              </div>

                              <div>
                                <small>Frequency</small>
                                <strong>
                                  {getFrequency(medicine)}
                                </strong>
                              </div>

                              <div>
                                <small>Duration</small>
                                <strong>
                                  {getDuration(medicine)}
                                </strong>
                              </div>

                            </div>

                          </div>

                        </div>
                      ))}

                    </div>
                  ) : (
                    <div className="no-medicines">
                      Medicine details are not available.
                    </div>
                  )}

                </div>

                {/* INSTRUCTIONS */}
                {(prescription.instructions ||
                  prescription.notes) && (
                  <div className="prescription-instructions">

                    <h3>
                      Instructions
                    </h3>

                    <p>
                      {prescription.instructions ||
                        prescription.notes}
                    </p>

                  </div>
                )}

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Prescriptions;