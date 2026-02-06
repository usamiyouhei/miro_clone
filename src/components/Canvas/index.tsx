import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import StickyNote from "../StickyNote";
import TextObject from "../TextObject";
import ImageObject from "../ImageObject";
import ContextToolbar from "../ContextToolbar";
import "./Canvas.css";
import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";

interface CanvasProps {
  objects: BoardObject[];
  onObjectUpdate: (id: string, data: Partial<BoardObject>) => void;
  selectedId: string | null;
  onObjectSelect: (id: string) => void;
  onBackgroundClick: () => void;
}

export default function Canvas({
  objects,
  onObjectUpdate,
  selectedId,
  onObjectSelect,
  onBackgroundClick,
}: CanvasProps) {
  const scale = 1.0;
  const offset = { x: 0, y: 0 };

  const gridSize = 20 * scale;
  const gridStyle = {
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: `${offset.x}px ${offset.y}px`,
  };

  const contentStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
  };

  const selectedObject = objects.find((object) => object.id === selectedId);

  return (
    <div className="canvas-container" onPointerDown={onBackgroundClick}>
      <div className="canvas-grid" style={gridStyle} />
      <div className="canvas-content" style={contentStyle}>
        {objects.map((object) => (
          <StickyNote
            key={object.id}
            object={object}
            onUpdate={(data) => onObjectUpdate(object.id, data)}
            onSelect={() => onObjectSelect(object.id)}
            isSelected={object.id === selectedId}
          />
        ))}
        {selectedObject && <ContextToolbar />}
      </div>

      <div className="zoom-control">
        <button className="zoom-control__button" title="Zoom Out">
          <RiZoomOutLine />
        </button>
        <span className="zoom-control__percentage" title="Current Zoom">
          {Math.round(scale * 100)}%
        </span>
        <button className="zoom-control__button" title="Zoom In">
          <RiZoomInLine />
        </button>
      </div>
    </div>
  );
}
