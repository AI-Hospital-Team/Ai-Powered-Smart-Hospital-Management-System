import { useState } from "react";

import AdminTable from "../AdminTable";

import {
  fetchBills,
  updateBillStatus,
  createBill,
  updateBill,
} from "../adminApi";

function Bills() {
  // ==========================================
  // EMPTY FORM
  // ==========================================

  const emptyForm = {
    patientId: "",
    patientName: "",
    doctorId: "",
    billType: "",
    amount: "",
    description: "",
    status: "Pending",
    billDate: "",
  };

  // ==========================================
  // CREATE STATE
  // ==========================================

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [formMessage, setFormMessage] = useState("");

  const [formError, setFormError] = useState("");

  // ==========================================
  // EDIT STATE
  // ==========================================

  const [editingBill, setEditingBill] = useState(null);

  const [editForm, setEditForm] = useState(emptyForm);

  const [editing, setEditing] = useState(false);

  // ==========================================
  // HANDLE CREATE INPUT
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

    if (!formData.patientId) {
      setFormError("Patient ID is required.");
      return;
    }

    if (!formData.patientName.trim()) {
      setFormError("Patient name is required.");
      return;
    }

    if (!formData.billType.trim()) {
      setFormError("Bill type is required.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setFormError("Enter a valid bill amount.");
      return;
    }

    try {
      setSaving(true);

      const billData = {
        patientId: Number(formData.patientId),

        patientName: formData.patientName.trim(),

        doctorId: formData.doctorId
          ? Number(formData.doctorId)
          : null,

        billType: formData.billType.trim(),

        amount: Number(formData.amount),

        description: formData.description.trim(),

        status: formData.status,

        billDate: formData.billDate || null,
      };

      await createBill(billData);

      setFormMessage("Bill created successfully.");

      setFormData({ ...emptyForm });
    } catch (error) {
      console.error("Create bill error:", error);

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
    setFormData({ ...emptyForm });

    setFormMessage("");
    setFormError("");
  };

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const handleEdit = (bill) => {
    setEditingBill(bill);

    setEditForm({
      patientId: bill.patientId ?? "",

      patientName: bill.patientName ?? "",

      doctorId: bill.doctorId ?? "",

      billType: bill.billType ?? "",

      amount: bill.amount ?? "",

      description: bill.description ?? "",

      status: bill.status ?? "Pending",

      billDate: bill.billDate ?? "",
    });
  };

  // ==========================================
  // EDIT INPUT
  // ==========================================

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    if (!editForm.patientId) {
      alert("Patient ID is required.");
      return;
    }

    if (!editForm.patientName.trim()) {
      alert("Patient name is required.");
      return;
    }

    if (!editForm.billType.trim()) {
      alert("Bill type is required.");
      return;
    }

    if (!editForm.amount || Number(editForm.amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      setEditing(true);

      const billData = {
        patientId: Number(editForm.patientId),

        patientName: editForm.patientName.trim(),

        doctorId: editForm.doctorId
          ? Number(editForm.doctorId)
          : null,

        billType: editForm.billType.trim(),

        amount: Number(editForm.amount),

        description: editForm.description.trim(),

        status: editForm.status,

        billDate: editForm.billDate || null,
      };

      await updateBill(editingBill.billId, billData);

      alert(
        `Bill #${editingBill.billId} updated successfully.`
      );

      setEditingBill(null);
    } catch (error) {
      console.error("Update bill error:", error);

      alert("Failed to update bill.");
    } finally {
      setEditing(false);
    }
  };

  // ==========================================
  // CLOSE EDIT
  // ==========================================

  const closeEdit = () => {
    if (editing) {
      return;
    }

    setEditingBill(null);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="admin-module">

      {/* ======================================
          CREATE BILL
      ====================================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "28px",
          marginBottom: "25px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          border: "1px solid #e8eef5",
        }}
      >
        <div style={{ marginBottom: "22px" }}>
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
            Create and save a new hospital bill for a patient.
          </p>
        </div>

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

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
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

          <div style={{ marginTop: "18px" }}>
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
                border: "1px solid #d1d5db",
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
        title="Bills"
        subtitle="View and manage all hospital billing records"
        icon="💰"
        fetchData={fetchBills}
        statusType="bill"
        onStatusUpdate={updateBillStatus}
        onEdit={handleEdit}
      />

      {/* ======================================
          EDIT BILL MODAL
      ====================================== */}

      {editingBill && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "28px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#172033",
                  }}
                >
                  ✏️ Edit Bill #{editingBill.billId}
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#718096",
                  }}
                >
                  Update bill information
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                disabled={editing}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "18px",
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Patient ID *
                  </label>

                  <input
                    type="number"
                    name="patientId"
                    value={editForm.patientId}
                    onChange={handleEditChange}
                    min="1"
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Patient Name *
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    value={editForm.patientName}
                    onChange={handleEditChange}
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Doctor ID
                  </label>

                  <input
                    type="number"
                    name="doctorId"
                    value={editForm.doctorId}
                    onChange={handleEditChange}
                    min="1"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Bill Type *
                  </label>

                  <select
                    name="billType"
                    value={editForm.billType}
                    onChange={handleEditChange}
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

                <div>
                  <label style={labelStyle}>
                    Amount (₹) *
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    min="1"
                    step="0.01"
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Status
                  </label>

                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
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

                <div>
                  <label style={labelStyle}>
                    Bill Date
                  </label>

                  <input
                    type="date"
                    name="billDate"
                    value={editForm.billDate}
                    onChange={handleEditChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginTop: "18px" }}>
                <label style={labelStyle}>
                  Description
                </label>

                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows="4"
                  placeholder="Enter billing description..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "24px",
                }}
              >
                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={editing}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    padding: "12px 22px",
                    background: "#ffffff",
                    color: "#374151",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editing}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontWeight: "600",
                    cursor: "pointer",
                    opacity: editing ? 0.7 : 1,
                  }}
                >
                  {editing
                    ? "⏳ Updating..."
                    : "💾 Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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