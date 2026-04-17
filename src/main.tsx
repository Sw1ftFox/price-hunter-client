import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/index.scss";
import App from "@/app/App";
import { BrowserRouter as Router } from "react-router-dom";

const isDev = import.meta.env.VITE_IS_DEV;

const content =
  isDev === "true" ? (
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  ) : (
    <Router>
      <App />
    </Router>
  );

createRoot(document.getElementById("root")!).render(content);
