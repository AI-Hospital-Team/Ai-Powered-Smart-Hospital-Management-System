import AdminTable from "../AdminTable";
import { fetchPatients } from "../adminApi";

function Patients() {
  return (
    <AdminTable
      title="Patients"
      subtitle="View and manage all registered hospital patients"
      icon="👥"
      fetchData={fetchPatients}
    />
  );
}

export default Patients;