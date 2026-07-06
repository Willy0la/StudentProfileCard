import Header from "../components/Header";
import StudentList from "../components/StudentList";
import StatusMessage from "../components/StatusMessage";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStudents } from "../hooks/useStudents";
import { useEffect, useMemo } from "react";
import { SEED_STUDENTS, TRACKS } from "../utils/StudentArray";

const getAverage = (list) => {
  if (list.length === 0) return 0;
  return (list.reduce((sum, s) => sum + s.score, 0) / list.length).toFixed(1);
};

const HomePage = () => {
  const { students, loading, error, dispatch } = useStudents();
  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch("https://randomuser.me/api/?results=6&nat=us,gb");
  const [filter, setFilter] = useLocalStorage("filter", "all");

  useEffect(() => {
    if (fetchLoading) {
      dispatch({ type: "SET_LOADING", payload: true });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: false });

    if (fetchError) {
      dispatch({ type: "SET_ERROR", payload: fetchError });
      return;
    }

    dispatch({ type: "SET_ERROR", payload: null });
  }, [dispatch, fetchError, fetchLoading]);

  useEffect(() => {
    if (!data || students.length > 0) return;

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

    const roster = [...SEED_STUDENTS, ...fetched];
    dispatch({ type: "SET_STUDENTS", payload: roster });
  }, [data, dispatch, students.length]);

  const averageScore = useMemo(() => {
    console.log("calculating average...");
    return getAverage(students);
  }, [students]);

  const filteredStudents = useMemo(() => {
    console.log("filtering students...");
    return filter === "active"
      ? students.filter((student) => student.isActive)
      : students;
  }, [filter, students]);
  const filteredCount = filteredStudents.length;

  const isLoading = loading || fetchLoading;
  const statusError = error || fetchError;

  if (isLoading) return <StatusMessage type="loading" />;
  if (statusError) return <StatusMessage type="error" />;

  return (
    <>
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={averageScore}
      />
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Show All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Show Active Only
        </button>
      </div>
      <StudentList title="Student Roster" filter={filter}>
        <p className="footer-text">
          Showing {filteredCount} of {students.length} total students
        </p>
      </StudentList>
    </>
  );
};

export default HomePage;
