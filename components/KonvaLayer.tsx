import React from "react";
// import currentTaskE from "../Map";
import { Stage, Layer, Star, Text, Circle, Line, Wedge } from "react-konva";
import { coordsI, hofType, currentTaskE } from "./Hof";

interface KonvaLayerI {
  curIdx: number;
  mainArray: (number | string)[];
  currentTask: currentTaskE;
  curNumCoords: coordsI;
  inputCoords: coordsI;
  curOutputNumCoords: coordsI;
  outputCoords: coordsI;
  trashCoords: coordsI;
  filterStatus: boolean;
  typeHof: hofType;
}

const KonvaLayer = (props: KonvaLayerI) => {
  //why is this resetting to zero for filter?
  return (
    <div>
      <Stage
        width={window.innerWidth - 100}
        height={window.innerHeight}
        className={`overlay`}
      >
        {props.curIdx < props.mainArray.length ? (
          <Layer>
            {props.currentTask === currentTaskE.input &&
            props.typeHof === "MAP" ? (
              <React.Fragment>
                <Line
                  stroke="blue"
                  points={[
                    props.curNumCoords.x + 18,
                    props.curNumCoords.y + 22,
                    props.curNumCoords.x + 4,
                    props.curNumCoords.y + 50,
                    props.inputCoords.x - 10,
                    props.inputCoords.y - 30,
                    props.inputCoords.x,
                    props.inputCoords.y - 3,
                  ]}
                  bezier
                />
                <Wedge
                  x={props.inputCoords.x + 2}
                  y={props.inputCoords.y + 2}
                  angle={60}
                  rotation={-140}
                  radius={14}
                  fill="blue"
                />
              </React.Fragment>
            ) : props.currentTask === currentTaskE.output &&
              props.typeHof === "MAP" ? (
              <React.Fragment>
                <Line
                  stroke="purple"
                  points={[
                    props.curOutputNumCoords.x + 5,
                    props.curOutputNumCoords.y - 10,
                    props.curOutputNumCoords.x - 20,
                    props.curOutputNumCoords.y - 20,
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
            ) : props.currentTask === currentTaskE.input &&
              props.typeHof === "FILTER" ? (
              <React.Fragment>
                <Line
                  stroke="blue"
                  points={[
                    props.curNumCoords.x + 18,
                    props.curNumCoords.y + 22,
                    props.curNumCoords.x + 4,
                    props.curNumCoords.y + 50,
                    props.inputCoords.x - 10,
                    props.inputCoords.y - 30,
                    props.inputCoords.x,
                    props.inputCoords.y - 3,
                  ]}
                  bezier
                />
                <Wedge
                  x={props.inputCoords.x + 2}
                  y={props.inputCoords.y + 2}
                  angle={60}
                  rotation={-140}
                  radius={14}
                  fill="blue"
                />
              </React.Fragment>
            ) : props.currentTask === currentTaskE.output &&
              props.typeHof === "FILTER" &&
              props.filterStatus === true ? (
              <React.Fragment>
                <Line
                  stroke="purple"
                  points={[
                    props.curOutputNumCoords.x + 3,
                    props.curOutputNumCoords.y - 10,
                    props.curOutputNumCoords.x - 20,
                    props.curOutputNumCoords.y - 20,
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
            ) : props.currentTask === currentTaskE.output &&
              props.typeHof === "FILTER" &&
              props.filterStatus === false ? (
              <React.Fragment>
                <Line
                  stroke="purple"
                  points={[
                    props.outputCoords.x,
                    props.outputCoords.y,
                    props.outputCoords.x - 30,
                    props.outputCoords.y + 30,
                    props.trashCoords.x + 15,
                    props.trashCoords.y - 4,
                    props.trashCoords.x + 19,
                    props.trashCoords.y - 8,
                  ]}
                  bezier
                />
                <Wedge
                  x={props.trashCoords.x + 16}
                  y={props.trashCoords.y + 2}
                  angle={60}
                  rotation={-110}
                  radius={14}
                  fill="blue"
                />
              </React.Fragment>
            ) : null}
          </Layer>
        ) : null}
      </Stage>
    </div>
  );
};

export default KonvaLayer;
