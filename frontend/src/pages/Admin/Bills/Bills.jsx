import AdminTable from "../AdminTable";
import {
  fetchBills,
  updateBillStatus,
} from "../adminApi";

function Bills() {
  return (
    <AdminTable
      title="Bills"
      subtitle="View and manage all hospital billing records"
      icon="💰"
      fetchData={fetchBills}
      statusType="bill"
      onStatusUpdate={updateBillStatus}
    />
  );
}

export default Bills;