import { useEffect, useState } from "react";
import "./Bills.css";

function Bills() {
  const [bills, setBills] = useState([]);
  const [patientId, setPatientId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [payingBillId, setPayingBillId] = useState(null);

  const [error, setError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  // =========================================================
  // PAYMENT MODAL
  // =========================================================

  const [paymentModal, setPaymentModal] = useState({
    open: false,
    billId: null,
    amount: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // =========================================================
  // GET PATIENT ID
  // =========================================================

  const getPatientId = () => {
    const directKeys = [
      "patientId",
      "patientID",
      "patient_id",
    ];

    for (const key of directKeys) {
      const value = localStorage.getItem(key);

      if (
        value &&
        value.trim() !== "" &&
        !isNaN(Number(value)) &&
        Number(value) > 0
      ) {
        return Number(value);
      }
    }

    const objectKeys = [
      "patient",
      "patientData",
      "patientInfo",
      "loggedInPatient",
      "user",
      "userData",
      "currentUser",
      "loggedInUser",
    ];

    for (const key of objectKeys) {
      try {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) {
          continue;
        }

        const parsed = JSON.parse(storedValue);

        const id =
          parsed?.patientId ??
          parsed?.patientID ??
          parsed?.patient_id ??
          parsed?.patient?.patientId ??
          parsed?.patient?.id ??
          parsed?.id;

        if (
          id !== undefined &&
          id !== null &&
          !isNaN(Number(id)) &&
          Number(id) > 0
        ) {
          return Number(id);
        }
      } catch (err) {
        console.warn(
          `Unable to parse localStorage key: ${key}`,
          err
        );
      }
    }

    return null;
  };

  // =========================================================
  // FETCH BILLS
  // =========================================================

  const fetchPatientBills = async () => {
    try {
      setError("");

      const currentPatientId = getPatientId();

      if (!currentPatientId) {
        setPatientId(null);
        setBills([]);

        setError(
          "Patient information not found. Please logout and login again."
        );

        return;
      }

      setPatientId(currentPatientId);

      const response = await fetch(
        `http://localhost:8080/api/bills/patient/${currentPatientId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setBills([]);
          return;
        }

        throw new Error(
          `Failed to fetch bills (${response.status})`
        );
      }

      const data = await response.json();

      setBills(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Patient bills error:",
        err
      );

      setBills([]);

      setError(
        "Unable to load bills. Please make sure Spring Boot backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchPatientBills();
  }, []);

  // =========================================================
  // OPEN PAYMENT MODAL
  // =========================================================

  const openPaymentModal = (
    billId,
    amount
  ) => {
    setError("");
    setPaymentMessage("");

    setPaymentMethod("upi");
    setSelectedUpiApp("");
    setUpiId("");
    setSelectedBank("");

    setPaymentModal({
      open: true,
      billId,
      amount,
    });
  };

  // =========================================================
  // CLOSE PAYMENT MODAL
  // =========================================================

  const closePaymentModal = () => {
    if (payingBillId !== null) {
      return;
    }

    setPaymentModal({
      open: false,
      billId: null,
      amount: 0,
    });
  };

  // =========================================================
  // CONFIRM PAYMENT
  // =========================================================

  const confirmPayment = async () => {
    const billId = paymentModal.billId;
    const amount = paymentModal.amount;

    if (!billId) {
      setError("Invalid bill ID.");
      return;
    }

    try {
      setError("");
      setPaymentMessage("");
      setPayingBillId(billId);

      const response = await fetch(
        `http://localhost:8080/api/bills/${billId}/status`,
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
        let backendMessage = "";

        try {
          backendMessage =
            await response.text();
        } catch {
          backendMessage = "";
        }

        throw new Error(
          backendMessage ||
            `Payment failed (${response.status})`
        );
      }

      const updatedBill =
        await response.json();

      setBills((previousBills) =>
        previousBills.map((bill) => {
          const currentBillId =
            bill?.billId ??
            bill?.id;

          if (
            Number(currentBillId) ===
            Number(billId)
          ) {
            return {
              ...bill,
              status:
                updatedBill?.status ||
                "Paid",
            };
          }

          return bill;
        })
      );

      setPaymentModal({
        open: false,
        billId: null,
        amount: 0,
      });

      setPaymentMessage(
        `Payment marked as successful for Bill #${billId}.`
      );

      // Refresh data automatically after payment
      await fetchPatientBills();
    } catch (err) {
      console.error(
        "Payment error:",
        err
      );

      setError(
        err?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setPayingBillId(null);
    }
  };

  // =========================================================
  // STATUS
  // =========================================================

  const getStatusClass = (
    status
  ) => {
    const value = String(
      status || "Pending"
    ).toLowerCase();

    if (value === "paid") {
      return "paid";
    }

    if (value === "cancelled") {
      return "cancelled";
    }

    return "pending";
  };

  const getStatusText = (
    status
  ) => {
    const value = String(
      status || "Pending"
    ).toLowerCase();

    if (value === "paid") {
      return "Paid";
    }

    if (value === "cancelled") {
      return "Cancelled";
    }

    return "Pending";
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    try {
      const parsedDate =
        new Date(date);

      if (
        isNaN(
          parsedDate.getTime()
        )
      ) {
        return String(date);
      }

      return parsedDate.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return String(date);
    }
  };

  // =========================================================
  // FORMAT AMOUNT
  // =========================================================

  const formatAmount = (
    amount
  ) => {
    const value =
      Number(amount);

    if (isNaN(value)) {
      return "₹0.00";
    }

    return value.toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalAmount =
    bills.reduce(
      (total, bill) =>
        total +
        (Number(
          bill?.amount
        ) || 0),
      0
    );

  const pendingAmount =
    bills
      .filter(
        (bill) =>
          String(
            bill?.status || ""
          ).toLowerCase() ===
          "pending"
      )
      .reduce(
        (total, bill) =>
          total +
          (Number(
            bill?.amount
          ) || 0),
        0
      );

  const paidAmount =
    bills
      .filter(
        (bill) =>
          String(
            bill?.status || ""
          ).toLowerCase() ===
          "paid"
      )
      .reduce(
        (total, bill) =>
          total +
          (Number(
            bill?.amount
          ) || 0),
        0
      );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="patient-bills-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="bills-page-header">

        <div className="bills-title-wrap">

          <div className="bills-title-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
              />

              <path d="M8 8h8M8 12h5M8 16h7" />
            </svg>
          </div>

          <div>

            <h1>
              Bills &amp; Payment
            </h1>

            <p>
              Manage your hospital bills
              and payment status.
            </p>

            {patientId && (
              <span className="patient-id-label">
                Patient ID:{" "}
                <strong>
                  #{patientId}
                </strong>
              </span>
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="bill-message bill-error">

          <span>!</span>

          <div>
            {error}
          </div>

        </div>
      )}

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {paymentMessage && (
        <div className="bill-message bill-success">

          <span>✓</span>

          <div>
            {paymentMessage}
          </div>

        </div>
      )}

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="bill-summary-grid">

        <div className="bill-summary-card summary-blue">

          <div className="summary-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
              />

              <path d="M8 8h8M8 12h5M8 16h6" />
            </svg>

          </div>

          <div>
            <span>Total Bills</span>

            <strong>
              {bills.length}
            </strong>
          </div>

        </div>

        <div className="bill-summary-card summary-teal">

          <div className="summary-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M9 9.5c0-1 1.1-1.8 2.8-1.8 1.5 0 2.6.7 2.8 1.8M9 14.5c.2 1.1 1.3 1.8 2.8 1.8 1.7 0 2.8-.8 2.8-1.8M12 6v12" />
            </svg>

          </div>

          <div>
            <span>Total Amount</span>

            <strong>
              {formatAmount(
                totalAmount
              )}
            </strong>
          </div>

        </div>

        <div className="bill-summary-card summary-orange">

          <div className="summary-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M12 7v5l3 2" />
            </svg>

          </div>

          <div>
            <span>Pending Amount</span>

            <strong>
              {formatAmount(
                pendingAmount
              )}
            </strong>
          </div>

        </div>

        <div className="bill-summary-card summary-green">

          <div className="summary-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="m8 12 2.5 2.5L16 9" />
            </svg>

          </div>

          <div>
            <span>Paid Amount</span>

            <strong>
              {formatAmount(
                paidAmount
              )}
            </strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          BILLING HISTORY
      ===================================================== */}

      <div className="bills-card">

        <div className="bills-card-header">

          <div>

            <h2>
              Billing History
            </h2>

            <p>
              Review your hospital
              bills and payment status.
            </p>

          </div>

          <span className="bill-count">
            {bills.length}{" "}
            {bills.length === 1
              ? "Bill"
              : "Bills"}
          </span>

        </div>

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading ? (

          <div className="bill-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading your bills...
            </p>

          </div>

        ) : bills.length === 0 ? (

          /* =================================================
             EMPTY
          ================================================= */

          <div className="no-bills">

            <div className="no-bills-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect
                  x="5"
                  y="3"
                  width="14"
                  height="18"
                  rx="2"
                />

                <path d="M8 8h8M8 12h5M8 16h4" />
              </svg>

            </div>

            <h3>
              No Bills Found
            </h3>

            <p>
              You currently have no
              billing records.
            </p>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="table-wrapper">

            <table className="bills-table">

              <thead>

                <tr>

                  <th>Bill</th>

                  <th>Bill Type</th>

                  <th>Doctor</th>

                  <th>Amount</th>

                  <th>Description</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {bills.map(
                  (bill, index) => {

                    const billId =
                      bill?.billId ??
                      bill?.id ??
                      index + 1;

                    const statusClass =
                      getStatusClass(
                        bill?.status
                      );

                    const normalizedStatus =
                      String(
                        bill?.status ||
                          "Pending"
                      ).toLowerCase();

                    const isPending =
                      normalizedStatus ===
                      "pending";

                    const isPaid =
                      normalizedStatus ===
                      "paid";

                    const isCancelled =
                      normalizedStatus ===
                      "cancelled";

                    const isPaying =
                      Number(
                        payingBillId
                      ) ===
                      Number(
                        billId
                      );

                    return (
                      <tr
                        key={billId}
                      >

                        <td>
                          <span className="bill-number">
                            #{billId}
                          </span>
                        </td>

                        <td>
                          <span className="bill-type">
                            {bill?.billType ||
                              "Hospital Service"}
                          </span>
                        </td>

                        {/* DOCTOR */}

                        <td>

                          <span className="doctor-chip">

                            {bill?.doctorName
                              ? bill.doctorName
                              : bill?.doctorId
                              ? `Dr. ID #${bill.doctorId}`
                              : "—"}

                          </span>

                        </td>

                        {/* AMOUNT */}

                        <td>

                          <strong className="amount">
                            {formatAmount(
                              bill?.amount
                            )}
                          </strong>

                        </td>

                        {/* DESCRIPTION */}

                        <td>

                          <span className="description">
                            {bill?.description ||
                              "No description"}
                          </span>

                        </td>

                        {/* DATE */}

                        <td>
                          {formatDate(
                            bill?.billDate
                          )}
                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`status-badge ${statusClass}`}
                          >

                            <span className="status-dot"></span>

                            {getStatusText(
                              bill?.status
                            )}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td>

                          {isPending && (

                            <div className="payment-cell">

                              <button
                                className={`pay-button ${
                                  isPaying
                                    ? "paying"
                                    : ""
                                }`}
                                type="button"
                                onClick={() =>
                                  openPaymentModal(
                                    billId,
                                    bill?.amount
                                  )
                                }
                                disabled={
                                  payingBillId !==
                                  null
                                }
                              >
                                {isPaying
                                  ? "Processing..."
                                  : "Pay Now"}
                              </button>

                            </div>

                          )}

                          {isPaid && (
                            <span className="completed-label">
                              Completed
                            </span>
                          )}

                          {isCancelled && (
                            <span className="cancelled-label">
                              Not Available
                            </span>
                          )}

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =====================================================
          EDUCATIONAL NOTE
      ===================================================== */}

      <div className="payment-note">

        <div className="payment-note-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
            />

            <path d="M12 10v6M12 7.5v.5" />
          </svg>

        </div>

        <div>

          <strong>
            Educational Demonstration Only
          </strong>

          <p>
            This payment feature is part
            of an academic project and is
            provided for demonstration
            purposes only. No real money
            or financial transactions are
            processed. Payment status is
            simulated within the hospital
            management system.
          </p>

        </div>

      </div>

      {/* =====================================================
          HELP
      ===================================================== */}

      <div className="billing-help">

        <div className="billing-help-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />

            <path d="m9 12 2 2 4-4" />
          </svg>

        </div>

        <div>

          <strong>
            Need help with a bill?
          </strong>

          <p>
            Bills are generated and
            managed by the hospital
            administration. For questions
            about charges or billing
            details, please contact the
            hospital administration.
          </p>

        </div>

      </div>

      {/* =====================================================
          MODERN PAYMENT MODAL
      ===================================================== */}

      {paymentModal.open && (

        <div
          className="payment-modal-overlay"
          onClick={closePaymentModal}
        >

          <div
            className="payment-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* PAYMENT HEADER */}

            <div className="payment-modal-header">

              <div className="payment-brand">

                <div className="payment-brand-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="13"
                      rx="2"
                    />

                    <path d="M3 10h18M7 15h3" />
                  </svg>
                </div>

                <div>
                  <strong>Secure Payment</strong>

                  <span>
                    Hospital Bill Payment
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="payment-close-btn"
                onClick={closePaymentModal}
                disabled={payingBillId !== null}
                aria-label="Close payment"
              >
                ×
              </button>

            </div>


            {/* AMOUNT */}

            <div className="payment-amount-section">

              <span>Amount to Pay</span>

              <strong>
                {formatAmount(
                  paymentModal.amount
                )}
              </strong>

              <small>
                Bill #{paymentModal.billId}
              </small>

            </div>


            {/* PAYMENT METHODS */}

            <div className="payment-method-tabs">

              <button
                type="button"
                className={
                  paymentMethod === "upi"
                    ? "payment-method-tab active"
                    : "payment-method-tab"
                }
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >
                <span className="method-icon">⌁</span>
                UPI
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "card"
                    ? "payment-method-tab active"
                    : "payment-method-tab"
                }
                onClick={() =>
                  setPaymentMethod("card")
                }
              >
                <span className="method-icon">▣</span>
                Card
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "netbanking"
                    ? "payment-method-tab active"
                    : "payment-method-tab"
                }
                onClick={() =>
                  setPaymentMethod("netbanking")
                }
              >
                <span className="method-icon">⌂</span>
                Net Banking
              </button>

            </div>


            {/* =================================================
                UPI
            ================================================= */}

            {paymentMethod === "upi" && (

              <div className="payment-method-content">

                <h3>Pay with UPI</h3>

                <p className="payment-method-description">
                  Choose your preferred UPI app or enter
                  your UPI ID.
                </p>


                {/* UPI APPS */}

                <div className="upi-app-grid">

                  <button
                    type="button"
                    className={
                      selectedUpiApp === "Google Pay"
                        ? "upi-app selected"
                        : "upi-app"
                    }
                    onClick={() =>
                      setSelectedUpiApp("Google Pay")
                    }
                  >
                    <span className="upi-app-logo gpay">
                      G
                    </span>

                    <span>Google Pay</span>
                  </button>


                  <button
                    type="button"
                    className={
                      selectedUpiApp === "PhonePe"
                        ? "upi-app selected"
                        : "upi-app"
                    }
                    onClick={() =>
                      setSelectedUpiApp("PhonePe")
                    }
                  >
                    <span className="upi-app-logo phonepe">
                      P
                    </span>

                    <span>PhonePe</span>
                  </button>


                  <button
                    type="button"
                    className={
                      selectedUpiApp === "Paytm"
                        ? "upi-app selected"
                        : "upi-app"
                    }
                    onClick={() =>
                      setSelectedUpiApp("Paytm")
                    }
                  >
                    <span className="upi-app-logo paytm">
                      ₹
                    </span>

                    <span>Paytm</span>
                  </button>

                </div>


                {/* UPI ID */}

                <div className="upi-divider">
                  <span>OR</span>
                </div>

                <label className="payment-input-label">
                  Enter UPI ID
                </label>

                <div className="upi-input-wrap">

                  <input
                    type="text"
                    value={upiId}
                    onChange={(event) =>
                      setUpiId(event.target.value)
                    }
                    placeholder="example@upi"
                  />

                  <span className="upi-verified">
                    UPI
                  </span>

                </div>

              </div>

            )}


            {/* =================================================
                CARD
            ================================================= */}

            {paymentMethod === "card" && (

              <div className="payment-method-content">

                <h3>Pay with Card</h3>

                <p className="payment-method-description">
                  Enter your card details securely.
                </p>

                <label className="payment-input-label">
                  Card Number
                </label>

                <input
                  className="payment-input"
                  type="text"
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                />

                <div className="card-input-row">

                  <div>
                    <label className="payment-input-label">
                      Expiry
                    </label>

                    <input
                      className="payment-input"
                      type="text"
                      placeholder="MM / YY"
                    />
                  </div>

                  <div>
                    <label className="payment-input-label">
                      CVV
                    </label>

                    <input
                      className="payment-input"
                      type="password"
                      maxLength="3"
                      placeholder="•••"
                    />
                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                NET BANKING
            ================================================= */}

            {paymentMethod === "netbanking" && (

              <div className="payment-method-content">

                <h3>Net Banking</h3>

                <p className="payment-method-description">
                  Select your bank to continue.
                </p>

                <label className="payment-input-label">
                  Select Bank
                </label>

                <select
                  className="payment-input"
                  value={selectedBank}
                  onChange={(event) =>
                    setSelectedBank(
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Select your bank
                  </option>

                  <option value="SBI">
                    State Bank of India
                  </option>

                  <option value="HDFC">
                    HDFC Bank
                  </option>

                  <option value="ICICI">
                    ICICI Bank
                  </option>

                  <option value="Axis">
                    Axis Bank
                  </option>

                  <option value="BOI">
                    Bank of India
                  </option>

                  <option value="BOM">
                    Bank of Maharashtra
                  </option>

                </select>

              </div>

            )}


            {/* DEMO INFORMATION */}

            <div className="payment-demo-warning">

              <div className="warning-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path d="M12 10v6M12 7.5v.5" />
                </svg>

              </div>

              <div>

                <strong>
                  Academic Demo Payment
                </strong>

                <p>
                  This payment interface is for
                  demonstration purposes. No real
                  money or payment gateway is used.
                </p>

              </div>

            </div>



          </div>

        </div>

      )}



    </div>
  );
}

export default Bills;