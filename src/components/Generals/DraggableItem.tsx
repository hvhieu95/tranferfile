import React, { useRef, useEffect, useState } from "react";
import { ShapeType } from "../../contexts/DraggableContext";
import { useDraggable } from "../../contexts/DraggableContext";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

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

  const initialDimensions = () => {
    switch (type) {
      case "circle":
        return { width: 40, height: 40 };
      case "rectangle":
        return { width: 60, height: 30 };
        case "hexagon":
          return { width: 50, height: 50 };
          case "diamond":
            return { width: 40, height: 40 };
            case "parallelogram":
              return { width: 60, height: 30 };
      default:
        return { width: 60, height: 60 };
    }
  };
  const [dimensions, setDimensions] = useState(initialDimensions());
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
    width: dimensions.width,
    height: dimensions.height,
  };
  const shapeStyles = {
    width: dimensions.width,
    height: dimensions.height,
  };
  return (
    <Resizable
      width={dimensions.width}
      height={dimensions.height}
      onResize={(event, { size }) => {
        setDimensions({
          width: size.width,
          height: size.height,
        });
      }}
      resizeHandles={
        isSelected ? ["e", "w", "s", "n", "se", "sw", "ne", "nw"] : []
      }
      axis="both"
    >
      <div
        style={styles}
        className="shape-container"
        onClick={() => setIsEditing(false)}
        onDoubleClick={() => setIsEditing(true)}
      >
        {type === "circle" && (
          <div className="circle" style={shapeStyles}></div>
        )}
        {type === "rectangle" && (
          <div className="rectangle" style={shapeStyles}></div>
        )}
        {type === "triangle" && (
          <div className="triangle" style={shapeStyles}></div>
        )}
        {type === "hexagon" && (
          <div className="hexagon" style={shapeStyles}></div>
        )}
        {type === "diamond" && (
          <div className="diamond" style={shapeStyles}></div>
        )}
        {type === "parallelogram" && (
          <div className="parallelogram" style={shapeStyles}></div>
        )}
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {text}
        </div>
      </div>
    </Resizable>
  );
};
