import { useEffect, useState } from "react";

function Bills() {
  const [bills, setBills] = useState([]);
  const [patientId, setPatientId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =========================================================
  // PAYMENT STATE
  // =========================================================

  const [payingBillId, setPayingBillId] = useState(null);

  const [error, setError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  // =========================================================
  // GET PATIENT ID
  // =========================================================

  const getPatientId = () => {
    // -----------------------------------------
    // 1. Direct patientId
    // -----------------------------------------

    const directPatientIdKeys = [
      "patientId",
      "patientID",
      "patient_id",
    ];

    for (const key of directPatientIdKeys) {
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

    // -----------------------------------------
    // 2. Check stored patient object
    // -----------------------------------------

    const patientObjectKeys = [
      "patient",
      "patientData",
      "patientInfo",
      "loggedInPatient",
    ];

    for (const key of patientObjectKeys) {
      try {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) {
          continue;
        }

        const parsed = JSON.parse(storedValue);

        const possiblePatientId =
          parsed?.patientId ??
          parsed?.patientID ??
          parsed?.patient_id ??
          parsed?.id;

        if (
          possiblePatientId !== undefined &&
          possiblePatientId !== null &&
          !isNaN(Number(possiblePatientId)) &&
          Number(possiblePatientId) > 0
        ) {
          return Number(possiblePatientId);
        }
      } catch (error) {
        console.warn(
          `Unable to parse localStorage key: ${key}`,
          error
        );
      }
    }

    // -----------------------------------------
    // 3. Check stored user object
    // -----------------------------------------

    const userObjectKeys = [
      "user",
      "userData",
      "currentUser",
      "loggedInUser",
    ];

    for (const key of userObjectKeys) {
      try {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) {
          continue;
        }

        const parsed = JSON.parse(storedValue);

        const possiblePatientId =
          parsed?.patientId ??
          parsed?.patientID ??
          parsed?.patient_id ??
          parsed?.patient?.patientId ??
          parsed?.patient?.id;

        if (
          possiblePatientId !== undefined &&
          possiblePatientId !== null &&
          !isNaN(Number(possiblePatientId)) &&
          Number(possiblePatientId) > 0
        ) {
          return Number(possiblePatientId);
        }
      } catch (error) {
        console.warn(
          `Unable to parse localStorage key: ${key}`,
          error
        );
      }
    }

    return null;
  };

  // =========================================================
  // FETCH PATIENT BILLS
  // =========================================================

  const fetchPatientBills = async () => {
    try {
      setError("");

      const currentPatientId = getPatientId();

      console.log(
        "Patient ID used for Bills:",
        currentPatientId
      );

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

      console.log(
        "Patient bills response:",
        data
      );

      if (Array.isArray(data)) {
        setBills(data);
      } else {
        setBills([]);
      }
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
      setRefreshing(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchPatientBills();
  }, []);

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = async () => {
    setRefreshing(true);
    setPaymentMessage("");
    await fetchPatientBills();
  };

  // =========================================================
  // PAY BILL
  // =========================================================

  const handlePayBill = async (billId, amount) => {
    if (!billId) {
      setError("Invalid bill ID.");
      return;
    }

    const confirmed = window.confirm(
      `Pay ${formatAmount(amount)} for Bill #${billId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setPaymentMessage("");
      setPayingBillId(billId);

      console.log(
        "Processing payment for Bill ID:",
        billId
      );

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
          backendMessage = await response.text();
        } catch {
          backendMessage = "";
        }

        throw new Error(
          backendMessage ||
            `Payment failed (${response.status})`
        );
      }

      const updatedBill = await response.json();

      console.log(
        "Payment successful:",
        updatedBill
      );

      // -----------------------------------------
      // Update UI immediately
      // -----------------------------------------

      setBills((previousBills) =>
        previousBills.map((bill) => {
          const currentBillId =
            bill?.billId ?? bill?.id;

          if (
            Number(currentBillId) ===
            Number(billId)
          ) {
            return {
              ...bill,
              status:
                updatedBill?.status || "Paid",
            };
          }

          return bill;
        })
      );

      setPaymentMessage(
        `Payment successful for Bill #${billId}.`
      );

      // -----------------------------------------
      // Fetch latest database data
      // -----------------------------------------

      setTimeout(() => {
        fetchPatientBills();
      }, 500);
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
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
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

  // =========================================================
  // STATUS TEXT
  // =========================================================

  const getStatusText = (status) => {
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
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
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

  const formatAmount = (amount) => {
    const value = Number(amount);

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
  // TOTAL AMOUNT
  // =========================================================

  const totalAmount = bills.reduce(
    (total, bill) => {
      return (
        total +
        (Number(bill?.amount) || 0)
      );
    },
    0
  );

  // =========================================================
  // PENDING AMOUNT
  // =========================================================

  const pendingAmount = bills
    .filter(
      (bill) =>
        String(
          bill?.status || ""
        ).toLowerCase() === "pending"
    )
    .reduce(
      (total, bill) => {
        return (
          total +
          (Number(bill?.amount) || 0)
        );
      },
      0
    );

  // =========================================================
  // PAID AMOUNT
  // =========================================================

  const paidAmount = bills
    .filter(
      (bill) =>
        String(
          bill?.status || ""
        ).toLowerCase() === "paid"
    )
    .reduce(
      (total, bill) => {
        return (
          total +
          (Number(bill?.amount) || 0)
        );
      },
      0
    );

  // =========================================================
  // CANCELLED AMOUNT
  // =========================================================

  const cancelledAmount = bills
    .filter(
      (bill) =>
        String(
          bill?.status || ""
        ).toLowerCase() === "cancelled"
    )
    .reduce(
      (total, bill) => {
        return (
          total +
          (Number(bill?.amount) || 0)
        );
      },
      0
    );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 0 30px",
        color: "#18324b",
      }}
    >

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px 28px",
          marginBottom: "22px",
          boxShadow:
            "0 8px 30px rgba(15, 23, 42, 0.07)",
          border:
            "1px solid #e6edf5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "700",
              color: "#18324b",
            }}
          >
            💰 My Bills
          </h1>

          <p
            style={{
              margin:
                "7px 0 0",
              color: "#718096",
              fontSize: "15px",
            }}
          >
            View your hospital billing
            records and payment status.
          </p>

          {patientId && (
            <div
              style={{
                marginTop: "8px",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Patient ID:{" "}
              <strong>
                #{patientId}
              </strong>
            </div>
          )}

        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          style={{
            border:
              "1px solid #dbe5f0",
            borderRadius: "10px",
            padding: "11px 18px",
            background:
              refreshing
                ? "#f1f5f9"
                : "#ffffff",
            color: "#18324b",
            fontWeight: "600",
            fontSize: "14px",
            cursor:
              refreshing
                ? "not-allowed"
                : "pointer",
          }}
        >
          {refreshing
            ? "⏳ Refreshing..."
            : "🔄 Refresh"}
        </button>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          style={{
            background: "#fff7ed",
            border:
              "1px solid #fed7aa",
            color: "#c2410c",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "22px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* =====================================================
          PAYMENT SUCCESS
      ===================================================== */}

      {paymentMessage && (
        <div
          style={{
            background: "#ecfdf5",
            border:
              "1px solid #bbf7d0",
            color: "#15803d",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "22px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          ✅ {paymentMessage}
        </div>
      )}

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "16px",
          marginBottom: "22px",
        }}
      >

        {/* TOTAL BILLS */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "20px",
            border:
              "1px solid #e6edf5",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
            }}
          >
            📄
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Total Bills
            </div>

            <strong
              style={{
                fontSize: "24px",
                color: "#18324b",
              }}
            >
              {bills.length}
            </strong>
          </div>

        </div>

        {/* TOTAL AMOUNT */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "20px",
            border:
              "1px solid #e6edf5",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#ecfdf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
            }}
          >
            💵
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Total Amount
            </div>

            <strong
              style={{
                fontSize: "21px",
                color: "#15803d",
              }}
            >
              {formatAmount(
                totalAmount
              )}
            </strong>
          </div>

        </div>

        {/* PENDING */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "20px",
            border:
              "1px solid #e6edf5",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
            }}
          >
            ⏳
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Pending Amount
            </div>

            <strong
              style={{
                fontSize: "21px",
                color: "#ea580c",
              }}
            >
              {formatAmount(
                pendingAmount
              )}
            </strong>
          </div>

        </div>

        {/* PAID */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "15px",
            padding: "20px",
            border:
              "1px solid #e6edf5",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#f5f3ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
            }}
          >
            ✅
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Paid Amount
            </div>

            <strong
              style={{
                fontSize: "21px",
                color: "#7c3aed",
              }}
            >
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

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          border:
            "1px solid #e6edf5",
          boxShadow:
            "0 8px 30px rgba(15, 23, 42, 0.06)",
          overflow: "hidden",
        }}
      >

        {/* CARD HEADER */}

        <div
          style={{
            padding: "22px 25px",
            borderBottom:
              "1px solid #e8eef5",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#18324b",
              }}
            >
              Billing History
            </h2>

            <p
              style={{
                margin:
                  "6px 0 0",
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Bills generated by the
              hospital administration.
            </p>

          </div>

          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              padding: "7px 13px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
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
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "#64748b",
            }}
          >

            <div
              style={{
                width: "42px",
                height: "42px",
                border:
                  "4px solid #e2e8f0",
                borderTop:
                  "4px solid #2563eb",
                borderRadius: "50%",
                margin:
                  "0 auto 15px",
                animation:
                  "patientBillsSpin 1s linear infinite",
              }}
            ></div>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
              }}
            >
              Loading your bills...
            </p>

          </div>
        ) : bills.length === 0 ? (

          /* =================================================
             NO BILLS
          ================================================= */

          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >

            <div
              style={{
                width: "70px",
                height: "70px",
                margin:
                  "0 auto 18px",
                borderRadius: "50%",
                background: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              🧾
            </div>

            <h3
              style={{
                margin:
                  "0 0 8px",
                color: "#18324b",
                fontSize: "21px",
              }}
            >
              No Bills Found
            </h3>

            <p
              style={{
                margin:
                  "0 0 18px",
                color: "#718096",
                fontSize: "14px",
              }}
            >
              You currently have no
              billing records.
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              style={{
                border: "none",
                borderRadius: "9px",
                padding:
                  "10px 18px",
                background:
                  "#2563eb",
                color: "#ffffff",
                fontWeight: "600",
                cursor:
                  refreshing
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  refreshing
                    ? 0.7
                    : 1,
              }}
            >
              {refreshing
                ? "⏳ Checking..."
                : "🔄 Check Again"}
            </button>

          </div>

        ) : (

          /* =================================================
             BILLS TABLE
          ================================================= */

          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "1020px",
              }}
            >

              <thead>

                <tr
                  style={{
                    background:
                      "#f8fafc",
                  }}
                >

                  <th style={tableHeaderStyle}>
                    Bill ID
                  </th>

                  <th style={tableHeaderStyle}>
                    Bill Type
                  </th>

                  <th style={tableHeaderStyle}>
                    Doctor ID
                  </th>

                  <th style={tableHeaderStyle}>
                    Amount
                  </th>

                  <th style={tableHeaderStyle}>
                    Description
                  </th>

                  <th style={tableHeaderStyle}>
                    Bill Date
                  </th>

                  <th style={tableHeaderStyle}>
                    Status
                  </th>

                  <th style={tableHeaderStyle}>
                    Payment
                  </th>

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
                      Number(billId);

                    return (
                      <tr
                        key={billId}
                        style={{
                          borderBottom:
                            "1px solid #edf2f7",
                        }}
                      >

                        {/* BILL ID */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >
                          <span
                            style={{
                              fontWeight:
                                "700",
                              color:
                                "#2563eb",
                            }}
                          >
                            #{billId}
                          </span>
                        </td>

                        {/* BILL TYPE */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >

                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "8px",
                              fontWeight:
                                "600",
                            }}
                          >
                            <span>
                              🧾
                            </span>

                            <span>
                              {bill?.billType ||
                                "Hospital Service"}
                            </span>
                          </div>

                        </td>

                        {/* DOCTOR ID */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >

                          {bill?.doctorId ? (
                            <span
                              style={{
                                background:
                                  "#f1f5f9",
                                color:
                                  "#475569",
                                padding:
                                  "5px 9px",
                                borderRadius:
                                  "7px",
                                fontSize:
                                  "13px",
                                fontWeight:
                                  "600",
                              }}
                            >
                              Dr. #
                              {
                                bill.doctorId
                              }
                            </span>
                          ) : (
                            "—"
                          )}

                        </td>

                        {/* AMOUNT */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >

                          <strong
                            style={{
                              color:
                                "#15803d",
                              fontSize:
                                "15px",
                            }}
                          >
                            {formatAmount(
                              bill?.amount
                            )}
                          </strong>

                        </td>

                        {/* DESCRIPTION */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >

                          <span
                            style={{
                              color:
                                "#64748b",
                            }}
                          >
                            {bill?.description ||
                              "No description"}
                          </span>

                        </td>

                        {/* DATE */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >
                          {formatDate(
                            bill?.billDate
                          )}
                        </td>

                        {/* STATUS */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >

                          <span
                            style={{
                              display:
                                "inline-flex",
                              alignItems:
                                "center",
                              padding:
                                "6px 11px",
                              borderRadius:
                                "20px",
                              fontSize:
                                "12px",
                              fontWeight:
                                "700",

                              background:
                                statusClass ===
                                "paid"
                                  ? "#dcfce7"
                                  : statusClass ===
                                    "cancelled"
                                  ? "#fee2e2"
                                  : "#fef3c7",

                              color:
                                statusClass ===
                                "paid"
                                  ? "#15803d"
                                  : statusClass ===
                                    "cancelled"
                                  ? "#dc2626"
                                  : "#b45309",
                            }}
                          >

                            {statusClass ===
                            "paid"
                              ? "✓"
                              : statusClass ===
                                "cancelled"
                              ? "✕"
                              : "⏳"}

                            &nbsp;

                            {getStatusText(
                              bill?.status
                            )}

                          </span>

                        </td>

                        {/* PAYMENT */}

                        <td
                          style={
                            tableCellStyle
                          }
                        >

                          {isPending && (
                            <button
                              type="button"
                              onClick={() =>
                                handlePayBill(
                                  billId,
                                  bill?.amount
                                )
                              }
                              disabled={
                                payingBillId !==
                                  null
                              }
                              style={{
                                border:
                                  "none",
                                borderRadius:
                                  "9px",
                                padding:
                                  "9px 15px",
                                background:
                                  isPaying
                                    ? "#94a3b8"
                                    : "#16a34a",
                                color:
                                  "#ffffff",
                                fontWeight:
                                  "700",
                                fontSize:
                                  "13px",
                                cursor:
                                  payingBillId !==
                                  null
                                    ? "not-allowed"
                                    : "pointer",
                                whiteSpace:
                                  "nowrap",
                                boxShadow:
                                  "0 4px 12px rgba(22, 163, 74, 0.20)",
                              }}
                            >
                              {isPaying
                                ? "⏳ Paying..."
                                : "💳 Pay Now"}
                            </button>
                          )}

                          {isPaid && (
                            <span
                              style={{
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                gap: "5px",
                                padding:
                                  "8px 13px",
                                borderRadius:
                                  "9px",
                                background:
                                  "#ecfdf5",
                                color:
                                  "#15803d",
                                fontWeight:
                                  "700",
                                fontSize:
                                  "13px",
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              ✓ Paid
                            </span>
                          )}

                          {isCancelled && (
                            <span
                              style={{
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                gap: "5px",
                                padding:
                                  "8px 13px",
                                borderRadius:
                                  "9px",
                                background:
                                  "#fef2f2",
                                color:
                                  "#dc2626",
                                fontWeight:
                                  "700",
                                fontSize:
                                  "13px",
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              ✕ Not Available
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
          BILLING INFORMATION
      ===================================================== */}

      <div
        style={{
          marginTop: "20px",
          background: "#eff6ff",
          border:
            "1px solid #bfdbfe",
          borderRadius: "15px",
          padding: "18px 20px",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}
      >

        <div
          style={{
            width: "38px",
            height: "38px",
            flexShrink: 0,
            borderRadius: "10px",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          ℹ️
        </div>

        <div>

          <strong
            style={{
              display:
                "block",
              color: "#1e40af",
              marginBottom:
                "5px",
            }}
          >
            Billing Information
          </strong>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your bills are generated
            and managed by the hospital
            administration. Pending bills
            can be paid using the Pay Now
            button. If you have any
            questions about a bill,
            please contact the hospital
            administration.
          </p>

        </div>

      </div>

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes patientBillsSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  );
}

// =========================================================
// TABLE STYLES
// =========================================================

const tableHeaderStyle = {
  padding: "14px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: "700",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  padding: "16px",
  fontSize: "14px",
  color: "#334155",
  verticalAlign: "middle",
};

export default Bills;