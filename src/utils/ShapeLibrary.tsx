import React from "react";
import { DraggableItem } from "../components/Generals/DraggableItem";
import { ShapeType } from "../contexts/DraggableContext";

type Shape = {
  id: number;
  type: ShapeType;
};

const shapes: Shape[] = [
  { id: 1, type: "circle" },
  { id: 2, type: "rectangle" },
  { id: 3, type: "vector" },
];

const ShapeLibrary: React.FC = () => {
  const handleDragStart = (e: React.DragEvent, type: ShapeType, id: number) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("source", "library");
    e.dataTransfer.setData("id", id.toString());
  };

  return (
    <div>
      {shapes.map((shape) => ( 
        <div 
          draggable 
          onDragStart={(e) => handleDragStart(e, shape.type, shape.id)} 
          key={shape.id}
        >
          <DraggableItem 
            id={shape.id} 
            type={shape.type} 
          />
        </div>
      ))}
    </div>
  );
};


export default ShapeLibrary;
