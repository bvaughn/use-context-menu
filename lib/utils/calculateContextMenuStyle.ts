import type { AlignTo, ContextMenuStyle, Rect } from "../types";
import { assert } from "./event-types/assert";

export function calculateContextMenuStyle({
  alignTo,
  cursorX,
  cursorY,
  menuRect,
  targetRect,
  viewportHeight,
  viewportWidth
}: {
  alignTo: AlignTo;
  cursorX?: number | undefined;
  cursorY?: number | undefined;
  menuRect: Rect;
  targetRect: Rect;
  viewportHeight: number;
  viewportWidth: number;
}): ContextMenuStyle {
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
    case "above": {
      return {
        left: centerX,
        top: targetRect.y - menuRect.height
      };
    }
    case "auto-cursor": {
      assert(cursorX != null && cursorY != null);

      const style: ContextMenuStyle = {
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
    case "auto-target": {
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
    case "below": {
      return {
        left: centerX,
        top: targetRect.bottom
      };
    }
    case "left": {
      return {
        left: targetRect.x - menuRect.width,
        top: centerY
      };
    }
    case "right": {
      return {
        left: targetRect.right,
        top: centerY
      };
    }
  }
}
