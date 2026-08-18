import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bills.css";

function Bills() {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
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
        `http://localhost:8080/api/bills/patient/${user.patientId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bills");
      }

      const data = await response.json();

      setBills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Bills fetch error:", err);
      setError("Unable to load bills.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "bill-status-default";

    switch (status.toLowerCase()) {
      case "paid":
        return "bill-status-paid";

      case "pending":
        return "bill-status-pending";

      case "unpaid":
        return "bill-status-unpaid";

      case "cancelled":
        return "bill-status-cancelled";

      default:
        return "bill-status-default";
    }
  };

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) {
      return "₹0.00";
    }

    return `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handlePayment = (billId) => {
    alert(`Payment option for Bill #${billId} will be available soon.`);
  };

  return (
    <div className="bills-page">

      {/* HEADER */}
      <div className="bills-header">

        <div>
          <h1>My Bills</h1>
          <p>View your hospital bills and payment status.</p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/patient/dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="bills-message">
          <div className="bill-loader"></div>
          <p>Loading bills...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="bills-error">
          <p>{error}</p>

          <button onClick={fetchBills}>
            Try Again
          </button>
        </div>
      )}

      {/* NO BILLS */}
      {!loading && !error && bills.length === 0 && (
        <div className="no-bills">

          <div className="no-bills-icon">
            💳
          </div>

          <h2>No Bills Found</h2>

          <p>
            You currently don't have any hospital bills.
          </p>

        </div>
      )}

      {/* BILLS */}
      {!loading && !error && bills.length > 0 && (
        <div className="bills-container">

          {bills.map((bill) => (
            <div
              className="bill-card"
              key={bill.billId || bill.id}
            >

              {/* BILL HEADER */}
              <div className="bill-card-header">

                <div className="bill-title">

                  <div className="bill-icon">
                    🧾
                  </div>

                  <div>
                    <h2>
                      Bill #
                      {bill.billId || bill.id}
                    </h2>

                    <p>
                      {bill.billDate ||
                        bill.date ||
                        "Date not available"}
                    </p>
                  </div>

                </div>

                <span
                  className={`bill-status ${getStatusClass(
                    bill.status
                  )}`}
                >
                  {bill.status || "Pending"}
                </span>

              </div>

              {/* BILL DETAILS */}
              <div className="bill-details">

                <div className="bill-detail">
                  <span>Patient</span>
                  <strong>
                    {bill.patientName || "Patient"}
                  </strong>
                </div>

                <div className="bill-detail">
                  <span>Bill Type</span>
                  <strong>
                    {bill.billType ||
                      bill.type ||
                      "Hospital Service"}
                  </strong>
                </div>

                <div className="bill-detail">
                  <span>Amount</span>
                  <strong className="bill-amount">
                    {formatAmount(
                      bill.amount ||
                        bill.totalAmount ||
                        bill.total
                    )}
                  </strong>
                </div>

              </div>

              {/* DESCRIPTION */}
              {(bill.description || bill.details) && (
                <div className="bill-description">
                  <span>Description</span>
                  <p>
                    {bill.description || bill.details}
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="bill-actions">

                {bill.status?.toLowerCase() !== "paid" && (
                  <button
                    className="pay-btn"
                    onClick={() =>
                      handlePayment(
                        bill.billId || bill.id
                      )
                    }
                  >
                    Pay Now
                  </button>
                )}

                <button
                  className="view-bill-btn"
                  onClick={() =>
                    alert(
                      `Bill #${
                        bill.billId || bill.id
                      }`
                    )
                  }
                >
                  View Details
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Bills;