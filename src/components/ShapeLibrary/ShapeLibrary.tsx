import React from "react";
import { DraggableItem } from "../Generals/DraggableItem";
import { ShapeType } from "../../contexts/DraggableContext";
import { useDraggable } from "../../contexts/DraggableContext";

type Shape = {
  id: number;
  type: ShapeType;
  isSelected: boolean;

};

const shapes: Shape[] = [
  { id: 1, type: "circle", isSelected: false },
  { id: 2, type: "rectangle", isSelected: false },
  { id: 3, type: "triangle", isSelected: false },
  { id: 4, type: "hexagon", isSelected: false },
  { id: 5, type: "diamond", isSelected: false },
  { id: 6, type: "parallelogram", isSelected: false },
];

const ShapeLibrary: React.FC = () => {
  const { uri, updateUri, clearUri } = useDraggable();
  const handleDragStart = (e: React.DragEvent, type: ShapeType, id: number) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("source", "library");
    e.dataTransfer.setData("id", id.toString());
  };

  return (
  <div className="shape-library-container">
    {shapes.map((shape) => (
      <div
      className="shape-library-item"
        draggable
        onDragStart={(e) => handleDragStart(e, shape.type, shape.id)}
        key={shape.id}
      >
        <DraggableItem
          id={shape.id}
          type={shape.type}
          isSelected={shape.isSelected}
          text=""
        />
      </div>
    ))}
    <div>
      下記のリンクをここに入力ください。
      <input type="text" onChange={(e) => updateUri(e.target.value)} value={uri}/>
      <br></br>
      <input type="submit" value="Clear" onClick={clearUri}/>
      <br></br>
      demo link: 
      <p>
        PowerPoint file:<br></br>
        https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt
      </p>
      <br></br>
      <p>
        MSWord file:<br></br>
        https://calibre-ebook.com/downloads/demos/demo.docx</p>
      <br></br>
      <p>
        MSExcel file:<br></br>
        https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls</p>
      <br></br>
    </div>
  </div>
  );
};

export default ShapeLibrary;
