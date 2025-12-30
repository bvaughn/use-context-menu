import type { MouseEvent, UIEvent } from "react";
import { isMouseEvent } from "./isMouseEvent";

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
