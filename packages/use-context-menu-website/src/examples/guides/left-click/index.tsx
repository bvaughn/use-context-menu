import { useRef } from "react";
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

function Example({
  className,
  copyText,
  selectAll,
  viewSource,
}: {
  className: string;
  copyText: () => void;
  selectAll: () => void;
  viewSource: () => void;
}) {
  const {
    contextMenu: menu,
    onContextMenu: onClick,
    onKeyDown,
  } = useContextMenu(
    <>
      <ContextMenuCategory>Inline options</ContextMenuCategory>
      <ContextMenuItem onSelect={selectAll}>Select all</ContextMenuItem>
      <ContextMenuItem onSelect={copyText}>Copy text</ContextMenuItem>
      <ContextMenuDivider />
      <ContextMenuCategory>External options</ContextMenuCategory>
      <ContextMenuItem onSelect={viewSource}>View source</ContextMenuItem>
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

export function Demo({
  containerClassName,
  triggerClassName,
}: {
  containerClassName: string;
  triggerClassName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const copyText = async () => {
    try {
      const div = ref.current!;
      await navigator.clipboard.writeText(div.textContent!);
      toast("Copied to clipboard");
    } catch (error) {}
  };

  const selectAll = () => {
    const div = ref.current!;
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(div);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const viewSource = () => {
    window.open(
      "https://github.com/bvaughn/use-context-menu/blob/main/packages/use-context-menu-website/src/examples/guides/left-click/index.tsx",
      "_blank"
    );
  };

  return (
    <>
      <div className={containerClassName} ref={ref}>
        <span>
          This hook can also be used for regular menus. Try by left-clicking the
          following text:
        </span>
        <Example
          className={triggerClassName}
          copyText={copyText}
          selectAll={selectAll}
          viewSource={viewSource}
        />
      </div>
      <Toaster />
    </>
  );
}
