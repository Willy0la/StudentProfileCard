import { useParams, Link } from "react-router-dom";

function StudentDetailPage({ students }) {
const { id } = useParams();
const student = students.find((s) => String(s.id) === id);

  if (!student) {
    return (
      <div className="not-found">
        <p>Student not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  const { firstName, lastName, track, score, isActive, skills, email, avatar } = student;

  return (
    <div className="student-detail">
      <img src={avatar} alt={`${firstName} ${lastName}`} className="detail-avatar" />
      <h2>{firstName} {lastName}</h2>
      <p>Track: {track}</p>
      <p>Score: {score}%</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
      <p>Email: {email}</p>
      <p>Skills: {skills && skills.length > 0 ? skills.join(", ") : "No skills listed yet"}</p>
      <Link to="/">Back to Roster</Link>
    </div>
  )
}

export default StudentDetailPage;