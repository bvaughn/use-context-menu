import toast, { Toaster } from "react-hot-toast";
import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

const selectOne = () => toast("Option one selected");
const selectTwo = () => toast("Option two selected");
const selectThree = () => toast("Option three selected");

// REMOVE_BEFORE

function Example({ className }: { className: string }) {
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

// REMOVE_AFTER

export function Demo({ className }: { className: string }) {
  return (
    <>
      <Example className={className} />
      <Toaster />
    </>
  );
}
