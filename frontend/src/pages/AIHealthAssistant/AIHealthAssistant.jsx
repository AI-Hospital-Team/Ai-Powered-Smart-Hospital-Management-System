import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Activity,
  Bot,
  BrainCircuit,
  Sparkles,
  Search,
  Trash2,
  AlertTriangle,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Clock3,
  MessageSquareText,
} from "lucide-react";

import "./AIHealthAssistant.css";

function AIHealthAssistant() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     ANALYZE SYMPTOMS
  ========================================================= */

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
        throw new Error(
          "Unable to connect to AI Health Assistant."
        );
      }

      const data = await res.json();

      setResponse(
        data.response || "No response received from AI."
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to hospital server. Please make sure Spring Boot and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CLEAR
  ========================================================= */

  const clearAssistant = () => {
    setSymptoms("");
    setResponse("");
    setError("");
  };

  /* =========================================================
     EXAMPLE
  ========================================================= */

  const useExample = (text) => {
    setSymptoms(text);
    setResponse("");
    setError("");
  };

  /* =========================================================
     FORMAT AI RESPONSE
  ========================================================= */

  const formatAIResponse = (text) => {
    const cleanText = text
      .replace(/\\\*\\\*/g, "**")
      .replace(/\\\*/g, "*");

    const lines = cleanText.split(/\r?\n/);

    const elements = [];

    let bulletItems = [];

    /* ---------------------------------------------------------
       BOLD TEXT
    --------------------------------------------------------- */

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

    /* ---------------------------------------------------------
       BULLETS
    --------------------------------------------------------- */

    const flushBullets = () => {
      if (bulletItems.length === 0) return;

      elements.push(
        <ul key={`list-${elements.length}`}>
          {bulletItems.map((item, index) => (
            <li key={index}>
              <span className="ai-response-bullet">
                <Activity size={13} />
              </span>

              <span>
                {renderBoldText(item)}
              </span>
            </li>
          ))}
        </ul>
      );

      bulletItems = [];
    };

    /* ---------------------------------------------------------
       PROCESS LINES
    --------------------------------------------------------- */

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

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="ai-assistant-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="ai-assistant-header">

        <div className="ai-header-content">

          {/* BRAND */}

          <div className="ai-header-brand">

            <div className="ai-header-logo">
              <Bot size={25} />
            </div>

            <div>
              <h1>
                AI Health Assistant
              </h1>

              <p>
                Intelligent Healthcare Guidance
              </p>
            </div>

          </div>


          {/* BACK */}

          <button
            type="button"
            className="ai-back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} />

            <span>
              Back to Home
            </span>
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="ai-assistant-main">


        {/* ===================================================
            HERO
        =================================================== */}

        <section className="ai-hero">

          {/* FUTURISTIC AI CORE */}

          <div className="ai-hero-icon">

            <div className="ai-hero-orbit orbit-one"></div>

            <div className="ai-hero-orbit orbit-two"></div>

            <div className="ai-hero-core">
              <Bot size={38} />
            </div>

          </div>


          {/* BADGE */}

          <div className="ai-hero-badge">

            <Sparkles size={13} />

            <span>
              AI POWERED HEALTHCARE
            </span>

          </div>


          {/* HEADING */}

          <h2>
            Intelligent Health
            <br />

            <span>
              Guidance
            </span>
          </h2>


          <p>
            Describe your symptoms and our AI Health Assistant
            will analyze them and provide general health guidance.
          </p>


          {/* HERO FEATURES */}

          <div className="ai-hero-features">

            <div className="ai-hero-feature">

              <div>
                <BrainCircuit size={17} />
              </div>

              <span>
                AI Analysis
              </span>

            </div>


            <div className="ai-hero-feature">

              <div>
                <ShieldCheck size={17} />
              </div>

              <span>
                Safe Guidance
              </span>

            </div>


            <div className="ai-hero-feature">

              <div>
                <Activity size={17} />
              </div>

              <span>
                Symptom Analysis
              </span>

            </div>

          </div>

        </section>


        {/* ===================================================
            AI CARD
        =================================================== */}

        <section className="ai-card">

          {/* CARD HEADER */}

          <div className="ai-card-header">

            <div className="ai-card-title">

              <div className="ai-card-icon">
                <MessageSquareText size={21} />
              </div>

              <div>

                <span>
                  AI HEALTH ANALYSIS
                </span>

                <h3>
                  Describe Your Symptoms
                </h3>

              </div>

            </div>


            <div className="ai-status">

              <span className="ai-status-dot"></span>

              AI Ready

            </div>

          </div>


          {/* INPUT */}

          <div className="ai-input-wrapper">

            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) =>
                setSymptoms(e.target.value)
              }
              placeholder="Describe what you're feeling... For example: I have fever, cough, headache and weakness for the last two days."
              rows="7"
              disabled={loading}
            />

            <div className="ai-input-corner">
              <Activity size={15} />
            </div>

          </div>


          {/* COUNT */}

          <div className="ai-character-count">

            <span>
              {symptoms.length}
            </span>

            <span>
              / 2000 characters
            </span>

          </div>


          {/* BUTTONS */}

          <div className="ai-buttons">

            <button
              type="button"
              className="ai-analyze-btn"
              onClick={analyzeSymptoms}
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="ai-button-spinner"></span>

                  <span>
                    Analyzing...
                  </span>
                </>
              ) : (
                <>
                  <Search size={17} />

                  <span>
                    Analyze Symptoms
                  </span>

                  <Sparkles size={15} />
                </>
              )}

            </button>


            <button
              type="button"
              className="ai-clear-btn"
              onClick={clearAssistant}
              disabled={loading}
            >

              <Trash2 size={15} />

              <span>
                Clear
              </span>

            </button>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="ai-loading">

              <div className="ai-loading-animation">

                <div className="ai-loading-ring"></div>

                <Bot size={26} />

              </div>

              <p>
                AI is analyzing your symptoms
              </p>

              <span>
                Processing your information securely...
              </span>

            </div>

          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="ai-error">

              <div className="ai-error-icon">
                <AlertTriangle size={18} />
              </div>

              <div>

                <strong>
                  Connection Issue
                </strong>

                <p>
                  {error}
                </p>

              </div>

            </div>

          )}


          {/* =================================================
              AI RESPONSE
          ================================================= */}

          {response && !loading && (

            <div className="ai-response">

              <div className="ai-response-header">

                <div className="ai-response-title">

                  <div className="ai-response-icon">
                    <Bot size={21} />
                  </div>

                  <div>

                    <span>
                      AI ANALYSIS COMPLETE
                    </span>

                    <h3>
                      Health Guidance
                    </h3>

                  </div>

                </div>


                <div className="ai-response-status">

                  <ShieldCheck size={14} />

                  AI Generated

                </div>

              </div>


              <div className="ai-response-divider"></div>


              <div className="ai-response-content">

                {formatAIResponse(response)}

              </div>


              <div className="ai-response-footer">

                <HeartPulse size={15} />

                <span>
                  General health guidance — consult a
                  qualified healthcare professional for diagnosis.
                </span>

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            EXAMPLES
        =================================================== */}

        <section className="ai-examples">

          <div className="ai-section-heading">

            <div>

              <span>
                QUICK START
              </span>

              <h3>
                Try a Symptom Example
              </h3>

            </div>

            <Sparkles size={20} />

          </div>


          <div className="ai-example-buttons">


            {/* FEVER */}

            <button
              type="button"
              onClick={() =>
                useExample(
                  "I have fever, cough, weakness and headache for the last two days."
                )
              }
            >

              <div className="ai-example-icon">
                <Activity size={19} />
              </div>

              <div>

                <strong>
                  Fever & Cough
                </strong>

                <span>
                  Respiratory symptoms
                </span>

              </div>

            </button>


            {/* STOMACH */}

            <button
              type="button"
              onClick={() =>
                useExample(
                  "I have stomach pain, nausea and vomiting since yesterday."
                )
              }
            >

              <div className="ai-example-icon">
                <HeartPulse size={19} />
              </div>

              <div>

                <strong>
                  Stomach Problem
                </strong>

                <span>
                  Digestive symptoms
                </span>

              </div>

            </button>


            {/* HEADACHE */}

            <button
              type="button"
              onClick={() =>
                useExample(
                  "I have headache, dizziness and feeling tired throughout the day."
                )
              }
            >

              <div className="ai-example-icon">
                <BrainCircuit size={19} />
              </div>

              <div>

                <strong>
                  Headache & Dizziness
                </strong>

                <span>
                  Neurological symptoms
                </span>

              </div>

            </button>

          </div>

        </section>


        {/* ===================================================
            DISCLAIMER
        =================================================== */}

        <div className="ai-disclaimer">

          <div className="ai-disclaimer-icon">
            <AlertTriangle size={17} />
          </div>

          <div>

            <strong>
              Important Health Notice
            </strong>

            <p>
              This AI assistant provides general health
              information only. It is not a replacement for
              professional medical diagnosis or treatment.
              For serious or emergency symptoms, contact a
              qualified healthcare professional immediately.
            </p>

          </div>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="ai-footer">

        <div className="ai-footer-brand">

          <div className="ai-footer-icon">
            <Stethoscope size={18} />
          </div>

          <div>

            <p>
              AI-Powered Smart Hospital Management System
            </p>

            <span>
              Intelligent Healthcare • Spring Boot • Ollama • Llama 3.2
            </span>

          </div>

        </div>


        <div className="ai-footer-tech">

          <Clock3 size={14} />

          AI Healthcare Assistant

        </div>

      </footer>

    </div>
  );
}

export default AIHealthAssistant;