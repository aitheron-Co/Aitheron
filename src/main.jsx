import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AitheronSite from "./App.jsx";
import AzureServicesPage from "./pages/AzureServicesPage.jsx";
import "./index.css";

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
