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
import { calculateOffsets } from "../utils/calculateOffsets";
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

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerMenu(ref.current!);
  }, [registerMenu]);

  const offsetsRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useModalDismissSignal(ref, hide, true);

  const eventType = contextMenuEvent?.type;

  // Optimally position the popup within the viewport
  useLayoutEffect(() => {
    const contextMenu = ref.current!;
    const menuRect = contextMenu.getBoundingClientRect();

    const isKeyboardEvent = eventType?.startsWith("key");

    const offsets = calculateOffsets({
      alignTo,
      cursorX: isKeyboardEvent ? undefined : clientX,
      cursorY: isKeyboardEvent ? undefined : clientY,
      menuRect,
      targetRect,
      viewportHeight: window.outerHeight,
      viewportWidth: window.outerWidth,
    });

    contextMenu.style.left = `${offsets.x}px`;
    contextMenu.style.top = `${offsets.y}px`;
  }, [alignTo, clientX, clientY, eventType, targetRect]);

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

  let style = {
    left: offsets.x,
    top: offsets.y,
  };

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
