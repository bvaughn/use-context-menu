'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var reactDom = require('react-dom');
var jsxRuntime = require('react/jsx-runtime');

const ContextMenuContext = /*#__PURE__*/react.createContext({
  contextMenuEvent: null,
  registerMenu: () => {},
  registerMenuItem: () => {}
});

// Closes a modal dialog if the user clicks outside of it or types "Escape"
function useModalDismissSignal(modalRef, dismissCallback, dismissOnClickOutside = true) {
  react.useEffect(() => {
    const element = modalRef.current;
    if (element === null) {
      return;
    }
    const handleKeyboardEvent = event => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        dismissCallback();
      }
    };
    const handleMouseEvent = event => {
      if (event.defaultPrevented) {
        return;
      }
      if (!element.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        dismissCallback();
      }
    };
    let ownerDocument = null;

    // Delay until after the current call stack is empty,
    // in case this effect is being run while an event is currently bubbling.
    // In that case, we don't want to listen to the pre-existing event.
    let timeoutID = setTimeout(() => {
      timeoutID = null;

      // It's important to listen to the ownerDocument to support browser extensions.
      // The root document might belong to a different window.
      ownerDocument = element.ownerDocument;
      ownerDocument.addEventListener("keydown", handleKeyboardEvent);
      if (dismissOnClickOutside) {
        ownerDocument.addEventListener("click", handleMouseEvent, true);
        ownerDocument.addEventListener("contextmenu", handleMouseEvent, true);
        ownerDocument.addEventListener("mousedown", handleMouseEvent, true);
        ownerDocument.addEventListener("scroll", dismissCallback, true);
      }
    }, 0);
    return () => {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }
      if (ownerDocument !== null) {
        ownerDocument.removeEventListener("keydown", handleKeyboardEvent);
        ownerDocument.removeEventListener("click", handleMouseEvent, true);
        ownerDocument.removeEventListener("contextmenu", handleMouseEvent, true);
        ownerDocument.removeEventListener("mousedown", handleMouseEvent, true);
        ownerDocument.removeEventListener("scroll", dismissCallback, true);
      }
    };
  }, [modalRef, dismissCallback, dismissOnClickOutside]);
}

function isKeyboardEvent(event) {
  return event.type.startsWith("key");
}
function isMouseEvent$1(event) {
  return event.type === "click" || event.type === "contextmenu" || event.type.startsWith("mouse");
}

function assert(expectedCondition, message = "Assertion failed") {
  if (!expectedCondition) {
    console.error(message);
    throw Error(message);
  }
}
function assertKeyboardEvent(event, message = "KeyboardEvent expected") {
  if (isKeyboardEvent(event)) {
    return true;
  }
  console.error(message);
  throw Error(message);
}
function assertMouseEvent(event, message = "MouseEvent expected") {
  if (isMouseEvent$1(event)) {
    return true;
  }
  console.error(message);
  throw Error(message);
}

