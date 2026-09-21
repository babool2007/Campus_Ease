import {
  Users,
  Search,
  UserCheck,
  UserCog,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function AdminUsers() {
  const users = [
    {
      name: "Rahul Sharma",
      email: "rahul@college.edu",
      role: "Student",
      department: "CSE",
      status: "ACTIVE",
    },
    {
      name: "Ananya Das",
      email: "ananya@college.edu",
      role: "Student",
      department: "ECE",
      status: "ACTIVE",
    },
    {
      name: "Dr. Sharma",
      email: "sharma@college.edu",
      role: "Faculty",
      department: "CSE",
      status: "ACTIVE",
    },
    {
      name: "Prof. Mehta",
      email: "mehta@college.edu",
      role: "Faculty",
      department: "CSE",
      status: "ACTIVE",
    },
  ];

  return (
    <>
      <Sidebar role="admin" />

      <div className="admin-dashboard">
        <div className="admin-topbar">
          <div>
            <p className="dashboard-label">CAMPUS MANAGEMENT</p>
            <h1>Users</h1>
            <p className="dashboard-description">
              Manage students, faculty, and administrator accounts.
            </p>
          </div>
        </div>

        <div className="admin-metrics">
          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <Users size={21} />
            </div>
            <div>
              <span>TOTAL USERS</span>
              <strong>8,742</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <UserCheck size={21} />
            </div>
            <div>
              <span>STUDENTS</span>
              <strong>8,542</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <UserCog size={21} />
            </div>
            <div>
              <span>FACULTY</span>
              <strong>182</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <ShieldCheck size={21} />
            </div>
            <div>
              <span>ADMINS</span>
              <strong>18</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">USER DIRECTORY</p>
              <h2>Campus Users</h2>
            </div>

            <div className="admin-search">
              <Search size={16} />
              <input placeholder="Search users..." />
            </div>
          </div>

          <div className="admin-user-list">
            {users.map((user, index) => (
              <div className="admin-user-row" key={index}>
                <div className="admin-user-avatar">
                  {user.name.charAt(0)}
                </div>

                <div className="admin-user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>

                <div className="admin-user-department">
                  {user.department}
                </div>

                <div className="admin-user-role">
                  {user.role}
                </div>

                <div className="admin-user-status">
                  {user.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;