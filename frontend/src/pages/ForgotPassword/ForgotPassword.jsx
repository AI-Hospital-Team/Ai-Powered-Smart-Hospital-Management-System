import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  // =====================================================
  // STEP
  // 1 = Enter Email / Send Request
  // 2 = Waiting for Admin Approval
  // 3 = Enter Request Code + New Password
  // =====================================================

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [requestCode, setRequestCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "http://localhost:8080/api/auth";

  // =====================================================
  // STEP 1
  // CREATE PASSWORD RESET REQUEST
  // =====================================================

  const handleCreateRequest = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage("Please enter your registered email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/password-reset/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(
          typeof data === "string"
            ? data
            : "Unable to create password reset request."
        );
        return;
      }

      /*
       * The backend returns:
       * email
       * role
       * requestCode
       * requestId
       * requestedAt
       * reviewedAt
       * status
       */

      if (data.requestCode) {
        setRequestCode(data.requestCode);
      }

      setMessage(
        "Password reset request submitted successfully. Please wait for Admin approval."
      );

      setStep(2);

    } catch (error) {
      console.error(
        "PASSWORD RESET REQUEST ERROR:",
        error
      );

      setErrorMessage(
        "Cannot connect to the hospital server. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STEP 2
  // CONTINUE AFTER ADMIN APPROVAL
  // =====================================================

  const handleContinueToReset = () => {
    setMessage("");
    setErrorMessage("");
    setStep(3);
  };

  // =====================================================
  // STEP 3
  // RESET PASSWORD
  // =====================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    const cleanEmail = email.trim();
    const cleanRequestCode = requestCode.trim();

    if (!cleanEmail) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!cleanRequestCode) {
      setErrorMessage("Please enter your request code.");
      return;
    }

    if (!newPassword.trim()) {
      setErrorMessage("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/password-reset/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            requestCode: cleanRequestCode,
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        setErrorMessage(
          data || "Unable to reset password."
        );
        return;
      }

      setMessage(
        "Password reset successfully. You can now login with your new password."
      );

      setNewPassword("");
      setConfirmPassword("");

    setTimeout(() => {
      navigate("/");
    }, 1500);

    } catch (error) {
      console.error(
        "RESET PASSWORD ERROR:",
        error
      );

      setErrorMessage(
        "Cannot connect to the hospital server. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CHANGE EMAIL
  // =====================================================

  const handleChangeEmail = () => {
    setStep(1);

    setEmail("");
    setRequestCode("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage("");
    setErrorMessage("");
  };

  // =====================================================
  // BACK TO LOGIN
  // =====================================================

 const handleBackToLogin = () => {
  navigate("/", {
    state: {
      openLogin: true,
      role: "Patient",
    },
  });
}; 

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="forgot-password-page">

      <div className="forgot-password-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="forgot-password-header">

          <div className="forgot-password-icon">
            🔐
          </div>

          <h1>
            Reset Password
          </h1>

          <p>
            AI Hospital Management System
          </p>

        </div>

        {/* =================================================
            STEP INDICATOR
        ================================================= */}

        <div className="reset-steps">

          <div
            className={
              step >= 1
                ? "reset-step active"
                : "reset-step"
            }
          >
            <span>1</span>
            <small>Request</small>
          </div>

          <div className="step-line"></div>

          <div
            className={
              step >= 2
                ? "reset-step active"
                : "reset-step"
            }
          >
            <span>2</span>
            <small>Approval</small>
          </div>

          <div className="step-line"></div>

          <div
            className={
              step >= 3
                ? "reset-step active"
                : "reset-step"
            }
          >
            <span>3</span>
            <small>Password</small>
          </div>

        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="forgot-success">
            {message}
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {errorMessage && (
          <div className="forgot-error">
            {errorMessage}
          </div>
        )}

        {/* =================================================
            STEP 1 - EMAIL / CREATE REQUEST
        ================================================= */}

        {step === 1 && (
          <form
            className="forgot-password-form"
            onSubmit={handleCreateRequest}
          >

            <h2>
              Forgot your password?
            </h2>

            <p className="form-description">
              Enter your registered email address
              to submit a password reset request
              to the Admin.
            </p>

            <div className="form-group">

              <label htmlFor="reset-email">
                Email Address
              </label>

              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your registered email"
                autoComplete="email"
                required
              />

            </div>

            <button
              type="submit"
              className="reset-button"
              disabled={loading}
            >
              {loading
                ? "Submitting Request..."
                : "Submit Reset Request"}
            </button>

          </form>
        )}

        {/* =================================================
            STEP 2 - WAITING FOR ADMIN APPROVAL
        ================================================= */}

        {step === 2 && (
          <div className="forgot-password-form">

            <h2>
              Request Submitted
            </h2>

            <p className="form-description">
              Your password reset request has been
              submitted to the Admin.
            </p>

            <div className="reset-email-display">
              {email}
            </div>

            {/* Request Code */}

            {requestCode && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "15px",
                  borderRadius: "10px",
                  background: "#f3f4f6",
                  textAlign: "center",
                }}
              >

                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Your Request Code
                </p>

                <strong
                  style={{
                    fontSize: "24px",
                    letterSpacing: "3px",
                  }}
                >
                  {requestCode}
                </strong>

                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: "0",
                    fontSize: "12px",
                  }}
                >
                  Keep this code safe. You will need it
                  after Admin approval.
                </p>

              </div>
            )}

            {/* Pending Information */}

            <div
              style={{
                marginTop: "18px",
                padding: "14px",
                borderRadius: "10px",
                background: "#fff7ed",
                color: "#9a3412",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              ⏳ Waiting for Admin approval
            </div>

            {/* Continue */}

            <button
              type="button"
              className="reset-button"
              onClick={handleContinueToReset}
              style={{
                marginTop: "18px",
              }}
            >
              Continue to Password Reset
            </button>

            {/* Change Email */}

            <button
              type="button"
              className="secondary-button"
              onClick={handleChangeEmail}
            >
              Change Email
            </button>

          </div>
        )}

        {/* =================================================
            STEP 3 - NEW PASSWORD
        ================================================= */}

        {step === 3 && (
          <form
            className="forgot-password-form"
            onSubmit={handleResetPassword}
          >

            <h2>
              Create New Password
            </h2>

            <p className="form-description">
              Enter the request code provided when
              you submitted your reset request and
              create your new password.
            </p>

            {/* Email */}

            <div className="form-group">

              <label htmlFor="reset-email-display">
                Email Address
              </label>

              <input
                id="reset-email-display"
                type="email"
                value={email}
                readOnly
              />

            </div>

            {/* Request Code */}

            <div className="form-group">

              <label htmlFor="request-code">
                Request Code
              </label>

              <input
                id="request-code"
                type="text"
                value={requestCode}
                onChange={(e) =>
                  setRequestCode(
                    e.target.value
                      .toUpperCase()
                      .slice(0, 8)
                  )
                }
                placeholder="Enter request code"
                maxLength={8}
                autoComplete="off"
                required
              />

            </div>

            {/* New Password */}

            <div className="form-group">

              <label htmlFor="new-password">
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                autoComplete="new-password"
                required
              />

            </div>

            {/* Confirm Password */}

            <div className="form-group">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
              />

            </div>

            <button
              type="submit"
              className="reset-button"
              disabled={loading}
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setStep(2);
                setMessage("");
                setErrorMessage("");
              }}
            >
              ← Back
            </button>

          </form>
        )}

        {/* =================================================
            BACK TO LOGIN
        ================================================= */}

        <button
          type="button"
          className="back-login-button"
          onClick={handleBackToLogin}
        >
          ← Back to Login
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;