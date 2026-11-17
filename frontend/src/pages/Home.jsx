
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );
      setStudents(response.data);
      setError("");
    } catch {
      setError("Unable to load dashboard data.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const totalStudents = students.length;

  const placementReady = students.filter(
    (student) => student.placementReadiness === "Ready"
  ).length;

  const inProgress = students.filter(
    (student) => student.placementReadiness === "In Progress"
  ).length;

  const averageAptitude =
    totalStudents > 0
      ? (
          students.reduce(
            (total, student) => total + Number(student.aptitudeScore || 0),
            0
          ) / totalStudents
        ).toFixed(1)
      : 0;

  const recentStudents = [...students]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  return (
    <div>
      <h1 className="page-title">
        Placement Skill Monitoring System
      </h1>

      <p className="page-description">
        Monitor student skills, aptitude scores and placement readiness.
      </p>

      <Link to="/add-student" className="primary-btn">
        + Add Student
      </Link>

      {error && <p className="status-message">{error}</p>}

      <div className="dashboard-cards" style={{ marginTop: "25px" }}>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="stat-card">
          <h3>Placement Ready</h3>
          <p>{placementReady}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgress}</p>
        </div>

        <div className="stat-card">
          <h3>Average Aptitude Score</h3>
          <p>{averageAptitude}/100</p>
        </div>
      </div>

      <div className="content-card">
        <h2>Recently Added Students</h2>

        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Department</th>
                <th>Technical Skills</th>
                <th>Aptitude Score</th>
                <th>Placement Readiness</th>
              </tr>
            </thead>

            <tbody>
              {recentStudents.length > 0 ? (
                recentStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.registerNumber}</td>
                    <td>{student.department}</td>
                    <td>{student.technicalSkills.join(", ")}</td>
                    <td>{student.aptitudeScore}/100</td>
                    <td>{student.placementReadiness}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-message">
                    No students added yet.
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

export default Home;
