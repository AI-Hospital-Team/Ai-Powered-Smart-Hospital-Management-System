import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Home from "./pages/Home/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

/* ==============================
   ADMIN PAGES
============================== */

import Dashboard from "./pages/Admin/Dashboard";

import AdminPatients from "./pages/Admin/Patients/Patients";
import AdminDoctors from "./pages/Admin/Doctors/Doctors";
import AdminAppointments from "./pages/Admin/Appointments/Appointments";
import AdminMedicalRecords from "./pages/Admin/MedicalRecords/MedicalRecords";
import AdminPrescriptions from "./pages/Admin/Prescriptions/Prescriptions";
import AdminBills from "./pages/Admin/Bills/Bills";

/* ==============================
   DOCTOR
============================== */

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

/* ==============================
   PATIENT
============================== */

import PatientDashboard from "./pages/Patient/PatientDashboard";

import Appointments from "./pages/Patient/Appointments/Appointments";
import BookAppointment from "./pages/Patient/BookAppointment/BookAppointment";
import MedicalRecords from "./pages/Patient/MedicalRecords/MedicalRecords";
import Prescriptions from "./pages/Patient/Prescriptions/Prescriptions";
import Profile from "./pages/Patient/Profile/Profile";
import Bills from "./pages/Patient/Bills/Bills";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            PUBLIC HOME
        ===================================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =====================================================
            LOGIN
        ===================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =====================================================
            ABOUT
        ===================================================== */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* =====================================================
            PROJECT
        ===================================================== */}

        <Route
          path="/project"
          element={<Project />}
        />


        {/* =====================================================
            ADMIN DASHBOARD
            ONLY ADMIN CAN ACCESS
        ===================================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* Admin Dashboard Home */}

          <Route
            index
            element={<Dashboard />}
          />


          {/* Admin Patients */}

          <Route
            path="patients"
            element={<AdminPatients />}
          />


          {/* Admin Doctors */}

          <Route
            path="doctors"
            element={<AdminDoctors />}
          />


          {/* Admin Appointments */}

          <Route
            path="appointments"
            element={<AdminAppointments />}
          />


          {/* Admin Medical Records */}

          <Route
            path="medical-records"
            element={<AdminMedicalRecords />}
          />


          {/* Admin Prescriptions */}

          <Route
            path="prescriptions"
            element={<AdminPrescriptions />}
          />


          {/* Admin Bills */}

          <Route
            path="bills"
            element={<AdminBills />}
          />

        </Route>


        {/* =====================================================
            DOCTOR DASHBOARD
            ONLY DOCTOR CAN ACCESS
        ===================================================== */}

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

        </Route>


        {/* =====================================================
            PATIENT DASHBOARD
            ONLY PATIENT CAN ACCESS
        ===================================================== */}

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


        {/* =====================================================
            UNKNOWN URL
            REDIRECT TO HOME
        ===================================================== */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;