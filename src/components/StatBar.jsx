

const StatBar = ({ score, label = "Score" }) => {
  const barColor = score >= 80 ? "#4caf50" : score >= 60 ? "#ff9800" : "#f44336";

  return (
    <div className="stat-bar-container">
      <span className="stat-bar-label">{label}</span>
      <div className="stat-bar-track">
        <div
          className="stat-bar-fill"
          style={{
            width: `${score}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      <span className="stat-bar-value">{score}%</span>
    </div>
  );
};

export default StatBar;
