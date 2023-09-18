import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";

import "./index.css";
import { GenerateCompletionProvider } from "./context/generate-completion.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GenerateCompletionProvider>
      <App />
    </GenerateCompletionProvider>
  </React.StrictMode>,
);
