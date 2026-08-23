import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Profile loading error:", error);
      navigate("/login");
    } finally {
      setLoading(false);
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
    return null;
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
          <h1>My Profile</h1>

          <p>
            View and manage your personal information.
          </p>
        </div>

      </div>

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
              {user.patientId || "N/A"}
            </p>

          </div>

        </div>

        {/* ====================================
            PERSONAL INFORMATION
        ==================================== */}

        <div className="profile-section">

          <h3>
            Personal Information
          </h3>

          <div className="profile-grid">

            <div className="profile-field">
              <span>Full Name</span>

              <strong>
                {user.name || "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Email</span>

              <strong>
                {user.email || "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Phone</span>

              <strong>
                {user.phone || "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Gender</span>

              <strong>
                {user.gender || "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Date of Birth</span>

              <strong>
                {user.dateOfBirth || "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Age</span>

              <strong>
                {user.age
                  ? `${user.age} years`
                  : "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Blood Group</span>

              <strong className="blood-group">
                {user.bloodGroup || "Not available"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Patient ID</span>

              <strong>
                {user.patientId || "Not available"}
              </strong>
            </div>

          </div>

        </div>

        {/* ====================================
            ADDRESS
        ==================================== */}

        <div className="profile-section">

          <h3>
            Address
          </h3>

          <div className="address-box">

            <span className="address-icon">
              📍
            </span>

            <p>
              {user.address || "Address not available"}
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
                {user.userId || "Not available"}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;