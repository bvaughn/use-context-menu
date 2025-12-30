import { useRef } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { Box, Callout, Code, Header } from "react-lib-tools";
import {
  ContextMenuCategory,
  ContextMenuDivider,
  ContextMenuItem,
  useContextMenu
} from "use-context-menu";
import { html as htmlImportStyles } from "../../public/generated/examples/ImportStyles.json";
import { html as htmlHook } from "../../public/generated/examples/RightClickMenuHook.json";
import { html as htmlRender } from "../../public/generated/examples/RightClickMenuRender.json";
import { Link } from "../components/Link";

export default function RightClickMenuRoute() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuCategory>Inline options</ContextMenuCategory>
      <ContextMenuItem onSelect={() => selectAll(ref.current!)}>
        Select all
      </ContextMenuItem>
      <ContextMenuItem onSelect={() => copyText(ref.current!)}>
        Copy text
      </ContextMenuItem>
      <ContextMenuDivider />
      <ContextMenuCategory>External options</ContextMenuCategory>
      <ContextMenuItem onSelect={viewSource}>View source</ContextMenuItem>
    </>
  );

  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Right-click menu" />
      <div>A context menu is shown by right-clicking an element:</div>
      <div ref={ref}>
        <Callout
          intent="success"
          minimal
          onContextMenu={onContextMenu}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          Right-click in the green box to open the context menu.
        </Callout>
      </div>
      {contextMenu}
      {createPortal(<Toaster />, document.body)}
      <div>
        Context menus are defined using the <code>useContextMenu</code> hook:
      </div>
      <Code html={htmlHook} />
      <div>
        And they can be attached to any element using the{" "}
        <code>onContextMenu</code> and <code>onKeyDown</code> props:
      </div>
      <Code html={htmlRender} />
      <Callout intent="primary">
        Remember to import menu styles. See the{" "}
        <Link to="/examples/custom-styles">custom styles</Link> page for more
        information.
      </Callout>
      <Code html={htmlImportStyles} />
    </Box>
  );
}

const copyText = async (target: HTMLElement) => {
  try {
    await navigator.clipboard.writeText(target.textContent!);
    toast("Copied to clipboard");
  } catch {
    // No-op
  }
};

const selectAll = (target: HTMLElement) => {
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const viewSource = () => {
  window.open(
    "https://github.com/bvaughn/use-context-menu/blob/main/src/routes/RightClickMenuRoute.tsx",
    "_blank"
  );
};
