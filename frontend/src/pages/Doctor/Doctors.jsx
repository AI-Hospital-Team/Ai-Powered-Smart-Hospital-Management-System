import AdminTable from "../AdminTable";
import {
  fetchDoctors,
  approveDoctor,
  rejectDoctor,
} from "../adminApi";

function Doctors() {
  const handleApprove = async (doctorId) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this doctor?"
    );

    if (!confirmed) {
      return null;
    }

    return approveDoctor(doctorId);
  };

  const handleReject = async (doctorId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this doctor?"
    );

    if (!confirmed) {
      return null;
    }

    return rejectDoctor(doctorId);
  };

  return (
    <AdminTable
      title="Doctors"
      subtitle="View and manage all registered hospital doctors"
      icon="👨‍⚕️"
      fetchData={fetchDoctors}
      doctorActions={{
        onApprove: handleApprove,
        onReject: handleReject,
      }}
    />
  );
}

export default Doctors;