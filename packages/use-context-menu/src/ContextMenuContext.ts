import { UIEvent, createContext } from "react";

export type ContextMenuContextType = {
  contextMenuEvent: UIEvent | null;
  registerMenu: (menuItem: HTMLDivElement) => void;
  registerMenuItem: (menuItem: HTMLDivElement) => void;
};

export const ContextMenuContext = createContext<ContextMenuContextType>({
  contextMenuEvent: null,
  registerMenu: () => {},
  registerMenuItem: () => {},
});
