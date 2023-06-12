import { ComponentType } from "react";

import HomeRoute from "./Home/Home";
import CustomCssRoute from "./examples/guides/CustomCss";
import LeftClickRoute from "./examples/guides/LeftClick";
import RightClickRoute from "./examples/guides/RightClick";

export type Route = {
  Component: ComponentType;
  path: string;
  title: string;
};

export const HOME_ROUTE: Route = {
  Component: HomeRoute,
  path: "/",
  title: "Home",
};

// API

// Guides

export const CUSTOM_CSS_MENU: Route = {
  Component: CustomCssRoute,
  path: "/examples/custom-css",
  title: "Custom CSS",
};

export const LEFT_CLICK_MENU: Route = {
  Component: LeftClickRoute,
  path: "/examples/left-click-menu",
  title: "Menu (left-click)",
};

export const RIGHT_CLICK_MENU: Route = {
  Component: RightClickRoute,
  path: "/examples/right-click-menu",
  title: "Context menu (right-click)",
};
