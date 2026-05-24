import StudentCard from "./StudentCard";

const StudentList = ({ students, title = "All Students", children }) => {
  return (
    <section className="student-list-section">
      <h2 className="list-title">{title}</h2>
      
      {(!students || students.length === 0) ? (
        <p className="no-students">No students to display</p>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}

      {children && <footer className="list-footer">{children}</footer>}
    </section>
  );
};

export default StudentList;
