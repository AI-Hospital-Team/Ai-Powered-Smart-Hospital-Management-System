import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import {
  applyDarkMode,
  getInitialDarkMode,
} from "./theme/DarkMode";

import App from "./App.jsx";


/* =========================================
   APPLY SAVED THEME
========================================= */

applyDarkMode(
  getInitialDarkMode()
);


/* =========================================
   START APPLICATION
========================================= */

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <App />
  </StrictMode>
);