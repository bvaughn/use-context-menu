export type AlignTo = "above" | "auto-cursor" | "auto-target" | "below" | "left" | "right";
export type Rect = Omit<DOMRect, "toJSON">;
export type ContextMenuStyle = {
    left: number;
    top: number;
    width?: number;
};
