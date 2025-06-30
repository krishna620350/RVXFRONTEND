import type { PropsWithChildren, HTMLAttributes } from "react";
import "./Scroller.css";

interface ScrollerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Scroller: React.FC<PropsWithChildren<ScrollerProps>> = ({
  children,
  className = "",
  style = {},
  ...rest
}) => {
  return (
    <div
      className={`scroller-component ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Scroller;
