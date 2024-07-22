/* eslint-disable react-hooks/rules-of-hooks */
import { Suspense } from "react";
import {
  AlignTo,
  ContextMenuItem,
  useContextMenu as useContextMenuHook,
} from "use-context-menu";

import { PlainText } from "../../../components/Code/PlainText";
import { SyntaxHighlighted } from "../../../components/Code/SyntaxHighlighted";
import styles from "./styles.module.css";

function useContextMenu(_: any, __: { alignTo: AlignTo }) {}

// REMOVE_BEFORE

useContextMenu(
  <>
    <ContextMenuItem onSelect={noop}>Menu</ContextMenuItem>
  </>,
  {
    // Optional positioning configuration
    alignTo: "auto-cursor",
  }
);

// REMOVE_AFTER

export function Demo() {
  return (
    <>
      <div className={styles.Container}>
        <span>
          Menus can be positioned above, below, to the left, or to the right of
          a target:
        </span>
        <ul className={styles.List}>
          <li className={styles.ListItem}>
            <Menu alignTo="above" label="above target" />
          </li>
          <li className={styles.ListItem}>
            <Menu alignTo="below" label="below target" />
          </li>
          <li className={styles.ListItem}>
            <Menu alignTo="left" label="left of target" />
          </li>
          <li className={styles.ListItem}>
            <Menu alignTo="right" label="right of target" />
          </li>
        </ul>
        <span>
          They can also be automatically positioned relative to the cursor or
          the target itself:
        </span>
        <ul className={styles.List}>
          <li className={styles.ListItem}>
            <Menu alignTo="auto-cursor" label="relative to cursor" />
          </li>
          <li className={styles.ListItem}>
            <Menu alignTo="auto-target" label="relative to target" />
          </li>
        </ul>
      </div>
    </>
  );
}

function Menu({ alignTo, label }: { alignTo: AlignTo; label: string }) {
  const {
    contextMenu: menu,
    onContextMenu: showMenu,
    onKeyDown,
  } = useContextMenuHook(
    <>
      <ContextMenuItem onSelect={noop}>Menu</ContextMenuItem>
    </>,
    { alignTo }
  );

  return (
    <>
      <div className={styles.Example}>
        <span
          className={styles.Trigger}
          data-test-name="click-target"
          onClick={showMenu}
          onContextMenu={showMenu}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          {label}
        </span>
        <Suspense
          fallback={
            <PlainText
              className={styles.InlineCode}
              code={`(alignTo="${alignTo}")`}
            />
          }
        >
          <span className={styles.InlineCode}>
            (
            <SyntaxHighlighted
              className={styles.InlineCode}
              code={`alignTo="${alignTo}"`}
              language="jsx"
            />
            )
          </span>
        </Suspense>
      </div>
      {menu}
    </>
  );
}

function noop() {}
