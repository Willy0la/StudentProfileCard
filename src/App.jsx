import "./App.css";
import Header from "./components/Header";
import StudentList from "./components/StudentList";

const students = [
  {
    id: 1,
    firstName: "Amara",
    lastName: "Johnson",
    track: "Frontend",
    score: 92,
    isActive: true,
    skills: ["React", "CSS", "TypeScript"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    firstName: "Chidi",
    lastName: "Okafor",
    track: "Backend",
    score: 67,
    isActive: true,
    skills: ["Python", "Django"],
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    firstName: "Fatima",
    lastName: "Hassan",
    track: "Frontend",
    score: 88,
    isActive: false,
    skills: ["HTML", "CSS", "JavaScript", "Vue"],
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    firstName: "Emeka",
    lastName: "Nwosu",
    track: "Mobile",
    score: 45,
    isActive: true,
    skills: [],
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 5,
    firstName: "Zara",
    lastName: "Ahmed",
    track: "Frontend",
    score: 76,
    isActive: true,
    skills: ["React", "Node.js"],
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 6,
    firstName: "David",
    lastName: "Okwu",
    track: "Backend",
    score: 53,
    isActive: false,
    skills: ["SQL"],
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Eze",
    track: "Mobile",
    score: 81,
    isActive: true,
    skills: ["Dart", "Flutter", "Firebase"],
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 8,
    firstName: "Tunde",
    lastName: "Bakare",
    track: "Frontend",
    score: 39,
    isActive: true,
    skills: ["HTML", "CSS"],
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];


// Calculate metrics using reduce
const totalScore = students.reduce((sum, item) => sum + item.score, 0);
const averageScore = totalScore / students.length;

const App = () => {
  return (
    <div className="app-container">
      <Header
        title="KodeCamp 6.0 — Student Dashboard"
        studentCount={students.length}
        averageScore={averageScore.toFixed(1)}
      />

      <div className="filter-bar">
        <button className="filter-btn active">Show All</button>
        <button className="filter-btn">Show Active Only</button>
      </div>

      <StudentList students={students} title="Student Roster">
        <p className="footer-text">End of student list — {students.length} total</p>
      </StudentList>
    </div>
  );
};

export default App;
