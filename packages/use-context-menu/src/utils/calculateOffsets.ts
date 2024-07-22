import { AlignTo, Offsets, Rect } from "../types";
import { assert } from "./assert";

export function calculateOffsets({
  alignTo,
  cursorX,
  cursorY,
  menuRect,
  targetRect,
  viewportHeight,
  viewportWidth,
}: {
  alignTo: AlignTo;
  cursorX?: number | undefined;
  cursorY?: number | undefined;
  menuRect: Rect;
  targetRect: Rect;
  viewportHeight: number;
  viewportWidth: number;
}): Offsets {
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
        x: centerX,
        y: targetRect.y - menuRect.height,
      };
    }
    case "auto-cursor": {
      assert(cursorX != null && cursorY != null);

      const offsets: Offsets = {
        x: cursorX,
        y: cursorY,
      };

      if (menuRect.width > viewportWidth) {
        offsets.x = 0;
      } else if (cursorX + menuRect.width > viewportWidth) {
        offsets.x = cursorX - menuRect.width;
      }

      if (menuRect.height > viewportHeight) {
        offsets.y = 0;
      } else if (cursorY + menuRect.height > viewportHeight) {
        offsets.y = cursorY - menuRect.height;
      }

      return offsets;
    }
    case "auto-target": {
      if (targetRect.bottom + menuRect.height > viewportHeight) {
        return {
          x: Math.max(0, centerX),
          y: Math.max(0, targetRect.y - menuRect.height),
        };
      } else {
        return {
          x: Math.max(0, centerX),
          y: targetRect.bottom,
        };
      }
    }
    case "below": {
      return {
        x: centerX,
        y: targetRect.bottom,
      };
    }
    case "left": {
      return {
        x: targetRect.x - menuRect.width,
        y: centerY,
      };
    }
    case "right": {
      return {
        x: targetRect.right,
        y: centerY,
      };
    }
  }
}
