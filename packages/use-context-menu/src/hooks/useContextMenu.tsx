import {
  ReactNode,
  KeyboardEvent as SyntheticKeyboardEvent,
  MouseEvent as SyntheticMouseEvent,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ContextMenuContext,
  ContextMenuContextType,
} from "../ContextMenuContext";
import { ContextMenu } from "../components/ContextMenu";
import { AlignTo } from "../types";

type State = {
  cursorPageX: number;
  cursorPageY: number;
  event: UIEvent;
  targetRect: DOMRect;
};

export function useContextMenu(
  contextMenuItems: ReactNode,
  options: {
    alignTo?: AlignTo;
    dataTestId?: string;
    dataTestName?: string;
    onHide?: () => void | Promise<void>;
    onShow?: (event: UIEvent) => void | Promise<void>;
    requireClickToShow?: boolean;
  } = {}
): {
  contextMenu: ReactNode | null;
  onKeyDown: (event: SyntheticKeyboardEvent) => void;
  onContextMenu: (event: UIEvent) => void;
} {
  const {
    alignTo = "auto-cursor",
    dataTestId,
    dataTestName,
    onHide,
    onShow,
    requireClickToShow = false,
  } = options;

  const [state, setState] = useState<State | null>(null);

  const menuRef = useRef<HTMLDivElement>();
  const menuItemsRef = useRef<HTMLDivElement[]>([]);

  const registerMenu = useCallback((menu: HTMLDivElement) => {
    menuRef.current = menu;
  }, []);

  const registerMenuItem = useCallback((menuItem: HTMLDivElement) => {
    const menuItems = menuItemsRef.current;
    menuItems.push(menuItem);
  }, []);

  useEffect(() => {
    if (state == null) {
      return;
    }

    const target = state.event.target as HTMLElement;

    const menu = menuRef.current as HTMLDivElement;
    const menuItems = menuItemsRef.current as HTMLDivElement[];

    const enabledMenuItems = menuItems.reduce(
      (reduced: number[], menuItem, index) => {
        if (menuItem.getAttribute("data-disabled") !== "true") {
          reduced.push(index);
        }
        return reduced;
      },
      []
    );

    const isMouseEvent =
      state.event.type === "contextmenu" || state.event.type === "click";

    let focusIndex = isMouseEvent ? -1 : 0;
    if (focusIndex >= 0) {
      menuItems[0].focus();
    } else {
      target.blur();
      menu.focus();
    }

    const focus = () => {
      const index = enabledMenuItems[focusIndex];
      const menuItem = menuItems[index];
      menuItem.focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown": {
          focusIndex =
            focusIndex + 1 < enabledMenuItems.length ? focusIndex + 1 : 0;
          focus();
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case "ArrowUp": {
          focusIndex =
            focusIndex - 1 >= 0 ? focusIndex - 1 : enabledMenuItems.length - 1;
          focus();
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case "Enter": {
          const index = enabledMenuItems[focusIndex];
          const menuItem = menuItems[index];
          menuItem.click();
          break;
        }
        case "Tab": {
          if (event.shiftKey) {
            focusIndex =
              focusIndex - 1 >= 0
                ? focusIndex - 1
                : enabledMenuItems.length - 1;
          } else {
            focusIndex =
              focusIndex + 1 < enabledMenuItems.length ? focusIndex + 1 : 0;
          }
          focus();
          event.preventDefault();
          event.stopPropagation();
          break;
        }
      }
    };

    menu.addEventListener("keydown", onKeyDown);

    return () => {
      menu.removeEventListener("keydown", onKeyDown);

      menuItems.splice(0, menuItems.length);

      // Return focus to the target element that triggered the context menu.
      target.focus();
    };
  }, [requireClickToShow, state]);

  const committedValuesRef = useRef<{
    onHide?: () => void | Promise<void>;
    onShow?: (event: UIEvent) => void | Promise<void>;
  }>({ onHide, onShow });

  useEffect(() => {
    committedValuesRef.current.onHide = onHide;
    committedValuesRef.current.onShow = onShow;
  });

  const context = useMemo<ContextMenuContextType>(
    () => ({
      contextMenuEvent: state?.event ?? null,
      registerMenu,
      registerMenuItem,
    }),
    [registerMenu, registerMenuItem, state?.event]
  );

  const showMenu = (event: UIEvent) => {
    if (event.defaultPrevented) {
      // Support nested context menus
      return;
    }

    event.preventDefault();

    if (typeof onShow === "function") {
      onShow(event);
    }

    const { currentTarget } = event;

    const targetRect = (currentTarget as HTMLElement).getBoundingClientRect();
    const cursorPageX = isMouseEvent(event) ? event.pageX : targetRect.x;
    const cursorPageY = isMouseEvent(event) ? event.pageY : targetRect.y;

    setState({
      cursorPageX,
      cursorPageY,
      event,
      targetRect,
    });
  };

  const onContextMenu = showMenu;
  const onKeyDown = (event: SyntheticKeyboardEvent) => {
    if (state !== null) {
      return;
    } else if (requireClickToShow) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "ContextMenu":
      case "Enter":
      case " ": {
        showMenu(event);
        break;
      }
    }
  };

  const hideContextMenu = useCallback(() => {
    const { onHide } = committedValuesRef.current;

    setState(null);

    if (typeof onHide === "function") {
      onHide();
    }
  }, []);

  let contextMenu = null;
  if (state) {
    contextMenu = (
      <ContextMenuContext.Provider value={context}>
        <ContextMenu
          alignTo={alignTo}
          cursorPageX={state.cursorPageX}
          cursorPageY={state.cursorPageY}
          dataTestId={dataTestId}
          dataTestName={dataTestName}
          hide={hideContextMenu}
          targetRect={state.targetRect}
        >
          {contextMenuItems}
        </ContextMenu>
      </ContextMenuContext.Provider>
    );
  }

  return {
    contextMenu,
    onContextMenu,
    onKeyDown,
  };
}

function isMouseEvent(event: any): event is SyntheticMouseEvent {
  return event.pageX != null && event.pageY != null;
}
