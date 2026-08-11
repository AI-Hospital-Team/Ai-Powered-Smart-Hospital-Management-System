function MedicalRecords() {
  return (
    <div className="medical-records-page">

      <div className="page-header">
        <div>
          <h1>Medical Records</h1>
          <p>View your medical history and records</p>
        </div>
      </div>

      <div className="dashboard-section">

        <h2>My Medical Records</h2>

        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>No medical records</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
}

export default MedicalRecords;
