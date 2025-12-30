import { contextMenu, onContextMenu, onKeyDown } from "./RightClickMenuHook";

// <begin>

<>
  <div onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0}>
    Right-click in the green box to open the context menu.
  </div>
  {contextMenu}
</>;
