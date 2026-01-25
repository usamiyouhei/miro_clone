import DraggableObject from '../DraggableObject';
import './StickyNote.css';

export default function StickyNote() {
  const width = 200;
  const height = 200;
  const color = 'var(--sticky-yellow)';
  const content = 'Sample Sticky Note';
  const isSelected = false;

  const style: React.CSSProperties = {
    width,
    height,
    backgroundColor: color,
  };

  const getContainerClassName = () => {
    let classes = 'sticky-note sticky-note--draggable';
    if (isSelected) {
      classes += ' sticky-note--selected';
    } else {
      classes += ' sticky-note--default';
    }
    return classes;
  };

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top: 100,
    left: 100,
  };

  return (
    <DraggableObject style={positionStyle} className="board-object">
      <div style={style} className={getContainerClassName()}>
        <div style={{ pointerEvents: 'none' }}>{content}</div>
      </div>
    </DraggableObject>
  );
}
