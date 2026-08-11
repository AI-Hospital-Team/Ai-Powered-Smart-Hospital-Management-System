function Bills() {
  return (
    <div className="bills-page">

      <div className="page-header">
        <div>
          <h1>My Bills</h1>
          <p>View your hospital bills and payment status</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">₹</div>
          <div>
            <h3>Total Bills</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">₹</div>
          <div>
            <h3>Pending Amount</h3>
            <p>₹0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">✓</div>
          <div>
            <h3>Paid Bills</h3>
            <p>0</p>
          </div>
        </div>

      </div>

      <div className="dashboard-section">

        <h2>Billing History</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>No bills</td>
                <td>-</td>
                <td>-</td>
                <td>₹0</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div className="dashboard-section">

        <h2>Payment Information</h2>

        <p>
          Your hospital bills and payment details will appear here.
          You will be able to view bill amounts, payment status and
          billing history.
        </p>

      </div>

    </div>
  );
}

export default Bills;