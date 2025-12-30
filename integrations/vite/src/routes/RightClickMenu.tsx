import {
  ContextMenuCategory,
  ContextMenuItem,
  useContextMenu
} from "use-context-menu";

export function RightClickMenu() {
  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <div>Context Menu</div>
      <ContextMenuCategory>Category one</ContextMenuCategory>
      <ContextMenuItem onSelect={noop}>Item one</ContextMenuItem>
      <ContextMenuItem onSelect={noop}>Item two</ContextMenuItem>
      <ContextMenuCategory>Category two</ContextMenuCategory>
      <ContextMenuItem onSelect={noop}>Item three</ContextMenuItem>
    </>
  );

  return (
    <>
      <div onContextMenu={onContextMenu} onKeyDown={onKeyDown}>
        Click target
      </div>
      {contextMenu}
    </>
  );
}

function noop() {}
