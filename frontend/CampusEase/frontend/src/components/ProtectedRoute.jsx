import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem(
    "campuseaseToken"
  );

  const storedUser = localStorage.getItem(
    "campuseaseUser"
  );

  // User is not logged in
  if (!token || !storedUser) {
    return <Navigate to="/" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("campuseaseToken");
    localStorage.removeItem("campuseaseUser");

    return <Navigate to="/" replace />;
  }

  // User role doesn't match
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    if (user.role === "student") {
      return <Navigate to="/student" replace />;
    }

    if (user.role === "faculty") {
      return <Navigate to="/faculty" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;