import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AitheronSite from "./App.jsx";
import AzureServicesPage from "./pages/AzureServicesPage.jsx";
import "./index.css";

// ✅ Load Calendly widget script globally (works on all routes)
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
        <Route path="/services/azure" element={<AzureServicesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
