import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AitheronSite from "./App.jsx";
import ServicePage from "./pages/ServicePage.jsx";   // ⬅️ use the generic template
import "./index.css";

// Load Calendly widget globally (all routes)
if (!document.querySelector("#calendly-widget-js")) {
  const s = document.createElement("script");
  s.id = "calendly-widget-js";
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  document.body.appendChild(s);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AitheronSite />} />

        {/* Dynamic services route: /services/:slug  (azure, aws, streaming, …) */}
        <Route path="/services/:slug" element={<ServicePage />} />

        {/* Back-compat: if anyone hits the old hardcoded Azure path, redirect */}
        <Route path="/services/azure" element={<Navigate to="/services/azure" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
