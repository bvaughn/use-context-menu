import {
  type CSSProperties,
  type ReactNode,
  type KeyboardEvent as SyntheticKeyboardEvent,
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { ContextMenu } from "../components/ContextMenu";
import {
  ContextMenuContext,
  type ContextMenuContextType
} from "../context/ContextMenuContext";
import type { AlignTo } from "../types";
import { isMouseEvent } from "../utils/event-types/isMouseEvent";

type State = {
  clientX: number;
  clientY: number;
  event: UIEvent;
  targetRect: DOMRect;
};

/**
 * Create a ready-to-render context menu.
 *
 * @param contextMenuItems Menu items to render; typically a combination of `ContextMenuItem`, `ContextMenuCategory`, and `ContextMenuDivider` components.
 * @param options Additional configuration options
 * @returns event handlers and context menu portal
 */
export function useContextMenu(
  contextMenuItems: ReactNode,
  options: {
    /** Context menu alignment. */
    alignTo?: AlignTo | undefined;
    /** Class name applied to root context menu element */
    className?: string | undefined;
    /** Test id attribute attached to root context menu element */
    "data-testid"?: string | undefined;
    /** Callback notified when context menu is hidden */
    onHide?: () => void | Promise<void> | undefined;
    /** Callback notified when context menu is shown */
    onShow?: (event: UIEvent) => void | Promise<void> | undefined;
    /** CSS style applied to root context menu element */
    style?: CSSProperties | undefined;
  } = {}
): {
  /**
   * Context menu to be rendered; TODO
   */
  contextMenu: ReactNode | null;

  /**
   * Imperatively hide an open context menu.
   */
  hideMenu: () => void;

  /**
   * React `onKeyDown` handler to display context menu on Enter or Space.
   */
  onKeyDown: (event: SyntheticKeyboardEvent) => void;

  /**
   * React `onContextMenu` event handler to display context menu on right-click.
   *
   * ℹ️ This method can also be used as an `onClick` handler if the menu should be shown on left-click
   */
  onContextMenu: (event: UIEvent) => void;
} {
  const {
    alignTo = "auto-cursor",
    className,
    "data-testid": dataTestId,
    onHide,
    onShow,
    style
  } = options;

  const [state, setState] = useState<State | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
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
  }, [state]);

  const committedValuesRef = useRef<{
    onHide?: (() => void | Promise<void>) | undefined;
    onShow?: ((event: UIEvent) => void | Promise<void>) | undefined;
    state: State | null;
  }>({ onHide, onShow, state });

  useEffect(() => {
    committedValuesRef.current.onHide = onHide;
    committedValuesRef.current.onShow = onShow;
    committedValuesRef.current.state = state;
  });

  const context = useMemo<ContextMenuContextType>(
    () => ({
      contextMenuEvent: state?.event ?? null,
      registerMenu,
      registerMenuItem
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
    const clientX = isMouseEvent(event) ? event.clientX : targetRect.x;
    const clientY = isMouseEvent(event) ? event.clientY : targetRect.y;

    setState({
      clientX,
      clientY,
      event,
      targetRect
    });
  };

  const onContextMenu = showMenu;
  const onKeyDown = (event: SyntheticKeyboardEvent) => {
    if (state !== null) {
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

  const hideMenu = useCallback(() => {
    const { onHide, state } = committedValuesRef.current;

    if (state == null) {
      return;
    }

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
          className={className}
          clientX={state.clientX}
          clientY={state.clientY}
          data-testid={dataTestId}
          hide={hideMenu}
          style={style}
          targetRect={state.targetRect}
        >
          {contextMenuItems}
        </ContextMenu>
      </ContextMenuContext.Provider>
    );
  }

  return {
    contextMenu,
    hideMenu,
    onContextMenu,
    onKeyDown
  };
}
