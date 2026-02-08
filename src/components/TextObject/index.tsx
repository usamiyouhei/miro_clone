import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";
import DraggableObject from "../DraggableObject";
import "./TextObject.css";

interface TextObjectProps {
  object: BoardObject;
  onUpdate: (data: Partial<BoardObject>) => void;
  isSelected?: boolean;
  onSelect: () => void;
}

export default function TextObject({
  object,
  onUpdate,
  isSelected,
  onSelect,
}: TextObjectProps) {
  const { x, y, width, content } = object;

  const style: React.CSSProperties = {
    width,
  };

  const getContainerClassName = () => {
    let classes = "text-object";
    if (isSelected) {
      classes += " text-object--selected";
    } else {
      classes += " text-object--default";
    }
    return classes;
  };

  return (
    <DraggableObject x={x} y={y} onDragEnd={(x, y) => onUpdate({ x, y })}>
      <div style={style} className={getContainerClassName()} onClick={onSelect}>
        <div className="text-object__content-text">{content}</div>
      </div>
    </DraggableObject>
  );
}
