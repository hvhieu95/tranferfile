
import { useDraggable } from "../contexts/DraggableContext";
import { DraggableItem } from "./Generals/DraggableItem";
import { ShapeType } from "../contexts/DraggableContext";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";

export const Canvas = () => {
  const { canvasItems: initialCanvasItems, addItemToCanvas } = useDraggable();
  const [canvasItems, setCanvasItems] = useState(initialCanvasItems);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type") as ShapeType;
    const source = e.dataTransfer.getData("source");
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
    };
    if (source === "library") {
      addItemToCanvas({ type, id: Date.now() }, position);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const updateItemPosition = (
    id: number,
    newPosition: { x: number; y: number }
  ) => {
    setCanvasItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, position: newPosition };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    setCanvasItems(initialCanvasItems);
  }, [initialCanvasItems]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "1px solid black",
        minHeight: "400px",
        position: "relative",
      }}
    >
      {canvasItems.map((item) => (
        <Draggable
          key={item.id}
          position={{ x: item.position.x, y: item.position.y }}
          onStop={(e, data) => {
            updateItemPosition(item.id, { x: data.x, y: data.y });
          }}
        >
          <div>
            <DraggableItem
              type={item.type}
              id={item.id}
              style={{ position: "absolute" }}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
};
