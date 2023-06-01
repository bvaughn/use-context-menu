import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import { ContextMenuContext } from "../ContextMenuContext";
import { useModalDismissSignal } from "../hooks/useModalDismissSignal";
import { AlignTo } from "../types";
import classNames from "../utils/classNames";

export function ContextMenu({
  alignTo,
  children,
  className,
  clientX,
  clientY,
  targetRect,
  dataTestId,
  dataTestName = "ContextMenu",
  hide,
  style: styleFromProps,
}: {
  alignTo: AlignTo;
  children: ReactNode;
  className?: string;
  clientX: number;
  clientY: number;
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

  const offsetsRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useModalDismissSignal(ref, hide, true);

  // Optimally position the popup within the viewport
  useLayoutEffect(() => {
    const contextMenu = ref.current!;
    const rect = contextMenu.getBoundingClientRect();

    const offsets = offsetsRef.current;
    if (rect.width < window.innerWidth) {
      if (rect.right > window.innerWidth) {
        if (rect.x - rect.width > 0) {
          offsets.x = 0 - rect.width;
        } else {
          offsets.x = 0 - rect.x;
        }
      }
    }
    if (rect.height < window.innerHeight) {
      if (rect.bottom > window.innerHeight) {
        if (alignToTarget) {
          if (rect.y - targetRect.height - rect.height > 0) {
            offsets.y = 0 - targetRect.height - rect.height;
          } else {
            offsets.y = 0 - rect.y;
          }
        } else {
          if (rect.y - rect.height > 0) {
            offsets.y = 0 - rect.height;
          } else {
            offsets.y = 0 - rect.y;
          }
        }
      }
    }

    if (alignToTarget) {
      contextMenu.style.left = `${targetRect.left + offsets.x}px`;
      contextMenu.style.top = `${
        targetRect.top + targetRect.height + offsets.y
      }px`;
    } else {
      contextMenu.style.left = `${clientX + offsets.x}px`;
      contextMenu.style.top = `${clientY + offsets.y}px`;
    }
  }, [alignToTarget, clientX, clientY, targetRect]);

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

  const offsets = offsetsRef.current;

  let style;
  if (alignToTarget) {
    style = {
      left: targetRect.left + offsets.x,
      minWidth: targetRect.width,
      top: targetRect.top + targetRect.height + offsets.y,
    };
  } else {
    style = {
      left: clientX + offsets.x,
      top: clientY + offsets.y,
    };
  }

  if (styleFromProps) {
    style = Object.assign(style, styleFromProps);
  }

  return createPortal(
    <div
      className="useContextMenu_Backdrop"
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <div
        className={classNames("useContextMenu_ContextMenu", className)}
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
