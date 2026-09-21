import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../services/api";

import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post(
  "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      setSuccess(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-glow"></div>

      <div className="login-card">

        <div className="campus-logo">

          <div className="logo-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <h2>
              CAMPUS<span>EASE</span>
            </h2>

            <p>SMART CAMPUS ECOSYSTEM</p>
          </div>

        </div>

        <div className="login-heading">

          <p className="small-title">
            CAMPUS PORTAL
          </p>

          <h1>Create Account</h1>

          <p>
            Join the CampusEase digital campus.
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div className="input-group">
            <label>College Email</label>

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
            <label>Password</label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength={6}
              required
            />
          </div>

          <div className="input-group">
            <label>Account Type</label>

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

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {success && (
            <div className="login-success">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "CREATING ACCOUNT..."
              : "CREATE ACCOUNT"}
          </button>

        </form>

        <button
          className="register-link-button"
          onClick={() => navigate("/")}
        >
          Already have an account? Sign In
        </button>

        <div className="login-footer">
          <span>CAMPUS EASE</span>
          <span>DIGITAL CAMPUS PLATFORM</span>
        </div>

      </div>

    </div>
  );
}

export default Register;