import type { KeyboardEvent, UIEvent } from "react";
import { isKeyboardEvent } from "./isKeyboardEvent";

export function assertKeyboardEvent(
  event: UIEvent,
  message: string = "KeyboardEvent expected"
): event is KeyboardEvent {
  if (isKeyboardEvent(event)) {
    return true;
  }

  console.error(message);

  throw Error(message);
}
