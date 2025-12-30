import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function LeftClickMenu() {
  const {
    contextMenu: menu,
    onContextMenu: onClick,
    onKeyDown
  } = useContextMenu(
    <>
      <ContextMenuItem onSelect={noop}>One</ContextMenuItem>
      <ContextMenuItem onSelect={noop}>Two</ContextMenuItem>
    </>
  );

  return (
    <>
      <div onClick={onClick} onKeyDown={onKeyDown}>
        Click target
      </div>
      {menu}
    </>
  );
}

function noop() {}
