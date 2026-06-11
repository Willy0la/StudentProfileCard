const messages = {
  loading: "Loading students...",
  error: "Something went wrong. Please try again."
}

const StatusMessage = ({ type }) => {
  return <p className={`status-message status-${type}`}>{messages[type]}</p>
}

export default StatusMessage
