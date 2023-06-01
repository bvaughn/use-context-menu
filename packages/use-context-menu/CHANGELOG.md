# Changelog

## 0.4.9
* README update (no code changes)

## 0.4.8
* Build release bundles with Preconstruct (smaller, more readable)
* Replaced CSS modules (which required special bundler configuration to support) with single `styles.css` file which can be imported anywhere in the app (even if no bundler is used); this should support more bundlers/frameworks/environments

## 0.4.7
* Use `position: fixed` (rather than `position: absolute`) to avoid effecting body scroll position for context menus rendered near the edge of the viewport
* Better handle edge cases for context menu positioning (e.g. a context menu that is larger than the viewport)
* Add optional `className` and `style` props for context menu, items, divider, and categories to simplify custom styling

## 0.4.6
* Refined `requireClickToShow` behavior so that keyboard navigation works once menu has been shown

## 0.4.5
* Added TypeScript helpers `assertKeyboardEvent`, `assertMouseEvent`, `isKeyboardEvent`, and `isMouseEvent` to refine event params passed to `onShow` callback
* Added `useContextMenu` optional config param `requireClickToShow`

## 0.4.4
* Properly set menu width for keyboard events when target is smaller

## 0.4.3
* Add fallback values for undefined CSS menu-item hover/focus color

## 0.4.2
* Additional configurable CSS variables added
* Add fallback values for undefined CSS variables

## 0.4.1
* Update README for NPM

## 0.4.0
* Initial release
