import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDraggable } from "../../contexts/DraggableContext";
import Draggable from "react-draggable";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DraggableItem } from "../Generals/DraggableItem";
import { ShapeType } from "../../contexts/DraggableContext";

const DocumentViewer = React.memo(
  ({ uri ,isDraggingFromLibrary}: { uri: string; isDraggingFromLibrary: boolean }) => {
    return (
      <div
        className="pdf"
        style={{
          height: "600px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        
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
            disableThemeScrollbar: true,
          }}
        
        />
      </div>
    );
  }
);
const Shapes = React.memo(
  ({
    canvasItems,
    setSelectedShapeId,
    selectedShapeId,
    updatePosition,
    handleDragStart,
    handleDragEnd,
  }: {
    canvasItems: any[];
    setSelectedShapeId: any;
    selectedShapeId: number | null;
    updatePosition: any;
    handleDragStart: any;
    handleDragEnd: any;
  }) => {
    return (
      <>
        {canvasItems.map((item) => (
          <Draggable
            key={item.id}
            position={{ x: item.position.x, y: item.position.y }}
            onStart={handleDragStart}
            onStop={(e, data) => {
              handleDragEnd();
              updatePosition(item.id, { x: data.x, y: data.y });
            }}
          >
            <div
              data-source="library"
              style={{
                position: "fixed",
                top: item.position.y,
                left: item.position.x,
                zIndex: "1001",
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
      </>
    );
  }
);

export const Canvas = () => {
  const {
    canvasItems: initialCanvasItems,
    addItemToCanvas,
    undoCanvasAction,
    uri,
  } = useDraggable();
  const [canvasItems, setCanvasItems] = useState(initialCanvasItems);
  const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);
  const [isDraggingFromLibrary, setIsDraggingFromLibrary] = useState(false);

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
  const handleDragStart = useCallback((e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute("data-source") === "library") {
      setIsDraggingFromLibrary(true);
    } else {
      setIsDraggingFromLibrary(false);
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDraggingFromLibrary(false);
  }, []);

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

  const updatePosition = (id: number, position: { x: number; y: number }) => {
    setCanvasItems((prevItems) => {
      const itemToUpdate = prevItems.find((i) => i.id === id);
      if (
        itemToUpdate &&
        (itemToUpdate.position.x !== position.x ||
          itemToUpdate.position.y !== position.y)
      ) {
        return prevItems.map((i) => (i.id === id ? { ...i, position } : i));
      }
      return prevItems;
    });
  };

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
      {isDraggingFromLibrary && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000, 
            pointerEvents: isDraggingFromLibrary ? "auto":"none",
            backgroundColor: "rgba(255, 255, 255, 0.01)",
          }}
        ></div>
      )}
      <Shapes
        canvasItems={canvasItems}
        setSelectedShapeId={setSelectedShapeId}
        selectedShapeId={selectedShapeId}
        updatePosition={updatePosition}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
      <DocumentViewer uri={uri} isDraggingFromLibrary={isDraggingFromLibrary} />
    </div>
  );
};
