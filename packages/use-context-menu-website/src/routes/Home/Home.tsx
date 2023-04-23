import ContextMenuDivider from "../../../../use-context-menu/src/components/ContextMenuDivider";
import ContextMenuItem from "../../../../use-context-menu/src/components/ContextMenuItem";
import useContextMenu from "../../../../use-context-menu/src/hooks/useContextMenu";
import Block from "../../components/Block";
import Container from "../../components/Container";
import Icon from "../../components/Icon";
import {} from "../config";

import GitHubLink from "./GitHubLink";
import { InstallationPanel } from "./InstallationPanel";
import styles from "./Home.module.css";
import SubHeading from "../../components/SubHeading";

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
          <p>React components for displaying configurable context menus.</p>
        </Block>
        <Block>
          <p>
            To try the context menu, right-click on the following text:{" "}
            <div
              className={styles.Trigger}
              data-type="context-menu"
              onContextMenu={onContextMenu}
            >
              right-click me
            </div>
          </p>
          <p>
            This component can also be used for left-click drop-down menus:{" "}
            <div
              className={styles.Trigger}
              data-type="menu"
              onClick={onContextMenu}
            >
              click me <Icon type="down-arrow" />
            </div>
          </p>
        </Block>
        <Block>
          <SubHeading title="Installation" />
          <InstallationPanel />
        </Block>
      </Container>
      {contextMenu}
    </>
  );
}