function calculateContextMenuStyle({
  alignTo,
  cursorX,
  cursorY,
  menuRect,
  targetRect,
  viewportHeight,
  viewportWidth
}) {
  if (alignTo === "auto-cursor" && (cursorX == null || cursorY == null)) {
    alignTo = "auto-target";
  }
  let centerX = targetRect.x + (targetRect.width - menuRect.width) / 2;
  if (centerX < 0) {
    centerX = 0;
  } else if (centerX + menuRect.width > viewportWidth) {
    centerX = viewportWidth - menuRect.width;
  }
  let centerY = targetRect.y + (targetRect.height - menuRect.height) / 2;
  if (centerY < 0) {
    centerY = 0;
  } else if (centerY + menuRect.height > viewportHeight) {
    centerY = viewportHeight - menuRect.height;
  }
  switch (alignTo) {
    case "above":
      {
        return {
          left: centerX,
          top: targetRect.y - menuRect.height
        };
      }
    case "auto-cursor":
      {
        assert(cursorX != null && cursorY != null);
        const style = {
          left: cursorX,
          top: cursorY
        };
        if (menuRect.width > viewportWidth) {
          style.left = 0;
        } else if (cursorX + menuRect.width > viewportWidth) {
          style.left = cursorX - menuRect.width;
        }
        if (menuRect.height > viewportHeight) {
          style.top = 0;
        } else if (cursorY + menuRect.height > viewportHeight) {
          style.top = cursorY - menuRect.height;
        }
        return style;
      }
    case "auto-target":
      {
        if (targetRect.bottom + menuRect.height > viewportHeight) {
          return {
            left: targetRect.x,
            top: Math.max(0, targetRect.y - menuRect.height),
            width: targetRect.width
          };
        } else {
          return {
            left: targetRect.x,
            top: targetRect.bottom,
            width: targetRect.width
          };
        }
      }
    case "below":
      {
        return {
          left: centerX,
          top: targetRect.bottom
        };
      }
    case "left":
      {
        return {
          left: targetRect.x - menuRect.width,
          top: centerY
        };
      }
    case "right":
      {
        return {
          left: targetRect.right,
          top: centerY
        };
      }
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ContextMenu({
  alignTo,
  children,
  className,
  clientX,
  clientY,
  targetRect,
  dataTestId,
  dataTestName = "ContextMenu",
  hide,
  style: styleFromProps
}) {
  const {
    contextMenuEvent,
    registerMenu
  } = react.useContext(ContextMenuContext);
  const ref = react.useRef(null);
  react.useLayoutEffect(() => {
    registerMenu(ref.current);
  }, [registerMenu]);
  const styleRef = react.useRef({
    left: 0,
    top: 0,
    width: undefined
  });
  useModalDismissSignal(ref, hide, true);
  const eventType = contextMenuEvent?.type;

  // Optimally position the popup within the viewport
  react.useLayoutEffect(() => {
    const contextMenu = ref.current;
    const menuRect = contextMenu.getBoundingClientRect();
    const isKeyboardEvent = eventType?.startsWith("key");
    const {
      left,
      top,
      width
    } = calculateContextMenuStyle({
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
  const onClick = event => {
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    hide();
  };
  const onMouseMove = event => {
    event.stopPropagation();
  };
  const {
    left,
    top,
    width
  } = styleRef.current;
  let style = {
    left: `${left}px`,
    top: `${top}px`,
    width: width ? `${width}px` : undefined
  };
  if (styleFromProps) {
    style = Object.assign(style, styleFromProps);
  }
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/jsxRuntime.jsx("div", {
    className: "useContextMenu_Backdrop",
    onClick: onClick,
    onMouseMove: onMouseMove,
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      className: classNames("useContextMenu_ContextMenu", className),
      "data-context-menu": true,
      "data-test-id": dataTestId,
      "data-test-name": dataTestName,
      ref: ref,
      style: style,
      tabIndex: 0,
      children: children
    })
  }), document.body);
}

function ContextMenuCategory({
  children,
  className,
  style
}) {
  const onClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: classNames("useContextMenu_ContextMenuCategory", className),
    "data-context-menu-category": true,
    onClick: onClick,
    style: style,
    children: children
  });
}

function ContextMenuDivider({
  className,
  style
}) {
  const onClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: classNames("useContextMenu_Divider", className),
    "data-context-menu-divider": true,
    onClick: onClick,
    style: style
  });
}

function ContextMenuItem({
  children,
  className,
  dataTestId,
  dataTestName = "ContextMenuItem",
  dataTestState,
  disabled = false,
  onSelect,
  style
}) {
  const {
    registerMenuItem
  } = react.useContext(ContextMenuContext);
  const ref = react.useRef(null);
  react.useLayoutEffect(() => {
    registerMenuItem(ref.current);
  }, [registerMenuItem]);
  const onClick = event => {
    if (event.defaultPrevented) {
      return;
    }
    if (!disabled) {
      if (onSelect) {
        onSelect(event);
      }
    }
  };
  const onKeyDown = event => {
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
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: classNames(disabled ? "useContextMenu_ContextMenuItemDisabled" : "useContextMenu_ContextMenuItem", className),
    "data-context-menu-item": true,
    "data-disabled": disabled,
    "data-test-id": dataTestId,
    "data-test-name": dataTestName,
    "data-test-state": dataTestState,
    onClick: onClick,
    onKeyDown: onKeyDown,
    ref: ref,
    style: style,
    tabIndex: disabled ? -1 : 0,
    children: children
  });
}

