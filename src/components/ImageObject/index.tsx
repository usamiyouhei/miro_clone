import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";
import DraggableObject from "../DraggableObject";
import "./ImageObject.css";

interface BoardObjectProps {
  object: BoardObject;
  onUpdate: (data: Partial<BoardObject>) => void;
  isSelected?: boolean;
  onSelect: () => void;
}

export default function ImageObject({
  object,
  onUpdate,
  isSelected,
  onSelect,
}: BoardObjectProps) {
  const { x, y, content, width, height } = object;

  const style: React.CSSProperties = {
    width: width ? width : "auto",
    height: height ? height : "auto",
  };

  const containerClassName = `image-object-container ${
    isSelected
      ? "image-object-container--selected"
      : "image-object-container--default"
  }`;

  return (
    <DraggableObject
      x={x}
      y={y}
      onDragEnd={(x, y) => onUpdate({ x, y })}
      style={style}
      className={containerClassName}
    >
      <div onClick={onSelect}>
        <img
          src={content}
          alt="Uploaded object"
          draggable={false}
          className="image-object-img"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </DraggableObject>
  );
}
