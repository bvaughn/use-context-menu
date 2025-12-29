import { CSSProperties, ReactNode, UIEvent } from "react";
export declare function ContextMenuItem({ children, className, dataTestId, dataTestName, dataTestState, disabled, onSelect, style, }: {
    children: ReactNode;
    className?: string;
    dataTestId?: string;
    dataTestName?: string;
    dataTestState?: string;
    disabled?: boolean;
    onSelect?: (event: UIEvent) => void;
    style?: CSSProperties;
}): import("react/jsx-runtime").JSX.Element;
