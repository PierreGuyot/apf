import { useBoolean } from "./helpers/state";
import "./tooltip.css";

import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = PropsWithChildren<{
  content: ReactNode;
  mode?: "click" | "hover";
  onClose?: () => void;
}>;

type translation = { x: number; y: number };
const TRANSLATION: translation = { x: 20000, y: 20000 };

// Compute translation to avoid cutting with the window's border
// TODO clean: this is a quick fix, consider improving this later
const computeTranslation = (
  content: HTMLDivElement,
  handle: HTMLDivElement,
) => {
  const contentRect = content.getBoundingClientRect();
  const handleRect = handle.getBoundingClientRect();

  const SECURITY_MARGIN = 200;
  const overlap = handleRect.right + SECURITY_MARGIN - window.innerWidth;
  const isTooCloseFromRightBorder = overlap > 0;

  // For visual purposes
  const MARGIN = 10;

  const x = isTooCloseFromRightBorder
    ? -contentRect.width + handleRect.width + MARGIN
    : -MARGIN;
  const y = -contentRect.height - 10;

  return { x, y };
};

const getStyle = ({ x, y }: translation) => ({
  transform: `translateX(${x}px) translateY(${y}px)`,
});

export const Tooltip = ({
  content,
  mode = "hover",
  onClose,
  children,
}: Props) => {
  const tooltipContent = useRef<HTMLDivElement | null>(null);
  const tooltipHandle = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useBoolean(false);
  const open = () => setIsOpen(true);

  const [translation, setTranslation] = useState<translation>(TRANSLATION);
  useEffect(() => {
    if (isOpen && tooltipContent.current && tooltipHandle.current) {
      const translation = computeTranslation(
        tooltipContent.current,
        tooltipHandle.current,
      );
      setTranslation(translation);
    }
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  }, [onClose, setIsOpen]);

  // Clear popover on click-outside
  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      // CAUTION: this cast is type-unsafe
      const targetNode = event.target as Node | null;

      if (
        tooltipContent.current &&
        !tooltipContent.current.contains(targetNode)
      ) {
        close();
      }
    },
    [close],
  );

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
  }, [mode, close, onMouseDown]);

  return (
    <span className="tooltip">
      <span className="tooltip-handle" ref={tooltipHandle} {...callbacks}>
        <span>{children}</span>
      </span>
      {isOpen ? (
        <div
          className="tooltip-content"
          ref={tooltipContent}
          style={getStyle(translation)}
        >
          {content}
        </div>
      ) : undefined}
    </span>
  );
};
