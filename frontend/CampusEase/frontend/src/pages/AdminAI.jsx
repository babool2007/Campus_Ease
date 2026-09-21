import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function AdminAI() {
  return (
    <>
      <Sidebar role="admin" />

      <div className="admin-dashboard">
        <div className="admin-topbar">
          <div>
            <p className="dashboard-label">INTELLIGENT CAMPUS</p>
            <h1>AI Assistant</h1>
            <p className="dashboard-description">
              AI-powered insights for campus administrators.
            </p>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">ADMIN AI</p>
              <h2>CampusEase Intelligence</h2>
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

              <strong>Administrator AI Assistant</strong>
            </div>

            <p
              style={{
                color: "#dce3eb",
                fontSize: "14px",
                lineHeight: "1.7",
              }}
            >
              Ask about complaints, attendance, approvals, campus
              transportation, users, notices, and campus performance.
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
              placeholder="Ask the campus AI..."
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "20px",
              color: "#687585",
              fontSize: "11px",
            }}
          >
            <ShieldCheck size={15} />
            Responses will be grounded in verified campus information.
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAI;