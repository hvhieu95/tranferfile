import Draggable from "react-draggable";
import { Card } from "react-bootstrap";
import { useDraggable } from "../../contexts/DraggableContext";

export const Triangle = () => {
    const { positions, handleStop } = useDraggable();
    const id = "3";

    return (
        <Draggable
            position={positions[id] || { x: 0, y: 0 }}
            onStop={(e, data) => handleStop(id, { x: data.x, y: data.y })}
        >

            <Card className="mb-2">

            </Card>

        </Draggable>
    );
};
