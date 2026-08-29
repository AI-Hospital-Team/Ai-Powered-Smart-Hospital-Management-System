import { useEffect, useState } from "react";
import "./DarkMode.css";

export const DARK_MODE_KEY = "darkMode";

/* =========================================
   GET SAVED THEME
========================================= */

export function getInitialDarkMode() {
  return localStorage.getItem(DARK_MODE_KEY) === "true";
}


/* =========================================
   APPLY THEME
========================================= */

export function applyDarkMode(enabled) {
  document.documentElement.classList.toggle(
    "dark-mode",
    enabled
  );

  document.body.classList.toggle(
    "dark-mode",
    enabled
  );

  document.documentElement.dataset.theme =
    enabled ? "dark" : "light";
}


/* =========================================
   DARK MODE HOOK
========================================= */

export function useDarkMode() {

  const [darkMode, setDarkMode] =
    useState(getInitialDarkMode);

  useEffect(() => {

    localStorage.setItem(
      DARK_MODE_KEY,
      String(darkMode)
    );

    applyDarkMode(darkMode);

  }, [darkMode]);

  return [
    darkMode,
    setDarkMode
  ];
}


/* =========================================
   DARK MODE TOGGLE
========================================= */

function DarkModeToggle({
  className = ""
}) {

  const [
    darkMode,
    setDarkMode
  ] = useDarkMode();

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
          ? "Light mode"
          : "Dark mode"
      }
      onClick={() =>
        setDarkMode(
          current => !current
        )
      }
    >
      <span aria-hidden="true">
        {darkMode ? "☀" : "☾"}
      </span>
    </button>
  );
}

export default DarkModeToggle;