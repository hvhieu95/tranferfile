import React from "react";
import { ShapeType } from "../../contexts/DraggableContext";

type DraggableItemProps = {
  type: ShapeType;
  id: number;
  style?: React.CSSProperties;
};

export const DraggableItem = ({ type, style, id }: DraggableItemProps) => {
  return (
    <div style={style}>
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
