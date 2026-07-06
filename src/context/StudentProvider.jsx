import {  useReducer } from "react"
import { studentReducer, initialState } from "./StudentReducer"
import { StudentContext } from "./StudentContext"


export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState)
  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  )
}