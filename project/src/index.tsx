import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./screens/HomePage/HomePage";
import { ServicesPage } from "./screens/ServicesPage";
import { LoginPage } from "./screens/LoginPage";
import { SignupPage } from "./screens/SignupPage";
import { HireWorkerPage } from "./screens/HireWorkerPage";
import { ToHirePage } from "./screens/ToHirePage";
import { WorkerPage } from "./screens/WorkerPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/hire-worker" element={<HireWorkerPage />} />
        <Route path="/to-hire" element={<ToHirePage />} />
        <Route path="/worker" element={<WorkerPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
