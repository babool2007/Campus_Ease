import {
  LayoutDashboard,
  CalendarDays,
  Bell,
  MessageSquareWarning,
  FileCheck,
  ClipboardCheck,
  Bus,
  Bot,
  Settings,
  LogOut,
  Users,
  ShieldCheck,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar({ role }) {
  const navigate = useNavigate();

  // =========================
  // STUDENT NAVIGATION
  // =========================

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student",
      icon: LayoutDashboard,
    },
    {
      name: "My Schedule",
      path: "/student/schedule",
      icon: CalendarDays,
    },
    {
      name: "Notices",
      path: "/student/notices",
      icon: Bell,
    },
    {
      name: "Complaints",
      path: "/student/complaints",
      icon: MessageSquareWarning,
    },
    {
      name: "Approvals",
      path: "/student/approvals",
      icon: FileCheck,
    },
    {
      name: "Campus Bus",
      path: "/student/bus",
      icon: Bus,
    },
    {
      name: "AI Assistant",
      path: "/student/ai",
      icon: Bot,
    },
    {
      name: "Attendance",
      path: "/student/attendance",
      icon: ClipboardCheck,
    },
  ];

  // =========================
  // FACULTY NAVIGATION
  // =========================

  const facultyLinks = [
    {
      name: "Dashboard",
      path: "/faculty",
      icon: LayoutDashboard,
    },
    {
      name: "My Schedule",
      path: "/faculty/schedule",
      icon: CalendarDays,
    },
    {
      name: "Attendance",
      path: "/faculty/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Student Requests",
      path: "/faculty/requests",
      icon: FileCheck,
    },
    {
      name: "Notices",
      path: "/faculty/notices",
      icon: Bell,
    },
    {
      name: "AI Assistant",
      path: "/faculty/ai",
      icon: Bot,
    },
  ];

  // =========================
  // ADMIN NAVIGATION
  // =========================

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Schedule",
      path: "/admin/schedule",
      icon: CalendarDays,
    },
    {
      name: "Notices",
      path: "/admin/notices",
      icon: Bell,
    },
    {
      name: "Complaints",
      path: "/admin/complaints",
      icon: MessageSquareWarning,
    },
    {
      name: "Approvals",
      path: "/admin/approvals",
      icon: FileCheck,
    },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Campus Bus",
      path: "/admin/bus",
      icon: Bus,
    },
    {
      name: "AI Assistant",
      path: "/admin/ai",
      icon: Bot,
    },
  ];

  // =========================
  // SELECT NAVIGATION
  // =========================

  let links = studentLinks;

  if (role === "faculty") {
    links = facultyLinks;
  }

  if (role === "admin") {
    links = adminLinks;
  }

  // =========================
  // ROLE NAME
  // =========================

  const roleName =
    role === "student"
      ? "STUDENT"
      : role === "faculty"
      ? "FACULTY"
      : "ADMINISTRATOR";

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("campuseaseToken");
    localStorage.removeItem("campuseaseUser");

    navigate("/");
  };

  // =========================
  // SIDEBAR UI
  // =========================

  return (
    <aside className="campus-sidebar">

      {/* =========================
          LOGO
      ========================= */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <h2>
            CAMPUS<span>EASE</span>
          </h2>

          <p>
            SMART CAMPUS ECOSYSTEM
          </p>
        </div>

      </div>

      {/* =========================
          ROLE
      ========================= */}

      <div className="sidebar-role">
        {roleName}
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="sidebar-navigation">

        <p className="sidebar-section-title">
          WORKSPACE
        </p>

        {links.map((link) => {

          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={18} />

              <span>
                {link.name}
              </span>

            </NavLink>
          );

        })}

      </nav>

      {/* =========================
          BOTTOM SECTION
      ========================= */}

      <div className="sidebar-bottom">

        {/* SETTINGS */}

        <NavLink
          to={`/${role}/settings`}
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <Settings size={18} />

          <span>
            Settings
          </span>
        </NavLink>

        {/* LOGOUT */}

        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={handleLogout}
        >

          <LogOut size={18} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;