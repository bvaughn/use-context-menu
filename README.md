# use-context-menu

React components for displaying configurable context menus

* View examples and docs at [use-context-menu.vercel.app](https://use-context-menu.vercel.app/)
* Fork [this Code Sandbox](https://codesandbox.io/s/use-context-menu-7z6d67) to get started

## Documentation

### ContextMenuItem

<!-- ContextMenuItem:description:begin -->
Context menu item.

```tsx
<ContextMenuItem onSelect={copy}>Copy text</ContextMenuItem>
```
<!-- ContextMenuItem:description:end -->

#### Required props

<!-- ContextMenuItem:required-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>children</td>
      <td><p>Menu item name.</p>
</td>
    </tr>
    <tr>
      <td>onSelect</td>
      <td><p>Callback notified when menu item is selected.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- ContextMenuItem:required-props:end -->

#### Optional props

<!-- ContextMenuItem:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>className</td>
      <td><p>CSS className.</p>
</td>
    </tr>
    <tr>
      <td>data-testid</td>
      <td><p>Test id.</p>
<p>ℹ️ <a href="https://testing-library.com/docs/queries/bytestid/">Test id</a> can be used to narrow selection when unit testing.</p>
</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td><p>Disable menu item.</p>
</td>
    </tr>
    <tr>
      <td>style</td>
      <td><p>CSS style.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- ContextMenuItem:optional-props:end -->

### ContextMenuCategory

<!-- ContextMenuCategory:description:begin -->
Context menu category header.

```tsx
<ContextMenuCategory>Main</ContextMenuCategory>
```
<!-- ContextMenuCategory:description:end -->

#### Required props

<!-- ContextMenuCategory:required-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>children</td>
      <td><p>Category label.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- ContextMenuCategory:required-props:end -->

#### Optional props

<!-- ContextMenuCategory:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>className</td>
      <td><p>CSS className.</p>
</td>
    </tr>
    <tr>
      <td>style</td>
      <td><p>CSS style.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- ContextMenuCategory:optional-props:end -->

### ContextMenuDivider

<!-- ContextMenuDivider:description:begin -->
Separator rendered between context menu sections.
<!-- ContextMenuDivider:description:end -->

#### Required props

<!-- ContextMenuDivider:required-props:begin -->
None
<!-- ContextMenuDivider:required-props:end -->

#### Optional props

<!-- ContextMenuDivider:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>className</td>
      <td><p>CSS className.</p>
</td>
    </tr>
    <tr>
      <td>style</td>
      <td><p>CSS style.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- ContextMenuDivider:optional-props:end -->

#### Example

```jsx
import { ContextMenuItem, useContextMenu } from "use-context-menu";

// You can import this anywhere, just so long as it's imported once
import "use-context-menu/styles.css";

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