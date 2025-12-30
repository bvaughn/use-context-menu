import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { Home } from "./routes/Home";
import { LeftClickMenu } from "./routes/LeftClickMenu";
import { RightClickMenu } from "./routes/RightClickMenu";

import "use-context-menu/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/left-click-menu" element={<LeftClickMenu />} />
        <Route path="/right-click-menu" element={<RightClickMenu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
