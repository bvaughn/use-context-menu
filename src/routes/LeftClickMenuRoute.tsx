import { useRef } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { Box, Button, Callout, Code, Header } from "react-lib-tools";
import { ContextMenuItem, useContextMenu } from "use-context-menu";
import { html as htmlHook } from "../../public/generated/examples/LeftClickMenuHook.json";
import { html as htmlRender } from "../../public/generated/examples/LeftClickMenuRender.json";
import ChevronIcon from "../../public/svgs/chevron.svg?react";

export default function LeftClickMenuRoute() {
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    contextMenu: menu,
    onContextMenu: onClick,
    onKeyDown
  } = useContextMenu(
    <>
      <ContextMenuItem onSelect={() => selectAll(ref.current!)}>
        Select all
      </ContextMenuItem>
      <ContextMenuItem onSelect={() => copyText(ref.current!)}>
        Copy text
      </ContextMenuItem>
    </>,
    { alignTo: "auto-target" }
  );

  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Left-click menu" />
      <div>Menus can also be attached to the left-click action:</div>
      <Callout intent="success" minimal>
        <div ref={ref}>Left-click the dropdown below to open the menu:</div>
        <Button
          className="flex flex-row items-center gap-2"
          onClick={onClick}
          // @ts-expect-error TODO This prop is not exported (yet) but does work
          onKeyDown={onKeyDown}
        >
          click to open <ChevronIcon className="fill-black/50 w-4 h-4" />
        </Button>
      </Callout>
      {menu}
      {createPortal(<Toaster />, document.body)}
      <div>
        Menus are also defined using the <code>useContextMenu</code> hook, but
        with an additional <code>alignTo</code> prop:
      </div>
      <Code html={htmlHook} />
      <div>
        And they are attached to an element using <code>onClick</code> instead
        of the <code>onContextMenu</code> prop.
      </div>
      <Code html={htmlRender} />
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
