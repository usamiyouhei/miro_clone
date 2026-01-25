import { RiDeleteBinLine } from 'react-icons/ri';
import './ContextToolbar.css';

const COLORS = [
  { name: 'Yellow', value: '#FEF3C7' },
  { name: 'Pink', value: '#FCE7F3' },
  { name: 'Blue', value: '#DBEAFE' },
  { name: 'Green', value: '#D1FAE5' },
  { name: 'Orange', value: '#FED7AA' },
];

export default function ContextToolbar() {
  const x = 100;
  const y = 300;
  const color = '#FEF3C7';
  const showColorPicker = true;

  return (
    <div
      className="context-toolbar"
      style={{
        left: x,
        top: y - 60,
        position: 'absolute',
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
                  color === c.value ? 'context-toolbar__color-btn--active' : ''
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
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
