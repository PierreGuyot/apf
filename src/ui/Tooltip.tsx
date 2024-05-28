import { useBoolean } from "./helpers/state";
import "./tooltip.css";

import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";

type Props = PropsWithChildren<{
  mode?: "click" | "hover";
  content: ReactNode;
}>;

export const Tooltip = ({ mode = "hover", content, children }: Props) => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const tooltipContent = useRef<HTMLDivElement | null>(null);
  const tooltipHandle = useRef<HTMLDivElement | null>(null);

  // Clear popover on click-outside
  const onMouseDown = (event: MouseEvent) => {
    // CAUTION: this cast is type-unsafe
    const targetNode = event.target as Node | null;

    if (
      tooltipContent.current &&
      !tooltipContent.current.contains(targetNode)
    ) {
      close();
    }
  };

  const callbacks =
    mode === "hover"
      ? { onMouseEnter: open, onMouseLeave: close }
      : { onClick: open };

  useEffect(() => {
    if (mode === "hover") {
      window.addEventListener("scroll", close, true);
      return () => window.removeEventListener("scroll", close, true);
    } else {
      // Handle clicking outside of the tooltip
      document.addEventListener("mousedown", onMouseDown);
      return () => document.removeEventListener("mousedown", onMouseDown);
    }
  }, [mode]);

  return (
    <span className="tooltip">
      <span className="tooltip-handle" ref={tooltipHandle} {...callbacks}>
        <span>{children}</span>
      </span>
      {isOpen ? (
        <div className="tooltip-content" ref={tooltipContent}>
          {content}
        </div>
      ) : undefined}
    </span>
  );
};
