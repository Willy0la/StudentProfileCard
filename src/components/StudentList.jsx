import { useStudents } from "../hooks/useStudents";
import StudentCard from "./StudentCard";

const StudentList = ({ title = "All Students", filter = "all", children }) => {
  const { students } = useStudents();
  const visibleStudents =
    filter === "active"
      ? students.filter((student) => student.isActive)
      : students;

  return (
    <section className="student-list-section">
      <h2 className="list-title">{title}</h2>

      {!visibleStudents || visibleStudents.length === 0 ? (
        <p className="no-students">No students to display</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}

      {children && <footer className="list-footer">{children}</footer>}
    </section>
  );
};

export default StudentList;
