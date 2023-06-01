# use-context-menu

React components for displaying configurable context menus

* View examples and docs at [use-context-menu.vercel.app](https://use-context-menu.vercel.app/)
* Fork [this Code Sandbox](https://codesandbox.io/s/use-context-menu-7z6d67) to get started

#### Example

```jsx
import { ContextMenuItem, useContextMenu } from "use-context-menu";

function Example({ className }: { className: string }) {
  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuItem onSelect={selectOne}>One</ContextMenuItem>
      <ContextMenuItem onSelect={selectTwo}>Two</ContextMenuItem>
      <ContextMenuItem onSelect={selectThree}>Three</ContextMenuItem>
    </>
  );

  return (
    <>
      <button onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0}>
        right-click me
      </button>
      {contextMenu}
    </>
  );
}
```

### If you like this project, 🎉 [become a sponsor](https://github.com/sponsors/bvaughn/) or ☕ [buy me a coffee](http://givebrian.coffee/)

## FAQs

### Why is the context menu not styled?
CSS styles must be explicitly imported/required for this package:
```js
import "use-context-menu/styles.css";
```