import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
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
  "/api/context-menu-category": lazy(
    () => import("./routes/ContextMenuCategoryRoute")
  ),
  "/api/context-menu-divider": lazy(
    () => import("./routes/ContextMenuDividerRoute")
  ),
  "/api/context-menu-item": lazy(() => import("./routes/ContextMenuItemRoute")),
  "/api/use-context-menu": lazy(() => import("./routes/UseContextMenuRoute"))
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
