import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your personal information</p>
        </div>
      </div>

      <div className="profile-container">

        <div className="profile-card">
          <div className="profile-avatar">
            P
          </div>

          <h2>Patient</h2>
          <p>Patient Account</p>
        </div>

        <div className="profile-details">

          <h2>Personal Information</h2>

          <div className="profile-grid">

            <div className="profile-field">
              <label>Full Name</label>
              <p>Patient</p>
            </div>

            <div className="profile-field">
              <label>Email</label>
              <p>patient@example.com</p>
            </div>

            <div className="profile-field">
              <label>Phone</label>
              <p>Not provided</p>
            </div>

            <div className="profile-field">
              <label>Date of Birth</label>
              <p>Not provided</p>
            </div>

            <div className="profile-field">
              <label>Gender</label>
              <p>Not provided</p>
            </div>

            <div className="profile-field">
              <label>Blood Group</label>
              <p>Not provided</p>
            </div>

          </div>

          <div className="profile-address">
            <label>Address</label>
            <p>Not provided</p>
          </div>

          <button className="edit-profile-btn">
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;