import { HTMLAttributes, PropsWithChildren } from "react";

import styles from "./Block.module.css";

export default function Block({
  children,
  className,
  type,
  ...rest
}: PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    type?: "normal" | "demo";
  }) {
  return (
    <div
      className={`${styles.Block} ${className ?? ""}`}
      data-type={type}
      {...rest}
    >
      {children}
    </div>
  );
}
