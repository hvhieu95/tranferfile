import Draggable from "react-draggable";
import { Card } from "react-bootstrap";
import { useDraggable } from "../../contexts/DraggableContext";
export const Parallelogram = () => {
    const { positions, handleStop } = useDraggable();
    const id = "6";
  
    return (
      <Draggable
        position={positions[id] || { x: 0, y: 0 }}
        onStop={(e, data) => handleStop(id, { x: data.x, y: data.y })}
      >
        <div>
          <Card className="mb-2">
            <Card.Body className="text-center">Parallelogram</Card.Body>
          </Card>
        </div>
      </Draggable>
    );
  };
  