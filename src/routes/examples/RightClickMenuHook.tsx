import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu
} from "use-context-menu";

// It's important to import styles, though this only needs to happen once
import "use-context-menu/styles.css";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
  <>
    <ContextMenuCategory>Inline options</ContextMenuCategory>
    <ContextMenuItem onSelect={selectAll}>Select all</ContextMenuItem>
    <ContextMenuItem onSelect={copyText}>Copy text</ContextMenuItem>
    <ContextMenuDivider />
    <ContextMenuCategory>External options</ContextMenuCategory>
    <ContextMenuItem onSelect={viewSource}>View source</ContextMenuItem>
  </>
);

// <end>

declare function copyText(): void;
declare function selectAll(): void;
declare function viewSource(): void;

export { contextMenu, onContextMenu, onKeyDown };
