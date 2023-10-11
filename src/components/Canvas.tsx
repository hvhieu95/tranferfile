import { useDraggable } from "../contexts/DraggableContext";
import { DraggableItem } from "./Generals/DraggableItem";
import { ShapeType } from "../contexts/DraggableContext";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";

export const Canvas = () => {
  const { canvasItems: initialCanvasItems, addItemToCanvas,undoCanvasAction  } = useDraggable();
  const [canvasItems, setCanvasItems] = useState(initialCanvasItems);
  const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);

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
      addItemToCanvas({ type, id: Date.now(), isSelected: false }, position);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedShapeId !== null) {
        setCanvasItems((prevItems) =>
          prevItems.filter((item) => item.id !== selectedShapeId)
        );
        setSelectedShapeId(null);
      }
      if (event.ctrlKey && event.key === "z") {
        undoCanvasAction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedShapeId,undoCanvasAction]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => setSelectedShapeId(null)}
      style={{
        border: "1px solid black",
        minHeight: "900px",
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedShapeId(item.id);
            }}
          >
            <DraggableItem
              type={item.type}
              id={item.id}
              isSelected={selectedShapeId === item.id}
              style={{ position: "absolute" }}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
};
