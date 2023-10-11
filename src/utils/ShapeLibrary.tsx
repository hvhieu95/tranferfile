import React from "react";
import { DraggableItem } from "../components/Generals/DraggableItem";
import { ShapeType } from "../contexts/DraggableContext";

type Shape = {
  id: number;
  type: ShapeType;
  isSelected: boolean;
};

const shapes: Shape[] = [
  { id: 1, type: "circle", isSelected: false },
  { id: 2, type: "rectangle", isSelected: false },
  { id: 3, type: "triangle", isSelected: false },
  { id: 4, type: "hexagon", isSelected: false },
  { id: 5, type: "diamond", isSelected: false },
  { id: 6, type: "parallelogram", isSelected: false },
];

const ShapeLibrary: React.FC = () => {
  const handleDragStart = (e: React.DragEvent, type: ShapeType, id: number) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("source", "library");
    e.dataTransfer.setData("id", id.toString());
  };

  return (
    <div className="d-flex flex-wrap">
      {shapes.map((shape) => (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, shape.type, shape.id)}
          key={shape.id}
        >
          <DraggableItem
            id={shape.id}
            type={shape.type}
            isSelected={shape.isSelected}
          />
        </div>
      ))}
    </div>
  );
};

export default ShapeLibrary;
