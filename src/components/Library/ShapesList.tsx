import React from "react";
import { DraggableItem } from "../Generals/DraggableItem";
import { ShapeType } from "../../contexts/DraggableContext";


type Shape = {
  id: number;
  type: ShapeType;
  isSelected: boolean;

};
export const shapes: Shape[] = [
  { id: 1, type: "circle", isSelected: false },
  { id: 2, type: "rectangle", isSelected: false },
  { id: 3, type: "triangle", isSelected: false },
  { id: 4, type: "hexagon", isSelected: false },
  { id: 5, type: "diamond", isSelected: false },
  { id: 6, type: "parallelogram", isSelected: false },
];
type ShapesListProps = {
  shapes: Shape[];
  onShapeDragStart: (e: React.DragEvent, type: ShapeType, id: number) => void;
};

const ShapesList= ({ shapes, onShapeDragStart }:ShapesListProps) => {

  return (
  <div className="shape-library-container">
    {shapes.map((shape) => (
      <div
      className="shape-library-item"
        draggable
        onDragStart={(e) => onShapeDragStart(e, shape.type, shape.id)}
        key={shape.id}
      >
        <DraggableItem
          id={shape.id}
          type={shape.type}
          isSelected={shape.isSelected}
          text=""
        />
      </div>
    ))}
  
  </div>
  );
};

export default ShapesList;
