import './DraggableObject.css';

interface DraggableObjectProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function DraggableObject({
  children,
  style,
  className,
}: DraggableObjectProps) {
  return (
    <div
      style={style}
      className={`draggable-object-container ${className || ''}`}
    >
      {children}
    </div>
  );
}
