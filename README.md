<img src="https://use-context-menu.vercel.app/og.png" alt="use-context-menu logo" width="400" height="210" />

`use-context-menu`: React components and hooks for displaying configurable context menus. Refer to [the docs](https://use-context-menu.vercel.app/) for usage examples.

### If you like this project, 🎉 [become a sponsor](https://github.com/sponsors/bvaughn/) or ☕ [buy me a coffee](http://givebrian.coffee/)

## Install

```sh
npm install use-context-menu
```

## Quick start

```tsx
import { ContextMenuItem, useContextMenu } from "use-context-menu";

// You can import this anywhere, just so long as it's imported once
import "use-context-menu/styles.css";

function Example() {
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

## FAQs

### Why is the context menu not styled?

CSS styles must be explicitly imported for this package:

```js
import "use-context-menu/styles.css";
```

## Documentation

<!-- react-lib-tools:api:begin -->

## Components

### ContextMenuCategory

Context menu category header.

```tsx
<ContextMenuCategory>Main</ContextMenuCategory>
```

#### Required props

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

#### Optional props

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

### ContextMenuDivider

Separator rendered between context menu sections.

#### Required props

None

#### Optional props

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

### ContextMenuItem

Context menu item.

```tsx
<ContextMenuItem onSelect={copy}>Copy text</ContextMenuItem>
```

#### Required props

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

#### Optional props

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

## Hooks

### useContextMenu

Create a ready-to-render context menu.

**Returns:** event handlers and context menu portal

#### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>contextMenuItems</td>
      <td><p>Menu items to render; typically a combination of <code>ContextMenuItem</code>, <code>ContextMenuCategory</code>, and <code>ContextMenuDivider</code> components.</p>
</td>
    </tr>
    <tr>
      <td>alignTo?</td>
      <td><p>Context menu alignment.</p>
</td>
    </tr>
    <tr>
      <td>className?</td>
      <td><p>Class name applied to root context menu element</p>
</td>
    </tr>
    <tr>
      <td>data-testid?</td>
      <td><p>Test id attribute attached to root context menu element</p>
</td>
    </tr>
    <tr>
      <td>onHide?</td>
      <td><p>Callback notified when context menu is hidden</p>
</td>
    </tr>
    <tr>
      <td>onShow?</td>
      <td><p>Callback notified when context menu is shown</p>
</td>
    </tr>
    <tr>
      <td>style?</td>
      <td><p>CSS style applied to root context menu element</p>
</td>
    </tr>
  </tbody>
</table>

### useModalDismissSignal

Closes a modal dialog if the user clicks outside of it or presses "Escape".

#### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modalRef</td>
      <td><p>Ref to the root element of the modal</p>
</td>
    </tr>
    <tr>
      <td>dismissCallback</td>
      <td><p>Callback notified when the modal should be dismissed</p>
</td>
    </tr>
    <tr>
      <td>dismissOnClickOutside?</td>
      <td><p>Dismiss the modal when the user clicks outside of it; defaults to <code>true</code></p>
</td>
    </tr>
  </tbody>
</table>

<!-- react-lib-tools:api:end -->
