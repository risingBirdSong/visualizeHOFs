import React from "react";
// import currentTaskE from "../Map";
import { Stage, Layer, Star, Text, Circle, Line, Wedge } from "react-konva";
import { coordsI } from "./outputArray";

//redefining same enum here because of bug
//todo see why the import doesn behave the same as redefining same thing here
enum currentTaskE {
  "inactive",
  "input",
  "output",
}

interface KonvaLayerI {
  curIdx: number;
  nums: number[];
  currentTask: currentTaskE;
  curNumCoords: coordsI;
  inputCoords: coordsI;
  curOutputNumCoords: coordsI;
  outputCoords: coordsI;
}

const KonvaLayer = (props: KonvaLayerI) => (
  <Stage
    width={window.innerWidth}
    height={window.innerHeight}
    className="overlay"
  >
    {props.curIdx < props.nums.length ? (
      <Layer>
        {props.currentTask === currentTaskE.input ? (
          <React.Fragment>
            <Line
              stroke="blue"
              points={[
                props.curNumCoords.x,
                props.curNumCoords.y,
                props.curNumCoords.x - 10,
                props.curNumCoords.y - 50,
                props.inputCoords.x - 10,
                props.inputCoords.y + 50,
                props.inputCoords.x + 5,
                props.inputCoords.y + 6,
              ]}
              bezier
            />
            <Wedge
              x={props.inputCoords.x + 3}
              y={props.inputCoords.y}
              angle={60}
              rotation={60}
              radius={14}
              fill="blue"
            />
          </React.Fragment>
        ) : props.currentTask === currentTaskE.output ? (
          <React.Fragment>
            <Line
              stroke="purple"
              points={[
                //TODO wait whats the difference between these props cur and output coords?
                props.curOutputNumCoords.x + 5,
                props.curOutputNumCoords.y - 10,
                props.curOutputNumCoords.x - 20,
                props.curOutputNumCoords.y - 20,
                // iii
                // vvv
                props.outputCoords.x,
                props.outputCoords.y,
                props.outputCoords.x,
                props.outputCoords.y,
              ]}
              bezier
            />
            <Wedge
              x={props.curOutputNumCoords.x + 3}
              y={props.curOutputNumCoords.y - 3}
              angle={60}
              rotation={-130}
              radius={14}
              fill="blue"
            />
          </React.Fragment>
        ) : null}
      </Layer>
    ) : null}
  </Stage>
);

export default KonvaLayer;
