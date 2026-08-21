import AdminTable from "../AdminTable";
import { fetchPrescriptions } from "../adminApi";

function Prescriptions() {
  return (
    <AdminTable
      title="Prescriptions"
      subtitle="View all prescriptions issued by hospital doctors"
      icon="💊"
      fetchData={fetchPrescriptions}
    />
  );
}

export default Prescriptions;