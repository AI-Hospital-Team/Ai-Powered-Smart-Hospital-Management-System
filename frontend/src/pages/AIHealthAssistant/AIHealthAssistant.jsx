import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIHealthAssistant.css";

function AIHealthAssistant() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSymptoms = async () => {
    const trimmedSymptoms = symptoms.trim();

    setError("");
    setResponse("");

    if (!trimmedSymptoms) {
      setError("Please enter your symptoms.");
      return;
    }

    if (trimmedSymptoms.length < 20) {
      setError(
        "Please describe your symptoms in at least 20 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/api/ai/health-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: trimmedSymptoms,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Unable to connect to AI Health Assistant.");
      }

      const data = await res.json();

      setResponse(data.response || "No response received from AI.");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to hospital server. Please make sure Spring Boot and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAssistant = () => {
    setSymptoms("");
    setResponse("");
    setError("");
  };

  const useExample = (text) => {
    setSymptoms(text);
    setResponse("");
    setError("");
  };

  /*
   * Format AI response
   * Supports:
   * **Bold**
   * * Bullet points
   * - Bullet points
   * Line breaks
   */
  const formatAIResponse = (text) => {
    const cleanText = text
      .replace(/\\\*\\\*/g, "**")
      .replace(/\\\*/g, "*");

    const lines = cleanText.split(/\r?\n/);

    const elements = [];
    let bulletItems = [];

    const renderBoldText = (text) => {
      const parts = text.split(/(\*\*.*?\*\*)/g);

      return parts.map((part, index) => {
        if (
          part.startsWith("**") &&
          part.endsWith("**")
        ) {
          return (
            <strong key={index}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        return part;
      });
    };

    const flushBullets = () => {
      if (bulletItems.length === 0) return;

      elements.push(
        <ul key={`list-${elements.length}`}>
          {bulletItems.map((item, index) => (
            <li key={index}>
              {renderBoldText(item)}
            </li>
          ))}
        </ul>
      );

      bulletItems = [];
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushBullets();

        elements.push(
          <div
            key={`space-${index}`}
            className="ai-response-space"
          />
        );

        return;
      }

      const isBullet =
        trimmedLine.startsWith("* ") ||
        trimmedLine.startsWith("- ");

      if (isBullet) {
        bulletItems.push(trimmedLine.substring(2));
        return;
      }

      flushBullets();

      elements.push(
        <p key={`line-${index}`}>
          {renderBoldText(trimmedLine)}
        </p>
      );
    });

    flushBullets();

    return elements;
  };

  return (
    <div className="ai-assistant-page">

      {/* ================= HEADER ================= */}

      <header className="ai-assistant-header">
        <div className="ai-header-content">

          <div>
            <h1>🤖 AI Health Assistant</h1>
            <p>
              AI-powered health guidance for patients
            </p>
          </div>

          <button
            className="ai-back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>
      </header>


      {/* ================= MAIN ================= */}

      <main className="ai-assistant-main">

        {/* ================= HERO ================= */}

        <section className="ai-hero">

          <div className="ai-hero-icon">
            🩺
          </div>

          <h2>
            How are you feeling today?
          </h2>

          <p>
            Describe your symptoms and our AI Health Assistant
            will provide general health guidance.
          </p>

        </section>


        {/* ================= ASSISTANT CARD ================= */}

        <section className="ai-card">

          <label htmlFor="symptoms">
            Describe Your Symptoms
          </label>

          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: I have fever, cough, headache and weakness for the last two days..."
            rows="7"
          />

          <div className="ai-character-count">
            {symptoms.length} characters
          </div>


          {/* ================= BUTTONS ================= */}

          <div className="ai-buttons">

            <button
              className="ai-analyze-btn"
              onClick={analyzeSymptoms}
              disabled={loading}
            >
              {loading
                ? "⏳ Analyzing..."
                : "🔍 Analyze Symptoms"}
            </button>

            <button
              className="ai-clear-btn"
              onClick={clearAssistant}
              disabled={loading}
            >
              Clear
            </button>

          </div>


          {/* ================= LOADING ================= */}

          {loading && (
            <div className="ai-loading">

              <div className="ai-spinner"></div>

              <p>
                Analyzing symptoms...
              </p>

              <span>
                Please wait while AI prepares your response.
              </span>

            </div>
          )}


          {/* ================= ERROR ================= */}

          {error && (
            <div className="ai-error">
              ⚠️ {error}
            </div>
          )}


          {/* ================= AI RESPONSE ================= */}

          {response && !loading && (
            <div className="ai-response">

              <h3>
                🤖 AI Health Guidance
              </h3>

              <div className="ai-response-content">
                {formatAIResponse(response)}
              </div>

            </div>
          )}

        </section>


        {/* ================= EXAMPLES ================= */}

        <section className="ai-examples">

          <h3>
            Try an Example
          </h3>

          <div className="ai-example-buttons">

            <button
              onClick={() =>
                useExample(
                  "I have fever, cough, weakness and headache for the last two days."
                )
              }
            >
              Fever & Cough
            </button>

            <button
              onClick={() =>
                useExample(
                  "I have stomach pain, nausea and vomiting since yesterday."
                )
              }
            >
              Stomach Problem
            </button>

            <button
              onClick={() =>
                useExample(
                  "I have headache, dizziness and feeling tired throughout the day."
                )
              }
            >
              Headache & Dizziness
            </button>

          </div>

        </section>


        {/* ================= DISCLAIMER ================= */}

        <div className="ai-disclaimer">

          <strong>
            ⚠️ Important:
          </strong>{" "}

          This AI assistant provides general health information
          only. It is not a replacement for professional medical
          diagnosis or treatment. For serious or emergency
          symptoms, contact a qualified healthcare professional
          immediately.

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="ai-footer">

        <p>
          AI-Powered Smart Hospital Management System
        </p>

        <span>
          Powered by Spring Boot + Ollama + Llama 3.2
        </span>

      </footer>

    </div>
  );
}

export default AIHealthAssistant;