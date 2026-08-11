function Prescriptions() {
  return (
    <div className="prescriptions-page">

      <div className="page-header">
        <div>
          <h1>Prescriptions</h1>
          <p>View your prescribed medicines</p>
        </div>
      </div>

      <div className="dashboard-section">

        <h2>My Prescriptions</h2>

        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th>Instructions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>No prescriptions</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

      <div className="dashboard-section">

        <h2>Prescription Information</h2>

        <p>
          Your prescribed medicines and instructions will
          appear here after your doctor creates a prescription.
        </p>

      </div>

    </div>
  );
}

export default Prescriptions;