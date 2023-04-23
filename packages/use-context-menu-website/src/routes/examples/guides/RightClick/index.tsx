import ContextMenuDivider from "use-context-menu/src/components/ContextMenuDivider";
import ContextMenuItem from "use-context-menu/src/components/ContextMenuItem";
import useContextMenu from "use-context-menu/src/hooks/useContextMenu";

import styles from "./styles.module.css";

export default function RightClickRoute() {
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
      <p>
        To try the context menu, right-click on the following text:{" "}
        <div className={styles.Trigger} onContextMenu={onContextMenu}>
          right-click me
        </div>
      </p>
      {contextMenu}
    </>
  );
}
