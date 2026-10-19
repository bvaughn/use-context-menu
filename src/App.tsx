import { AppRoot, type DefaultPath, type NavConfig } from "react-lib-tools";
import { repository } from "../package.json";
import Logo from "../public/favicon.svg?react";
import { routes, type Path } from "./routes";

import "../styles.css";

export default function App() {
  return (
    <AppRoot
      enableSiteSearch
      nav={nav}
      packageDescription="configurable context menus"
      packageLogo={<Logo className="ucm-logo w-8 h-8" />}
      packageName="use-context-menu"
      repositoryUrl={repository.url}
      routes={routes}
    />
  );
}

const nav: NavConfig<Path | DefaultPath> = [
  { path: "/", title: "Getting started" },
  {
    title: "Examples",
    links: [
      { path: "/examples/right-click-menu", title: "Right-click menu" },
      { path: "/examples/left-click-menu", title: "Left-click menu" },
      { path: "/examples/alignment-options", title: "Alignment options" },
      { path: "/examples/custom-styles", title: "Custom styles" }
    ]
  },
  {
    title: "API",
    links: [
      { path: "/api/use-context-menu", title: "useContextMenu" },
      { path: "/api/context-menu-category", title: "ContextMenuCategory" },
      { path: "/api/context-menu-divider", title: "ContextMenuDivider" },
      { path: "/api/context-menu-item", title: "ContextMenuItem" }
    ]
  },
  { path: "/support", title: "Support" }
];
