import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Admin/Dashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

import PatientDashboard from "./pages/Patient/PatientDashboard";
import Appointments from "./pages/Patient/Appointments/Appointments";
import BookAppointment from "./pages/Patient/BookAppointment/BookAppointment";
import MedicalRecords from "./pages/Patient/MedicalRecords/MedicalRecords";
import Prescriptions from "./pages/Patient/Prescriptions/Prescriptions";
import Profile from "./pages/Patient/Profile/Profile";
import Bills from "./pages/Patient/Bills/Bills";
import Notifications from "./pages/Patient/Notifications/Notifications";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Doctor Dashboard */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
        </Route>

        {/* Patient Dashboard */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* Patient Dashboard */}
          <Route
            index
            element={<PatientDashboard />}
          />

          {/* Patient Appointments */}
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

          {/* Patient Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Patient Bills */}
          <Route
            path="bills"
            element={<Bills />}
          />

          {/* Patient Notifications */}
          <Route
            path="notifications"
            element={<Notifications />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;