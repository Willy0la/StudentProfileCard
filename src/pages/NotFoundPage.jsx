// Styling method: Inline Styles
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "16px",
    textAlign: "center"
  }

  const headingStyle = {
    fontSize: "48px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0"
  }

  const textStyle = {
    fontSize: "16px",
    color: "#475569",
    margin: "0"
  }

  const linkStyle = {
    padding: "10px 24px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    borderRadius: "100px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px"
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>404 — Page Not Found</h2>
      <p style={textStyle}>The page you're looking for doesn't exist.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  )
}

export default NotFoundPage