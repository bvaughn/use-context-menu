import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { ContextMenuContext } from "../ContextMenuContext";
import { useModalDismissSignal } from "../hooks/useModalDismissSignal";
import { AlignTo } from "../types";
import classNames from "../utils/classNames";
import styles from "./ContextMenu.module.css";

export function ContextMenu({
  alignTo,
  children,
  className,
  cursorPageX,
  cursorPageY,
  targetRect,
  dataTestId,
  dataTestName = "ContextMenu",
  hide,
  style: styleFromProps,
}: {
  alignTo: AlignTo;
  children: ReactNode;
  className?: string;
  cursorPageX: number;
  cursorPageY: number;
  targetRect: DOMRect;
  dataTestId?: string;
  dataTestName?: string;
  hide: () => void;
  style?: CSSProperties;
}) {
  const { contextMenuEvent, registerMenu } = useContext(ContextMenuContext);

  let alignToTarget =
    alignTo === "auto-target" || contextMenuEvent?.type.startsWith("key");

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerMenu(ref.current!);
  }, [registerMenu]);

  const [offsets, setOffsets] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useModalDismissSignal(ref, hide, true);

  useLayoutEffect(() => {
    const contextMenu = ref.current!;
    const rect = contextMenu.getBoundingClientRect();

    let newOffsets = { ...offsets };
    if (rect.right > window.innerWidth) {
      if (rect.x - rect.width > 0) {
        newOffsets.x = 0 - rect.width;
      } else {
        newOffsets.x = 0 - rect.x;
      }
    }
    if (rect.bottom > window.innerHeight) {
      if (alignToTarget) {
        if (rect.y - targetRect.height - rect.height > 0) {
          newOffsets.y = 0 - targetRect.height - rect.height;
        } else {
          newOffsets.y = 0 - rect.y;
        }
      } else {
        if (rect.y - rect.height > 0) {
          newOffsets.y = 0 - rect.height;
        } else {
          newOffsets.y = 0 - rect.y;
        }
      }
    }

    if (newOffsets.x !== offsets.x || newOffsets.y !== offsets.y) {
      setOffsets(newOffsets);
    }
  }, [alignToTarget, cursorPageX, cursorPageY, offsets, targetRect.height]);

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    hide();
  };

  const onMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
  };

  let style;
  if (alignToTarget) {
    style = {
      left: window.scrollX + targetRect.left + offsets.x,
      minWidth: targetRect.width,
      top: window.scrollY + targetRect.top + targetRect.height + offsets.y,
    };
  } else {
    style = {
      left: cursorPageX + offsets.x,
      top: cursorPageY + offsets.y,
    };
  }

  if (styleFromProps) {
    style = Object.assign(style, styleFromProps);
  }

  return createPortal(
    <div
      className={styles.Backdrop}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <div
        className={classNames(styles.ContextMenu, className)}
        data-context-menu
        data-test-id={dataTestId}
        data-test-name={dataTestName}
        ref={ref}
        style={style}
        tabIndex={0}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
