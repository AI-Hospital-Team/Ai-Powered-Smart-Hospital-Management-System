import { useEffect, useState } from "react";
import "./DarkMode.css";

export const DARK_MODE_KEY = "darkMode";

/* =========================================================
   GET SAVED THEME
========================================================= */

export function getInitialDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(DARK_MODE_KEY) === "true";
}

/* =========================================================
   APPLY THEME GLOBALLY
========================================================= */

export function applyDarkMode(enabled) {
  if (typeof document === "undefined") {
    return;
  }

  const html = document.documentElement;
  const body = document.body;

  html.classList.toggle("dark-mode", enabled);
  body.classList.toggle("dark-mode", enabled);

  html.dataset.theme = enabled
    ? "dark"
    : "light";
}

/* =========================================================
   GLOBAL DARK MODE HOOK
========================================================= */

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    getInitialDarkMode
  );

  /* -------------------------------------------------------
     APPLY THEME + SAVE TO LOCAL STORAGE
  ------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      DARK_MODE_KEY,
      String(darkMode)
    );

    applyDarkMode(darkMode);

    /*
      Notify other components/pages.
      This allows multiple theme buttons/components
      to stay synchronized.
    */
    window.dispatchEvent(
      new CustomEvent("dark-mode-change", {
        detail: darkMode,
      })
    );
  }, [darkMode]);

  /* -------------------------------------------------------
     SYNC THEME FROM OTHER COMPONENTS / TABS
  ------------------------------------------------------- */

  useEffect(() => {
    const syncTheme = (event) => {
      let savedTheme;

      /*
        If event contains the new theme,
        use it directly.
      */
      if (
        event?.type === "dark-mode-change" &&
        typeof event.detail === "boolean"
      ) {
        savedTheme = event.detail;
      } else {
        savedTheme = getInitialDarkMode();
      }

      setDarkMode((current) => {
        if (current === savedTheme) {
          return current;
        }

        return savedTheme;
      });

      applyDarkMode(savedTheme);
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

/* =========================================================
   DARK MODE TOGGLE BUTTON
========================================================= */

export function DarkModeToggle({
  className = "",
}) {
  const [darkMode, setDarkMode] =
    useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(
      (current) => !current
    );
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