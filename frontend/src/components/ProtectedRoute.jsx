import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    localStorage.getItem("role");

  /* ==========================================
     NOT LOGGED IN
     → HOME
  ========================================== */

  if (!isLoggedIn || !role) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }


  /* ==========================================
     ROLE PROTECTION
  ========================================== */

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {

    if (role === "Admin") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }


    if (role === "Doctor") {
      return (
        <Navigate
          to="/doctor"
          replace
        />
      );
    }


    if (role === "Patient") {
      return (
        <Navigate
          to="/patient"
          replace
        />
      );
    }


    /* Unknown role */

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  /* ==========================================
     ACCESS GRANTED
  ========================================== */

  return children;
}


export default ProtectedRoute;