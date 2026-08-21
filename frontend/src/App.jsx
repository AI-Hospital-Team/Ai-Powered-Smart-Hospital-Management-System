import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Admin/Dashboard";

import AdminPatients from "./pages/Admin/Patients/Patients";
import AdminDoctors from "./pages/Admin/Doctors/Doctors";
import AdminAppointments from "./pages/Admin/Appointments/Appointments";
import AdminMedicalRecords from "./pages/Admin/MedicalRecords/MedicalRecords";
import AdminPrescriptions from "./pages/Admin/Prescriptions/Prescriptions";
import AdminBills from "./pages/Admin/Bills/Bills";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
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

        {/* ==============================
            HOME
        ============================== */}

        <Route path="/" element={<Home />} />

        {/* ==============================
            LOGIN
        ============================== */}

        <Route path="/login" element={<Login />} />

        {/* ==============================
            OTHER PAGES
        ============================== */}

        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />

        {/* ==============================
            ADMIN DASHBOARD
        ============================== */}

        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Admin Dashboard */}
          <Route index element={<Dashboard />} />

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

        </Route>

        {/* ==============================
            DOCTOR DASHBOARD
        ============================== */}

        <Route path="/doctor" element={<DashboardLayout />}>
          <Route index element={<DoctorDashboard />} />
        </Route>

        {/* ==============================
            PATIENT DASHBOARD
        ============================== */}

        <Route path="/patient" element={<DashboardLayout />}>

          <Route index element={<PatientDashboard />} />

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;