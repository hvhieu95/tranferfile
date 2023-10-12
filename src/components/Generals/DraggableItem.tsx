import React, { useRef, useEffect, useState } from "react";
import { ShapeType } from "../../contexts/DraggableContext";
import { useDraggable } from "../../contexts/DraggableContext";

type DraggableItemProps = {
  type: ShapeType;
  id: number;
  isSelected: boolean;
  style?: React.CSSProperties;
  text: string;
};

export const DraggableItem = ({
  type,
  isSelected,
  id,
  style,
  text,
}: DraggableItemProps) => {
  const { updateItemText } = useDraggable();
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
    }
  }, [isEditing]);

  const handleTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    updateItemText(id, e.currentTarget.textContent || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  const styles = {
    border: isSelected && !isEditing ? "1px dashed black" : "none",
    ...style,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={styles}
      className="shape-container"
      onClick={() => setIsEditing(false)}
      onDoubleClick={() => setIsEditing(true)}
    >
      {type === "circle" && <div className="circle"></div>}
      {type === "rectangle" && <div className="rectangle"></div>}
      {type === "triangle" && <div className="triangle"></div>}
      {type === "hexagon" && <div className="hexagon"></div>}
      {type === "diamond" && <div className="diamond"></div>}
      {type === "parallelogram" && <div className="parallelogram"></div>}
      <div
        ref={textRef}
        contentEditable={isEditing}
        onBlur={handleTextBlur}
        onKeyDown={handleKeyDown}
        style={{
          outline: "none",
          cursor: "text",
          textAlign: "center",
          position: "absolute",
        }}
      >
        {text}
      </div>
    </div>
  );
};