function useContextMenu(contextMenuItems, options = {}) {
  const {
    alignTo = "auto-cursor",
    className,
    dataTestId,
    dataTestName,
    onHide,
    onShow,
    requireClickToShow = false,
    style
  } = options;
  const [state, setState] = react.useState(null);
  const menuRef = react.useRef();
  const menuItemsRef = react.useRef([]);
  const registerMenu = react.useCallback(menu => {
    menuRef.current = menu;
  }, []);
  const registerMenuItem = react.useCallback(menuItem => {
    const menuItems = menuItemsRef.current;
    menuItems.push(menuItem);
  }, []);
  react.useEffect(() => {
    if (state == null) {
      return;
    }
    const target = state.event.target;
    const menu = menuRef.current;
    const menuItems = menuItemsRef.current;
    const enabledMenuItems = menuItems.reduce((reduced, menuItem, index) => {
      if (menuItem.getAttribute("data-disabled") !== "true") {
        reduced.push(index);
      }
      return reduced;
    }, []);
    const isMouseEvent = state.event.type === "contextmenu" || state.event.type === "click";
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
    const onKeyDown = event => {
      switch (event.key) {
        case "ArrowDown":
          {
            focusIndex = focusIndex + 1 < enabledMenuItems.length ? focusIndex + 1 : 0;
            focus();
            event.preventDefault();
            event.stopPropagation();
            break;
          }
        case "ArrowUp":
          {
            focusIndex = focusIndex - 1 >= 0 ? focusIndex - 1 : enabledMenuItems.length - 1;
            focus();
            event.preventDefault();
            event.stopPropagation();
            break;
          }
        case "Enter":
          {
            const index = enabledMenuItems[focusIndex];
            const menuItem = menuItems[index];
            menuItem.click();
            break;
          }
        case "Tab":
          {
            if (event.shiftKey) {
              focusIndex = focusIndex - 1 >= 0 ? focusIndex - 1 : enabledMenuItems.length - 1;
            } else {
              focusIndex = focusIndex + 1 < enabledMenuItems.length ? focusIndex + 1 : 0;
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
  const committedValuesRef = react.useRef({
    onHide,
    onShow,
    state
  });
  react.useEffect(() => {
    committedValuesRef.current.onHide = onHide;
    committedValuesRef.current.onShow = onShow;
    committedValuesRef.current.state = state;
  });
  const context = react.useMemo(() => ({
    contextMenuEvent: state?.event ?? null,
    registerMenu,
    registerMenuItem
  }), [registerMenu, registerMenuItem, state?.event]);
  const showMenu = event => {
    if (event.defaultPrevented) {
      // Support nested context menus
      return;
    }
    event.preventDefault();
    if (typeof onShow === "function") {
      onShow(event);
    }
    const {
      currentTarget
    } = event;
    const targetRect = currentTarget.getBoundingClientRect();
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
  const onKeyDown = event => {
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
      case " ":
        {
          showMenu(event);
          break;
        }
    }
  };
  const hideMenu = react.useCallback(() => {
    const {
      onHide,
      state
    } = committedValuesRef.current;
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
    contextMenu = /*#__PURE__*/jsxRuntime.jsx(ContextMenuContext.Provider, {
      value: context,
      children: /*#__PURE__*/jsxRuntime.jsx(ContextMenu, {
        alignTo: alignTo,
        className: className,
        clientX: state.clientX,
        clientY: state.clientY,
        dataTestId: dataTestId,
        dataTestName: dataTestName,
        hide: hideMenu,
        style: style,
        targetRect: state.targetRect,
        children: contextMenuItems
      })
    });
  }
  return {
    contextMenu,
    hideMenu,
    onContextMenu,
    onKeyDown
  };
}
function isMouseEvent(event) {
  return event.pageX != null && event.pageY != null;
}

exports.ContextMenu = ContextMenu;
exports.ContextMenuCategory = ContextMenuCategory;
exports.ContextMenuDivider = ContextMenuDivider;
exports.ContextMenuItem = ContextMenuItem;
exports.assert = assert;
exports.assertKeyboardEvent = assertKeyboardEvent;
exports.assertMouseEvent = assertMouseEvent;
exports.isKeyboardEvent = isKeyboardEvent;
exports.isMouseEvent = isMouseEvent$1;
exports.useContextMenu = useContextMenu;
exports.useModalDismissSignal = useModalDismissSignal;
