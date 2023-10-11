import React from "react";
import { DraggableEvent, DraggableData } from "react-draggable";
import { ShapeType } from "../../contexts/DraggableContext";

type DraggableItemProps = {
  type: ShapeType;
  id: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  style?: React.CSSProperties;
};
export const DraggableItem = ({
  type,
  onDragStart,
  onDragEnd,
  style,
  id,
}: DraggableItemProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("source", type === "circle" || type === "rectangle" ? "library" : "canvas");
    e.dataTransfer.setData("id", id.toString());
    if (onDragStart) onDragStart();
  };



  return (
    <div
    
      onDragStart={handleDragStart}
      style={style}
    >
      {type === "circle" && (
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "1px solid black",
          }}
        ></div>
      )}
      {type === "rectangle" && (
        <div
          style={{ width: "50px", height: "30px", border: "1px solid black" }}
        ></div>
      )}
    </div>
  );
};
