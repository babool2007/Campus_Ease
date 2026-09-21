import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

// Login
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student
import StudentDashboard from "./pages/StudentDashboard";
import StudentSchedule from "./pages/StudentSchedule";
import StudentNotices from "./pages/StudentNotices";
import StudentComplaints from "./pages/StudentComplaints";
import StudentApprovals from "./pages/StudentApprovals";
import StudentBus from "./pages/StudentBus";
import StudentAI from "./pages/StudentAI";
import StudentAttendance from "./pages/StudentAttendance";

// Faculty
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultySchedule from "./pages/FacultySchedule";
import FacultyAttendance from "./pages/FacultyAttendance";
import FacultyRequests from "./pages/FacultyRequests";
import FacultyNotices from "./pages/FacultyNotices";
import FacultyAI from "./pages/FacultyAI";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminSchedule from "./pages/AdminSchedule";
import AdminUsers from "./pages/AdminUsers";
import AdminComplaints from "./pages/AdminComplaints";
import AdminApprovals from "./pages/AdminApprovals";
import AdminAttendance from "./pages/AdminAttendance";
import AdminBus from "./pages/AdminBus";
import AdminAI from "./pages/AdminAI";
import AdminNotices from "./pages/AdminNotices";


/* =====================================================
   DASHBOARD LAYOUT
===================================================== */

function DashboardLayout({ role, children }) {
  return (
    <div className="campus-app-layout">

      <Sidebar role={role} />

      <main className="campus-main-content">
        {children}
      </main>

    </div>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =================================================
          STUDENT ROUTES
      ================================================= */}

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/schedule"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentSchedule />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/attendance"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentAttendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/notices"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentNotices />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/complaints"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentComplaints />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/approvals"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentApprovals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/bus"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentBus />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/ai"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout role="student">
              <StudentAI />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />


      {/* =================================================
          FACULTY ROUTES
      ================================================= */}

      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRole="faculty">
            <DashboardLayout role="faculty">
              <FacultyDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/schedule"
        element={
          <ProtectedRoute allowedRole="faculty">
            <DashboardLayout role="faculty">
              <FacultySchedule />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/attendance"
        element={
          <ProtectedRoute allowedRole="faculty">
            <DashboardLayout role="faculty">
              <FacultyAttendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/requests"
        element={
          <ProtectedRoute allowedRole="faculty">
            <DashboardLayout role="faculty">
              <FacultyRequests />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/notices"
        element={
          <ProtectedRoute allowedRole="faculty">
            <DashboardLayout role="faculty">
              <FacultyNotices />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/ai"
        element={
          <ProtectedRoute allowedRole="faculty">
            <DashboardLayout role="faculty">
              <FacultyAI />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />


      {/* =================================================
          ADMIN ROUTES
      ================================================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminUsers />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/schedule"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminSchedule />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notices"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminNotices />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminComplaints />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/approvals"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminApprovals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminAttendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/bus"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminBus />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/ai"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout role="admin">
              <AdminAI />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;