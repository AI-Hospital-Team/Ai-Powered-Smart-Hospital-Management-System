import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: "📅",
      title: "Book Appointment",
      description:
        "Book an appointment with a doctor according to your preferred date and time.",
      path: "/patient/book-appointment",
      button: "Book Now",
    },
    {
      icon: "🩺",
      title: "Appointments",
      description:
        "View your upcoming and previous doctor appointments.",
      path: "/patient/appointments",
      button: "View Appointments",
    },
    {
      icon: "📋",
      title: "Medical Records",
      description:
        "Access your medical history, diagnosis and treatment records.",
      path: "/patient/medical-records",
      button: "View Records",
    },
    {
      icon: "💊",
      title: "Prescriptions",
      description:
        "View medicines and prescriptions provided by your doctor.",
      path: "/patient/prescriptions",
      button: "View Prescriptions",
    },
    {
      icon: "💳",
      title: "Bills",
      description:
        "View your hospital bills and payment information.",
      path: "/patient/bills",
      button: "View Bills",
    },
    {
      icon: "🔔",
      title: "Notifications",
      description:
        "Stay updated with appointments, prescriptions and hospital updates.",
      path: "/patient/notifications",
      button: "View Notifications",
    },
    {
      icon: "👤",
      title: "My Profile",
      description:
        "View your personal information and patient details.",
      path: "/patient/profile",
      button: "View Profile",
    },
  ];

  return (
    <div className="services-page">

      {/* HEADER */}
      <div className="services-header">

        <div>
          <h1>Healthcare Services</h1>

          <p>
            Manage all your healthcare services from one place.
          </p>
        </div>

        <button
          className="services-back-btn"
          onClick={() => navigate("/patient")}
        >
          ← Dashboard
        </button>

      </div>

      {/* SERVICES */}
      <div className="services-grid">

        {services.map((service) => (
          <div
            className="service-card"
            key={service.title}
          >

            <div className="service-icon">
              {service.icon}
            </div>

            <h2>
              {service.title}
            </h2>

            <p>
              {service.description}
            </p>

            <button
              onClick={() => navigate(service.path)}
            >
              {service.button}
              <span> →</span>
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Services;