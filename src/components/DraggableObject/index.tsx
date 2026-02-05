import { useDrag } from "@use-gesture/react";
import "./DraggableObject.css";
import { useState } from "react";

interface DraggableObjectProps {
  x: number;
  y: number;
  onDragEnd: (x: number, y: number) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function DraggableObject({
  x,
  y,
  onDragEnd,
  children,
  style,
  className,
}: DraggableObjectProps) {
  const [position, setPosition] = useState({ x, y });

  const bind = useDrag(({ movement, last, memo, event }) => {
    event.stopPropagation();

    const initialX = memo ? memo.x : x;
    const initialY = memo ? memo.y : y;

    const newX = initialX + movement[0];
    const newY = initialY + movement[1];

    if (last) {
      onDragEnd(newX, newY);
    } else {
      setPosition({ x: newX, y: newY });
    }

    return memo || { x: initialX, y: initialY };
  });
  const containerStyle = {
    left: x,
    top: y,
    ...style,
  };
  return (
    <div
      style={containerStyle}
      className={`draggable-object-container ${className || ""}`}
    >
      {children}
    </div>
  );
}
