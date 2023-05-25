import { CSSProperties, MouseEvent } from "react";

import classNames from "../utils/classNames";
import styles from "./ContextMenuDivider.module.css";

export function ContextMenuDivider({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={classNames(styles.Divider, className)}
      data-context-menu-divider
      onClick={onClick}
      style={style}
    />
  );
}
