import AdminTable from "../AdminTable";
import { fetchDoctors } from "../adminApi";

function Doctors() {
  return (
    <AdminTable
      title="Doctors"
      subtitle="View and manage all registered hospital doctors"
      icon="👨‍⚕️"
      fetchData={fetchDoctors}
    />
  );
}

export default Doctors;