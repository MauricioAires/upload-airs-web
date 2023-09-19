import React from "react";
import ReactDOM from "react-dom/client";

import "@/lib/i18next-config.ts";

import { App } from "./app.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
