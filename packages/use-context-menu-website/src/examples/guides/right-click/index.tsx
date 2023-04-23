import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

// REMOVE_BEFORE

export function Demo({ className }: { className: string }) {
  const { contextMenu, onContextMenu } = useContextMenu(
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
      <span className={className} onContextMenu={onContextMenu}>
        right-click me
      </span>
      {contextMenu}
    </>
  );
}
