import type { CSSProperties, MouseEvent } from "react";

import classNames from "../utils/classNames";

/**
 * Separator rendered between context menu sections.
 */
export function ContextMenuDivider({
  className,
  style
}: {
  /**
   * CSS className.
   */
  className?: string | undefined;

  /**
   * CSS style.
   */
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
