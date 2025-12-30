import { AppRoot, NavSection } from "react-lib-tools";
import { routes } from "./routes";

import "../styles.css";
import { NavLink } from "./components/NavLink";

export default function App() {
  return (
    <AppRoot
      hideVersions
      navLinks={
        <>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/right-click-menu">
              right-click menu
            </NavLink>
            <NavLink path="/examples/left-click-menu">left-click menu</NavLink>
            <NavLink path="/examples/alignment-options">
              alignment options
            </NavLink>
            <NavLink path="/examples/custom-styles">custom styles</NavLink>
          </NavSection>
          <NavSection label="API">
            <NavLink path="/api/use-context-menu">useContextMenu</NavLink>
            <NavLink path="/api/context-menu-category">
              ContextMenuCategory
            </NavLink>
            <NavLink path="/api/context-menu-divider">
              ContextMenuDivider
            </NavLink>
            <NavLink path="/api/context-menu-item">ContextMenuItem</NavLink>
          </NavSection>
          <div>
            <NavLink path="/support">Support</NavLink>
          </div>
        </>
      }
      packageDescription="configurable context menus"
      packageName="use-context-menu"
      routes={routes}
    />
  );
}
