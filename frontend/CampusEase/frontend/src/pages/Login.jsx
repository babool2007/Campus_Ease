import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../services/api";

import "../styles/login.css";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
  "/auth/login",
        {
          email,
          password,
          role,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("campuseaseToken", token);

      localStorage.setItem(
        "campuseaseUser",
        JSON.stringify(user)
      );

      if (user.role === "student") {
        navigate("/student");
      }

      if (user.role === "faculty") {
        navigate("/faculty");
      }

      if (user.role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to connect to CampusEase server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-glow"></div>

      <div className="login-card">

        {/* LOGO */}

        <div className="campus-logo">

          <div className="logo-icon">
            <GraduationCap size={25} />
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


        {/* HEADING */}

        <div className="login-heading">

          <p className="small-title">
            CAMPUS PORTAL
          </p>

          <h1>
            Welcome Back
          </h1>

          <p>
            One smart platform for a smarter campus.
          </p>

        </div>


        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>
              College Email
            </label>

            <input
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              Continue as
            </label>

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >

              <option value="student">
                Student
              </option>

              <option value="faculty">
                Faculty
              </option>

              <option value="admin">
                Administrator
              </option>

            </select>

          </div>


          {/* ERROR */}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "AUTHENTICATING..."
              : "ENTER CAMPUS"}
          </button>

        </form>


        {/* REGISTER BUTTON */}

        <button
          type="button"
          className="register-link-button"
          onClick={() => navigate("/register")}
        >
          New to CampusEase? Create Account
        </button>


        {/* FOOTER */}

        <div className="login-footer">

          <span>
            CAMPUS EASE
          </span>

          <span>
            DIGITAL CAMPUS PLATFORM
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;