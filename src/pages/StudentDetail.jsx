import { Link, useParams } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import "../styles/StudentDetail.css";

const StudentDetailPage = () => {
  const { id } = useParams();
  const { students } = useStudents();
  const student = students.find((entry) => String(entry.id) === id);

  if (!student) {
    return (
      <div className="not-found">
        <p>Student not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const { firstName, lastName, track, score, isActive, skills, email, avatar } =
    student;

  return (
    <div className="student-detail-page">
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className="detail-avatar"
      />
      <h2 className="detail-title">
        {firstName} {lastName}
      </h2>
      <p className="detail-meta">Track: {track}</p>
      <p className="detail-meta">Score: {score}%</p>
      <p className="detail-meta">Status: {isActive ? "Active" : "Inactive"}</p>
      <p className="detail-meta">Email: {email}</p>
      <p className="detail-meta">
        Skills:{" "}
        {skills && skills.length > 0
          ? skills.join(", ")
          : "No skills listed yet"}
      </p>
      <Link to="/" className="back-button">
        Back to Roster
      </Link>
    </div>
  );
};

export default StudentDetailPage;
