import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type UIEvent,
  useContext,
  useLayoutEffect,
  useRef
} from "react";
import { ContextMenuContext } from "../context/ContextMenuContext";
import classNames from "../utils/classNames";

/**
 * Context menu item.
 *
 * ```tsx
 * <ContextMenuItem onSelect={copy}>Copy text</ContextMenuItem>
 * ```
 */
export function ContextMenuItem({
  children,
  className,
  "data-testid": dataTestId,
  disabled = false,
  onSelect,
  style
}: {
  /**
   * Menu item name.
   */
  children: ReactNode;

  /**
   * CSS className.
   */
  className?: string | undefined;

  /**
   * Test id.
   *
   * ℹ️ [Test id](https://testing-library.com/docs/queries/bytestid/) can be used to narrow selection when unit testing.
   */
  "data-testid"?: string | undefined;

  /**
   * Disable menu item.
   */
  disabled?: boolean | undefined;

  /**
   * Callback notified when menu item is selected.
   */
  onSelect: ((event: UIEvent) => void) | undefined;

  /**
   * CSS style.
   */
  style?: CSSProperties | undefined;
}) {
  const { registerMenuItem } = useContext(ContextMenuContext);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerMenuItem(ref.current!);
  }, [registerMenuItem]);

  const onClick = (event: UIEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    if (!disabled) {
      if (onSelect) {
        onSelect(event);
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    if (!disabled) {
      if (onSelect) {
        switch (event.key) {
          case "ArrowDown":
          case "ArrowUp":
          case "Enter":
          case " ":
            onSelect(event);
            break;
        }
      }
    }
  };

  return (
    <div
      className={classNames(
        disabled
          ? "useContextMenu_ContextMenuItemDisabled"
          : "useContextMenu_ContextMenuItem",
        className
      )}
      data-context-menu-item
      data-disabled={disabled}
      data-test-id={dataTestId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
      style={style}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
}
