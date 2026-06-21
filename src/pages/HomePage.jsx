import Header from "../components/Header";
import StudentList from "../components/StudentList";
import StatusMessage from "../components/StatusMessage";
import ClassButton from "../components/ClassButton";

const getAverage = (list) => {
  if (list.length === 0) return 0
  return (list.reduce((sum, s) => sum + s.score, 0) / list.length).toFixed(1)
}

function HomePage({ students, loading, error, fetchStudents }) {
  if (loading) return <StatusMessage type="loading" />
  if (error) return <StatusMessage type="error" />

  return (
    <>
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={getAverage(students)}
      />

      <div className="filter-bar">
        <button className="filter-btn active">Show All</button>
        <button className="filter-btn">Show Active Only</button>
        <ClassButton
          title="Refresh Roster"
          onClick={fetchStudents}
          className="filter-btn"
        />
      </div>

      <StudentList students={students} title="Student Roster">
        <p className="footer-text">End of roster — {students.length} total</p>
      </StudentList>
    </>
  )
}

export default HomePage;