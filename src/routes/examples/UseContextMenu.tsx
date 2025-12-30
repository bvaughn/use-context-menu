import { ContextMenuItem, useContextMenu } from "use-context-menu";

// <begin>

// eslint-disable-next-line react-hooks/rules-of-hooks
useContextMenu(
  <>
    <ContextMenuItem onSelect={selectAll}>Select text</ContextMenuItem>
    <ContextMenuItem onSelect={copyText}>Copy text</ContextMenuItem>
  </>
);

// <end>

declare function copyText(): void;
declare function selectAll(): void;
