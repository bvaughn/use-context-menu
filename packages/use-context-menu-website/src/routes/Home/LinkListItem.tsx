import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import styles from "./LinkListItem.module.css";

export function LinkListItem({
  children,
  to,
  type,
}: PropsWithChildren & { to: string; type: "code" | "plaintext" }) {
  return (
    <li className={styles.ListItem} data-type={type}>
      <Link className={styles.Link} to={to}>
        {children}
      </Link>
    </li>
  );
}
