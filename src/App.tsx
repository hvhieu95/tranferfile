import React from "react";
import { DraggableProvider } from "./contexts/DraggableContext";
import  {Canvas}  from "./components/Canvas/Canvas";
import Library from "./components/Library/Library";
import "./App.css";




function App() {
  return (
    <DraggableProvider>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-light border-right">
            <Library />
          </div>

          <div className="col-md-7 border-right">
            <Canvas />
          </div>

          <div className="col-md-3 bg-light"></div>
        </div>
      </div>
    </DraggableProvider>
  );
}

export default App;