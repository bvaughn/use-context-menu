import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
  "*": lazy(() => import("./routes/PageNotFound")),

  // Home page
  "/": lazy(() => import("./routes/GettingStartedRoute")),

  // Examples
  "/examples/right-click-menu": lazy(
    () => import("./routes/RightClickMenuRoute")
  ),
  "/examples/left-click-menu": lazy(
    () => import("./routes/LeftClickMenuRoute")
  ),
  "/examples/alignment-options": lazy(
    () => import("./routes/AlignmentOptionsRoute")
  ),
  "/examples/custom-styles": lazy(() => import("./routes/CustomStylesRoute")),

  // Other
  "/support": lazy(() => import("./routes/SupportRoute"))
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
