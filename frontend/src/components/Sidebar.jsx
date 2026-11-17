
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">SkillTrack</h2>
      <p className="sidebar-subtitle">PLACEMENT MANAGEMENT</p>

      <nav>
        <NavLink to="/" end className="nav-link">
          <span>▦</span> Dashboard
        </NavLink>

        <NavLink to="/add-student" className="nav-link">
          <span>＋</span> Add Student
        </NavLink>

        <NavLink to="/students" className="nav-link">
          <span>☷</span> Student Skills
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        Student Placement System
      </div>
    </aside>
  );
}

export default Sidebar;
