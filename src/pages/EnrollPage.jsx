import { useNavigate } from "react-router-dom";
import EnrollForm from "../components/EnrollForm";

function EnrollPage({ onEnroll, tracks }) {
  const navigate = useNavigate();

  const handleEnroll = (student) => {
    onEnroll(student);
    navigate("/");
  };

  return <EnrollForm onEnroll={handleEnroll} tracks={tracks} />;
}

export default EnrollPage;