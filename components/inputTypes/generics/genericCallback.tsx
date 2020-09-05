import React from "react";
import { hofType, coordsI, currentTaskE, inputVarTypeE } from "../../Hof";
import { emojiArr } from "../../Hof";

type numFunc = (num: number) => number;
type strFunc = (str: string) => string;
type numFilterCallBack = (x: number) => boolean;
type strFilterCallBack = (x: string) => boolean;

interface genericCallbackI {
  FunctionName: string | undefined;
  inputVarName: inputVarTypeE;
  algoHasStarted: boolean;
  //todo fix inputType
  inputType: number | string;
  callbackLogic: string;
  //todo make generic instead of just number[]
  mainArray: (number | string)[];
  curIdx: number;
  curNumCoords: coordsI;
  inputCoords: coordsI;
  setInputCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  setOutPutCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  currentTask: currentTaskE;
  outputCoords: coordsI;
  animInput: boolean;
  animTarget: string;
  actualCallback: numFunc | strFunc | numFilterCallBack | strFilterCallBack;
  fastRefToggler: boolean;
  typeHof: hofType;
}

const GenericCallback = (props: genericCallbackI) => {
  //define input up here because we'll use it twice. The reason is that we toggle the identical JSX because of fastRefToggler toggling back and forth for the sake of the line animation.
  let input = (
    <span
      style={{
        fontSize: `${
          //@ts-ignore
          emojiArr.includes(props.mainArray[props.curIdx]) ? "25px" : ""
        }`,
      }}
      ref={(ele) => {
        let curX = ele?.getBoundingClientRect().x;
        if (props.inputCoords.x !== curX) {
          let x = ele?.getBoundingClientRect().x;
          let y = ele?.getBoundingClientRect().y;
          if (x && y) {
            y += 0;
            props.setInputCoords({ x, y });
          }
        }
      }}
    >
      {" "}
      {props.mainArray[props.curIdx]}
    </span>
  );
  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
      className={`callbackFunc segment purple lighten-3 valign-wrapper center-align z-depth-3 ${
        props.animTarget === "callBackAnimate" ? "callBackAnimate" : ""
      }`}
    >
      <h5
        className="purple lighten-2 amber-text text-accent-4 z-depth-1"
        style={{ padding: "3px", borderRadius: "5px" }}
      >
        callback function
      </h5>

      <div
        className="functionCode"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {props.algoHasStarted ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "10px",
            }}
          >
            <h6 className="input valign-wrapper">
              <span className="blue-text text-darken-3">input</span> &nbsp;{" "}
              {props.mainArray[props.curIdx] && props.fastRefToggler
                ? input
                : props.mainArray[props.curIdx] && !props.fastRefToggler
                ? input
                : ""}
            </h6>
          </div>
        ) : (
          ""
        )}
        <div
          className="funcBody purple lighten-2 z-depth-2"
          style={{ padding: "12px", borderRadius: "5px" }}
        >
          <h6>
            const <span className="amber-text">{props.FunctionName}</span> = (
            <span className="cyan-text text-accent-4">
              {props.inputVarName}
            </span>{" "}
            : &nbsp;{" "}
            <span className="blue-text text-accent-4">{props.inputType}</span> ){" "}
            {"=>"}
          </h6>
          <h6>
            {" "}
            <span className="cyan-text text-accent-4">
              {props.inputVarName}
            </span>{" "}
            {props.callbackLogic}{" "}
          </h6>
        </div>
        <div style={{ display: "flex", margin: "15px" }}>
          {props.algoHasStarted ? (
            <h6 className="output valign-wrapper">
              <span className="blue-text text-darken-3">output</span> &nbsp;{" "}
              {props.mainArray[props.curIdx] &&
              props.currentTask === currentTaskE.output ? (
                <span
                  style={{
                    fontSize: `${
                      //@ts-ignore
                      emojiArr.includes(props.mainArray[props.curIdx])
                        ? "25px"
                        : ""
                    }`,
                  }}
                  ref={(ele) => {
                    let x = ele?.getBoundingClientRect().x;
                    let y = ele?.getBoundingClientRect().y;
                    //prevent infinite loop
                    if (x && y && x + 6 !== props.outputCoords.x) {
                      y += 20;
                      x += 6;
                      props.setOutPutCoords({ x, y });
                    }
                  }}
                >
                  {" "}
                  {/* TODO how to fix this never argument? */}
                  {props.typeHof === "MAP"
                    ? // @ts-ignore
                      props.actualCallback(props.mainArray[props.curIdx])
                    : props.typeHof === "FILTER"
                    ? props.mainArray[props.curIdx]
                    : ""}{" "}
                </span>
              ) : props.mainArray[props.curIdx] &&
                props.currentTask === currentTaskE.input ? (
                <span>?</span>
              ) : (
                ""
              )}
            </h6>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericCallback;
