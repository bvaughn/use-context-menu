import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {} from "./src/routes/config";

import HomeRoute from "./src/routes/Home";
import PageNotFoundRoute from "./src/routes/PageNotFound";
import ScrollToTop from "./src/components/ScrollToTop";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="*" element={<PageNotFoundRoute />} />
          <Route path="/" element={<HomeRoute />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
