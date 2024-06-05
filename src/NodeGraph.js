import React from 'react';
import DraggableNode from './DraggableNode';

const NodeGraph = ({ nodes, moveNode, reorderNodes, deleteNode }) => {
  return (
    <div style={{ overflowY: 'auto', height: '400px' }}>
      <svg width="400" height={nodes.length * 100 + 100} style={{ minHeight: '100%' }}>
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
    </div>
  );
};

export default NodeGraph;
