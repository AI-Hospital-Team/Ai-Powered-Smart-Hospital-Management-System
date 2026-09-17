import { useEffect, useState } from "react";
import "./DarkMode.css";

export const DARK_MODE_KEY = "darkMode";

export function getInitialDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(DARK_MODE_KEY) === "true";
}

export function applyDarkMode(enabled) {
  if (typeof document === "undefined") {
    return;
  }

  const html = document.documentElement;
  const body = document.body;

  html.classList.toggle("dark-mode", enabled);
  body.classList.toggle("dark-mode", enabled);

  html.dataset.theme = enabled ? "dark" : "light";
  body.dataset.theme = enabled ? "dark" : "light";
}

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() =>
    getInitialDarkMode()
  );

  // Apply immediately when component mounts
  useEffect(() => {
    const savedTheme = getInitialDarkMode();

    setDarkMode(savedTheme);
    applyDarkMode(savedTheme);
  }, []);

  // Apply whenever state changes
  useEffect(() => {
    localStorage.setItem(
      DARK_MODE_KEY,
      String(darkMode)
    );

    applyDarkMode(darkMode);

    window.dispatchEvent(
      new CustomEvent("dark-mode-change", {
        detail: darkMode,
      })
    );
  }, [darkMode]);

  // Keep theme synchronized across pages/components
  useEffect(() => {
    const syncTheme = (event) => {
      let nextTheme;

      if (
        event?.type === "dark-mode-change" &&
        typeof event.detail === "boolean"
      ) {
        nextTheme = event.detail;
      } else if (
        event?.type === "storage" &&
        event.key === DARK_MODE_KEY
      ) {
        nextTheme = event.newValue === "true";
      } else {
        nextTheme = getInitialDarkMode();
      }

      setDarkMode(nextTheme);
      applyDarkMode(nextTheme);
    };

    window.addEventListener(
      "dark-mode-change",
      syncTheme
    );

    window.addEventListener(
      "storage",
      syncTheme
    );

    return () => {
      window.removeEventListener(
        "dark-mode-change",
        syncTheme
      );

      window.removeEventListener(
        "storage",
        syncTheme
      );
    };
  }, []);

  return [darkMode, setDarkMode];
}

export function DarkModeToggle({
  className = "",
}) {
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode((current) => !current);
  };

  return (
    <button
      type="button"
      className={`dark-mode-toggle ${className}`.trim()}
      aria-label={
        darkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      aria-pressed={darkMode}
      title={
        darkMode
          ? "Switch to Light Mode"
          : "Switch to Dark Mode"
      }
      onClick={toggleDarkMode}
    >
      <span aria-hidden="true">
        {darkMode ? "☀" : "☾"}
      </span>
    </button>
  );
}

export default DarkModeToggle;