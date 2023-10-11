import React, { createContext, useState, useContext } from "react";

export type ShapeType = "circle" | "rectangle" | "vector";

type CanvasItem = {
  type: ShapeType;
  id: number;
  position: { x: number; y: number };
};

type DraggableContextType = {
  canvasItems: CanvasItem[];
  addItemToCanvas: (
    item: { type: ShapeType; id: number },
    position: { x: number; y: number }
  ) => void;
  positions: { [key: string]: { x: number; y: number } };
  handleStop: (id: string, position: { x: number; y: number }) => void;
};

const defaultContextValue: DraggableContextType = {
  canvasItems: [],
  addItemToCanvas: () => {},
  positions: {},
  handleStop: () => {},
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

  const addItemToCanvas = (
    item: { type: ShapeType; id: number },
    position: { x: number; y: number }
  ) => {
    const newItem: CanvasItem = { ...item, position };
    setCanvasItems((prevItems) => [...prevItems, newItem]);
  };

  const handleStop = (id: string, position: { x: number; y: number }) => {
    setPositions((prevPositions) => ({ ...prevPositions, [id]: position }));
  };

  return (
    <DraggableContext.Provider
      value={{
        canvasItems,
        addItemToCanvas,
        positions,

        handleStop,
      }}
    >
      {children}
    </DraggableContext.Provider>
  );
};

export const useDraggable = () => {
  return useContext(DraggableContext);
};
