import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setEditUser(parsedUser);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEdit = () => {
    setEditUser({ ...user });
    setIsEditing(true);
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setEditUser({ ...user });
    setIsEditing(false);
  };

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (field, value) => {
    setEditUser((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    const updatedUser = {
      ...user,
      phone: editUser.phone,
      gender: editUser.gender,
      dateOfBirth: editUser.dateOfBirth,
      age: editUser.age,
      bloodGroup: editUser.bloodGroup,
      address: editUser.address,
    };

    setUser(updatedUser);
    setEditUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setIsEditing(false);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </div>
    );
  }

  // =====================================================
  // NO USER
  // =====================================================

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          Patient information not found.
          Please login again.
        </div>
      </div>
    );
  }

  const displayUser = isEditing ? editUser : user;

  const fullName =
    user.name ||
    user.fullName ||
    "Patient";

  const initial =
    fullName.charAt(0).toUpperCase();

  return (
    <div className="profile-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="profile-page-header">

        <div className="profile-page-title">

          <div className="profile-title-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div>
            <h1>My Profile</h1>

            <p>
              View your personal and account information.
            </p>
          </div>

        </div>

        {!isEditing && (
          <button
            type="button"
            className="edit-profile-button"
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
          MAIN LAYOUT
      ================================================= */}

      <div className="profile-layout">

        {/* =================================================
            LEFT HEALTH CARD
        ================================================= */}

        <aside className="profile-health-card">

          <div className="health-main-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M20.8 8.8c0 5.3-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.8A4.8 4.8 0 0 1 8 4c1.6 0 3.1.8 4 2.1A4.8 4.8 0 0 1 20.8 8.8Z" />
              <path d="M7 9h2l1.2-2.2L12 13l1.4-3H17" />
            </svg>

          </div>

          <h2>
            Your Health,
            <br />
            Our Priority
          </h2>

          <p className="health-intro">
            Take care of your health today
            for a healthier tomorrow.
          </p>

          {/* EXPERT CARE */}

          <div className="health-feature">

            <div className="health-feature-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 2v4" />
                <path d="M8 6h8" />
                <path d="M6 10h12" />
                <path d="M8 10v5a4 4 0 0 0 8 0v-5" />
                <path d="M4 10h4" />
                <path d="M16 10h4" />
              </svg>

            </div>

            <div>
              <strong>Expert Care</strong>

              <p>
                Keep your medical information
                updated for better care.
              </p>
            </div>

          </div>

          {/* STAY INFORMED */}

          <div className="health-feature">

            <div className="health-feature-icon">

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
                <path d="M8 8h8" />
                <path d="M8 12h5" />
                <path d="M8 16h6" />
              </svg>

            </div>

            <div>
              <strong>Stay Informed</strong>

              <p>
                Keep track of appointments,
                records and prescriptions.
              </p>
            </div>

          </div>

          {/* BETTER CARE */}

          <div className="health-feature">

            <div className="health-feature-icon">

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
              <strong>Better Care</strong>

              <p>
                Your health journey starts
                with good information.
              </p>
            </div>

          </div>

          {/* MOTIVATIONAL MESSAGE */}

          <div className="health-message">

            <span>✦</span>

            <p>
              Stay healthy. Stay informed.
              <br />
              Take care of yourself.
            </p>

          </div>

          {/* DECORATION */}

          <div className="health-decoration">

            <svg
              viewBox="0 0 180 100"
              fill="none"
            >
              <rect
                x="35"
                y="15"
                width="85"
                height="65"
                rx="8"
                stroke="currentColor"
                strokeWidth="7"
              />

              <path
                d="M55 15V8"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />

              <path
                d="M100 15V8"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />

              <circle
                cx="125"
                cy="65"
                r="22"
                stroke="currentColor"
                strokeWidth="6"
              />

              <path
                d="M125 53v13l8 5"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>

          </div>

        </aside>

        {/* =================================================
            RIGHT PROFILE CARD
        ================================================= */}

        <section className="profile-card">

          {/* PROFILE HEADER */}

          <div className="profile-card-top">

            <div className="profile-avatar">
              {initial}
            </div>

            <div className="profile-user-name">

              <h2>
                {fullName}
              </h2>

              <p>
                Patient ID: {user.patientId || "-"}
              </p>

            </div>

            <div className="active-patient">

              <span></span>

              Active Patient

            </div>

          </div>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="profile-section">

            <div className="section-heading">

              <h3>
                Personal Information
              </h3>

              <p>
                Your registered personal details.
              </p>

            </div>

            <div className="profile-grid">

              {/* NAME */}

              <div className="profile-field disabled-field">

                <span>
                  Full Name
                </span>

                <strong>
                  {user.name ||
                    user.fullName ||
                    "-"}
                </strong>

              </div>

              {/* EMAIL */}

              <div className="profile-field disabled-field">

                <span>
                  Email
                </span>

                <strong>
                  {user.email || "-"}
                </strong>

              </div>

              {/* PHONE */}

              <div className="profile-field">

                <span>
                  Phone
                </span>

                {isEditing ? (
                  <input
                    type="text"
                    value={
                      displayUser.phone || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "phone",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {user.phone || "-"}
                  </strong>
                )}

              </div>

              {/* GENDER */}

              <div className="profile-field">

                <span>
                  Gender
                </span>

                {isEditing ? (
                  <select
                    value={
                      displayUser.gender || ""
                    }
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
                    {user.gender || "-"}
                  </strong>
                )}

              </div>

              {/* DATE OF BIRTH */}

              <div className="profile-field">

                <span>
                  Date of Birth
                </span>

                {isEditing ? (
                  <input
                    type="date"
                    value={
                      displayUser.dateOfBirth || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {user.dateOfBirth || "-"}
                  </strong>
                )}

              </div>

              {/* AGE */}

              <div className="profile-field">

                <span>
                  Age
                </span>

                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={
                      displayUser.age || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "age",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {user.age
                      ? `${user.age} years`
                      : "-"}
                  </strong>
                )}

              </div>

              {/* BLOOD GROUP */}

              <div className="profile-field">

                <span>
                  Blood Group
                </span>

                {isEditing ? (
                  <select
                    value={
                      displayUser.bloodGroup || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "bloodGroup",
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="A+">
                      A+
                    </option>

                    <option value="A-">
                      A-
                    </option>

                    <option value="B+">
                      B+
                    </option>

                    <option value="B-">
                      B-
                    </option>

                    <option value="AB+">
                      AB+
                    </option>

                    <option value="AB-">
                      AB-
                    </option>

                    <option value="O+">
                      O+
                    </option>

                    <option value="O-">
                      O-
                    </option>

                  </select>
                ) : (
                  <strong className="blood-value">
                    {user.bloodGroup || "-"}
                  </strong>
                )}

              </div>

              {/* PATIENT ID */}

              <div className="profile-field disabled-field">

                <span>
                  Patient ID
                </span>

                <strong>
                  {user.patientId || "-"}
                </strong>

              </div>

            </div>

          </div>

          {/* =================================================
              ADDRESS
          ================================================= */}

          <div className="profile-section">

            <div className="section-heading">

              <h3>
                Address
              </h3>

              <p>
                Your registered residential address.
              </p>

            </div>

            <div className="address-field">

              <div className="address-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                  />
                </svg>

              </div>

              <div>

                <span>
                  Residential Address
                </span>

                {isEditing ? (
                  <input
                    type="text"
                    value={
                      displayUser.address || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "address",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {user.address || "-"}
                  </strong>
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}

          <div className="profile-section account-section">

            <div className="section-heading">

              <h3>
                Account Information
              </h3>

              <p>
                Basic information about your hospital account.
              </p>

            </div>

            <div className="account-grid">

              {/* ROLE */}

              <div className="account-item">

                <span>
                  Role
                </span>

                <strong>
                  {user.role || "Patient"}
                </strong>

              </div>

              {/* PATIENT ID */}

              <div className="account-item">

                <span>
                  Patient ID
                </span>

                <strong>
                  {user.patientId || "-"}
                </strong>

              </div>

              {/* USER ID */}

              <div className="account-item">

                <span>
                  User ID
                </span>

                <strong>
                  {user.userId || "-"}
                </strong>

              </div>

              {/* STATUS */}

              <div className="account-item account-active">

                <span>
                  Account Status
                </span>

                <strong>
                  Active
                </strong>

              </div>

            </div>

          </div>

          {/* =================================================
              EDIT ACTIONS
          ================================================= */}

          {isEditing && (
            <div className="profile-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="save-button"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>
          )}

        </section>

      </div>

    </div>
  );
}

export default Profile;