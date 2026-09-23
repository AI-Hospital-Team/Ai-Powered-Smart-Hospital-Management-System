import Skeleton from "./Skeleton";

function SkeletonCards({ cards = 6 }) {
  return (
    <div className="skeleton-cards">
      {Array.from({ length: cards }).map((_, index) => (
        <div className="skeleton-patient-card" key={index}>

          {/* Header */}
          <div className="skeleton-card-header">
            <Skeleton type="avatar" />

            <div className="skeleton-card-heading">
              <Skeleton type="text" />
              <Skeleton type="subtitle" />
            </div>
          </div>

          {/* Patient information */}
          <div className="skeleton-card-info">
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <Skeleton type="text" />
          </div>

          {/* Email */}
          <div className="skeleton-card-email">
            <Skeleton type="text" />
          </div>

          {/* Button */}
          <div className="skeleton-card-button">
            <Skeleton type="button" />
          </div>

        </div>
      ))}
    </div>
  );
}

export default SkeletonCards;