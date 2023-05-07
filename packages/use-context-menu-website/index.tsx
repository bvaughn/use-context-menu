import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./src/components/ScrollToTop";
import PageNotFoundRoute from "./src/routes/PageNotFound";
import {
  CUSTOM_CSS_MENU,
  HOME_ROUTE,
  LEFT_CLICK_MENU,
  RIGHT_CLICK_MENU,
} from "./src/routes/config";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="*" element={<PageNotFoundRoute />} />
          <Route
            path={CUSTOM_CSS_MENU.path}
            Component={CUSTOM_CSS_MENU.Component}
          />
          <Route path={HOME_ROUTE.path} Component={HOME_ROUTE.Component} />
          <Route
            path={LEFT_CLICK_MENU.path}
            Component={LEFT_CLICK_MENU.Component}
          />
          <Route
            path={RIGHT_CLICK_MENU.path}
            Component={RIGHT_CLICK_MENU.Component}
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
