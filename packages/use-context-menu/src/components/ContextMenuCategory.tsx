import { CSSProperties, MouseEvent, PropsWithChildren } from "react";

import classNames from "../utils/classNames";

export function ContextMenuCategory({
  children,
  className,
  style,
}: PropsWithChildren<{ className?: string; style?: CSSProperties }>) {
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={classNames("useContextMenu_ContextMenuCategory", className)}
      data-context-menu-category
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
