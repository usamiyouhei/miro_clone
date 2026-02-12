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
  onObjectDelete: (id: string) => void;
  offset: { x: number; y: number };
  onOffsetChange: (offset: { x: number; y: number }) => void;
}

export default function Canvas({
  objects,
  onObjectUpdate,
  selectedId,
  onObjectSelect,
  onBackgroundClick,
  onObjectDelete,
  offset,
  onOffsetChange,
}: CanvasProps) {
  const scale = 1.0;
  const handleWheel = (e: React.WheelEvent) => {
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;

    onOffsetChange({
      x: offset.x - deltaX,
      y: offset.y - deltaY,
    });
  };

  const gridSize = 20 * scale;
  const gridStyle = {
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: `${offset.x}px ${offset.y}px`,
  };

  const contentStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
  };

  const getObject = (object: BoardObject) => {
    if (object.type === "sticky") {
      return (
        <StickyNote
          key={object.id}
          object={object}
          onUpdate={(data) => onObjectUpdate(object.id, data)}
          onSelect={() => onObjectSelect(object.id)}
          isSelected={object.id === selectedId}
        />
      );
    }
    if (object.type === "text") {
      return (
        <TextObject
          key={object.id}
          object={object}
          onUpdate={(data) => onObjectUpdate(object.id, data)}
          onSelect={() => onObjectSelect(object.id)}
          isSelected={object.id === selectedId}
        />
      );
    }
    if (object.type === "image") {
      return (
        <ImageObject
          key={object.id}
          object={object}
          onUpdate={(data) => onObjectUpdate(object.id, data)}
          onSelect={() => onObjectSelect(object.id)}
          isSelected={object.id === selectedId}
        />
      );
    }
    return null;
  };

  const selectedObject = objects.find((object) => object.id === selectedId);

  return (
    <div
      className="canvas-container"
      onPointerDown={onBackgroundClick}
      onWheel={handleWheel}
    >
      <div className="canvas-grid" style={gridStyle} />
      <div className="canvas-content" style={contentStyle}>
        {objects.map((object) => getObject(object))}
        {selectedObject && (
          <ContextToolbar
            object={selectedObject}
            onColorChange={(color) =>
              onObjectUpdate(selectedObject.id, { color })
            }
            onDelete={() => onObjectDelete(selectedObject.id)}
            showColorPicker={selectedObject.type === "sticky"}
          />
        )}
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
