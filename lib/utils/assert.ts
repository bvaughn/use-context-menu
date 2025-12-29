import { KeyboardEvent, MouseEvent, UIEvent } from "react";

import { isKeyboardEvent, isMouseEvent } from "./isEventType";

export function assert(
  expectedCondition: boolean,
  message: string = "Assertion failed"
): asserts expectedCondition {
  if (!expectedCondition) {
    console.error(message);

    throw Error(message);
  }
}

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

export function assertMouseEvent(
  event: UIEvent,
  message: string = "MouseEvent expected"
): event is MouseEvent {
  if (isMouseEvent(event)) {
    return true;
  }

  console.error(message);

  throw Error(message);
}
