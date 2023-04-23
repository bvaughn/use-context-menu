import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./src/components/ScrollToTop";
import HomeRoute from "./src/routes/Home";
import PageNotFoundRoute from "./src/routes/PageNotFound";
import {
  HOME_ROUTE,
  LEFT_CLICK_MENU,
  RIGHT_CLICK_MENU,
} from "./src/routes/config";
import LeftClickRoute from "./src/routes/examples/guides/LeftClick";
import RightClickRoute from "./src/routes/examples/guides/RightClick";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="*" element={<PageNotFoundRoute />} />
          <Route path={HOME_ROUTE.path} element={<HomeRoute />} />
          <Route path={LEFT_CLICK_MENU.path} element={<LeftClickRoute />} />
          <Route path={RIGHT_CLICK_MENU.path} element={<RightClickRoute />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
