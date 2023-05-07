import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

import Icon from "../../../components/Icon";

const selectOne = () => alert("Option one selected");
const selectTwo = () => alert("Option two selected");
const selectThree = () => alert("Option three selected");

// REMOVE_BEFORE

export function Demo({ className }: { className: string }) {
  const {
    contextMenu: menu,
    onContextMenu: onClick,
    onKeyDown,
  } = useContextMenu(
    <>
      <ContextMenuCategory>Section one</ContextMenuCategory>
      <ContextMenuItem onSelect={selectOne}>One</ContextMenuItem>
      <ContextMenuItem onSelect={selectTwo}>Two</ContextMenuItem>
      <ContextMenuDivider />
      <ContextMenuCategory>Section two</ContextMenuCategory>
      <ContextMenuItem onSelect={selectThree}>Three</ContextMenuItem>
    </>,
    { alignTo: "auto-target" }
  );

  return (
    <>
      <span
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        click me <Icon type={menu ? "close" : "arrow-down"} />
      </span>
      {menu}
    </>
  );
}
