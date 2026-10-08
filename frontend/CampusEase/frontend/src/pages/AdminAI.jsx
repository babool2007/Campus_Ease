import { useState, useRef, useEffect } from "react";
import {
  Send,
  Trash2,
  User,
  Clock3,
  ShieldCheck,
  FileCheck,
  MessageSquareWarning,
  Bus,
  Bell,
  Calendar,
  Loader2,
} from "lucide-react";

import api from "../services/api";
import "../styles/dashboard.css";

function AdminAI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hello Administrator! I am your CampusEase Administrative Intelligence Assistant. Ask me about complaints, student approvals, schedules, circulars, or transport operations.",
      time: new Date(),
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const quickActions = [
    {
      label: "Summarize pending approval requests",
      icon: FileCheck,
    },
    {
      label: "Overview of open campus complaints",
      icon: MessageSquareWarning,
    },
    {
      label: "Show all campus bus routes and drivers",
      icon: Bus,
    },
    {
      label: "List active official notices",
      icon: Bell,
    },
    {
      label: "What schedules are registered?",
      icon: Calendar,
    },
  ];

  /* ---------------------------------
     AUTO SCROLL
  --------------------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* ---------------------------------
     TIME FORMAT
  --------------------------------- */
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ---------------------------------
     TEXTAREA AUTO-RESIZE
  --------------------------------- */
  const handleTextareaChange = (event) => {
    setQuestion(event.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
    }
  };

  /* ---------------------------------
     SEND MESSAGE
  --------------------------------- */
  const sendMessage = async (customQuestion = null) => {
    const text = customQuestion ?? question;

    if (!text.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text.trim(),
      time: new Date(),
    };

    setMessages((previous) => [...previous, userMessage]);
    setQuestion("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setLoading(true);

    try {
      const response = await api.post("/ai/ask", {
        question: text.trim(),
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        text: response.data.answer || "I could not generate an answer.",
        time: new Date(),
      };

      setMessages((previous) => [...previous, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        text: "Unable to get a response right now. Please try again.",
        time: new Date(),
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------
     ENTER TO SEND / SHIFT+ENTER NEWLINE
  --------------------------------- */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* ---------------------------------
     CLEAR CHAT
  --------------------------------- */
  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: "ai",
        text: "Conversation cleared. Ready for campus administrative queries.",
        time: new Date(),
      },
    ]);
  };

  // Show empty state when there are no user messages yet
  const showEmptyState = messages.length <= 1;

  return (
    <div className="admin-ai-page">
      {/* HEADER */}
      <header className="admin-ai-header">
        <div className="admin-ai-header-left">
          <div className="admin-ai-icon-badge">
            <ShieldCheck size={24} />
          </div>

          <div>
            <div className="admin-ai-title-row">
              <h1>Administrator AI Intelligence</h1>
              <span className="admin-ai-status-pill">
                <span className="admin-ai-status-dot"></span>
                ONLINE
              </span>
            </div>
            <p>Campus-wide operations & compliance intelligence</p>
          </div>
        </div>

        <button
          type="button"
          className="admin-ai-clear-btn"
          onClick={clearChat}
          title="Clear conversation"
          aria-label="Clear conversation"
        >
          <Trash2 size={15} />
          <span>Clear</span>
        </button>
      </header>

      {/* CHAT AREA */}
      <main className="admin-ai-chat-area">
        <div className="admin-ai-inner">
          {/* EMPTY STATE */}
          {showEmptyState && (
            <div className="admin-ai-welcome">
              <div className="admin-ai-welcome-badge">
                <ShieldCheck size={32} />
              </div>

              <h2>Campus Administrative Insights</h2>
              <p>
                Ask questions about campus statistics, facility complaints, transport
                routes, official notices, approvals, attendance, and schedules.
              </p>

              <div className="admin-ai-quick-grid">
                {quickActions.map(({ label, icon: IconComponent }) => (
                  <button
                    key={label}
                    type="button"
                    className="admin-ai-quick-btn"
                    onClick={() => sendMessage(label)}
                    disabled={loading}
                    aria-label={label}
                  >
                    <IconComponent size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {!showEmptyState && (
            <div className="admin-ai-messages">
              {messages.map((message) => {
                const isUser = message.type === "user";

                return (
                  <div
                    key={message.id}
                    className={`admin-ai-msg-row ${
                      isUser ? "admin-ai-msg-user" : "admin-ai-msg-assistant"
                    }`}
                  >
                    {!isUser && (
                      <div className="admin-ai-avatar assistant">
                        <ShieldCheck size={18} />
                      </div>
                    )}

                    <div className="admin-ai-bubble-wrap">
                      <div className="admin-ai-msg-sender">
                        {isUser ? "YOU" : "ADMINISTRATIVE AI"}
                      </div>

                      <div
                        className={`admin-ai-bubble ${
                          isUser ? "user" : "assistant"
                        }`}
                      >
                        {message.text}
                      </div>

                      <div className="admin-ai-time">
                        <Clock3 size={11} />
                        <span>{formatTime(message.time)}</span>
                      </div>
                    </div>

                    {isUser && (
                      <div className="admin-ai-avatar user">
                        <User size={18} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* LOADING STATE */}
              {loading && (
                <div className="admin-ai-msg-row admin-ai-msg-assistant">
                  <div className="admin-ai-avatar assistant">
                    <ShieldCheck size={18} />
                  </div>

                  <div className="admin-ai-bubble-wrap">
                    <div className="admin-ai-msg-sender">ADMINISTRATIVE AI</div>
                    <div className="admin-ai-thinking-card">
                      <div className="admin-ai-thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* CHAT COMPOSER (STICKY / FULL WIDTH AT BOTTOM) */}
      <footer className="admin-ai-composer-wrapper">
        <div className="admin-ai-composer-inner">
          <div className="admin-ai-composer-box">
            <textarea
              ref={textareaRef}
              className="admin-ai-textarea"
              value={question}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about complaints, approvals, buses, notices, schedules..."
              rows={1}
              disabled={loading}
              aria-label="Ask about complaints, approvals, buses, notices, schedules"
            />

            <button
              type="button"
              className="admin-ai-send-btn"
              onClick={() => sendMessage()}
              disabled={!question.trim() || loading}
              title="Send message"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>

          <div className="admin-ai-footer-note">
            <span>Grounded in verified institutional database records.</span>
            <span>Press Enter ↵ to send • Shift + Enter for new line</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminAI;