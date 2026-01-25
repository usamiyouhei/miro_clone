import DraggableObject from '../DraggableObject';
import './ImageObject.css';

export default function ImageObject() {
  const content = 'https://placehold.co/200x200';
  const width = 200;
  const height = 200;
  const isSelected = false;

  const style: React.CSSProperties = {
    width,
    height,
  };

  const containerClassName = `image-object-container ${
    isSelected
      ? 'image-object-container--selected'
      : 'image-object-container--default'
  }`;

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top: 300,
    left: 200,
  };

  return (
    <DraggableObject style={positionStyle} className={containerClassName}>
      <div style={style}>
        <img
          src={content}
          alt="Uploaded object"
          draggable={false}
          className="image-object-img"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </DraggableObject>
  );
}
