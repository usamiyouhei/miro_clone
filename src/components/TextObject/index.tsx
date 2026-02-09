import { useEffect, useRef, useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onSelect();
  };

  const handleBlur = () => {
    if (editingText !== content) {
      onUpdate({ content: editingText });
    }
    setIsEditing(false);
  };

  const style: React.CSSProperties = {
    width: width || 200,
  };

  const getContainerClassName = () => {
    let classes = "text-object";
    if (isSelected) {
      classes += " text-object--selected";
    } else if (isEditing) {
      classes += "text-object__edit-container";
    } else {
      classes += " text-object--default";
    }
    return classes;
  };

  return (
    <DraggableObject x={x} y={y} onDragEnd={(x, y) => onUpdate({ x, y })}>
      <div
        style={style}
        className={getContainerClassName()}
        onClick={onSelect}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <textarea
            value={editingText}
            onBlur={handleBlur}
            onChange={(e) => setEditingText(e.target.value)}
            className="text-object__textarea"
            ref={textareaRef}
          />
        ) : (
          <div className="text-object__content-text">{content}</div>
        )}
      </div>
    </DraggableObject>
  );
}
