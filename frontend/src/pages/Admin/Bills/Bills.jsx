import { useEffect, useMemo, useState } from "react";
import {
  ReceiptIndianRupee,
  Search,
  RefreshCw,
  UserRound,
  Stethoscope,
  CalendarDays,
  FileText,
  Pencil,
  X,
  CheckCircle2,
  Clock3,
  Ban,
  Plus,
  Save,
} from "lucide-react";

import {
  fetchBills,
  fetchPatients,
  fetchDoctors,
  createBill,
  updateBill,
  updateBillStatus,
} from "../adminApi";

import "./Bills.css";

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

function Bills() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showCreate, setShowCreate] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const [formData, setFormData] =
    useState({ ...emptyForm });

  const [editForm, setEditForm] =
    useState({ ...emptyForm });

  /* =====================================================
     LOAD DATA
  ===================================================== */

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [billData, patientData, doctorData] =
        await Promise.all([
          fetchBills(),
          fetchPatients(),
          fetchDoctors(),
        ]);

      setBills(
        Array.isArray(billData)
          ? billData
          : []
      );

      setPatients(
        Array.isArray(patientData)
          ? patientData
          : []
      );

      setDoctors(
        Array.isArray(doctorData)
          ? doctorData
          : []
      );
    } catch (err) {
      console.error("Bills error:", err);

      setError(
        "Unable to load bills. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =====================================================
     HELPERS
  ===================================================== */

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (item) =>
        Number(item.patientId) ===
        Number(patientId)
    );

    return (
      patient?.name ||
      `Patient #${patientId ?? "-"}`
    );
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) ===
        Number(doctorId)
    );

    return (
      doctor?.name ||
      (doctorId
        ? `Doctor #${doctorId}`
        : "Hospital")
    );
  };

  const getDoctorSpecialization = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) ===
        Number(doctorId)
    );

    return doctor?.specialization || "";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(
        `${date}T00:00:00`
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const formatAmount = (amount) => {
    const value = Number(amount);

    if (Number.isNaN(value)) {
      return "₹0.00";
    }

    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  };

  const getStatusClass = (status) => {
    const value =
      status?.toLowerCase();

    if (value === "paid") {
      return "bill-status-paid";
    }

    if (value === "cancelled") {
      return "bill-status-cancelled";
    }

    return "bill-status-pending";
  };

  /* =====================================================
     STATS
  ===================================================== */

  const stats = useMemo(() => {
    const paid = bills.filter(
      (bill) =>
        bill.status?.toLowerCase() === "paid"
    );

    const pending = bills.filter(
      (bill) =>
        bill.status?.toLowerCase() === "pending"
    );

    const cancelled = bills.filter(
      (bill) =>
        bill.status?.toLowerCase() ===
        "cancelled"
    );

    const totalAmount = bills.reduce(
      (sum, bill) =>
        sum + Number(bill.amount || 0),
      0
    );

    const paidAmount = paid.reduce(
      (sum, bill) =>
        sum + Number(bill.amount || 0),
      0
    );

    return {
      total: bills.length,
      paid: paid.length,
      pending: pending.length,
      cancelled: cancelled.length,
      totalAmount,
      paidAmount,
    };
  }, [bills]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredBills = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return bills.filter((bill) => {
      const statusMatch =
        statusFilter === "All" ||
        bill.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      if (!statusMatch) {
        return false;
      }

      if (!search) {
        return true;
      }

      const patientName =
        getPatientName(bill.patientId);

      const doctorName =
        getDoctorName(bill.doctorId);

      const searchableText = [
        bill.billId,
        bill.patientId,
        bill.patientName,
        patientName,
        bill.doctorId,
        doctorName,
        bill.billType,
        bill.amount,
        bill.description,
        bill.status,
        bill.billDate,
      ]
        .map((value) =>
          String(value ?? "").toLowerCase()
        )
        .join(" ");

      return searchableText.includes(search);
    });
  }, [
    bills,
    patients,
    doctors,
    searchTerm,
    statusFilter,
  ]);

  /* =====================================================
     FORM
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEditChange = (event) => {
    const { name, value } =
      event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     CREATE BILL
  ===================================================== */

  const handleCreate = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.patientId) {
      setError("Patient ID is required.");
      return;
    }

    if (!formData.patientName.trim()) {
      setError("Patient name is required.");
      return;
    }

    if (!formData.billType.trim()) {
      setError("Bill type is required.");
      return;
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      setError("Enter a valid bill amount.");
      return;
    }

    try {
      setSaving(true);

      const billData = {
        patientId:
          Number(formData.patientId),

        patientName:
          formData.patientName.trim(),

        doctorId: formData.doctorId
          ? Number(formData.doctorId)
          : null,

        billType:
          formData.billType.trim(),

        amount:
          Number(formData.amount),

        description:
          formData.description.trim(),

        status: formData.status,

        billDate:
          formData.billDate || null,
      };

      const createdBill =
        await createBill(billData);

      if (createdBill) {
        setBills((previous) => [
          createdBill,
          ...previous,
        ]);
      } else {
        await loadData();
      }

      setSuccess(
        "Bill created successfully."
      );

      setFormData({ ...emptyForm });
      setShowCreate(false);
    } catch (err) {
      console.error(
        "Create bill error:",
        err
      );

      setError(
        "Failed to create bill."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     EDIT BILL
  ===================================================== */

  const openEdit = (bill) => {
    setEditingBill(bill);

    setEditForm({
      patientId:
        bill.patientId ?? "",

      patientName:
        bill.patientName ??
        getPatientName(
          bill.patientId
        ),

      doctorId:
        bill.doctorId ?? "",

      billType:
        bill.billType ?? "",

      amount:
        bill.amount ?? "",

      description:
        bill.description ?? "",

      status:
        bill.status ?? "Pending",

      billDate:
        bill.billDate ?? "",
    });
  };

  const closeEdit = () => {
    if (saving) return;

    setEditingBill(null);
    setEditForm({
      ...emptyForm,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editForm.patientId) {
      setError("Patient ID is required.");
      return;
    }

    if (!editForm.patientName.trim()) {
      setError("Patient name is required.");
      return;
    }

    if (!editForm.billType.trim()) {
      setError("Bill type is required.");
      return;
    }

    if (
      !editForm.amount ||
      Number(editForm.amount) <= 0
    ) {
      setError("Enter a valid amount.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const billData = {
        patientId:
          Number(editForm.patientId),

        patientName:
          editForm.patientName.trim(),

        doctorId: editForm.doctorId
          ? Number(editForm.doctorId)
          : null,

        billType:
          editForm.billType.trim(),

        amount:
          Number(editForm.amount),

        description:
          editForm.description.trim(),

        status: editForm.status,

        billDate:
          editForm.billDate || null,
      };

      const updatedBill =
        await updateBill(
          editingBill.billId,
          billData
        );

      setBills((previous) =>
        previous.map((bill) =>
          bill.billId ===
          editingBill.billId
            ? updatedBill || {
                ...bill,
                ...billData,
              }
            : bill
        )
      );

      setSuccess(
        `Bill #${editingBill.billId} updated successfully.`
      );

      closeEdit();
    } catch (err) {
      console.error(
        "Update bill error:",
        err
      );

      setError(
        "Failed to update bill."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     STATUS
  ===================================================== */

  const handleStatusUpdate = async (
    billId,
    status
  ) => {
    try {
      setUpdatingId(billId);
      setError("");

      await updateBillStatus(
        billId,
        status
      );

      setBills((previous) =>
        previous.map((bill) =>
          bill.billId === billId
            ? {
                ...bill,
                status,
              }
            : bill
        )
      );

      setSuccess(
        `Bill #${billId} marked as ${status}.`
      );
    } catch (err) {
      console.error(
        "Bill status error:",
        err
      );

      setError(
        "Failed to update bill status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-bills-page">

      {/* HEADER */}

      <div className="bills-page-header">

        <div className="bills-page-title">

          <div className="bills-title-icon">
            <ReceiptIndianRupee size={27} />
          </div>

          <div>

            <div className="bills-section-label">
              Billing & Payments
            </div>

            <h1>Bills & Payments</h1>

            <p>
              Manage hospital billing records and
              payment status.
            </p>

          </div>

        </div>

        <div className="bills-header-actions">

          <button
            className="bills-refresh-button"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw size={15} />
            Refresh
          </button>

          <button
            className="bills-create-button"
            onClick={() => {
              setError("");
              setSuccess("");
              setShowCreate(true);
            }}
          >
            <Plus size={16} />
            Create Bill
          </button>

        </div>

      </div>

      {/* MESSAGES */}

      {success && (
        <div className="bills-success">

          <CheckCircle2 size={17} />

          <span>{success}</span>

          <button
            onClick={() =>
              setSuccess("")
            }
          >
            <X size={14} />
          </button>

        </div>
      )}

      {error && (
        <div className="bills-error">

          <div>
            <strong>
              Billing error
            </strong>

            <p>{error}</p>
          </div>

          <button
            onClick={() => setError("")}
          >
            <X size={14} />
          </button>

        </div>
      )}

      {/* STATS */}

      <div className="bills-stats">

        <div
          className={`bill-stat-card ${
            statusFilter === "All"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setStatusFilter("All")
          }
        >

          <div className="bill-stat-icon total">
            <ReceiptIndianRupee size={20} />
          </div>

          <div>
            <span>Total Bills</span>
            <strong>{stats.total}</strong>

            <small>
              {formatAmount(
                stats.totalAmount
              )}
            </small>
          </div>

        </div>

        <div
          className={`bill-stat-card ${
            statusFilter === "Paid"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setStatusFilter("Paid")
          }
        >

          <div className="bill-stat-icon paid">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Paid</span>
            <strong>{stats.paid}</strong>

            <small>
              {formatAmount(
                stats.paidAmount
              )}
            </small>
          </div>

        </div>

        <div
          className={`bill-stat-card ${
            statusFilter === "Pending"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setStatusFilter("Pending")
          }
        >

          <div className="bill-stat-icon pending">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{stats.pending}</strong>

            <small>
              Awaiting payment
            </small>
          </div>

        </div>

        <div
          className={`bill-stat-card ${
            statusFilter === "Cancelled"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setStatusFilter("Cancelled")
          }
        >

          <div className="bill-stat-icon cancelled">
            <Ban size={20} />
          </div>

          <div>
            <span>Cancelled</span>
            <strong>
              {stats.cancelled}
            </strong>

            <small>
              Cancelled bills
            </small>
          </div>

        </div>

      </div>

      {/* TOOLBAR */}

      <div className="bills-toolbar">

        <div>

          <h2>Billing Directory</h2>

          <p>
            Search and manage all hospital bills.
          </p>

        </div>

        <div className="bills-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search bills..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

          {searchTerm && (
            <button
              onClick={() =>
                setSearchTerm("")
              }
            >
              <X size={14} />
            </button>
          )}

        </div>

      </div>

      {/* FILTERS */}

      <div className="bills-filters">

        {[
          ["All", stats.total],
          ["Paid", stats.paid],
          ["Pending", stats.pending],
          ["Cancelled", stats.cancelled],
        ].map(([status, count]) => (

          <button
            key={status}
            className={
              statusFilter === status
                ? "bill-filter active"
                : "bill-filter"
            }
            onClick={() =>
              setStatusFilter(status)
            }
          >
            {status}

            <span>{count}</span>

          </button>

        ))}

      </div>

      {/* CONTENT */}

      {loading ? (

        <div className="bills-loading">

          <div className="bills-spinner" />

          <h3>
            Loading bills...
          </h3>

          <p>
            Please wait while we fetch billing
            information.
          </p>

        </div>

      ) : filteredBills.length === 0 ? (

        <div className="bills-empty">

          <div className="bills-empty-icon">
            <ReceiptIndianRupee size={35} />
          </div>

          <h3>
            No Bills Found
          </h3>

          <p>
            No bills match the selected filter
            or search.
          </p>

          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
            }}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="bills-grid">

          {filteredBills.map(
            (bill, index) => {

              const patientName =
                getPatientName(
                  bill.patientId
                );

              const doctorName =
                getDoctorName(
                  bill.doctorId
                );

              const specialization =
                getDoctorSpecialization(
                  bill.doctorId
                );

              const isUpdating =
                updatingId ===
                bill.billId;

              return (
                <div
                  className="admin-bill-card"
                  key={
                    bill.billId ??
                    index
                  }
                  style={{
                    animationDelay:
                      `${index * 0.04}s`,
                  }}
                >

                  {/* TOP */}

                  <div className="bill-card-top">

                    <div className="bill-icon">
                      <ReceiptIndianRupee
                        size={21}
                      />
                    </div>

                    <div className="bill-title">

                      <h3>
                        Bill #
                        {bill.billId}
                      </h3>

                      <span>
                        {bill.billType ||
                          "Hospital Bill"}
                      </span>

                    </div>

                    <span
                      className={`bill-status ${getStatusClass(
                        bill.status
                      )}`}
                    >
                      {bill.status ||
                        "Pending"}
                    </span>

                  </div>

                  {/* AMOUNT */}

                  <div className="bill-amount-box">

                    <small>
                      Total Amount
                    </small>

                    <strong>
                      {formatAmount(
                        bill.amount
                      )}
                    </strong>

                  </div>

                  {/* PATIENT */}

                  <div className="bill-person">

                    <div className="bill-person-icon patient">
                      <UserRound size={15} />
                    </div>

                    <div>

                      <small>
                        Patient
                      </small>

                      <strong>
                        {patientName}
                      </strong>

                      <span>
                        Patient #
                        {bill.patientId ??
                          "-"}
                      </span>

                    </div>

                  </div>

                  {/* DOCTOR */}

                  <div className="bill-person">

                    <div className="bill-person-icon doctor">
                      <Stethoscope size={15} />
                    </div>

                    <div>

                      <small>
                        Doctor
                      </small>

                      <strong>
                        {doctorName}
                      </strong>

                      {specialization && (
                        <span>
                          {specialization}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* DATE */}

                  <div className="bill-date">

                    <CalendarDays size={14} />

                    <span>
                      Bill Date
                    </span>

                    <strong>
                      {formatDate(
                        bill.billDate
                      )}
                    </strong>

                  </div>

                  {/* DESCRIPTION */}

                  {bill.description && (
                    <div className="bill-description">

                      <small>
                        Description
                      </small>

                      <p>
                        {bill.description}
                      </p>

                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="bill-actions">

                    {bill.status !==
                      "Paid" &&
                      bill.status !==
                        "Cancelled" && (

                        <button
                          className="bill-paid-action"
                          disabled={
                            isUpdating
                          }
                          onClick={() =>
                            handleStatusUpdate(
                              bill.billId,
                              "Paid"
                            )
                          }
                        >
                          <CheckCircle2
                            size={14}
                          />
                          Mark Paid
                        </button>
                      )}

                    {bill.status !==
                      "Cancelled" &&
                      bill.status !==
                        "Paid" && (

                        <button
                          className="bill-cancel-action"
                          disabled={
                            isUpdating
                          }
                          onClick={() =>
                            handleStatusUpdate(
                              bill.billId,
                              "Cancelled"
                            )
                          }
                        >
                          <Ban size={14} />
                          Cancel
                        </button>
                      )}

                    <button
                      className="bill-edit-action"
                      onClick={() =>
                        openEdit(bill)
                      }
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                  </div>

                  {isUpdating && (
                    <div className="bill-updating">
                      Updating payment status...
                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

      {/* =================================================
          CREATE MODAL
      ================================================= */}

      {showCreate && (

        <div
          className="bill-modal-overlay"
          onClick={() =>
            !saving &&
            setShowCreate(false)
          }
        >

          <div
            className="bill-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="bill-modal-header">

              <div className="bill-modal-title">

                <div className="bill-modal-icon">
                  <Plus size={20} />
                </div>

                <div>
                  <h2>
                    Create New Bill
                  </h2>

                  <p>
                    Add a new hospital billing
                    record.
                  </p>
                </div>

              </div>

              <button
                className="bill-modal-close"
                onClick={() =>
                  setShowCreate(false)
                }
                disabled={saving}
              >
                <X size={18} />
              </button>

            </div>

            <form
              className="bill-form"
              onSubmit={handleCreate}
            >

              <div className="bill-form-grid">

                <div className="bill-form-group">

                  <label>
                    Patient ID *
                  </label>

                  <input
                    type="number"
                    name="patientId"
                    value={
                      formData.patientId
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Patient ID"
                    min="1"
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Patient Name *
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    value={
                      formData.patientName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Patient name"
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Doctor ID
                  </label>

                  <input
                    type="number"
                    name="doctorId"
                    value={
                      formData.doctorId
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Doctor ID"
                    min="1"
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Bill Type *
                  </label>

                  <select
                    name="billType"
                    value={
                      formData.billType
                    }
                    onChange={
                      handleChange
                    }
                    required
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

                <div className="bill-form-group">

                  <label>
                    Amount (₹) *
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={
                      formData.amount
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
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

                <div className="bill-form-group">

                  <label>
                    Bill Date
                  </label>

                  <input
                    type="date"
                    name="billDate"
                    value={
                      formData.billDate
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="bill-form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter billing description..."
                    rows="3"
                  />

                </div>

              </div>

              <div className="bill-form-footer">

                <button
                  type="button"
                  className="bill-form-cancel"
                  onClick={() =>
                    setShowCreate(false)
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bill-form-save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="bill-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Create Bill
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {editingBill && (

        <div
          className="bill-modal-overlay"
          onClick={closeEdit}
        >

          <div
            className="bill-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="bill-modal-header">

              <div className="bill-modal-title">

                <div className="bill-modal-icon">
                  <Pencil size={19} />
                </div>

                <div>
                  <h2>
                    Edit Bill #
                    {editingBill.billId}
                  </h2>

                  <p>
                    Update billing information.
                  </p>
                </div>

              </div>

              <button
                className="bill-modal-close"
                onClick={closeEdit}
                disabled={saving}
              >
                <X size={18} />
              </button>

            </div>

            <form
              className="bill-form"
              onSubmit={handleUpdate}
            >

              <div className="bill-form-grid">

                <div className="bill-form-group">

                  <label>
                    Patient ID *
                  </label>

                  <input
                    type="number"
                    name="patientId"
                    value={
                      editForm.patientId
                    }
                    onChange={
                      handleEditChange
                    }
                    min="1"
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Patient Name *
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    value={
                      editForm.patientName
                    }
                    onChange={
                      handleEditChange
                    }
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Doctor ID
                  </label>

                  <input
                    type="number"
                    name="doctorId"
                    value={
                      editForm.doctorId
                    }
                    onChange={
                      handleEditChange
                    }
                    min="1"
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Bill Type *
                  </label>

                  <input
                    type="text"
                    name="billType"
                    value={
                      editForm.billType
                    }
                    onChange={
                      handleEditChange
                    }
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Amount (₹) *
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={
                      editForm.amount
                    }
                    onChange={
                      handleEditChange
                    }
                    min="1"
                    step="0.01"
                    required
                  />

                </div>

                <div className="bill-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      editForm.status
                    }
                    onChange={
                      handleEditChange
                    }
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

                <div className="bill-form-group">

                  <label>
                    Bill Date
                  </label>

                  <input
                    type="date"
                    name="billDate"
                    value={
                      editForm.billDate
                    }
                    onChange={
                      handleEditChange
                    }
                  />

                </div>

                <div className="bill-form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      editForm.description
                    }
                    onChange={
                      handleEditChange
                    }
                    rows="3"
                  />

                </div>

              </div>

              <div className="bill-form-footer">

                <button
                  type="button"
                  className="bill-form-cancel"
                  onClick={closeEdit}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bill-form-save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="bill-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save Changes
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Bills;