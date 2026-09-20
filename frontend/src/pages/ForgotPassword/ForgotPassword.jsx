import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "http://localhost:8080/api/auth";

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSendOtp = async (e) => {
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
        `${API_URL}/forgot-password`,
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

      const data = await response.text();

      if (!response.ok) {
        setErrorMessage(
          data || "Unable to send OTP."
        );
        return;
      }

      setMessage(
        "OTP has been sent to your registered email."
      );

      setStep(2);

    } catch (error) {
      console.error("SEND OTP ERROR:", error);

      setErrorMessage(
        "Cannot connect to the hospital server. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    const cleanOtp = otp.trim();

    if (!cleanOtp) {
      setErrorMessage("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(cleanOtp)) {
      setErrorMessage("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/verify-reset-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            otp: cleanOtp,
          }),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        setErrorMessage(
          data || "Invalid OTP."
        );
        return;
      }

      setMessage("OTP verified successfully.");

      setStep(3);

    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      setErrorMessage(
        "Cannot connect to the hospital server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

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
        `${API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            otp: otp.trim(),
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

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(
        "RESET PASSWORD ERROR:",
        error
      );

      setErrorMessage(
        "Cannot connect to the hospital server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // BACK TO LOGIN
  // =====================================================

  const handleBackToLogin = () => {
    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="forgot-password-page">

      <div className="forgot-password-container">

        {/* HEADER */}

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

        {/* STEP INDICATOR */}

        <div className="reset-steps">

          <div
            className={
              step >= 1
                ? "reset-step active"
                : "reset-step"
            }
          >
            <span>1</span>
            <small>Email</small>
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
            <small>OTP</small>
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

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="forgot-success">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {errorMessage && (
          <div className="forgot-error">
            {errorMessage}
          </div>
        )}

        {/* =================================================
            STEP 1 - EMAIL
        ================================================= */}

        {step === 1 && (
          <form
            className="forgot-password-form"
            onSubmit={handleSendOtp}
          >

            <h2>
              Forgot your password?
            </h2>

            <p className="form-description">
              Enter your registered email address
              and we will send you a 6-digit OTP.
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
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          </form>
        )}

        {/* =================================================
            STEP 2 - OTP
        ================================================= */}

        {step === 2 && (
          <form
            className="forgot-password-form"
            onSubmit={handleVerifyOtp}
          >

            <h2>
              Verify OTP
            </h2>

            <p className="form-description">
              Enter the 6-digit OTP sent to:
            </p>

            <p className="reset-email-display">
              {email}
            </p>

            <div className="form-group">

              <label htmlFor="reset-otp">
                OTP
              </label>

              <input
                id="reset-otp"
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                required
              />

            </div>

            <button
              type="submit"
              className="reset-button"
              disabled={loading}
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setMessage("");
                setErrorMessage("");
              }}
            >
              Change Email
            </button>

          </form>
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
              Enter your new password below.
            </p>

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

          </form>
        )}

        {/* BACK TO LOGIN */}

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