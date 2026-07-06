import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import EnrollPage from "./pages/EnrollPage"
import StudentDetailPage from "./pages/StudentDetail"
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App