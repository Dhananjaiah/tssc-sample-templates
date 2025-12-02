// Global error handler to send errors to backend
import { logFrontendError } from './api';

window.addEventListener('error', (event) => {
  logFrontendError(event.message || 'Unknown error');
});

window.addEventListener('unhandledrejection', (event) => {
  logFrontendError(event.reason ? event.reason.toString() : 'Unhandled promise rejection');
});
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);