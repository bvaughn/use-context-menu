import { KeyboardEvent, MouseEvent, UIEvent } from "react";

export function isKeyboardEvent(event: UIEvent): event is KeyboardEvent {
  return event.type.startsWith("key");
}

export function isMouseEvent(event: UIEvent): event is MouseEvent {
  return (
    event.type === "click" ||
    event.type === "contextmenu" ||
    event.type.startsWith("mouse")
  );
}
