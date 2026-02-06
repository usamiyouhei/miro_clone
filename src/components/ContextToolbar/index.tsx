import { RiDeleteBinLine } from "react-icons/ri";
import "./ContextToolbar.css";
import type { BoardObject } from "../../modules/board-objects/board-object.entitiy";

const COLORS = [
  { name: "Yellow", value: "#FEF3C7" },
  { name: "Pink", value: "#FCE7F3" },
  { name: "Blue", value: "#DBEAFE" },
  { name: "Green", value: "#D1FAE5" },
  { name: "Orange", value: "#FED7AA" },
];

interface ContextToolbarProps {
  object: BoardObject;
  onColorChange: (color: string) => void;
}

export default function ContextToolbar({
  object,
  onColorChange,
}: ContextToolbarProps) {
  const { x, y, color, width } = object;
  // const color = "#FEF3C7";
  const showColorPicker = true;

  return (
    <div
      className="context-toolbar"
      style={{
        left: x + (width || 200) / 2,
        top: y - 60,
        position: "absolute",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {showColorPicker && (
        <>
          <div className="context-toolbar__colors">
            {COLORS.map((c) => (
              <button
                key={c.name}
                className={`context-toolbar__color-btn ${
                  color === c.value ? "context-toolbar__color-btn--active" : ""
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
                onClick={() => onColorChange(c.value)}
              />
            ))}
          </div>
          <div className="context-toolbar__divider" />
        </>
      )}
      <button className="context-toolbar__delete-btn" title="Delete">
        <RiDeleteBinLine />
      </button>
    </div>
  );
}
