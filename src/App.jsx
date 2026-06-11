import "./App.css"
import Header from "./components/Header"
import StudentList from "./components/StudentList"
import EnrollForm from "./components/EnrollForm"
import StatusMessage from "./components/StatusMessage"
import ClassButton from "./components/ClassButton"
import { SEED_STUDENTS, TRACKS } from "./components/StudentArray"
import { useEffect, useState } from "react"

const getAverage = (list) => {
  if (list.length === 0) return 0
  return (list.reduce((sum, s) => sum + s.score, 0) / list.length).toFixed(1)
}

const App = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://randomuser.me/api/?results=6&nat=us,gb')
      if (!res.ok) throw new Error('Failed to fetch students')
      const data = await res.json()
      const fetched = data.results.map((user, index) => ({
        id: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        avatar: user.picture.thumbnail,
        track: TRACKS[index % TRACKS.length],
        score: Math.floor(Math.random() * 61) + 40,
        isActive: true,
        skills: []
      }))
      setStudents([...SEED_STUDENTS, ...fetched])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEnroll = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev])
  }

  if (loading) return <StatusMessage type="loading" />
  if (error) return <StatusMessage type="error" />

  return (
    <div className="app-container">
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

      <EnrollForm onEnroll={handleEnroll} tracks={TRACKS} />

      <StudentList students={students} title="Student Roster">
        <p className="footer-text">End of roster — {students.length} total</p>
      </StudentList>

    </div>
  )
}

export default App