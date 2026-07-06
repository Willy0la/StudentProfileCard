// Styling method: Material UI (MUI)
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useStudents } from "../hooks/useStudents";
import { TRACKS } from "../utils/StudentArray";

const EnrollForm = () => {
  const firstNameRef = useRef(null);
  const navigate = useNavigate();
  const { dispatch } = useStudents();
  const [form, setFormData] = useState({
    firstName: "",
    lastName: "",
    track: "",
    score: "",
    skills: "",
    email: "",
    isActive: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    const emailValue = form.email.trim();
    if (!emailValue.includes("@")) {
      newErrors.email = "Valid email is required";
    }

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
        ? form.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      email: emailValue,
      isActive: form.isActive,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    };

    dispatch({ type: "ADD_STUDENT", payload: student });
    setFormData({
      firstName: "",
      lastName: "",
      track: "",
      score: "",
      skills: "",
      email: "",
      isActive: false,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "32px auto",
        padding: "32px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={3}>
        Enroll New Student
      </Typography>

      <form onSubmit={handleForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              placeholder="First name"
              inputRef={firstNameRef}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              placeholder="Last name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.track}>
              <InputLabel>Track</InputLabel>
              <Select
                name="track"
                value={form.track}
                label="Track"
                onChange={handleChange}
              >
                <MenuItem value="">Select Track</MenuItem>
                {TRACKS.map((track) => (
                  <MenuItem key={track} value={track}>
                    {track}
                  </MenuItem>
                ))}
              </Select>
              {errors.track && <FormHelperText>{errors.track}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Score"
              name="score"
              type="number"
              value={form.score}
              onChange={handleChange}
              error={!!errors.score}
              helperText={errors.score}
              placeholder="0-100"
              slotProps={{ input: { min: 0, max: 100 } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Skills (optional — comma separated)"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, CSS, Node.js"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="email@example.com"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>

        {form.firstName && (
          <Typography
            sx={{
              mt: 2,
              mb: 2,
              color: "#2563eb",
              backgroundColor: "rgba(37,99,235,0.06)",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Preview: {form.firstName} {form.lastName} — {form.track} (
            {form.score})
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={
            !form.firstName || !form.lastName || !form.track || !form.score
          }
          sx={{
            mt: 2,
            borderRadius: "100px",
            padding: "10px 28px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#2563eb",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
        >
          Enroll Student
        </Button>
      </form>
    </Box>
  );
};

export default EnrollForm;
