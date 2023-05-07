import {
  KeyboardEvent,
  ReactNode,
  UIEvent,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";

import { ContextMenuContext } from "../ContextMenuContext";
import styles from "./ContextMenuItem.module.css";

export function ContextMenuItem({
  children,
  dataTestId,
  dataTestName = "ContextMenuItem",
  dataTestState,
  disabled = false,
  onSelect,
}: {
  children: ReactNode;
  dataTestId?: string;
  dataTestName?: string;
  dataTestState?: string;
  disabled?: boolean;
  onSelect?: (event: UIEvent) => void;
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
      className={
        disabled ? styles.ContextMenuItemDisabled : styles.ContextMenuItem
      }
      data-test-id={dataTestId}
      data-test-name={dataTestName}
      data-test-state={dataTestState}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
