import "./Skeleton.css";

function Skeleton({
  type = "text",
  width,
  height,
  className = "",
}) {
  const style = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <span
      className={`skeleton skeleton-${type} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}

export default Skeleton;