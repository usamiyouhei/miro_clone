import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";
import DraggableObject from "../DraggableObject";
import "./StickyNote.css";

interface StickyNoteProps {
  object: BoardObject;
}

export default function StickyNote({ object }: StickyNoteProps) {
  const { x, y, width, height, content, color } = object;

  // const width = 200;
  // const height = 200;
  // const color = "var(--sticky-yellow)";
  // const content = "Sample Sticky Note";
  const isSelected = false;

  const style: React.CSSProperties = {
    width: width || 200,
    height: height || 200,
    backgroundColor: color || "var(--sticky-yellow)",
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
    <DraggableObject x={x} y={y} className="board-object">
      <div style={style} className={getContainerClassName()}>
        <div style={{ pointerEvents: "none" }}>{content}</div>
      </div>
    </DraggableObject>
  );
}
