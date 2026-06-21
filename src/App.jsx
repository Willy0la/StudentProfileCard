import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { SEED_STUDENTS, TRACKS } from "./utils/StudentArray";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EnrollPage from "./pages/EnrollPage";
import StudentDetailPage from "./pages/StudentDetail";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://randomuser.me/api/?results=6&nat=us,gb");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      const fetched = data.results.map((user, index) => ({
        id: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        avatar: user.picture.thumbnail,
        track: TRACKS[index % TRACKS.length],
        score: Math.floor(Math.random() * 61) + 40,
        isActive: true,
        skills: [],
      }));
      setStudents([...SEED_STUDENTS, ...fetched]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnroll = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              students={students}
              loading={loading}
              error={error}
              fetchStudents={fetchStudents}
            />
          }
        />
        <Route
          path="/students/:id"
          element={<StudentDetailPage students={students} />}
        />
        <Route
          path="/enroll"
          element={<EnrollPage onEnroll={handleEnroll} tracks={TRACKS} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
