import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

import Icon from "../../../components/Icon";

// REMOVE_BEFORE

export function Demo({ className }: { className: string }) {
  const { contextMenu: menu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuCategory>Section one</ContextMenuCategory>
      <ContextMenuItem>One</ContextMenuItem>
      <ContextMenuItem>Two</ContextMenuItem>
      <ContextMenuDivider />
      <ContextMenuCategory>Section two</ContextMenuCategory>
      <ContextMenuItem>Three</ContextMenuItem>
    </>
  );

  return (
    <>
      <span className={className} onClick={onClick}>
        click me <Icon type="down-arrow" />
      </span>
      {menu}
    </>
  );
}
