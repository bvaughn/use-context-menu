export type Route = {
  path: string;
  title: string;
};

export const HOME_ROUTE: Route = {
  path: "/",
  title: "Home",
};

// API

// Guides

export const LEFT_CLICK_MENU: Route = {
  path: "/examples/left-click-menu",
  title: "Menu (left-click)",
};

export const RIGHT_CLICK_MENU: Route = {
  path: "/examples/right-click-menu",
  title: "Context menu (right-click)",
};
