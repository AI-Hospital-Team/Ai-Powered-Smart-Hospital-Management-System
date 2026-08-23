import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(userData);

      let patientId =
        parsedUser.patientId ||
        parsedUser.patientID ||
        parsedUser.id;

      /*
       * If patientId is not available in localStorage,
       * try to find patient using email.
       */
      if (!patientId && parsedUser.email) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/patients/email/${encodeURIComponent(
              parsedUser.email
            )}`
          );

          if (response.ok) {
            const patientData = await response.json();

            const completeUser = {
              ...parsedUser,
              ...patientData,
              patientId: patientData.patientId,
            };

            setUser(completeUser);
            setFormData(createFormData(completeUser));

            localStorage.setItem(
              "user",
              JSON.stringify(completeUser)
            );

            return;
          }
        } catch (error) {
          console.error("Patient lookup error:", error);
        }
      }

      /*
       * If patientId exists, load latest data from database.
       */
      if (patientId) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/patients/${patientId}`
          );

          if (response.ok) {
            const patientData = await response.json();

            const completeUser = {
              ...parsedUser,
              ...patientData,
              patientId: patientData.patientId,
            };

            setUser(completeUser);
            setFormData(createFormData(completeUser));

            localStorage.setItem(
              "user",
              JSON.stringify(completeUser)
            );

            return;
          }
        } catch (error) {
          console.error("Database profile loading error:", error);
        }
      }

      /*
       * Fallback to localStorage user.
       */
      setUser(parsedUser);
      setFormData(createFormData(parsedUser));
    } catch (error) {
      console.error("Profile loading error:", error);

      setErrorMessage(
        "Unable to load profile. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORM DATA
  // ==========================================

  const createFormData = (data) => ({
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    gender: data?.gender || "",
    dateOfBirth: data?.dateOfBirth || "",
    age: data?.age ?? "",
    bloodGroup: data?.bloodGroup || "",
    address: data?.address || "",
  });

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  // ==========================================
  // START EDIT
  // ==========================================

  const handleEdit = () => {
    setFormData(createFormData(user));

    setEditing(true);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    setFormData(createFormData(user));

    setEditing(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    if (!user?.patientId) {
      setErrorMessage(
        "Patient ID not found. Please login again."
      );
      return;
    }

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (
      formData.phone &&
      !/^[0-9]{10}$/.test(formData.phone.trim())
    ) {
      setErrorMessage(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const updatedPatient = {
        name: formData.name.trim(),
        age:
          formData.age === ""
            ? null
            : Number(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        bloodGroup: formData.bloodGroup,
        dateOfBirth:
          formData.dateOfBirth || null,
      };

      const response = await fetch(
        `http://localhost:8080/api/patients/${user.patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Update failed: ${response.status}`
        );
      }

      const savedPatient = await response.json();

      /*
       * Keep login/user information while
       * replacing patient information.
       */
      const updatedUser = {
        ...user,
        ...savedPatient,
        patientId:
          savedPatient.patientId || user.patientId,
      };

      setUser(updatedUser);
      setFormData(createFormData(updatedUser));

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setEditing(false);

      setSuccessMessage(
        "Profile updated successfully."
      );

      // Remove message after 4 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setErrorMessage(
        "Unable to update profile. Please check that the backend is running."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  // ==========================================
  // NO USER
  // ==========================================

  if (!user) {
    return (
      <div className="profile-error-page">
        <div className="profile-error-card">
          <div className="error-icon">⚠️</div>

          <h2>Profile Not Found</h2>

          <p>
            We could not find your patient profile.
          </p>

          <button
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (
    <div className="profile-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="profile-header">

        <div>
          <span className="profile-header-badge">
            PATIENT ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            View and manage your personal information.
          </p>
        </div>

        {!editing && (
          <button
            className="edit-profile-button"
            onClick={handleEdit}
          >
            ✏️ Edit Profile
          </button>
        )}

      </div>

      {/* ======================================
          MESSAGES
      ====================================== */}

      {successMessage && (
        <div className="profile-message success-message">
          <span>✓</span>
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="profile-message error-message">
          <span>!</span>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* ======================================
          PROFILE CARD
      ====================================== */}

      <div className="profile-container">

        {/* ====================================
            PROFILE TOP
        ==================================== */}

        <div className="profile-top">

          <div className="profile-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "P"}
          </div>

          <div className="profile-name">

            <h2>
              {user.name || "Patient"}
            </h2>

            <p>
              Patient ID:{" "}
              <strong>
                {user.patientId || "N/A"}
              </strong>
            </p>

          </div>

          <div className="profile-status">
            <span></span>
            Active Patient
          </div>

        </div>

        {/* ====================================
            EDIT FORM
        ==================================== */}

        {editing ? (

          <form
            className="profile-edit-form"
            onSubmit={handleSave}
          >

            {/* PERSONAL INFORMATION */}

            <div className="profile-section">

              <div className="section-title-row">
                <div>
                  <h3>Personal Information</h3>
                  <p>
                    Update your personal details below.
                  </p>
                </div>
              </div>

              <div className="profile-form-grid">

                {/* NAME */}

                <div className="profile-input-group">

                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />

                </div>

                {/* EMAIL */}

                <div className="profile-input-group">

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />

                </div>

                {/* PHONE */}

                <div className="profile-input-group">

                  <label htmlFor="phone">
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone"
                  />

                </div>

                {/* GENDER */}

                <div className="profile-input-group">

                  <label htmlFor="gender">
                    Gender
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
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

                </div>

                {/* DATE OF BIRTH */}

                <div className="profile-input-group">

                  <label htmlFor="dateOfBirth">
                    Date of Birth
                  </label>

                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={
                      formData.dateOfBirth || ""
                    }
                    onChange={handleChange}
                  />

                </div>

                {/* AGE */}

                <div className="profile-input-group">

                  <label htmlFor="age">
                    Age
                  </label>

                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    max="150"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                  />

                </div>

                {/* BLOOD GROUP */}

                <div className="profile-input-group">

                  <label htmlFor="bloodGroup">
                    Blood Group
                  </label>

                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Blood Group
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

                </div>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="profile-section">

              <div className="section-title-row">
                <div>
                  <h3>Address</h3>
                  <p>
                    Update your current address.
                  </p>
                </div>
              </div>

              <div className="profile-input-group">

                <label htmlFor="address">
                  Full Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                />

              </div>

            </div>

            {/* ACCOUNT INFORMATION */}

            <div className="profile-section">

              <h3>
                Account Information
              </h3>

              <div className="profile-grid">

                <div className="profile-field readonly-field">

                  <span>Role</span>

                  <strong>
                    {localStorage.getItem("role") ||
                      "Patient"}
                  </strong>

                </div>

                <div className="profile-field readonly-field">

                  <span>Patient ID</span>

                  <strong>
                    {user.patientId || "N/A"}
                  </strong>

                </div>

                <div className="profile-field readonly-field">

                  <span>User ID</span>

                  <strong>
                    {user.userId || "N/A"}
                  </strong>

                </div>

              </div>

            </div>

            {/* ACTION BUTTONS */}

            <div className="profile-form-actions">

              <button
                type="button"
                className="cancel-profile-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-profile-button"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="button-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    ✓ Save Changes
                  </>
                )}
              </button>

            </div>

          </form>

        ) : (

          <>
            {/* ====================================
                PERSONAL INFORMATION VIEW
            ==================================== */}

            <div className="profile-section">

              <div className="section-title-row">

                <div>
                  <h3>
                    Personal Information
                  </h3>

                  <p>
                    Your registered personal details.
                  </p>
                </div>

              </div>

              <div className="profile-grid">

                <div className="profile-field">
                  <span>Full Name</span>
                  <strong>
                    {user.name ||
                      "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Email</span>
                  <strong>
                    {user.email ||
                      "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Phone</span>
                  <strong>
                    {user.phone ||
                      "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Gender</span>
                  <strong>
                    {user.gender ||
                      "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Date of Birth</span>
                  <strong>
                    {user.dateOfBirth ||
                      "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Age</span>
                  <strong>
                    {user.age !== null &&
                    user.age !== undefined &&
                    user.age !== ""
                      ? `${user.age} years`
                      : "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Blood Group</span>
                  <strong className="blood-group">
                    {user.bloodGroup ||
                      "Not available"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Patient ID</span>
                  <strong>
                    {user.patientId ||
                      "Not available"}
                  </strong>
                </div>

              </div>

            </div>

            {/* ====================================
                ADDRESS
            ==================================== */}

            <div className="profile-section">

              <div className="section-title-row">

                <div>
                  <h3>Address</h3>

                  <p>
                    Your registered residential
                    address.
                  </p>
                </div>

              </div>

              <div className="address-box">

                <span className="address-icon">
                  📍
                </span>

                <p>
                  {user.address ||
                    "Address not available"}
                </p>

              </div>

            </div>

            {/* ====================================
                ACCOUNT INFORMATION
            ==================================== */}

            <div className="profile-section">

              <h3>
                Account Information
              </h3>

              <div className="profile-grid">

                <div className="profile-field">
                  <span>Role</span>

                  <strong>
                    {localStorage.getItem("role") ||
                      "Patient"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>User ID</span>

                  <strong>
                    {user.userId ||
                      "Not available"}
                  </strong>
                </div>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default Profile;