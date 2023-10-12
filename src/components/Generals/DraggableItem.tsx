import React, { useRef, useEffect, useState } from "react";
import { ShapeType } from "../../contexts/DraggableContext";
import { useDraggable } from "../../contexts/DraggableContext";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

// Định nghĩa các thuộc tính cho component DraggableItem
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
  const { updateItemText } = useDraggable();// Sử dụng hook để cập nhật nội dung text của item
  const [isEditing, setIsEditing] = useState(false);// Trạng thái chỉnh sửa của item
  const textRef = useRef<HTMLDivElement>(null); // Ref cho phần tử text
 // Hàm trả về kích thước ban đầu dựa vào loại hình
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
  // Kích thước hiện tại của item
  const [dimensions, setDimensions] = useState(initialDimensions());
   // Effect để focus vào text khi đang chỉnh sửa
  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
    }
  }, [isEditing]);
  // Xử lý sự kiện khi text bị mất focus
  const handleTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    updateItemText(id, e.currentTarget.textContent || "");
  };
 // Xử lý sự kiện nhấn phím khi chỉnh sửa text
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };
  // Định nghĩa styles cho item
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
