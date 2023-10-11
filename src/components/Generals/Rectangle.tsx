import Draggable from "react-draggable";
import { Card } from "react-bootstrap";
import { useDraggable } from "../../contexts/DraggableContext";

export const Rectangle = () => {
  const { positions, handleStop } = useDraggable();
  const id = "rectangle";

  return (
    <Draggable
  position={positions[id] || { x: 0, y: 0 }}

  onStop={(e, data) => handleStop(id, { x: data.x, y: data.y })}
>
      <div>
      <Card className="mb-2" style={{width: '20px', height: '10px', border: '1px solid black'}}>
          <Card.Body className="text-center">
            Rectangle
          </Card.Body>
        </Card>
      </div>
    </Draggable>
  );
};
