import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableNode = ({ node, moveNode, reorderNodes, deleteNode }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'NODE',
    item: { id: node.id, originalPosition: node.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  const [, drop] = useDrop({
    accept: 'NODE',
    hover(item, monitor) {
      if (item.id !== node.id) {
        reorderNodes(item.id, node.id);
        item.index = node.index;
      }
    },
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newPosition = {
        x: item.originalPosition.x + delta.x,
        y: item.originalPosition.y + delta.y,
      };
      // moveNode(item.id, newPosition);
    },
  });

  drag(drop(ref));

  const nodeStyle = {
    position: 'absolute',
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: '#007bff',
    border: '1px solid #0056b3',
    width: '100px',
    height: '50px',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: '50px', // Center text vertically
    borderRadius: '8px',
    transition: 'transform 0.2s, background-color 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <foreignObject x={node.position.x} y={node.position.y} width={100} height={50}>
      <div 
        ref={ref} 
        style={nodeStyle} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        {node.name}
        {isHovered && (
          <button 
            style={deleteButtonStyle}
            onClick={() => deleteNode(node.id)}
          >
            X
          </button>
        )}
      </div>
    </foreignObject>
  );
};

export default DraggableNode;
