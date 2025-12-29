import { CSSProperties, ReactNode, KeyboardEvent as SyntheticKeyboardEvent, UIEvent } from "react";
import { AlignTo } from "../types.js";
export declare function useContextMenu(contextMenuItems: ReactNode, options?: {
    alignTo?: AlignTo;
    className?: string;
    dataTestId?: string;
    dataTestName?: string;
    onHide?: () => void | Promise<void>;
    onShow?: (event: UIEvent) => void | Promise<void>;
    requireClickToShow?: boolean;
    style?: CSSProperties;
}): {
    contextMenu: ReactNode | null;
    hideMenu: () => void;
    onKeyDown: (event: SyntheticKeyboardEvent) => void;
    onContextMenu: (event: UIEvent) => void;
};
