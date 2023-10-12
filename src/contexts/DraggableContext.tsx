import React, { createContext, useState, useContext } from "react";

export type ShapeType =
  | "circle"
  | "rectangle"
  | "vector"
  | "triangle"
  | "hexagon"
  | "diamond"
  | "parallelogram";

type CanvasItem = {
  type: ShapeType;
  id: number;
  position: { x: number; y: number };
  isSelected: boolean;
  text?: string;
};

type DraggableContextType = {
  canvasItems: CanvasItem[];
  addItemToCanvas: (
    item: { type: ShapeType; id: number; isSelected: boolean },
    position: { x: number; y: number }
  ) => void;
  updateItemText: (id: number, newText: string) => void;
  positions: { [key: string]: { x: number; y: number } };
  handleStop: (id: string, position: { x: number; y: number }) => void;
  undoCanvasAction: () => void; 
};

const defaultContextValue: DraggableContextType = {
  canvasItems: [],
  addItemToCanvas: () => { },
  updateItemText: () => { },
  positions: {},
  handleStop: () => { },
  undoCanvasAction: () => {}
};

export const DraggableContext =
  createContext<DraggableContextType>(defaultContextValue);

type DraggableProviderProps = {
  children: React.ReactNode;
};

export const DraggableProvider = ({ children }: DraggableProviderProps) => {
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [canvasHistory, setCanvasHistory] = useState<CanvasItem[][]>([]);

  const addItemToCanvas = (
    item: { type: ShapeType; id: number; isSelected: boolean },
    position: { x: number; y: number }
  ) => {
    const newItem: CanvasItem = { ...item, position, text: "" };
    setCanvasItems((prevItems) => [...prevItems, newItem]);
    setCanvasHistory([...canvasHistory, canvasItems]);
  };

  const updateItemText = (id: number, newText: string) => {
    setCanvasItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      });
    });
  };

  const undoCanvasAction = () => {
    if (canvasHistory.length > 0) {
      setCanvasItems(canvasHistory[canvasHistory.length - 1]);
      setCanvasHistory(canvasHistory.slice(0, -1));
    }
  };

  const handleStop = (id: string, position: { x: number; y: number }) => {
    setPositions((prevPositions) => ({ ...prevPositions, [id]: position }));
  };

  return (
    <DraggableContext.Provider
      value={{
        canvasItems,
        addItemToCanvas,
        updateItemText,
        positions,
        handleStop,
        undoCanvasAction,
      }}
    >
      {children}
    </DraggableContext.Provider>
  );
};

export const useDraggable = () => {
  return useContext(DraggableContext);
};
