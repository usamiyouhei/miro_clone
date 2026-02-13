import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import StickyNote from "../StickyNote";
import TextObject from "../TextObject";
import ImageObject from "../ImageObject";
import ContextToolbar from "../ContextToolbar";
import "./Canvas.css";
import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";

const MIN_SCALE = 0.2;
const MAX_SCALE = 2.0;
const SCALE_STEP = 0.1;

interface CanvasProps {
  objects: BoardObject[];
  onObjectUpdate: (id: string, data: Partial<BoardObject>) => void;
  selectedId: string | null;
  onObjectSelect: (id: string) => void;
  onBackgroundClick: () => void;
  onObjectDelete: (id: string) => void;
  offset: { x: number; y: number };
  onOffsetChange: (offset: { x: number; y: number }) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
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
  scale,
  onScaleChange,
}: CanvasProps) {
  const handleWheel = (e: React.WheelEvent) => {
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;

    onOffsetChange({
      x: offset.x - deltaX,
      y: offset.y - deltaY,
    });
  };

  const zoomIn = () => {
    if (scale >= MAX_SCALE) return;
    onScaleChange(Math.round((scale + SCALE_STEP) * 10) / 10);
  };

  const zoomOut = () => {
    if (scale <= MIN_SCALE) return;
    onScaleChange(Math.round((scale - SCALE_STEP) * 10) / 10);
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
        <button
          className="zoom-control__button"
          title="Zoom Out"
          onClick={zoomOut}
        >
          <RiZoomOutLine />
        </button>
        <span className="zoom-control__percentage" title="Current Zoom">
          {Math.round(scale * 100)}%
        </span>
        <button
          className="zoom-control__button"
          title="Zoom In"
          onClick={zoomIn}
        >
          <RiZoomInLine />
        </button>
      </div>
    </div>
  );
}
