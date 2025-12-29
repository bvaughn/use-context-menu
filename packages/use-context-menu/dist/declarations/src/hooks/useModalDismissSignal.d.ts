import { MutableRefObject, RefObject } from "react";
export declare function useModalDismissSignal(modalRef: MutableRefObject<HTMLDivElement> | RefObject<HTMLDivElement>, dismissCallback: () => void, dismissOnClickOutside?: boolean): void;
