export type AlignTo =
  | "above"
  | "auto-cursor"
  | "auto-target"
  | "below"
  | "left"
  | "right";

export type Rect = Omit<DOMRect, "toJSON">;

export type Offsets = {
  x: number;
  y: number;
};
