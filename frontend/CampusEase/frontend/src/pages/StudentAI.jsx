import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  User,
  Clock3,
} from "lucide-react";

import api from "../services/api";
import "../styles/dashboard.css";

function StudentAI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hello! I am your CampusEase AI Assistant. Ask me about your schedule, attendance, notices, complaints, approvals or campus services.",
      time: new Date(),
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestions = [
    "What is my class schedule?",
    "What is my attendance?",
    "Show me the latest notices",
    "Do I have any pending approvals?",
    "What is my complaint status?",
    "What are the campus bus routes?",
  ];

  /* --------------------------------
     AUTO SCROLL
  -------------------------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* --------------------------------
     TIME FORMAT
  -------------------------------- */

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* --------------------------------
     SEND MESSAGE
  -------------------------------- */

  const sendMessage = async (customQuestion = null) => {
    const text = customQuestion ?? question;

    if (!text.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text.trim(),
      time: new Date(),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await api.post("/ai/ask", {
        question: text.trim(),
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        text:
          response.data.answer ||
          "I could not generate an answer.",
        time: new Date(),
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);
    } catch (error) {
      console.error("AI Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        text:
          error.response?.data?.message ||
          "Unable to connect to CampusEase AI. Please make sure the backend is running.",
        time: new Date(),
      };

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     ENTER KEY
  -------------------------------- */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* --------------------------------
     CLEAR CHAT
  -------------------------------- */

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: "ai",
        text: "Chat cleared. How can I help you with CampusEase?",
        time: new Date(),
      },
    ]);
  };

  return (
    <div className="ai-page">

      {/* HEADER */}

      <div className="ai-header">
        <div className="ai-header-left">

          <div className="ai-main-icon">
            <Bot size={25} />
          </div>

          <div>
            <div className="ai-title-row">
              <h1>CampusEase AI</h1>

              <span className="ai-status">
                <span className="ai-status-dot"></span>
                ONLINE
              </span>
            </div>

            <p>
              Your intelligent campus assistant
            </p>
          </div>

        </div>

        <button
          className="ai-clear-button"
          onClick={clearChat}
          title="Clear conversation"
        >
          <Trash2 size={17} />
          <span>Clear</span>
        </button>
      </div>

      {/* MAIN CHAT */}

      <div className="ai-chat-container">

        {/* WELCOME */}

        {messages.length === 1 && (
          <div className="ai-welcome">

            <div className="ai-welcome-icon">
              <Sparkles size={27} />
            </div>

            <h2>
              How can I help you today?
            </h2>

            <p>
              Ask questions about your campus,
              or use one of the suggestions below.
            </p>

            <div className="ai-suggestions">

              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => sendMessage(item)}
                  disabled={loading}
                >
                  <Sparkles size={14} />
                  {item}
                </button>
              ))}

            </div>

          </div>
        )}

        {/* MESSAGES */}

        <div className="ai-messages">

          {messages.map((message) => (

            <div
              key={message.id}
              className={`ai-message-row ${
                message.type === "user"
                  ? "user-message-row"
                  : "ai-message-row"
              }`}
            >

              <div
                className={`ai-avatar ${
                  message.type === "user"
                    ? "user-avatar"
                    : "assistant-avatar"
                }`}
              >
                {message.type === "user" ? (
                  <User size={17} />
                ) : (
                  <Bot size={17} />
                )}
              </div>

              <div className="ai-message-content">

                <div className="ai-message-name">
                  {message.type === "user"
                    ? "YOU"
                    : "CAMPUSEASE AI"}
                </div>

                <div className="ai-message-bubble">
                  {message.text}
                </div>

                <div className="ai-message-time">
                  <Clock3 size={11} />
                  {formatTime(message.time)}
                </div>

              </div>

            </div>

          ))}

          {/* TYPING INDICATOR */}

          {loading && (
            <div className="ai-message-row">

              <div className="ai-avatar assistant-avatar">
                <Bot size={17} />
              </div>

              <div className="ai-message-content">

                <div className="ai-message-name">
                  CAMPUSEASE AI
                </div>

                <div className="ai-typing">

                  <span></span>
                  <span></span>
                  <span></span>

                  <small>
                    Thinking...
                  </small>

                </div>

              </div>

            </div>
          )}

          <div ref={messagesEndRef}></div>

        </div>

      </div>

      {/* INPUT AREA */}

      <div className="ai-input-area">

        <div className="ai-input-wrapper">

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask CampusEase AI anything..."
            rows={1}
            disabled={loading}
          />

          <button
            className="ai-send-button"
            onClick={() => sendMessage()}
            disabled={!question.trim() || loading}
          >
            <Send size={18} />
          </button>

        </div>

        <div className="ai-input-footer">
          <span>
            CampusEase AI uses verified campus information
            for campus-specific answers.
          </span>

          <span>
            Press Enter to send
          </span>
        </div>

      </div>

    </div>
  );
}

export default StudentAI;