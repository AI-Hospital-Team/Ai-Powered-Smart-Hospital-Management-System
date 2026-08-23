import { useEffect, useState } from "react";
import "./Bills.css";

const API_BASE_URL = "http://localhost:8080/api";

function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [payingBillId, setPayingBillId] = useState(null);

  // ==========================================
  // LOAD PATIENT + BILLS
  // ==========================================

  const loadBills = async () => {
    try {
      setLoading(true);
      setError("");

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Patient information not found.");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);

      if (!parsedUser.patientId) {
        setError("Patient ID is missing.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/bills/patient/${parsedUser.patientId}`
      );

      if (!response.ok) {
        throw new Error(
          `Bills API failed: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Patient bills:", data);

      setBills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading bills:", err);

      setError("Failed to load bills.");
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  // ==========================================
  // PAY BILL
  // ==========================================

  const handlePayBill = async (billId) => {
    try {
      setPayingBillId(billId);

      const response = await fetch(
        `${API_BASE_URL}/bills/${billId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Paid",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Payment API failed: ${response.status}`
        );
      }

      const updatedBill = await response.json();

      setBills((previousBills) =>
        previousBills.map((bill) =>
          bill.billId === billId
            ? updatedBill
            : bill
        )
      );

      alert("Bill paid successfully.");
    } catch (err) {
      console.error("Error paying bill:", err);

      alert("Failed to update bill status.");
    } finally {
      setPayingBillId(null);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bills-page">
        <div className="bills-container">

          <div className="bills-loading">
            <div className="loading-icon">
              💰
            </div>

            <h2>Loading Bills...</h2>

            <p>
              Please wait while we fetch your bills.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="bills-page">
        <div className="bills-container">

          <div className="bills-error">

            <div className="error-icon">
              ⚠️
            </div>

            <h2>Unable to Load Bills</h2>

            <p>{error}</p>

            <button
              className="dashboard-button"
              onClick={loadBills}
            >
              🔄 Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const totalAmount = bills.reduce(
    (total, bill) =>
      total + Number(bill.amount || 0),
    0
  );

  const pendingAmount = bills
    .filter(
      (bill) =>
        String(bill.status).toLowerCase() ===
        "pending"
    )
    .reduce(
      (total, bill) =>
        total + Number(bill.amount || 0),
      0
    );

  const paidAmount = bills
    .filter(
      (bill) =>
        String(bill.status).toLowerCase() ===
        "paid"
    )
    .reduce(
      (total, bill) =>
        total + Number(bill.amount || 0),
      0
    );

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="bills-page">

      <div className="bills-container">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="bills-page-header">

          <div className="bills-title-area">

            <div className="bills-title-icon">
              💰
            </div>

            <div>

              <h1>My Bills</h1>

              <p>
                View and manage your hospital bills
                securely.
              </p>

              {user?.patientId && (
                <span className="patient-id-badge">
                  Patient ID: {user.patientId}
                </span>
              )}

            </div>

          </div>

          {/* ONLY REFRESH BUTTON
              DASHBOARD BUTTON REMOVED */}

          <div className="bills-header-actions">

            <button
              className="refresh-bills-button"
              onClick={loadBills}
            >
              🔄 Refresh
            </button>

          </div>

        </div>

        {/* =====================================
            SUMMARY CARDS
        ====================================== */}

        <div className="bill-summary">

          <div className="summary-card total-card">

            <div className="summary-card-icon">
              📄
            </div>

            <div className="summary-card-content">

              <span>Total Bills</span>

              <strong>
                {bills.length}
              </strong>

              <small>
                Hospital bills
              </small>

            </div>

          </div>

          <div className="summary-card amount-card">

            <div className="summary-card-icon">
              💵
            </div>

            <div className="summary-card-content">

              <span>Total Amount</span>

              <strong>
                ₹{totalAmount.toFixed(2)}
              </strong>

              <small>
                Overall amount
              </small>

            </div>

          </div>

          <div className="summary-card pending-card">

            <div className="summary-card-icon">
              🟡
            </div>

            <div className="summary-card-content">

              <span>Pending</span>

              <strong>
                ₹{pendingAmount.toFixed(2)}
              </strong>

              <small>
                Amount due
              </small>

            </div>

          </div>

          <div className="summary-card paid-card">

            <div className="summary-card-icon">
              🟢
            </div>

            <div className="summary-card-content">

              <span>Paid</span>

              <strong>
                ₹{paidAmount.toFixed(2)}
              </strong>

              <small>
                Successfully paid
              </small>

            </div>

          </div>

        </div>

        {/* =====================================
            BILLS SECTION
        ====================================== */}

        <div className="bills-section">

          <div className="section-heading">

            <div>

              <h2>Hospital Bills</h2>

              <p>
                Your billing history and payment
                information.
              </p>

            </div>

            <span className="bill-count">
              {bills.length} Bill
              {bills.length !== 1 ? "s" : ""}
            </span>

          </div>

          {/* ===================================
              NO BILLS
          ==================================== */}

          {bills.length === 0 ? (

            <div className="empty-bills">

              <div className="empty-bills-icon">
                💰
              </div>

              <h3>No Bills Found</h3>

              <p>
                You currently have no hospital
                bills.
              </p>

            </div>

          ) : (

            <div className="bills-list">

              {bills.map((bill) => {

                const status =
                  String(
                    bill.status || "Pending"
                  ).toLowerCase();

                const isPaid =
                  status === "paid";

                const isCancelled =
                  status === "cancelled";

                const isPaying =
                  payingBillId === bill.billId;

                return (

                  <div
                    className={`bill-card ${
                      isPaid
                        ? "bill-paid"
                        : isCancelled
                        ? "bill-cancelled"
                        : "bill-pending"
                    }`}
                    key={bill.billId}
                  >

                    {/* CARD HEADER */}

                    <div className="bill-card-top">

                      <div className="bill-number-area">

                        <div className="bill-icon-box">
                          💰
                        </div>

                        <div>

                          <span>
                            Hospital Bill
                          </span>

                          <h3>
                            Bill #{bill.billId}
                          </h3>

                        </div>

                      </div>

                      <div
                        className={`bill-status ${
                          isPaid
                            ? "status-paid"
                            : isCancelled
                            ? "status-cancelled"
                            : "status-pending"
                        }`}
                      >

                        <span>
                          {isPaid
                            ? "✓"
                            : isCancelled
                            ? "×"
                            : "●"}
                        </span>

                        {isPaid
                          ? "Paid"
                          : isCancelled
                          ? "Cancelled"
                          : "Pending"}

                      </div>

                    </div>

                    {/* DATE */}

                    <div className="bill-date-row">

                      <span>
                        📅 Bill Date
                      </span>

                      <strong>
                        {bill.billDate || "-"}
                      </strong>

                    </div>

                    {/* DETAILS */}

                    <div className="bill-details-grid">

                      <div className="bill-info-box">

                        <span className="info-label">
                          👨‍⚕️ Doctor
                        </span>

                        <strong>
                          Doctor #
                          {bill.doctorId || "-"}
                        </strong>

                      </div>

                      <div className="bill-info-box">

                        <span className="info-label">
                          👤 Patient
                        </span>

                        <strong>
                          Patient #
                          {bill.patientId}
                        </strong>

                      </div>

                      <div className="bill-info-box">

                        <span className="info-label">
                          🏥 Bill Type
                        </span>

                        <strong>
                          {bill.billType ||
                            "Hospital Service"}
                        </strong>

                      </div>

                      <div className="bill-info-box">

                        <span className="info-label">
                          💵 Amount
                        </span>

                        <strong>
                          ₹
                          {Number(
                            bill.amount || 0
                          ).toFixed(2)}
                        </strong>

                      </div>

                      <div className="bill-info-box description-box">

                        <span className="info-label">
                          📝 Description
                        </span>

                        <strong>
                          {bill.description ||
                            "Hospital Service"}
                        </strong>

                      </div>

                      <div className="bill-info-box">

                        <span className="info-label">
                          👤 Patient Name
                        </span>

                        <strong>
                          {bill.patientName ||
                            "Patient"}
                        </strong>

                      </div>

                    </div>

                    {/* PAYMENT FOOTER */}

                    <div className="bill-card-footer">

                      {!isPaid &&
                      !isCancelled ? (

                        <>
                          <div className="payment-note">

                            <span>
                              🔒
                            </span>

                            <p>
                              Secure payment
                              available
                            </p>

                          </div>

                          <button
                            className="pay-button"
                            disabled={isPaying}
                            onClick={() =>
                              handlePayBill(
                                bill.billId
                              )
                            }
                          >
                            {isPaying
                              ? "⏳ Processing..."
                              : `💳 Pay ₹${Number(
                                  bill.amount || 0
                                ).toFixed(2)}`}
                          </button>
                        </>

                      ) : isPaid ? (

                        <div className="paid-footer">

                          <div className="paid-check">
                            ✓
                          </div>

                          <div>

                            <strong>
                              Payment Completed
                            </strong>

                            <span>
                              This bill has been
                              successfully paid.
                            </span>

                          </div>

                        </div>

                      ) : (

                        <div className="paid-footer">

                          <div className="paid-check">
                            ×
                          </div>

                          <div>

                            <strong>
                              Bill Cancelled
                            </strong>

                            <span>
                              This bill is no longer
                              payable.
                            </span>

                          </div>

                        </div>

                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Bills;