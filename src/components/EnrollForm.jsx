import { useRef, useState } from "react";
import Button from "./Button";
import "../App.css"
function EnrollForm({onEnroll, tracks}) {
  const emailRef = useRef();
  const isActiveRef = useRef();
  const [form, setFormData] = useState({
    firstName: "",
    lastName: "",
    track: "",
    score: "",
    skills:""
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForm = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.track) newErrors.track = "Please select a track";
    if (!form.score) newErrors.score = "Score is required";
    else if (form.score < 0 || form.score > 100)
      newErrors.score = "Score must be 0-100";
    if (!emailRef.current.value.includes("@"))
      newErrors.email = "Valid email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

   const student = {
  id: crypto.randomUUID(),
  ...form,
  score: Number(form.score),
  skills: form.skills
    ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [],
  email: emailRef.current.value,
  isActive: isActiveRef.current.checked,
  avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
}


    onEnroll(student) 

setFormData({ firstName: "", lastName: "", track: "", score: "" ,skills:""})
emailRef.current.value = ""
isActiveRef.current.checked = false
  };
return (
  <section className="enroll-section">
    <h2 className="enroll-title">Enroll New Student</h2>
    <form onSubmit={handleForm}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" value={form.firstName} onChange={handleChange} id="firstName" name="firstName" placeholder="First name" />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

      
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" value={form.lastName} onChange={handleChange} id="lastName" name="lastName" placeholder="Last name" />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

       
        <div className="form-group">
          <label htmlFor="track">Track</label>
          <select id="track" name="track" value={form.track} onChange={handleChange}>
            <option value="">Select Track</option>
            {tracks.map((track) => (
              <option key={track} value={track}>{track}</option>
            ))}
          </select>
          {errors.track && <p className="error">{errors.track}</p>}
        </div>

         <div className="form-group">
          <label htmlFor="score">Score</label>
          <input type="number" value={form.score} onChange={handleChange} id="score" name="score" placeholder="0-100" min="0" max="100" />
          {errors.score && <p className="error">{errors.score}</p>}
        </div>

         <div className="form-group">
          <label htmlFor="skills">Skills <span className="optional">(optional — comma separated)</span></label>
          <input type="text" value={form.skills} onChange={handleChange} id="skills" name="skills" placeholder="e.g. React, CSS, Node.js" />
        </div>

         <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} id="email" name="email" defaultValue="" placeholder="email@example.com" />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
      </div>

       <div className="form-group">
        <label className="checkbox-label" htmlFor="isActive">
          <input type="checkbox" defaultChecked={false} ref={isActiveRef} id="isActive" name="isActive" />
          Active
        </label>
      </div>

      {form.firstName && (
        <p className="preview">
          Preview: {form.firstName} {form.lastName} — {form.track} ({form.score})
        </p>
      )}

<Button
  title="Enroll Student"
  className="enroll-btn"
  type="submit"
  disabled={!form.firstName || !form.lastName || !form.track || !form.score}
/>
    </form>
  </section>
)
}

export default EnrollForm;
