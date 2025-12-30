import type { MouseEvent, UIEvent } from "react";

export function isMouseEvent(event: UIEvent): event is MouseEvent {
  return (
    event.type === "click" ||
    event.type === "contextmenu" ||
    event.type.startsWith("mouse")
  );
}
