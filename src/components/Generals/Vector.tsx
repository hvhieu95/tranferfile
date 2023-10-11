import Draggable from "react-draggable";
import { Card } from "react-bootstrap";
import { useDraggable } from "../../contexts/DraggableContext";

export const Vector = () => {
  const { positions, handleStop} = useDraggable();
  const id = "vector";
  return (
<Draggable
  position={positions[id] || { x: 0, y: 0 }}
  onStop={(e, data) => handleStop(id, { x: data.x, y: data.y })}
>
      <Card className="mb-2">
        <Card.Body className="text-center"></Card.Body>
      </Card>
    </Draggable>
  );
};
