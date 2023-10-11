import Draggable from "react-draggable";
import { Card } from "react-bootstrap";
import { useDraggable } from "../../contexts/DraggableContext";

export const Circle = () => {
  const { positions, handleStop} = useDraggable();
  const id = "circle";

  return (
<Draggable
  position={positions[id] || { x: 0, y: 0 }}
  onStop={(e, data) => handleStop(id, { x: data.x, y: data.y })}
>
<Card className="mb-2 rounded-circle" style={{width: '20px', height: '20px', borderRadius: '50%', border: '1px solid black'}}>
    <Card.Body className="text-center"></Card.Body>
  </Card>
</Draggable>

  );
};
