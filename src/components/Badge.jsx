const Badge = ({ label, type = "track" }) => {
  const labelClass = label.toString().replace(/:\s*/g, '-').replace(/\s+/g, '-');
  return (
    <span className={`badge badge-${type} badge-${labelClass}`}>
      {label}
    </span>
  );
};

export default Badge;