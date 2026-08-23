import { useState } from "react";

import AdminTable from "../AdminTable";

import {
  fetchBills,
  updateBillStatus,
  createBill,
} from "../adminApi";

function Bills() {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    billType: "",
    amount: "",
    description: "",
    status: "Pending",
    billDate: "",
  });

  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // CREATE BILL
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormMessage("");
    setFormError("");

    // Patient ID
    if (!formData.patientId) {
      setFormError("Patient ID is required.");
      return;
    }

    // Patient Name
    if (!formData.patientName.trim()) {
      setFormError("Patient name is required.");
      return;
    }

    // Bill Type
    if (!formData.billType.trim()) {
      setFormError("Bill type is required.");
      return;
    }

    // Amount
    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      setFormError("Enter a valid bill amount.");
      return;
    }

    try {
      setSaving(true);

      const billData = {
        patientId: Number(formData.patientId),

        patientName:
          formData.patientName.trim(),

        doctorId:
          formData.doctorId
            ? Number(formData.doctorId)
            : null,

        billType:
          formData.billType.trim(),

        amount:
          Number(formData.amount),

        description:
          formData.description.trim(),

        status:
          formData.status,

        billDate:
          formData.billDate || null,
      };

      console.log("Creating bill:", billData);

      await createBill(billData);

      // SUCCESS
      setFormMessage(
        "Bill created successfully."
      );

      // RESET
      setFormData({
        patientId: "",
        patientName: "",
        doctorId: "",
        billType: "",
        amount: "",
        description: "",
        status: "Pending",
        billDate: "",
      });

      // Refresh AdminTable
      setRefreshKey(
        (previous) => previous + 1
      );

    } catch (error) {
      console.error(
        "Create bill error:",
        error
      );

      setFormError(
        "Failed to create bill. Make sure Spring Boot backend is running."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setFormData({
      patientId: "",
      patientName: "",
      doctorId: "",
      billType: "",
      amount: "",
      description: "",
      status: "Pending",
      billDate: "",
    });

    setFormMessage("");
    setFormError("");
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="admin-module">

      {/* ======================================
          CREATE NEW BILL
      ====================================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "28px",
          marginBottom: "25px",
          boxShadow:
            "0 8px 30px rgba(0, 0, 0, 0.08)",
          border:
            "1px solid #e8eef5",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            marginBottom: "22px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              color: "#172033",
            }}
          >
            ➕ Create New Bill
          </h2>

          <p
            style={{
              margin: "7px 0 0",
              color: "#718096",
              fontSize: "14px",
            }}
          >
            Create and save a new hospital
            bill for a patient.
          </p>
        </div>

        {/* SUCCESS */}

        {formMessage && (
          <div
            style={{
              padding: "12px 15px",
              marginBottom: "18px",
              borderRadius: "10px",
              background: "#ecfdf3",
              color: "#15803d",
              border: "1px solid #bbf7d0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ✅ {formMessage}
          </div>
        )}

        {/* ERROR */}

        {formError && (
          <div
            style={{
              padding: "12px 15px",
              marginBottom: "18px",
              borderRadius: "10px",
              background: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ⚠️ {formError}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >

            {/* PATIENT ID */}

            <div>
              <label style={labelStyle}>
                Patient ID *
              </label>

              <input
                type="number"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="Enter patient ID"
                min="1"
                required
                style={inputStyle}
              />
            </div>

            {/* PATIENT NAME */}

            <div>
              <label style={labelStyle}>
                Patient Name *
              </label>

              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
                style={inputStyle}
              />
            </div>

            {/* DOCTOR ID */}

            <div>
              <label style={labelStyle}>
                Doctor ID
              </label>

              <input
                type="number"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                placeholder="Enter doctor ID"
                min="1"
                style={inputStyle}
              />
            </div>

            {/* BILL TYPE */}

            <div>
              <label style={labelStyle}>
                Bill Type *
              </label>

              <select
                name="billType"
                value={formData.billType}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">
                  Select bill type
                </option>

                <option value="Consultation">
                  Consultation
                </option>

                <option value="Medicine">
                  Medicine
                </option>

                <option value="Laboratory">
                  Laboratory
                </option>

                <option value="Room Charges">
                  Room Charges
                </option>

                <option value="Surgery">
                  Surgery
                </option>

                <option value="Hospital Service">
                  Hospital Service
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* AMOUNT */}

            <div>
              <label style={labelStyle}>
                Amount (₹) *
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="1"
                step="0.01"
                required
                style={inputStyle}
              />
            </div>

            {/* STATUS */}

            <div>
              <label style={labelStyle}>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Paid">
                  Paid
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            {/* BILL DATE */}

            <div>
              <label style={labelStyle}>
                Bill Date
              </label>

              <input
                type="date"
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            style={{
              marginTop: "18px",
            }}
          >
            <label style={labelStyle}>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter billing description..."
              rows="3"
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "90px",
              }}
            />
          </div>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "22px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="submit"
              disabled={saving}
              style={{
                border: "none",
                borderRadius: "10px",
                padding: "12px 22px",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: "600",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "⏳ Saving..."
                : "💾 Save Bill"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              style={{
                border:
                  "1px solid #d1d5db",
                borderRadius: "10px",
                padding: "12px 22px",
                background: "#ffffff",
                color: "#374151",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              ↩ Reset
            </button>

          </div>

        </form>
      </div>

      {/* ======================================
          EXISTING BILLS
      ====================================== */}

      <AdminTable
        key={refreshKey}
        title="Bills"
        subtitle="View and manage all hospital billing records"
        icon="💰"
        fetchData={fetchBills}
        statusType="bill"
        onStatusUpdate={updateBillStatus}
      />

    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 13px",
  border: "1px solid #d7dee8",
  borderRadius: "9px",
  outline: "none",
  fontSize: "14px",
  color: "#1f2937",
  background: "#ffffff",
};

export default Bills;