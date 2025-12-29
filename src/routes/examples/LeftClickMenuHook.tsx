import { ContextMenuItem, useContextMenu } from "use-context-menu";

const { contextMenu: menu, onContextMenu: onClick, onKeyDown } =
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useContextMenu(
    <>
      <ContextMenuItem onSelect={selectAll}>Select all</ContextMenuItem>
      <ContextMenuItem onSelect={copyText}>Copy text</ContextMenuItem>
    </>,
    { alignTo: "auto-target" }
  );

// <end>

declare function copyText(): void;
declare function selectAll(): void;

export { menu, onClick, onKeyDown };
