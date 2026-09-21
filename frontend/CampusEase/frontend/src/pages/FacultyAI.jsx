import { Bot, Send, Sparkles } from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function FacultyAI() {
  return (
    <>
      <Sidebar role="faculty" />

      <div className="faculty-dashboard">
        <div className="faculty-topbar">
          <div>
            <p className="dashboard-label">INTELLIGENT CAMPUS</p>
            <h1>AI Assistant</h1>
            <p className="dashboard-description">
              Get intelligent assistance for academic and campus tasks.
            </p>
          </div>
        </div>

        <div className="dashboard-panel faculty-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">FACULTY AI</p>
              <h2>CampusEase Assistant</h2>
            </div>

            <Bot size={22} />
          </div>

          <div
            style={{
              padding: "25px",
              borderRadius: "12px",
              background: "#0b121b",
              border: "1px solid #1d2936",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
                color: "#3198ff",
              }}
            >
              <Sparkles size={18} />

              <strong>Faculty AI Assistant</strong>
            </div>

            <p
              style={{
                color: "#dce3eb",
                fontSize: "14px",
                lineHeight: "1.7",
              }}
            >
              Hello! I can help with schedules, attendance, student requests,
              notices, and verified campus information.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Ask a faculty-related question..."
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "9px",
                border: "1px solid #253241",
                background: "#080e16",
                color: "white",
                outline: "none",
              }}
            />

            <button
              style={{
                width: "52px",
                border: "none",
                borderRadius: "9px",
                background: "#1685ff",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyAI;