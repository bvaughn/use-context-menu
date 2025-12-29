import { CSSProperties, ReactNode } from "react";
import { AlignTo } from "../types.js";
export declare function ContextMenu({ alignTo, children, className, clientX, clientY, targetRect, dataTestId, dataTestName, hide, style: styleFromProps, }: {
    alignTo: AlignTo;
    children: ReactNode;
    className?: string;
    clientX: number;
    clientY: number;
    targetRect: DOMRect;
    dataTestId?: string;
    dataTestName?: string;
    hide: () => void;
    style?: CSSProperties;
}): import("react").ReactPortal;
