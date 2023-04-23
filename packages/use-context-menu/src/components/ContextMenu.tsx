import {
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useModalDismissSignal } from "../hooks/useModalDismissSignal";
import styles from "./ContextMenu.module.css";

export function ContextMenu({
  children,
  dataTestId,
  dataTestName = "ContextMenu",
  hide,
  pageX,
  pageY,
}: {
  children: ReactNode;
  dataTestId?: string;
  dataTestName?: string;
  hide: () => void;
  pageX: number;
  pageY: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [offsets, setOffsets] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  console.log("<ContextMenu> offsets:", offsets);

  useModalDismissSignal(ref, hide, true);

  useLayoutEffect(() => {
    const contextMenu = ref.current;
    if (contextMenu) {
      const rect = contextMenu.getBoundingClientRect();

      let newOffsets = { ...offsets };
      if (rect.right > window.innerWidth) {
        if (rect.x - rect.width > 0) {
          newOffsets.x = 0 - rect.width;
        } else {
          newOffsets.x = 0 - rect.x;
        }
      }
      if (rect.bottom > window.innerHeight) {
        if (rect.y - rect.height > 0) {
          newOffsets.y = 0 - rect.height;
        } else {
          newOffsets.y = 0 - rect.y;
        }
      }

      if (newOffsets.x !== offsets.x || newOffsets.y !== offsets.y) {
        setOffsets(newOffsets);
      }
    }
  }, [offsets, pageX, pageY]);

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    hide();
  };

  const onMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      className={styles.Backdrop}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <div
        className={styles.ContextMenu}
        data-test-id={dataTestId}
        data-test-name={dataTestName}
        ref={ref}
        style={{
          left: pageX + offsets.x,
          top: pageY + offsets.y,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
