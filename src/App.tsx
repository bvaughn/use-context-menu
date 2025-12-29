import { AppRoot, NavLink, NavSection } from "react-lib-tools";
import { routes } from "./routes";

import "../styles.css";

export default function App() {
  return (
    <AppRoot
      navLinks={
        <>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/right-click-menu">
              right-click menu
            </NavLink>
            <NavLink path="/examples/left-click-menu">left-click menu</NavLink>
            <NavLink path="/examples/positioning-options">
              positioning options
            </NavLink>
            <NavLink path="/examples/custom-css">custom css</NavLink>
          </NavSection>
          <NavSection label="API">
            <NavLink path="/api/use-context-menu">useContextMenu</NavLink>
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
