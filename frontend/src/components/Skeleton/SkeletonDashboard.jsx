import Skeleton from "./Skeleton";

function SkeletonDashboard() {
  return (
    <div className="skeleton-dashboard">

      {/* Welcome Header */}
      <div className="skeleton-dashboard-header">
        <div className="skeleton-dashboard-welcome">
          <Skeleton type="title" className="skeleton-welcome-title" />
          <Skeleton type="subtitle" className="skeleton-welcome-subtitle" />
          <Skeleton type="text" className="skeleton-welcome-description" />
        </div>

        <Skeleton
          type="button"
          className="skeleton-refresh-button"
        />
      </div>

      {/* Statistics */}
      <div className="skeleton-dashboard-stats">

        <div className="skeleton-stat-card">
          <Skeleton type="avatar" className="skeleton-stat-icon" />
          <div className="skeleton-stat-content">
            <Skeleton type="text" className="skeleton-stat-label" />
            <Skeleton type="title" className="skeleton-stat-number" />
            <Skeleton type="text" className="skeleton-stat-small" />
          </div>
        </div>

        <div className="skeleton-stat-card">
          <Skeleton type="avatar" className="skeleton-stat-icon" />
          <div className="skeleton-stat-content">
            <Skeleton type="text" className="skeleton-stat-label" />
            <Skeleton type="title" className="skeleton-stat-number" />
            <Skeleton type="text" className="skeleton-stat-small" />
          </div>
        </div>

        <div className="skeleton-stat-card">
          <Skeleton type="avatar" className="skeleton-stat-icon" />
          <div className="skeleton-stat-content">
            <Skeleton type="text" className="skeleton-stat-label" />
            <Skeleton type="title" className="skeleton-stat-number" />
            <Skeleton type="text" className="skeleton-stat-small" />
          </div>
        </div>

        <div className="skeleton-stat-card">
          <Skeleton type="avatar" className="skeleton-stat-icon" />
          <div className="skeleton-stat-content">
            <Skeleton type="text" className="skeleton-stat-label" />
            <Skeleton type="title" className="skeleton-stat-number" />
            <Skeleton type="text" className="skeleton-stat-small" />
          </div>
        </div>

      </div>

      {/* Main Dashboard Content */}
      <div className="skeleton-dashboard-content">

        {/* Recent Appointments */}
        <div className="skeleton-dashboard-panel">
          <div className="skeleton-panel-header">
            <div>
              <Skeleton type="title" className="skeleton-panel-title" />
              <Skeleton type="subtitle" className="skeleton-panel-subtitle" />
            </div>

            <Skeleton
              type="button"
              className="skeleton-panel-button"
            />
          </div>

          <div className="skeleton-appointment-list">

            <div className="skeleton-appointment-row">
              <Skeleton type="small-avatar" />
              <div className="skeleton-appointment-info">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
              <Skeleton type="button" className="skeleton-status" />
            </div>

            <div className="skeleton-appointment-row">
              <Skeleton type="small-avatar" />
              <div className="skeleton-appointment-info">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
              <Skeleton type="button" className="skeleton-status" />
            </div>

            <div className="skeleton-appointment-row">
              <Skeleton type="small-avatar" />
              <div className="skeleton-appointment-info">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
              <Skeleton type="button" className="skeleton-status" />
            </div>

            <div className="skeleton-appointment-row">
              <Skeleton type="small-avatar" />
              <div className="skeleton-appointment-info">
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
              <Skeleton type="button" className="skeleton-status" />
            </div>

          </div>
        </div>

        {/* Quick Information */}
        <div className="skeleton-dashboard-panel">

          <div className="skeleton-panel-header">
            <div>
              <Skeleton type="title" className="skeleton-panel-title" />
              <Skeleton type="subtitle" className="skeleton-panel-subtitle" />
            </div>
          </div>

          <div className="skeleton-info-list">

            <div className="skeleton-info-row">
              <Skeleton type="small-avatar" />
              <div>
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
            </div>

            <div className="skeleton-info-row">
              <Skeleton type="small-avatar" />
              <div>
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
            </div>

            <div className="skeleton-info-row">
              <Skeleton type="small-avatar" />
              <div>
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
            </div>

            <div className="skeleton-info-row">
              <Skeleton type="small-avatar" />
              <div>
                <Skeleton type="text" />
                <Skeleton type="subtitle" />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Overview */}
      <div className="skeleton-dashboard-overview">

        <div className="skeleton-panel-header">
          <div>
            <Skeleton type="title" className="skeleton-panel-title" />
            <Skeleton type="subtitle" className="skeleton-panel-subtitle" />
          </div>

          <Skeleton
            type="button"
            className="skeleton-overview-filter"
          />
        </div>

        <div className="skeleton-overview-content">

          <div className="skeleton-overview-item">
            <Skeleton type="text" />
            <Skeleton type="title" />
          </div>

          <div className="skeleton-overview-item">
            <Skeleton type="text" />
            <Skeleton type="title" />
          </div>

          <div className="skeleton-overview-item">
            <Skeleton type="text" />
            <Skeleton type="title" />
          </div>

          <div className="skeleton-overview-item">
            <Skeleton type="text" />
            <Skeleton type="title" />
          </div>

        </div>

      </div>

    </div>
  );
}

export default SkeletonDashboard;