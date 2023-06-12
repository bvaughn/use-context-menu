import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu,
} from "use-context-menu";

import Block from "../../../components/Block";

// REMOVE_BEFORE

function Example({
  copyText,
  selectAll,
  viewSource,
}: {
  copyText: () => void;
  selectAll: () => void;
  viewSource: () => void;
}) {
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

  return (
    <>
      <Block onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0}>
        To try the context menu, right-click anywhere within this box.
      </Block>
      {contextMenu}
    </>
  );
}

// REMOVE_AFTER

export function Demo({ className }: { className: string }) {
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
      "https://github.com/bvaughn/use-context-menu/blob/main/packages/use-context-menu-website/src/examples/guides/right-click/index.tsx",
      "_blank"
    );
  };

  return (
    <>
      <div className={className} ref={ref}>
        <Example
          copyText={copyText}
          selectAll={selectAll}
          viewSource={viewSource}
        />
      </div>
      <Toaster />
    </>
  );
}
