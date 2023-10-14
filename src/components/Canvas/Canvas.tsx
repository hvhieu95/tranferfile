import React, { useCallback, useEffect, useState } from "react";
import { useDraggable } from "../../contexts/DraggableContext";
import Draggable from "react-draggable";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DraggableItem } from "../Generals/DraggableItem";
import { ShapeType } from "../../contexts/DraggableContext";

const DocumentViewer = React.memo(({ uri }: { uri: string }) => {
  const [isDraggingShape, setIsDraggingShape] = useState(false);

  useEffect(() => {
    const handleStartDragShape = () => {
      setIsDraggingShape(true);
    };

    const handleStopDragShape = () => {
      setIsDraggingShape(false);
    };

    window.addEventListener("dragstart", handleStartDragShape);
    window.addEventListener("dragend", handleStopDragShape);

    return () => {
      window.removeEventListener("dragstart", handleStartDragShape);
      window.removeEventListener("dragend", handleStopDragShape);
    };
  }, []);

  return (
    <div
      className="pdf"
      style={{
        height: "98vh",
        width: "100%",
        overflow: "hidden",
        pointerEvents: isDraggingShape ? "none" : "auto",
      }}
    >
      <DocViewer
        documents={[
          {
            uri: uri,
            fileType: uri
              .substring(uri.length - 6)
              .split(".")
              .pop(),
            fileName:
              "remote " +
              uri
                .substring(uri.length - 6)
                .split(".")
                .pop() +
              " file",
          },
        ]}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: "#5296d8",
          secondary: "#ffffff",
          tertiary: "#5296d899",
          textPrimary: "#ffffff",
          textSecondary: "#5296d8",
          textTertiary: "#00000099",
        }}
      />
    </div>
  );
});

export const Canvas = () => {
  const {
    canvasItems: initialCanvasItems,
    addItemToCanvas,
    undoCanvasAction,
    uri,
  } = useDraggable();
  const [canvasItems, setCanvasItems] = useState(initialCanvasItems);
  const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
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
    },
    [addItemToCanvas]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

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
  }, [selectedShapeId, undoCanvasAction]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => setSelectedShapeId(null)}
      style={{
        border: "1px solid black",
        minHeight: "98vh",
        position: "relative",
      }}
    >
      {canvasItems.map((item) => (
        <Draggable
          key={item.id}
          position={{ x: item.position.x, y: item.position.y }}
          onStop={(e, data) => {
            setCanvasItems((prevItems) =>
              prevItems.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      position: { x: data.x, y: data.y },
                    }
                  : i
              )
            );
          }}
        >
          <div
            style={{
              position: "fixed",
              top: item.position.y,
              left: item.position.x,
            }}
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
              text={item.text || ""}
            />
          </div>
        </Draggable>
      ))}
      <DocumentViewer uri={uri} />
    </div>
  );
};
