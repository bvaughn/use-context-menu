import type { KeyboardEvent, UIEvent } from "react";

export function isKeyboardEvent(event: UIEvent): event is KeyboardEvent {
  return event.type.startsWith("key");
}
