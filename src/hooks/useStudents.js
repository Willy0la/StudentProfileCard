import { useContext } from "react"
import { StudentContext } from "../context/StudentContext"

export const useStudents = () => useContext(StudentContext)