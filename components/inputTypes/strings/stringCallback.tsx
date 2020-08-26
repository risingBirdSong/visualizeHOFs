import React from "react";

interface coordsI {
  x: number;
  y: number;
}

enum currentTaskE {
  "inactive",
  "input",
  "output",
}
enum inputVarTypeE {
  "num" = "num",
  "str" = "str",
  "emoji" = "emoji",
}

enum numberCalbacks {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
}
enum stringCallbacks {
  "toUpper" = "toUpper",
  "reverse" = "reverse",
}

type numFunc = (num: number) => number;
type strFunc = (str: string) => string;
type inputType = number | string;

interface strCallbackI {
  FunctionName: string | undefined;
  inputVarName: inputVarTypeE;
  algoHasStarted: boolean;
  inputType: inputType;
  callbackLogic: string;
  //todo make generic instead of just number[]
  strs: string[];
  curIdx: number;
  curNumCoords: coordsI;
  inputCoords: coordsI;
  setInputCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  setOutPutCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  currentTask: currentTaskE;
  outputCoords: coordsI;
  animInput: boolean;
  animTarget: string;
  actualCallback: strFunc;
  fastRefToggler: boolean;
}

const StringCallback = (props: strCallbackI) => {
  //define input up here because we'll use it twice. The reason is that we toggle the identical JSX because of fastRefToggler toggling back and forth for the sake of the line animation.
  let input = (
    <span
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
      {props.strs[props.curIdx]}
    </span>
  );
  return (
    <div
      style={{
        padding: "8px",
        margin: "2px",
        display: "flex",
        borderRadius: "5px",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
      className={`callbackFunc purple lighten-3 valign-wrapper center-align z-depth-3 ${
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
              {props.strs[props.curIdx] && props.fastRefToggler
                ? input
                : props.strs[props.curIdx] && !props.fastRefToggler
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
              {props.strs[props.curIdx] &&
              props.currentTask === currentTaskE.output ? (
                <span
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
                  {props.actualCallback(props.strs[props.curIdx])}{" "}
                </span>
              ) : props.strs[props.curIdx] &&
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

export default StringCallback;
