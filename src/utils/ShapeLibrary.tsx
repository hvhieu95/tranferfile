import React, { useState } from 'react';
import { DraggableItem } from "../components/Generals/DraggableItem";
import { ShapeType } from '../contexts/DraggableContext';

type Shape = {
  id: number;
  type: ShapeType;
};

const shapes: Shape[] = [
  { id: 1, type: 'circle' },
  { id: 2, type: 'rectangle' },
  { id: 3, type: 'vector' },
];

const ShapeLibrary: React.FC = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div>
    {shapes.map((shape, index) => (
      <DraggableItem 
        key={shape.id} 
        id={index} 
        type={shape.type} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        
      />
    ))}
  </div>
  );
};

export default ShapeLibrary;
