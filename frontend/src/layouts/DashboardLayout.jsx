import {
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";

import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-layout">

      <header className="topbar">

        <div>
          <h1>AI Smart Hospital</h1>
          <span>{role} Dashboard</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      <main className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default DashboardLayout;