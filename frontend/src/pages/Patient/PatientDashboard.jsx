import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  Pill,
  ReceiptText,
  ArrowRight,
  Clock3,
  Stethoscope,
  FileText,
  CreditCard,
  UserRound,
} from "lucide-react";

import "./PatientDashboard.css";

const API_URL = "http://localhost:8080/api";

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time) {
  if (!time) return "—";

  return String(time).slice(0, 5);
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
}

function getStatusClass(status) {
  const value = String(
    status || ""
  ).toLowerCase();

  if (
    value === "confirmed" ||
    value === "approved"
  ) {
    return "patient-status confirmed";
  }

  if (
    value === "completed"
  ) {
    return "patient-status completed";
  }

  if (
    value === "cancelled" ||
    value === "canceled"
  ) {
    return "patient-status cancelled";
  }

  return "patient-status pending";
}

function getBillStatusClass(status) {
  const value = String(
    status || ""
  ).toLowerCase();

  if (value === "paid") {
    return "bill-mini-status paid";
  }

  if (
    value === "cancelled" ||
    value === "canceled"
  ) {
    return "bill-mini-status cancelled";
  }

  return "bill-mini-status pending";
}

function formatAmount(amount) {
  const value = Number(amount || 0);

  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
}

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [appointments, setAppointments] =
    useState([]);

  const [medicalRecords, setMedicalRecords] =
    useState([]);

  const [prescriptions, setPrescriptions] =
    useState([]);

  const [bills, setBills] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const savedUser =
        localStorage.getItem("user");

      if (savedUser) {
        setUser(
          JSON.parse(savedUser)
        );
      }
    } catch (error) {
      console.error(
        "Unable to load user:",
        error
      );
    }
  }, []);

  useEffect(() => {
    const patientId =
      user?.patientId;

    if (!patientId) {
      setLoading(false);
      return;
    }

    const loadDashboardData =
      async () => {
        setLoading(true);

        try {
          const results =
            await Promise.allSettled([
              fetch(
                `${API_URL}/appointments/patient/${patientId}`
              ),
              fetch(
                `${API_URL}/medical-records/patient/${patientId}`
              ),
              fetch(
                `${API_URL}/prescriptions/patient/${patientId}`
              ),
              fetch(
                `${API_URL}/bills/patient/${patientId}`
              ),
            ]);

          const [
            appointmentsResult,
            recordsResult,
            prescriptionsResult,
            billsResult,
          ] = results;

          if (
            appointmentsResult.status ===
              "fulfilled" &&
            appointmentsResult.value.ok
          ) {
            const data =
              await appointmentsResult.value.json();

            setAppointments(
              Array.isArray(data)
                ? data
                : []
            );
          }

          if (
            recordsResult.status ===
              "fulfilled" &&
            recordsResult.value.ok
          ) {
            const data =
              await recordsResult.value.json();

            setMedicalRecords(
              Array.isArray(data)
                ? data
                : []
            );
          }

          if (
            prescriptionsResult.status ===
              "fulfilled" &&
            prescriptionsResult.value.ok
          ) {
            const data =
              await prescriptionsResult.value.json();

            setPrescriptions(
              Array.isArray(data)
                ? data
                : []
            );
          }

          if (
            billsResult.status ===
              "fulfilled" &&
            billsResult.value.ok
          ) {
            const data =
              await billsResult.value.json();

            setBills(
              Array.isArray(data)
                ? data
                : []
            );
          }
        } catch (error) {
          console.error(
            "Dashboard loading error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    loadDashboardData();
  }, [user?.patientId]);

  const patientName =
    user?.name ||
    user?.fullName ||
    user?.patientName ||
    "Patient";

  /* =========================================
     UPCOMING APPOINTMENT
  ========================================= */

  const upcomingAppointment =
    useMemo(() => {
      const valid =
        appointments.filter(
          (appointment) => {
            const status =
              String(
                appointment?.status ||
                  ""
              ).toLowerCase();

            return (
              status !== "cancelled" &&
              status !== "canceled" &&
              status !== "completed"
            );
          }
        );

      valid.sort((a, b) => {
        const dateA =
          new Date(
            `${a?.appointmentDate || ""}T${
              a?.appointmentTime || "00:00"
            }`
          );

        const dateB =
          new Date(
            `${b?.appointmentDate || ""}T${
              b?.appointmentTime || "00:00"
            }`
          );

        return dateA - dateB;
      });

      return valid[0] || null;
    }, [appointments]);

  /* =========================================
     RECENT DATA
  ========================================= */

  const recentRecords =
    useMemo(() => {
      return [...medicalRecords]
        .sort(
          (a, b) =>
            new Date(
              b?.recordDate || 0
            ) -
            new Date(
              a?.recordDate || 0
            )
        )
        .slice(0, 3);
    }, [medicalRecords]);

  const recentPrescriptions =
    useMemo(() => {
      return [...prescriptions]
        .sort(
          (a, b) =>
            new Date(
              b?.prescriptionDate || 0
            ) -
            new Date(
              a?.prescriptionDate || 0
            )
        )
        .slice(0, 3);
    }, [prescriptions]);

  const recentBills =
    useMemo(() => {
      return [...bills]
        .sort(
          (a, b) =>
            new Date(
              b?.billDate || 0
            ) -
            new Date(
              a?.billDate || 0
            )
        )
        .slice(0, 3);
    }, [bills]);

  /* =========================================
     BILL TOTALS
  ========================================= */

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
        (sum, bill) =>
          sum +
          Number(
            bill?.amount || 0
          ),
        0
      );

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="patient-dashboard-loading">
        <div className="dashboard-loader" />

        <p>
          Loading patient dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">

      {/* =====================================
          WELCOME
      ===================================== */}

      <section className="dashboard-welcome">

        <div className="welcome-content">

          <span className="welcome-label">
            PATIENT PORTAL
          </span>

          <h1>
            {getGreeting()},{" "}
            <span>{patientName}</span>
          </h1>

          <p>
            Manage your appointments,
            medical records, prescriptions
            and bills from one place.
          </p>

          <div className="patient-id">

            <UserRound size={14} />

            <span>
              Patient ID
            </span>

            <strong>
              #{user?.patientId || "—"}
            </strong>

          </div>

          <div className="welcome-actions">

            <button
              type="button"
              className="primary-dashboard-button"
              onClick={() =>
                navigate(
                  "/patient/book-appointment"
                )
              }
            >
              <CalendarDays size={15} />

              Book Appointment
            </button>

            <button
              type="button"
              className="secondary-dashboard-button"
              onClick={() =>
                navigate(
                  "/patient/appointments"
                )
              }
            >
              View Appointments

              <ArrowRight size={15} />

            </button>

          </div>

        </div>

        <div className="welcome-visual">

          <div className="heart-circle">

            <svg
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M50 82C50 82 18 63 18 38C18 24 28 17 39 17C45 17 49 20 50 25C51 20 55 17 61 17C72 17 82 24 82 38C82 63 50 82 50 82Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              <path
                d="M31 45H42L46 36L52 54L57 43L61 45H69"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>

        </div>

      </section>


      {/* =====================================
          OVERVIEW
      ===================================== */}

      <section className="quick-overview">

        <div className="section-heading">

          <div>

            <span className="section-label">
              OVERVIEW
            </span>

            <h2>
              Your Health at a Glance
            </h2>

          </div>

        </div>

        <div className="overview-grid">

          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate(
                "/patient/appointments"
              )
            }
          >

            <div className="overview-icon appointments">
              <CalendarDays size={21} />
            </div>

            <div className="overview-info">

              <span>
                Appointments
              </span>

              <strong>
                {appointments.length}
              </strong>

              <small>
                View appointments
                <ArrowRight size={11} />
              </small>

            </div>

          </button>


          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate(
                "/patient/medical-records"
              )
            }
          >

            <div className="overview-icon records">
              <ClipboardList size={21} />
            </div>

            <div className="overview-info">

              <span>
                Medical Records
              </span>

              <strong>
                {medicalRecords.length}
              </strong>

              <small>
                View records
                <ArrowRight size={11} />
              </small>

            </div>

          </button>


          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate(
                "/patient/prescriptions"
              )
            }
          >

            <div className="overview-icon prescriptions">
              <Pill size={21} />
            </div>

            <div className="overview-info">

              <span>
                Prescriptions
              </span>

              <strong>
                {prescriptions.length}
              </strong>

              <small>
                View prescriptions
                <ArrowRight size={11} />
              </small>

            </div>

          </button>


          <button
            type="button"
            className="overview-card"
            onClick={() =>
              navigate(
                "/patient/bills"
              )
            }
          >

            <div className="overview-icon bills">
              <ReceiptText size={21} />
            </div>

            <div className="overview-info">

              <span>
                Bills
              </span>

              <strong>
                {bills.length}
              </strong>

              <small>
                View bills
                <ArrowRight size={11} />
              </small>

            </div>

          </button>

        </div>

      </section>


      {/* =====================================
          UPCOMING + BILL SUMMARY
      ===================================== */}

      <section className="dashboard-main-grid">

        {/* UPCOMING */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                NEXT VISIT
              </span>

              <h2>
                Upcoming Appointment
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate(
                  "/patient/appointments"
                )
              }
            >
              View All
              <ArrowRight size={14} />
            </button>

          </div>

          {upcomingAppointment ? (

            <div className="appointment-preview">

              <div className="appointment-date-box">

                <span>
                  {upcomingAppointment.appointmentDate
                    ? new Date(
                        upcomingAppointment.appointmentDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          month: "short",
                        }
                      )
                    : "DATE"}
                </span>

                <strong>
                  {upcomingAppointment.appointmentDate
                    ? new Date(
                        upcomingAppointment.appointmentDate
                      ).getDate()
                    : "—"}
                </strong>

              </div>

              <div className="appointment-details">

                <h3>
                  Dr.{" "}
                  {upcomingAppointment.doctorName ||
                    "Doctor"}
                </h3>

                <p>
                  {upcomingAppointment.specialization ||
                    "Healthcare Specialist"}
                </p>

                <div className="appointment-meta">

                  <span>
                    <CalendarDays size={13} />

                    {formatDate(
                      upcomingAppointment.appointmentDate
                    )}
                  </span>

                  <span>
                    <Clock3 size={13} />

                    {formatTime(
                      upcomingAppointment.appointmentTime
                    )}
                  </span>

                </div>

                <span
                  className={getStatusClass(
                    upcomingAppointment.status
                  )}
                >
                  {upcomingAppointment.status ||
                    "Pending"}
                </span>

              </div>

            </div>

          ) : (

            <div className="empty-panel">

              <div className="empty-panel-icon">
                <CalendarDays size={28} />
              </div>

              <h3>
                No Upcoming Appointment
              </h3>

              <p>
                You don't have any upcoming
                appointments.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/patient/book-appointment"
                  )
                }
              >
                Book Appointment
              </button>

            </div>

          )}

        </div>


        {/* BILLS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                PAYMENTS
              </span>

              <h2>
                Billing Summary
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate(
                  "/patient/bills"
                )
              }
            >
              View All
              <ArrowRight size={14} />
            </button>

          </div>

          <div className="billing-summary">

            <div className="billing-total">

              <div className="billing-icon">
                <CreditCard size={20} />
              </div>

              <div>

                <span>
                  Pending Amount
                </span>

                <strong>
                  {formatAmount(
                    pendingAmount
                  )}
                </strong>

              </div>

            </div>

            <div className="billing-stats">

              <div>
                <span>
                  Total Bills
                </span>

                <strong>
                  {bills.length}
                </strong>
              </div>

              <div>
                <span>
                  Paid
                </span>

                <strong>
                  {
                    bills.filter(
                      (bill) =>
                        String(
                          bill.status ||
                            ""
                        ).toLowerCase() ===
                        "paid"
                    ).length
                  }
                </strong>
              </div>

            </div>

            {recentBills.length > 0 && (

              <div className="mini-bill-list">

                {recentBills
                  .slice(0, 2)
                  .map((bill) => (

                    <div
                      className="mini-bill"
                      key={bill.billId}
                    >

                      <div>

                        <strong>
                          Bill #
                          {bill.billId}
                        </strong>

                        <span>
                          {bill.billType ||
                            "Hospital Bill"}
                        </span>

                      </div>

                      <div>

                        <strong>
                          {formatAmount(
                            bill.amount
                          )}
                        </strong>

                        <span
                          className={getBillStatusClass(
                            bill.status
                          )}
                        >
                          {bill.status ||
                            "Pending"}
                        </span>

                      </div>

                    </div>

                  ))}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================
          RECENT HEALTH DATA
      ===================================== */}

      <section className="recent-grid">

        {/* RECORDS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                CLINICAL
              </span>

              <h2>
                Recent Medical Records
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate(
                  "/patient/medical-records"
                )
              }
            >
              View All
              <ArrowRight size={14} />
            </button>

          </div>

          {recentRecords.length > 0 ? (

            <div className="recent-list">

              {recentRecords.map(
                (record) => (

                  <div
                    className="recent-item"
                    key={
                      record.recordId
                    }
                  >

                    <div className="recent-item-icon records">
                      <FileText
                        size={17}
                      />
                    </div>

                    <div className="recent-item-content">

                      <strong>
                        {record.diagnosis ||
                          "Medical Record"}
                      </strong>

                      <span>
                        {record.treatment ||
                          "Clinical information available"}
                      </span>

                    </div>

                    <time>
                      {formatDate(
                        record.recordDate
                      )}
                    </time>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="small-empty">
              No medical records available.
            </div>

          )}

        </div>


        {/* PRESCRIPTIONS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-label">
                MEDICATION
              </span>

              <h2>
                Recent Prescriptions
              </h2>

            </div>

            <button
              type="button"
              className="panel-link"
              onClick={() =>
                navigate(
                  "/patient/prescriptions"
                )
              }
            >
              View All
              <ArrowRight size={14} />
            </button>

          </div>

          {recentPrescriptions.length >
          0 ? (

            <div className="recent-list">

              {recentPrescriptions.map(
                (prescription) => (

                  <div
                    className="recent-item"
                    key={
                      prescription.prescriptionId ||
                      prescription.id
                    }
                  >

                    <div className="recent-item-icon prescriptions">
                      <Pill size={17} />
                    </div>

                    <div className="recent-item-content">

                      <strong>
                        {prescription.medicineName ||
                          "Medicine"}
                      </strong>

                      <span>
                        {prescription.dosage ||
                          "Dosage not specified"}
                        {" • "}
                        {prescription.frequency ||
                          "As directed"}
                      </span>

                    </div>

                    <time>
                      {formatDate(
                        prescription.prescriptionDate
                      )}
                    </time>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="small-empty">
              No prescriptions available.
            </div>

          )}

        </div>

      </section>


      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <section className="quick-actions-section">

        <div className="section-heading">

          <div>

            <span className="section-label">
              QUICK ACCESS
            </span>

            <h2>
              What would you like to do?
            </h2>

          </div>

        </div>

        <div className="quick-actions-grid">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/patient/book-appointment"
              )
            }
          >
            <CalendarDays size={20} />

            <div>
              <strong>
                Book Appointment
              </strong>

              <span>
                Schedule a visit
              </span>
            </div>

            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/patient/medical-records"
              )
            }
          >
            <ClipboardList size={20} />

            <div>
              <strong>
                Medical Records
              </strong>

              <span>
                View your history
              </span>
            </div>

            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/patient/prescriptions"
              )
            }
          >
            <Pill size={20} />

            <div>
              <strong>
                Prescriptions
              </strong>

              <span>
                Check medications
              </span>
            </div>

            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/patient/bills"
              )
            }
          >
            <ReceiptText size={20} />

            <div>
              <strong>
                Bills & Payment
              </strong>

              <span>
                Check your bills
              </span>
            </div>

            <ArrowRight size={15} />
          </button>

        </div>

      </section>

    </div>
  );
}