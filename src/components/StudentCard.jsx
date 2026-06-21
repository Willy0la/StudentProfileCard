import { Link } from "react-router-dom";
import Badge from "./Badge";
import StatBar from "./StatBar";

const StudentCard = ({ student: { id, firstName, lastName, track, score, isActive, skills, avatar } }) => {
  const getGrade = (s) => {
    if (s >= 90) return "A";
    if (s >= 80) return "B";
    if (s >= 70) return "C";
    if (s >= 60) return "D";
    return "F";
  };

  const fullName = `${firstName} ${lastName}`;
  const grade = getGrade(score);

  return (
    <div className={`student-card ${isActive ? "card-active" : "card-inactive"}`}>
      <div className="card-avatar-container">
        <img src={avatar} alt={fullName} className="card-avatar" />
      </div>

      <Link to={`/students/${id}`} className="card-name-link">
        <h2 className="card-name">{fullName}</h2>
      </Link>

      <div className="card-badges">
        <Badge label={track} type="track" />
        <Badge label={isActive ? "Active" : "Inactive"} type="status" />
        <Badge label={`Grade: ${grade}`} type="grade" />
      </div>

      <div className="card-stat">
        <StatBar score={score} label="Score" />
      </div>

      <div className="card-skills">
        <span className="skills-label">Skills: </span>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <span key={skill} className="skill-item">
              {skill}{index < skills.length - 1 ? ", " : ""}
            </span>
          ))
        ) : (
          <span className="skills-empty">No skills listed yet</span>
        )}
      </div>
    </div>
  );
};

export default StudentCard;