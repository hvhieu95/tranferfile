import React from "react";
import { useDraggable } from "../../contexts/DraggableContext";
import ShapesList from '../Library/ShapesList';
import LinksList from '../Library/LinksList';
import { ShapeType, } from "../../contexts/DraggableContext";
import { shapes } from '../Library/ShapesList';


const Library: React.FC = () => {
  const { uri, updateUri, clearUri } = useDraggable();

  const handleDragStart = (e: React.DragEvent, type: ShapeType, id: number) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("source", "library");
    e.dataTransfer.setData("id", id.toString());
  };

  return (
    <div className="shape-library-container">
      <ShapesList shapes={shapes} onShapeDragStart={handleDragStart} />
      <LinksList uri={uri} onUriChange={updateUri} onClearUri={clearUri} />
    </div>
  );
};

export default Library;
