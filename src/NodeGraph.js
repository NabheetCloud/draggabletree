import React from 'react';
import DraggableNode from './DraggableNode';

const NodeGraph = ({ nodes, moveNode, reorderNodes, deleteNode, updateNodeInput, updateNodeDropdown, updateNodeName }) => {
  const svgWidth = 600;
  const svgHeight = nodes.length * 150 + 100;

  return (
    <div style={{ overflowY: 'auto', height: '600px' }}>
      <svg width={svgWidth} height={svgHeight} style={{ minHeight: '100%' }}>
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            {/* Draw the starting circle */}
            <circle cx={50} cy={node.position.y + 50} r={5} fill="black" />
            {/* Draw the timeline line */}
            {index > 0 && (
              <line
                x1={50}
                y1={nodes[index - 1].position.y + 50}
                x2={50}
                y2={node.position.y + 50}
                stroke="red"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
            {/* Draw connecting lines between nodes */}
            {index < nodes.length - 1 && (
              <line
                x1={node.position.x + 250}  // Adjusting for rectangle width
                y1={node.position.y + 50}  // Adjusting for rectangle height
                x2={nodes[index + 1].position.x + 250}
                y2={nodes[index + 1].position.y + 50}
                stroke="black"
              />
            )}
            <DraggableNode
              node={node}
              moveNode={moveNode}
              reorderNodes={reorderNodes}
              deleteNode={deleteNode}
              updateNodeInput={updateNodeInput}
              updateNodeDropdown={updateNodeDropdown}
              updateNodeName={updateNodeName}
            />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default NodeGraph;
