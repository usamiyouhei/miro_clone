import "./DraggableObject.css";

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
