import Skeleton from "./Skeleton";

function SkeletonTable({
  rows = 6,
  columns = 6,
}) {
  return (
    <div className="skeleton-table-wrapper">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          className="skeleton-table-row"
          key={rowIndex}
        >
          {Array.from({ length: columns }).map(
            (_, columnIndex) => (
              <Skeleton
                key={columnIndex}
                type="table-row"
                className="skeleton-table-cell"
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default SkeletonTable;