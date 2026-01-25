import DraggableObject from '../DraggableObject';
import './TextObject.css';

export default function TextObject() {
  const content = 'Sample Text Object';
  const width = 200;
  const isSelected = false;

  const style: React.CSSProperties = {
    width,
  };

  const getContainerClassName = () => {
    let classes = 'text-object';
    if (isSelected) {
      classes += ' text-object--selected';
    } else {
      classes += ' text-object--default';
    }
    return classes;
  };

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top: 150,
    left: 400,
  };

  return (
    <DraggableObject style={positionStyle}>
      <div style={style} className={getContainerClassName()}>
        <div className="text-object__content-text">{content}</div>
      </div>
    </DraggableObject>
  );
}
