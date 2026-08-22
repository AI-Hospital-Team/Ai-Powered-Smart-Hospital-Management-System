import AdminTable from "../AdminTable";
import { fetchMedicalRecords } from "../adminApi";

function MedicalRecords() {
  return (
    <AdminTable
      title="Medical Records"
      subtitle="View all patient medical records and treatment information"
      icon="📋"
      fetchData={fetchMedicalRecords}
    />
  );
}

export default MedicalRecords;