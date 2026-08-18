import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Home from "./pages/Home/Home";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* Doctor Dashboard */}
        <Route path="/doctor" element={<DashboardLayout />}>
          <Route index element={<DoctorDashboard />} />
        </Route>

        {/* Patient Dashboard */}
        <Route path="/patient" element={<DashboardLayout />}>

          {/* /patient */}
          <Route index element={<PatientDashboard />} />

          {/* /patient/appointments */}
          <Route
            path="appointments"
            element={<Appointments />}
          />

          {/* /patient/book-appointment */}
          <Route
            path="book-appointment"
            element={<BookAppointment />}
          />

          {/* /patient/medical-records */}
          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          {/* /patient/prescriptions */}
          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

          {/* /patient/profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* /patient/bills */}
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