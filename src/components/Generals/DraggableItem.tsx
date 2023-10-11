import React from "react";
import { ShapeType } from "../../contexts/DraggableContext";

type DraggableItemProps = {
  type: ShapeType;
  id: number;
  isSelected: boolean;
  style?: React.CSSProperties;
};

export const DraggableItem = ({ type, isSelected, id, style }: DraggableItemProps) => {
  const styles = {
    border: isSelected ? "1px dashed black" : "none"
  };

  return (
    <div style={{ ...style, ...styles }} className="shape">
      {type === "circle" && <div className="circle"></div>}
      {type === "rectangle" && <div className="rectangle"></div>}
      {type === "triangle" && <div className="triangle"></div>}
      {type === "hexagon" && <div className="hexagon"></div>}
      {type === "diamond" && <div className="diamond"></div>}
      {type === "parallelogram" && <div className="parallelogram"></div>}
    </div>
  );
};
