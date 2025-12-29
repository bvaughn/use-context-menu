import type { CSSProperties, MouseEvent } from "react";

import classNames from "../utils/classNames";

export function ContextMenuDivider({
  className,
  style
}: {
  className?: string | undefined;
  style?: CSSProperties | undefined;
}) {
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={classNames("useContextMenu_Divider", className)}
      data-context-menu-divider
      onClick={onClick}
      style={style}
    />
  );
}
