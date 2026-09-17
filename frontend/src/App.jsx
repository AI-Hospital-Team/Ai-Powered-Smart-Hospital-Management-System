import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  useDarkMode,
} from "./theme/DarkMode";

/* =========================================================
   PUBLIC PAGES
========================================================= */

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Login from "./pages/Login/Login";
import AIHealthAssistant from "./pages/AIHealthAssistant/AIHealthAssistant";

/* =========================================================
   LAYOUT / PROTECTION
========================================================= */

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

/* =========================================================
   ADMIN PAGES
========================================================= */

import Dashboard from "./pages/Admin/Dashboard";
import AdminPatients from "./pages/Admin/Patients/Patients";
import AdminDoctors from "./pages/Admin/Doctors/Doctors";
import AdminAppointments from "./pages/Admin/Appointments/Appointments";
import AdminMedicalRecords from "./pages/Admin/MedicalRecords/MedicalRecords";
import AdminPrescriptions from "./pages/Admin/Prescriptions/Prescriptions";
import AdminBills from "./pages/Admin/Bills/Bills";
import AdminLogs from "./pages/Admin/Logs/Logs";

/* =========================================================
   DOCTOR PAGES
========================================================= */

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/Appointments/Appointments";
import DoctorPatients from "./pages/Doctor/Patients/Patients";
import DoctorMedicalRecords from "./pages/Doctor/MedicalRecords/MedicalRecords";
import DoctorPrescriptions from "./pages/Doctor/Prescriptions/Prescriptions";
import DoctorProfile from "./pages/Doctor/Profile/Profile";

/* =========================================================
   PATIENT PAGES
========================================================= */

import PatientDashboard from "./pages/Patient/PatientDashboard";
import Appointments from "./pages/Patient/Appointments/Appointments";
import BookAppointment from "./pages/Patient/BookAppointment/BookAppointment";
import MedicalRecords from "./pages/Patient/MedicalRecords/MedicalRecords";
import Prescriptions from "./pages/Patient/Prescriptions/Prescriptions";
import Profile from "./pages/Patient/Profile/Profile";
import Bills from "./pages/Patient/Bills/Bills";

/* =========================================================
   APP
========================================================= */

function App() {
  /*
   * GLOBAL DARK MODE
   *
   * This hook stays mounted while React Router changes pages.
   * Therefore dark mode is maintained across:
   *
   * Home
   * Login
   * Admin
   * Doctor
   * Patient
   */
  useDarkMode();

  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/project"
          element={<Project />}
        />

        <Route
          path="/ai-health-assistant"
          element={<AIHealthAssistant />}
        />

        {/* =================================================
            ADMIN ROUTES
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="patients"
            element={<AdminPatients />}
          />

          <Route
            path="doctors"
            element={<AdminDoctors />}
          />

          <Route
            path="appointments"
            element={<AdminAppointments />}
          />

          <Route
            path="medical-records"
            element={<AdminMedicalRecords />}
          />

          <Route
            path="prescriptions"
            element={<AdminPrescriptions />}
          />

          <Route
            path="bills"
            element={<AdminBills />}
          />

          <Route
            path="logs"
            element={<AdminLogs />}
          />
        </Route>

        {/* =================================================
            DOCTOR ROUTES
        ================================================= */}

        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["Doctor"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DoctorDashboard />}
          />

          <Route
            path="appointments"
            element={<DoctorAppointments />}
          />

          <Route
            path="patients"
            element={<DoctorPatients />}
          />

          <Route
            path="medical-records"
            element={<DoctorMedicalRecords />}
          />

          <Route
            path="prescriptions"
            element={<DoctorPrescriptions />}
          />

          <Route
            path="profile"
            element={<DoctorProfile />}
          />
        </Route>

        {/* =================================================
            PATIENT ROUTES
        ================================================= */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<PatientDashboard />}
          />

          <Route
            path="appointments"
            element={<Appointments />}
          />

          <Route
            path="book-appointment"
            element={<BookAppointment />}
          />

          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="bills"
            element={<Bills />}
          />
        </Route>

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;