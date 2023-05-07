import { MouseEvent } from "react";

import styles from "./ContextMenuDivider.module.css";

export function ContextMenuDivider() {
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={styles.Divider}
      data-context-menu-divider
      onClick={onClick}
    />
  );
}
