import AdminTable from "../AdminTable";
import {
  fetchAppointments,
  updateAppointmentStatus,
} from "../adminApi";

function Appointments() {
  return (
    <AdminTable
      title="Appointments"
      subtitle="View and manage all hospital appointments"
      icon="📅"
      fetchData={fetchAppointments}
      statusType="appointment"
      onStatusUpdate={updateAppointmentStatus}
    />
  );
}

export default Appointments;