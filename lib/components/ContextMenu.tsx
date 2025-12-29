import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useRef
} from "react";
import { createPortal } from "react-dom";
import { ContextMenuContext } from "../context/ContextMenuContext";
import { useModalDismissSignal } from "../hooks/useModalDismissSignal";
import type { AlignTo, ContextMenuStyle } from "../types";
import { calculateContextMenuStyle } from "../utils/calculateContextMenuStyle";
import classNames from "../utils/classNames";

export function ContextMenu({
  alignTo,
  children,
  className,
  clientX,
  clientY,
  targetRect,
  "data-testid": dataTestId,
  "data-testname": dataTestName = "ContextMenu",
  hide,
  style: styleFromProps
}: {
  alignTo: AlignTo;
  children: ReactNode;
  className?: string | undefined;
  clientX: number;
  clientY: number;
  targetRect: DOMRect;
  "data-testid"?: string | undefined;
  "data-testname"?: string | undefined;
  hide: () => void;
  style?: CSSProperties | undefined;
}) {
  const { contextMenuEvent, registerMenu } = useContext(ContextMenuContext);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerMenu(ref.current!);
  }, [registerMenu]);

  const styleRef = useRef<ContextMenuStyle>({
    left: 0,
    top: 0,
    width: undefined
  });

  useModalDismissSignal(ref, hide, true);

  const eventType = contextMenuEvent?.type;

  // Optimally position the popup within the viewport
  useLayoutEffect(() => {
    const contextMenu = ref.current!;
    const menuRect = contextMenu.getBoundingClientRect();

    const isKeyboardEvent = eventType?.startsWith("key");

    const { left, top, width } = calculateContextMenuStyle({
      alignTo,
      cursorX: isKeyboardEvent ? undefined : clientX,
      cursorY: isKeyboardEvent ? undefined : clientY,
      menuRect,
      targetRect,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth
    });

    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
    if (width) {
      contextMenu.style.width = `${width}px`;
    }

    // Stash in ref for subsequent renders
    styleRef.current = {
      left,
      top,
      width
    };
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

  const { left, top, width } = styleRef.current;

  let style: CSSProperties = {
    left: `${left}px`,
    top: `${top}px`,
    width: width ? `${width}px` : undefined
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
