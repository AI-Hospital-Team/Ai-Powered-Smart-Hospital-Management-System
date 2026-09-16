import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          {/* Admin Dashboard */}

          <Route
            index
            element={<Dashboard />}
          />

          {/* Patients */}

          <Route
            path="patients"
            element={<AdminPatients />}
          />

          {/* Doctors */}

          <Route
            path="doctors"
            element={<AdminDoctors />}
          />

          {/* Appointments */}

          <Route
            path="appointments"
            element={<AdminAppointments />}
          />

          {/* Medical Records */}

          <Route
            path="medical-records"
            element={<AdminMedicalRecords />}
          />

          {/* Prescriptions */}

          <Route
            path="prescriptions"
            element={<AdminPrescriptions />}
          />

          {/* Bills */}

          <Route
            path="bills"
            element={<AdminBills />}
          />

          {/* Admin Logs */}

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
          {/* Doctor Dashboard */}

          <Route
            index
            element={<DoctorDashboard />}
          />

          {/* Appointments */}

          <Route
            path="appointments"
            element={<DoctorAppointments />}
          />

          {/* Patients */}

          <Route
            path="patients"
            element={<DoctorPatients />}
          />

          {/* Medical Records */}

          <Route
            path="medical-records"
            element={<DoctorMedicalRecords />}
          />

          {/* Prescriptions */}

          <Route
            path="prescriptions"
            element={<DoctorPrescriptions />}
          />

          {/* Profile */}

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
          {/* Patient Dashboard */}

          <Route
            index
            element={<PatientDashboard />}
          />

          {/* Appointments */}

          <Route
            path="appointments"
            element={<Appointments />}
          />

          {/* Book Appointment */}

          <Route
            path="book-appointment"
            element={<BookAppointment />}
          />

          {/* Medical Records */}

          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          {/* Prescriptions */}

          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

          {/* Profile */}

          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Bills */}

          <Route
            path="bills"
            element={<Bills />}
          />
        </Route>

        {/* =================================================
            FALLBACK ROUTE
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