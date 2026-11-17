
import { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    department: "",
    year: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    placementReadiness: "Not Assessed"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentData = {
        ...formData,
        technicalSkills: formData.technicalSkills
          .split(",")
          .map(skill => skill.trim())
          .filter(Boolean),
        aptitudeScore: Number(formData.aptitudeScore)
      };

      await axios.post(
        "http://localhost:5000/api/students",
        studentData
      );

      alert("Student added successfully!");

      setFormData({
        name: "",
        registerNumber: "",
        department: "",
        year: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationSkills: "",
        placementReadiness: "Not Assessed"
      });

    } catch (error) {
      alert(error.response?.data?.message || "Error adding student");
    }
  };

  return (
    <div>
      <h1 className="page-title">Add Student</h1>
      <p className="page-description">
        Enter student details and placement skills.
      </p>

      <form className="content-card student-form" onSubmit={handleSubmit}>

        <h2>Student Information</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Student Name</label>
            <input name="name" value={formData.name}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Register Number</label>
            <input name="registerNumber" value={formData.registerNumber}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department" value={formData.department}
              onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="IT">Information Technology</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="EEE">Electrical</option>
              <option value="MECH">Mechanical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select name="year" value={formData.year}
              onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Technical Skills</label>
            <input name="technicalSkills"
              value={formData.technicalSkills}
              onChange={handleChange}
              placeholder="Python, Java, HTML" required />
          </div>

          <div className="form-group">
            <label>Aptitude Score (0-100)</label>
            <input type="number" name="aptitudeScore"
              value={formData.aptitudeScore}
              onChange={handleChange}
              min="0" max="100" required />
          </div>

          <div className="form-group">
            <label>Communication Skills</label>
            <select name="communicationSkills"
              value={formData.communicationSkills}
              onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Needs Improvement">Needs Improvement</option>
            </select>
          </div>

          <div className="form-group">
            <label>Placement Readiness</label>
            <select name="placementReadiness"
              value={formData.placementReadiness}
              onChange={handleChange}>
              <option value="Not Assessed">Not Assessed</option>
              <option value="Ready">Ready</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Ready">Not Ready</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-btn">
          Save Student
        </button>

      </form>
    </div>
  );
}

export default AddStudent;
