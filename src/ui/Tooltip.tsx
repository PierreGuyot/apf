import { useBoolean } from "./helpers/state";
import "./tooltip.css";

import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{ content: ReactNode }>;

export const Tooltip = ({ content, children }: Props) => {
  const [isHovered, setIsHovered] = useBoolean(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span className="tooltip">
      <span
        className="tooltip-handle"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span>{children}</span>
      </span>
      {isHovered ? <div className="tooltip-content">{content}</div> : undefined}
    </span>
  );
};
