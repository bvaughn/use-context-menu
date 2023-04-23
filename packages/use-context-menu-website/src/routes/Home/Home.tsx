import ContextMenuDivider from "../../../../use-context-menu/src/components/ContextMenuDivider";
import ContextMenuItem from "../../../../use-context-menu/src/components/ContextMenuItem";
import useContextMenu from "../../../../use-context-menu/src/hooks/useContextMenu";
import Block from "../../components/Block";
import Container from "../../components/Container";
import {} from "../config";

import GitHubLink from "./GitHubLink";
import { InstallationPanel } from "./InstallationPanel";

export default function Route() {
  const { contextMenu, onContextMenu } = useContextMenu(
    <>
      <ContextMenuItem>One</ContextMenuItem>
      <ContextMenuItem>Two</ContextMenuItem>
      <ContextMenuDivider />
      <ContextMenuItem>Three</ContextMenuItem>
    </>
  );
  return (
    <>
      <Container>
        <Block>
          <GitHubLink />
          <p>React components for displaying configurable context menus</p>
          <p>
            Try it: <code onContextMenu={onContextMenu}>Right-click me</code>
          </p>
        </Block>
        <Block>
          <InstallationPanel />
        </Block>
      </Container>
      {contextMenu}
    </>
  );
}
