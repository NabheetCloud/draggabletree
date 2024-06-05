import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NodeGraph from './NodeGraph';
import './App.css';

const initialNodes = [
  { id: 1, name: 'City A', position: { x: 100, y: 100 } },
  { id: 2, name: 'City B', position: { x: 300, y: 100 } },
  { id: 3, name: 'City C', position: { x: 500, y: 100 } }
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [newCityName, setNewCityName] = useState("");

  const moveNode = (id, newPosition) => {
    const updatedNodes = nodes.map(node =>
      node.id === id ? { ...node, position: newPosition } : node
    );
    setNodes(updatedNodes);
  };

  const reorderNodes = (draggedId, hoverId) => {
    const draggedIndex = nodes.findIndex(node => node.id === draggedId);
    const hoverIndex = nodes.findIndex(node => node.id === hoverId);
    const updatedNodes = [...nodes];
    const [draggedNode] = updatedNodes.splice(draggedIndex, 1);
    updatedNodes.splice(hoverIndex, 0, draggedNode);
    var a = updatedNodes[hoverIndex].position.x;
    updatedNodes[hoverIndex].position.x = updatedNodes[draggedIndex].position.x
    updatedNodes[draggedIndex].position.x = a;
    setNodes(updatedNodes);
  };

  const addNode = () => {
    if (newCityName.trim() === "") return;
    const lastNode = nodes[nodes.length - 1];
    const newNode = {
      id: nodes.length ? Math.max(...nodes.map(node => node.id)) + 1 : 1,
      name: newCityName,
      position: { x: lastNode ? lastNode.position.x + 200 : 100, y: 100 } // Initial position for new node to the right of the last node
    };
    setNodes([...nodes, newNode]);
    setNewCityName("");
  };

  const deleteNode = (id) => {
    const updatedNodes = nodes.filter(node => node.id !== id);
    const repositionedNodes = updatedNodes.map((node, index) => ({
      ...node,
      position: { x: 100 + index * 200, y: 100 }
    }));
    setNodes(repositionedNodes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="node-container">
          <NodeGraph nodes={nodes} moveNode={moveNode} reorderNodes={reorderNodes} deleteNode={deleteNode} />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            value={newCityName} 
            onChange={(e) => setNewCityName(e.target.value)} 
            placeholder="Enter city name" 
          />
          <button onClick={addNode}>Add City</button>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
