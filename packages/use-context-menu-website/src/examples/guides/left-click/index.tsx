import toast, { Toaster } from "react-hot-toast";
import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

import Icon from "../../../components/Icon";

const selectOne = () => toast("Option one selected");
const selectTwo = () => toast("Option two selected");
const selectThree = () => toast("Option three selected");
const selectFour = () => toast("Option four selected");

// REMOVE_BEFORE

function Example({ className }: { className: string }) {
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
      <ContextMenuItem disabled onSelect={selectThree}>
        Three
      </ContextMenuItem>
      <ContextMenuItem onSelect={selectFour}>Four</ContextMenuItem>
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

// REMOVE_AFTER

export function Demo({ className }: { className: string }) {
  return (
    <>
      <Example className={className} />
      <Toaster />
    </>
  );
}
