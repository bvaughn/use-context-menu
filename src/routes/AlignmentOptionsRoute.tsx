import { useState } from "react";
import { Box, Button, Callout, Code, Header } from "react-lib-tools";
import {
  ContextMenuCategory,
  ContextMenuItem,
  useContextMenu,
  type AlignTo
} from "use-context-menu";
import { html } from "../../public/generated/examples/AlignTo.json";
import ChevronIcon from "../../public/svgs/chevron.svg?react";

export default function AlignmentOptionsRoute() {
  const [alignTo, setAlignTo] = useState<AlignTo>("above");

  const { contextMenu: selectMenu, onContextMenu: onClickSelectMenu } =
    useContextMenu(
      <>
        <ContextMenuCategory>fixed</ContextMenuCategory>
        <ContextMenuItem onSelect={() => setAlignTo("above")}>
          above
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => setAlignTo("below")}>
          below
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => setAlignTo("left")}>
          left
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => setAlignTo("right")}>
          right
        </ContextMenuItem>
        <ContextMenuCategory>relative</ContextMenuCategory>
        <ContextMenuItem onSelect={() => setAlignTo("auto-cursor")}>
          auto-cursor
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => setAlignTo("auto-target")}>
          auto-target
        </ContextMenuItem>
      </>,
      { alignTo: "auto-target" }
    );

  const { contextMenu: demoMenu, onContextMenu: onClickDemoMenu } =
    useContextMenu(<ContextMenuItem>Example</ContextMenuItem>, {
      alignTo
    });

  return (
    <>
      <Box direction="column" gap={4}>
        <Header section="Examples" title="Alignment options" />
        <div>
          The second parameter to <code>useContextMenu</code> can be used to
          control the context menu's alignment.
        </div>
        <Code html={html} />
        <div>
          Menu alignment can either be fixed (e.g. above/below/left/right) or
          relative to the cursor or target.
        </div>
        <Callout intent="success" minimal>
          <Box align="center" direction="row" gap={4}>
            <div>Select an alignment:</div>
            <Button
              className="flex flex-row items-center gap-2"
              intent="success"
              onClick={onClickSelectMenu}
            >
              selected: {alignTo}
              <ChevronIcon className="fill-black/50 w-4 h-4" />
            </Button>
          </Box>
        </Callout>
        <div>
          <Button intent="none" onClick={onClickDemoMenu}>
            Click to demo: <code>alignTo="{alignTo}"</code>
          </Button>
        </div>
      </Box>
      {selectMenu}
      {demoMenu}
    </>
  );
}
