import React from 'react';
import DraggableNode from './DraggableNode';

const NodeGraph = ({ nodes, moveNode, reorderNodes, deleteNode }) => {
  return (
    <svg width="100%" height="400" style={{ border: '1px solid black' }}>
      {nodes.map((node, index) => {
        if (index < nodes.length - 1) {
          const nextNode = nodes[index + 1];
          return (
            <line
              key={index}
              x1={node.position.x + 50}  // Adjusting for rectangle width
              y1={node.position.y + 25}  // Adjusting for rectangle height
              x2={nextNode.position.x + 50}
              y2={nextNode.position.y + 25}
              stroke="black"
            />
          );
        }
        return null;
      })}
      {nodes.map((node) => (
        <DraggableNode
          key={node.id}
          node={node}
          moveNode={moveNode}
          reorderNodes={reorderNodes}
          deleteNode={deleteNode}
        />
      ))}
    </svg>
  );
};

export default NodeGraph;
