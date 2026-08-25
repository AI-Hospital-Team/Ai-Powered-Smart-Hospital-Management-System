import "./ConfirmModal.css";

function ConfirmModal({
  isOpen,
  variant = "normal",

  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  warning = "",

  confirmText = "Confirm",
  cancelText = "Cancel",

  onConfirm,
  onCancel,

  loading = false,
}) {
  if (!isOpen) {
    return null;
  }

  const isDanger = variant === "danger";

  return (
    <div
      className="confirm-modal-overlay"
      onClick={onCancel}
    >
      <div
        className="confirm-modal"
        onClick={(event) => event.stopPropagation()}
      >

        {/* =================================================
            ICON
        ================================================= */}

        <div
          className={`confirm-modal-icon ${
            isDanger
              ? "confirm-modal-danger"
              : "confirm-modal-normal"
          }`}
        >
          {isDanger ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 7h12" />
              <path d="M9 7V4h6v3" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M5 7l1 14h12l1-14" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M12 10v6" />
              <path d="M12 7.5v.5" />
            </svg>
          )}
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="confirm-modal-content">

          <h2>
            {title}
          </h2>

          <p className="confirm-modal-message">
            {message}
          </p>

          {warning && (
            <p className="confirm-modal-warning">
              {warning}
            </p>
          )}

        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="confirm-modal-actions">

          <button
            type="button"
            className="confirm-modal-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`confirm-modal-confirm ${
              isDanger
                ? "danger-button"
                : "normal-button"
            }`}
            onClick={onConfirm}
            disabled={loading}
          >

            {/* Trash icon for danger actions */}

            {isDanger && !loading && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="17"
                height="17"
              >
                <path d="M6 7h12" />
                <path d="M9 7V4h6v3" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M5 7l1 14h12l1-14" />
              </svg>
            )}

            {loading
              ? "Processing..."
              : confirmText}

          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;