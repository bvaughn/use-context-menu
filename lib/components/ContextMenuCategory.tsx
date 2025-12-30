import type { CSSProperties, MouseEvent, ReactNode } from "react";

import classNames from "../utils/classNames";

/**
 * Context menu category header.
 *
 * ```tsx
 * <ContextMenuCategory>Main</ContextMenuCategory>
 * ```
 */
export function ContextMenuCategory({
  children,
  className,
  style
}: {
  /**
   * Category label.
   */
  children: ReactNode;

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
      className={classNames("useContextMenu_ContextMenuCategory", className)}
      data-context-menu-category
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
