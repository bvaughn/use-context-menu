import {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
  UIEvent,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";

import { ContextMenuContext } from "../ContextMenuContext";
import classNames from "../utils/classNames";

export function ContextMenuItem({
  children,
  className,
  dataTestId,
  dataTestName = "ContextMenuItem",
  dataTestState,
  disabled = false,
  onSelect,
  style,
}: {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  dataTestName?: string;
  dataTestState?: string;
  disabled?: boolean;
  onSelect?: (event: UIEvent) => void;
  style?: CSSProperties;
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
      data-test-name={dataTestName}
      data-test-state={dataTestState}
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
