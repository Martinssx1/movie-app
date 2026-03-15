import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Theme from "./Theme/Theme.jsx";
import ContextFavourite from "./favourite/ContextFavourite.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <ContextFavourite>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextFavourite>
    </Theme>
  </StrictMode>,
);
