import { useEffect, useState } from "react";
import "./Profile.css";

const API_URL = "http://localhost:8080/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [editDoctor, setEditDoctor] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DOCTOR PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setError("Doctor information not found. Please login again.");
          setLoading(false);
          return;
        }

        const loggedInUser = JSON.parse(storedUser);

        setUser(loggedInUser);

        const doctorId = loggedInUser?.doctorId;

        if (!doctorId) {
          setError("Doctor ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/doctors/${doctorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load doctor profile.");
        }

        const data = await response.json();

        setDoctor(data);
        setEditDoctor(data);
      } catch (err) {
        console.error("Error loading doctor profile:", err);
        setError("Unable to load doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (field, value) => {
    setEditDoctor((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = () => {
    setEditDoctor({ ...doctor });
    setMessage("");
    setError("");
    setIsEditing(true);
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    setEditDoctor({ ...doctor });
    setMessage("");
    setError("");
    setIsEditing(false);
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async () => {
    const doctorId = doctor?.doctorId;

    if (!doctorId) {
      setError("Doctor ID not found.");
      return;
    }

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!editDoctor.name?.trim()) {
      setError("Doctor name is required.");
      return;
    }

    if (!editDoctor.specialization?.trim()) {
      setError("Specialization is required.");
      return;
    }

    if (!editDoctor.phone?.trim()) {
      setError("Mobile number is required.");
      return;
    }

    if (!editDoctor.qualification?.trim()) {
      setError("Qualification is required.");
      return;
    }

    if (!editDoctor.medicalRegistrationNo?.trim()) {
      setError("Medical Registration No. is required.");
      return;
    }

    if (!editDoctor.hospitalAssociation?.trim()) {
      setError("Hospital Association is required.");
      return;
    }

    if (!editDoctor.address?.trim()) {
      setError("Address is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      // Only profile fields are sent.
      // Doctor ID and status cannot be edited from this page.

      const requestBody = {
        name: editDoctor.name.trim(),
        specialization: editDoctor.specialization.trim(),
        phone: editDoctor.phone?.trim() || "",
        dob: editDoctor.dob || null,
        gender: editDoctor.gender?.trim() || "",
        qualification: editDoctor.qualification.trim(),
        medicalRegistrationNo:
          editDoctor.medicalRegistrationNo.trim(),
        hospitalAssociation:
          editDoctor.hospitalAssociation.trim(),
        address: editDoctor.address.trim(),
        shift:
          editDoctor.shift?.trim().toUpperCase() || "DAY",
      };

      const response = await fetch(
        `${API_URL}/doctors/${doctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Failed to update doctor profile."
        );
      }

      const updatedDoctor = await response.json();

      // Update UI
      setDoctor(updatedDoctor);
      setEditDoctor(updatedDoctor);
      setIsEditing(false);

      setMessage("Profile updated successfully.");

      // Update localStorage doctor information
      const updatedUser = {
        ...user,
        name: updatedDoctor.name,
        fullName: updatedDoctor.name,
        doctorId: updatedDoctor.doctorId,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

    } catch (err) {
      console.error("Error saving doctor profile:", err);

      setError(
        err.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="doctor-profile-page">
        <div className="doctor-profile-loading">
          <div className="doctor-profile-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR / NO PROFILE
  // =====================================================

  if (!doctor) {
    return (
      <div className="doctor-profile-page">
        <div className="doctor-profile-error">
          {error || "Doctor profile not found."}
        </div>
      </div>
    );
  }

  const displayDoctor = isEditing
    ? editDoctor
    : doctor;

  const doctorName =
    displayDoctor.name || "Doctor";

  const initial =
    doctorName.charAt(0).toUpperCase();

  return (
    <div className="doctor-profile-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="doctor-profile-header">

        <div className="doctor-profile-title">

          <div className="doctor-profile-title-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>

          </div>

          <div>
            <h1>My Profile</h1>

            <p>
              View and manage your professional information.
            </p>
          </div>

        </div>

        {!isEditing && (
          <button
            type="button"
            className="doctor-edit-button"
            onClick={handleEdit}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>

            Edit Profile
          </button>
        )}

      </div>

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {message && (
        <div className="doctor-profile-success">
          <span>✓</span>
          {message}
        </div>
      )}

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="doctor-profile-error-message">
          {error}
        </div>
      )}

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="doctor-profile-layout">

        {/* =================================================
            LEFT CARD
        ================================================= */}

        <aside className="doctor-profile-side-card">

          <div className="doctor-large-avatar">
            {initial}
          </div>

          <h2>
            {doctorName}
          </h2>

          <p className="doctor-side-specialization">
            {displayDoctor.specialization ||
              "Medical Specialist"}
          </p>

          <div className="doctor-active-badge">
            <span></span>
            Active Doctor
          </div>

          <div className="doctor-side-divider"></div>

          <div className="doctor-side-info">

            <div>
              <span>Doctor ID</span>

              <strong>
                #{doctor.doctorId}
              </strong>
            </div>

            <div>
              <span>Specialization</span>

              <strong>
                {displayDoctor.specialization || "-"}
              </strong>
            </div>

            <div>
              <span>Shift</span>

              <strong>
                {displayDoctor.shift || "-"}
              </strong>
            </div>

          </div>

          <div className="doctor-side-message">
            <span>✦</span>

            <p>
              Providing better care through
              smarter healthcare technology.
            </p>
          </div>

        </aside>

        {/* =================================================
            RIGHT CARD
        ================================================= */}

        <section className="doctor-profile-card">

          <div className="doctor-card-heading">

            <div>
              <h2>
                Professional Information
              </h2>

              <p>
                Your registered doctor information.
              </p>
            </div>

          </div>

          <div className="doctor-profile-grid">

            {/* FULL NAME */}

            <div className="doctor-profile-field">

              <span>Full Name</span>

              {isEditing ? (
                <input
                  type="text"
                  value={editDoctor.name || ""}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.name || "-"}
                </strong>
              )}

            </div>

            {/* DOCTOR ID */}

            <div className="doctor-profile-field disabled">

              <span>Doctor ID</span>

              <strong>
                #{doctor.doctorId}
              </strong>

            </div>

            {/* SPECIALIZATION */}

            <div className="doctor-profile-field">

              <span>Specialization</span>

              {isEditing ? (
                <input
                  type="text"
                  value={
                    editDoctor.specialization || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "specialization",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.specialization || "-"}
                </strong>
              )}

            </div>

            {/* PHONE */}

            <div className="doctor-profile-field">

              <span>Mobile Number</span>

              {isEditing ? (
                <input
                  type="tel"
                  value={editDoctor.phone || ""}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.phone || "-"}
                </strong>
              )}

            </div>

            {/* DOB */}

            <div className="doctor-profile-field">

              <span>Date of Birth</span>

              {isEditing ? (
                <input
                  type="date"
                  value={editDoctor.dob || ""}
                  onChange={(e) =>
                    handleChange(
                      "dob",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.dob || "-"}
                </strong>
              )}

            </div>

            {/* GENDER */}

            <div className="doctor-profile-field">

              <span>Gender</span>

              {isEditing ? (
                <select
                  value={editDoctor.gender || ""}
                  onChange={(e) =>
                    handleChange(
                      "gender",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              ) : (
                <strong>
                  {doctor.gender || "-"}
                </strong>
              )}

            </div>

            {/* QUALIFICATION */}

            <div className="doctor-profile-field">

              <span>Qualification</span>

              {isEditing ? (
                <input
                  type="text"
                  value={
                    editDoctor.qualification || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "qualification",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.qualification || "-"}
                </strong>
              )}

            </div>

            {/* MEDICAL REGISTRATION */}

            <div className="doctor-profile-field">

              <span>
                Medical Registration No.
              </span>

              {isEditing ? (
                <input
                  type="text"
                  value={
                    editDoctor.medicalRegistrationNo || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "medicalRegistrationNo",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.medicalRegistrationNo || "-"}
                </strong>
              )}

            </div>

            {/* HOSPITAL ASSOCIATION */}

            <div className="doctor-profile-field">

              <span>
                Hospital Association
              </span>

              {isEditing ? (
                <input
                  type="text"
                  value={
                    editDoctor.hospitalAssociation || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "hospitalAssociation",
                      e.target.value
                    )
                  }
                />
              ) : (
                <strong>
                  {doctor.hospitalAssociation || "-"}
                </strong>
              )}

            </div>

            {/* SHIFT */}

            <div className="doctor-profile-field">

              <span>Shift</span>

              {isEditing ? (
                <select
                  value={editDoctor.shift || "DAY"}
                  onChange={(e) =>
                    handleChange(
                      "shift",
                      e.target.value
                    )
                  }
                >
                  <option value="DAY">
                    Day
                  </option>

                  <option value="NIGHT">
                    Night
                  </option>
                </select>
              ) : (
                <strong>
                  {doctor.shift || "-"}
                </strong>
              )}

            </div>

            {/* ADDRESS */}

            <div className="doctor-profile-field full-width">

              <span>Address</span>

              {isEditing ? (
                <textarea
                  value={editDoctor.address || ""}
                  onChange={(e) =>
                    handleChange(
                      "address",
                      e.target.value
                    )
                  }
                  rows="3"
                />
              ) : (
                <strong>
                  {doctor.address || "-"}
                </strong>
              )}

            </div>

          </div>

          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}

          <div className="doctor-account-section">

            <div className="doctor-section-heading">

              <h3>
                Account Information
              </h3>

              <p>
                Login account details associated
                with your profile.
              </p>

            </div>

            {/* EMAIL */}

            <div className="doctor-account-row">

              <div className="doctor-account-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />

                  <path d="m3 7 9 6 9-6" />
                </svg>

              </div>

              <div>

                <span>Email</span>

                <strong>
                  {doctor.email ||
                    user?.email ||
                    "Not available"}
                </strong>

              </div>

            </div>

            {/* ROLE */}

            <div className="doctor-account-row">

              <div className="doctor-account-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v18" />
                  <path d="M5 8h14" />
                  <path d="M5 16h14" />
                </svg>

              </div>

              <div>

                <span>Role</span>

                <strong>
                  Doctor
                </strong>

              </div>

            </div>

          </div>

          {/* =================================================
              EDIT ACTIONS
          ================================================= */}

          {isEditing && (
            <div className="doctor-profile-actions">

              <button
                type="button"
                className="doctor-cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="doctor-save-button"
                onClick={handleSave}
                disabled={saving}
              >

                {saving ? (
                  <>
                    <span className="doctor-button-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    Save Changes
                  </>
                )}

              </button>

            </div>
          )}

        </section>

      </div>

    </div>
  );
}

export default Profile;