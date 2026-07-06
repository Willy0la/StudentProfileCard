export const initialState = {
  students: [],
  loading: false,
  error: null
}

export const studentReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload }
    case "ADD_STUDENT":
      return { ...state, students: [action.payload, ...state.students] }
    case "REMOVE_STUDENT":
      return { ...state, students: state.students.filter(s => s.id !== action.payload) }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    default:
      return state
  }
}