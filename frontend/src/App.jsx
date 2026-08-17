import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Admin/Dashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import PatientDashboard from "./pages/Patient/PatientDashboard";

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
          <Route index element={<PatientDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;