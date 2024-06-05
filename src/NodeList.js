import React from 'react';
import Node from './Node';

const NodeList = ({ nodes }) => {
  return (
    <div>
      {nodes.map(node => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
};

export default NodeList;
