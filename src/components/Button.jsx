import { useRef } from "react";
import HoverText from "./HoverText";

export default function Button({
  children,
  className = "",
  withHover = true,
  onMouseEnter,
  ...props
}) {
  const hoverRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (withHover && hoverRef.current) {
      hoverRef.current.triggerHover(e);
    }
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  return (
    <button
      className={`cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {withHover ? <HoverText ref={hoverRef}>{children}</HoverText> : children}
    </button>
  );
}