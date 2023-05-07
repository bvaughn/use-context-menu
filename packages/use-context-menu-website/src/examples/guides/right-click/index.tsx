import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

const selectOne = () => alert("Option one selected");
const selectTwo = () => alert("Option two selected");
const selectThree = () => alert("Option three selected");

// REMOVE_BEFORE

export function Demo({ className }: { className: string }) {
  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuCategory>Section one</ContextMenuCategory>
      <ContextMenuItem onSelect={selectOne}>One</ContextMenuItem>
      <ContextMenuItem onSelect={selectTwo}>Two</ContextMenuItem>
      <ContextMenuDivider />
      <ContextMenuCategory>Section two</ContextMenuCategory>
      <ContextMenuItem onSelect={selectThree}>Three</ContextMenuItem>
    </>
  );

  return (
    <>
      <span
        className={className}
        onContextMenu={onContextMenu}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        right-click me
      </span>
      {contextMenu}
    </>
  );
}
