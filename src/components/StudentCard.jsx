// Styling method: CSS Modules
import { Link } from "react-router-dom";
import Badge from "./Badge";
import StatBar from "./StatBar";
import styles from "../styles/StudentCard.module.css";

const StudentCard = ({
  student: { id, firstName, lastName, track, score, isActive, skills, avatar },
}) => {
  const getGrade = (s) => {
    if (s >= 90) return "A";
    if (s >= 80) return "B";
    if (s >= 70) return "C";
    if (s >= 60) return "D";
    return "F";
  };

  const grade = getGrade(score);
  const fullName = `${firstName} ${lastName}`;

  const getBorderClass = () => {
    if (!isActive) return styles.cardInactive;
    if (grade === "A" || grade === "B") return styles.cardActive;
    if (grade === "C") return styles.cardWarning;
    return styles.cardFail;
  };

  return (
    <div className={`${styles.card} ${getBorderClass()}`}>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt={fullName} className={styles.avatar} />
      </div>

      <Link to={`/students/${id}`} className={styles.nameLink}>
        <h2 className={styles.name}>{fullName}</h2>
      </Link>

      <div className={styles.badges}>
        <Badge label={track} type="track" />
        <Badge label={isActive ? "Active" : "Inactive"} type="status" />
        <Badge label={`Grade: ${grade}`} type="grade" />
      </div>

      <div className={styles.stat}>
        <StatBar score={score} label="Score" />
      </div>

      <div className={styles.skills}>
        <span className={styles.skillsLabel}>Skills: </span>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <span key={skill} className={styles.skillItem}>
              {skill}
              {index < skills.length - 1 ? ", " : ""}
            </span>
          ))
        ) : (
          <span className={styles.skillsEmpty}>No skills listed yet</span>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
