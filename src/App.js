import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NodeGraph from './NodeGraph';
import './App.css';

const initialNodes = [
  { id: 1, name: 'City A', position: { x: 100, y: 100 }, input: '', dropdown: '' },
  { id: 2, name: 'City B', position: { x: 100, y: 250 }, input: '', dropdown: '' },
  { id: 3, name: 'City C', position: { x: 100, y: 400 }, input: '', dropdown: '' }
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
    var a = updatedNodes[hoverIndex].position.y;
    updatedNodes[hoverIndex].position.y = updatedNodes[draggedIndex].position.y
    updatedNodes[draggedIndex].position.y = a;
    setNodes(updatedNodes);
  };

  const addNode = () => {
    if (newCityName.trim() === "") return;
    const lastNode = nodes[nodes.length - 1];
    const newNode = {
      id: nodes.length ? Math.max(...nodes.map(node => node.id)) + 1 : 1,
      name: newCityName,
      position: { x: 100, y: lastNode ? lastNode.position.y + 150 : 100 }, // Initial position for new node below the last node
      input: '',
      dropdown: ''
    };
    setNodes([...nodes, newNode]);
    setNewCityName("");
  };

  const deleteNode = (id) => {
    const updatedNodes = nodes.filter(node => node.id !== id);
    const repositionedNodes = updatedNodes.map((node, index) => ({
      ...node,
      position: { x: 100, y: 100 + index * 150 }
    }));
    setNodes(repositionedNodes);
  };

  const updateNodeInput = (id, value) => {
    const updatedNodes = nodes.map(node =>
      node.id === id ? { ...node, input: value } : node
    );
    setNodes(updatedNodes);
  };

  const updateNodeDropdown = (id, value) => {
    const updatedNodes = nodes.map(node =>
      node.id === id ? { ...node, dropdown: value } : node
    );
    setNodes(updatedNodes);
  };

  const updateNodeName = (id, value) => {
    const updatedNodes = nodes.map(node =>
      node.id === id ? { ...node, name: value } : node
    );
    setNodes(updatedNodes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="node-container">
          <NodeGraph nodes={nodes} moveNode={moveNode} reorderNodes={reorderNodes} deleteNode={deleteNode} updateNodeInput={updateNodeInput} updateNodeDropdown={updateNodeDropdown} updateNodeName={updateNodeName} />
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
