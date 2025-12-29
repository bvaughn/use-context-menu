import { menu, onClick, onKeyDown } from "./LeftClickMenuHook";

// <begin>

<>
  <button onClick={onClick} onKeyDown={onKeyDown} tabIndex={0}>
    click to open
  </button>
  {menu}
</>;
