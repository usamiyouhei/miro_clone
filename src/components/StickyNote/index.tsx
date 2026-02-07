import { useState } from "react";
import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";
import DraggableObject from "../DraggableObject";
import "./StickyNote.css";

interface StickyNoteProps {
  object: BoardObject;
  onUpdate: (data: Partial<BoardObject>) => void;
  onSelect: () => void;
  isSelected?: boolean;
}

export default function StickyNote({
  object,
  onUpdate,
  onSelect,
  isSelected,
}: StickyNoteProps) {
  const { x, y, width, height, content, color } = object;
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(content || "");

  const style: React.CSSProperties = {
    width: width || 200,
    height: height || 200,
    backgroundColor: color || "var(--sticky-yellow)",
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onSelect();
  };

  const getContainerClassName = () => {
    let classes = "sticky-note sticky-note--draggable";
    if (isSelected) {
      classes += " sticky-note--selected";
    } else {
      classes += " sticky-note--default";
    }
    return classes;
  };

  // const positionStyle: React.CSSProperties = {
  //   position: "absolute",
  //   top: 100,
  //   left: 100,
  // };

  return (
    <DraggableObject
      x={x}
      y={y}
      className="board-object"
      onDragEnd={(x, y) => onUpdate({ x, y })}
    >
      <div
        style={style}
        className={getContainerClassName()}
        onClick={onSelect}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <textarea
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="sticky-note__textarea"
          />
        ) : (
          <div style={{ pointerEvents: "none" }}>{content}</div>
        )}
      </div>
    </DraggableObject>
  );
}
