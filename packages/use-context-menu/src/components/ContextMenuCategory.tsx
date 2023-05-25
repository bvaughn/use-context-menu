import { CSSProperties, MouseEvent, PropsWithChildren } from "react";

import classNames from "../utils/classNames";
import styles from "./ContextMenuCategory.module.css";

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
      className={classNames(styles.ContextMenuCategory, className)}
      data-context-menu-category
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
