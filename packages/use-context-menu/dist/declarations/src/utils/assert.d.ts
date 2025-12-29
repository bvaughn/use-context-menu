import { KeyboardEvent, MouseEvent, UIEvent } from "react";
export declare function assert(expectedCondition: boolean, message?: string): asserts expectedCondition;
export declare function assertKeyboardEvent(event: UIEvent, message?: string): event is KeyboardEvent;
export declare function assertMouseEvent(event: UIEvent, message?: string): event is MouseEvent;
