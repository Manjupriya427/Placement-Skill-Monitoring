
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://placement-skill-monitoring.onrender.com/api/students";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API);

      if (Array.isArray(response.data)) {
        setStudents(response.data);
        setMessage("");
      } else {
        setStudents([]);
        setMessage("Invalid student data received from server.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStudents([]);
      setMessage("Unable to load student records.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Student deleted successfully.");
      fetchStudents();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage(
        error.response?.data?.message || "Unable to delete student."
      );
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({
      ...student,
      technicalSkills: Array.isArray(student.technicalSkills)
        ? student.technicalSkills.join(", ")
        : ""
    });
  };

  const handleEditChange = (e) => {
    setEditingStudent({
      ...editingStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedStudent = {
        ...editingStudent,
        technicalSkills: editingStudent.technicalSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        aptitudeScore: Number(editingStudent.aptitudeScore)
      };

      delete updatedStudent._id;
      delete updatedStudent.__v;
      delete updatedStudent.createdAt;
      delete updatedStudent.updatedAt;

      await axios.put(
        `${API}/${editingStudent._id}`,
        updatedStudent
      );

      setEditingStudent(null);
      setMessage("Student updated successfully.");
      fetchStudents();
    } catch (error) {
      console.error("Update error:", error);
      setMessage(
        error.response?.data?.message || "Unable to update student."
      );
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.name || ""} ${student.registerNumber || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="page-title">Student Skill Records</h1>
      <p className="page-description">
        View, search, edit and delete student details.
      </p>

      <div className="content-card">
        <div className="student-list-heading">
          <input
            className="search-input"
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="student-list-buttons">
            <button className="refresh-btn" onClick={fetchStudents}>
              Refresh
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/add-student")}
            >
              + Add Student
            </button>
          </div>
        </div>

        {message && <p className="status-message">{message}</p>}

        {editingStudent && (
          <form className="content-card edit-form" onSubmit={handleUpdate}>
            <h2>Edit Student</h2>

            <div className="edit-grid">
              <input
                name="name"
                value={editingStudent.name || ""}
                onChange={handleEditChange}
                placeholder="Student Name"
                required
              />

              <input
                name="registerNumber"
                value={editingStudent.registerNumber || ""}
                onChange={handleEditChange}
                placeholder="Register Number"
                required
              />

              <input
                name="department"
                value={editingStudent.department || ""}
                onChange={handleEditChange}
                placeholder="Department"
                required
              />

              <input
                name="technicalSkills"
                value={editingStudent.technicalSkills}
                onChange={handleEditChange}
                placeholder="Technical Skills"
                required
              />

              <input
                type="number"
                name="aptitudeScore"
                value={editingStudent.aptitudeScore ?? ""}
                onChange={handleEditChange}
                min="0"
                max="100"
                placeholder="Aptitude Score"
                required
              />

              <select
                name="communicationSkills"
                value={editingStudent.communicationSkills || ""}
                onChange={handleEditChange}
                required
              >
                <option value="">Select Communication Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                name="placementReadiness"
                value={editingStudent.placementReadiness || ""}
                onChange={handleEditChange}
                required
              >
                <option value="Ready">Ready</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Ready">Not Ready</option>
              </select>
            </div>

            <button type="submit" className="primary-btn">
              Update Student
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingStudent(null)}
            >
              Cancel
            </button>
          </form>
        )}

        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Department</th>
                <th>Technical Skills</th>
                <th>Aptitude Score</th>
                <th>Communication Skills</th>
                <th>Placement Readiness</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.registerNumber}</td>
                    <td>{student.department}</td>
                    <td>
                      {Array.isArray(student.technicalSkills)
                        ? student.technicalSkills.join(", ")
                        : ""}
                    </td>
                    <td>{student.aptitudeScore}/100</td>
                    <td>{student.communicationSkills}</td>
                    <td>{student.placementReadiness}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-message">
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
