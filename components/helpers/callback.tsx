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
interface CallbackI {
  algoHasStarted: boolean;
  //todo make generic instead of just number[]
  nums: number[];
  curIdx: number;
  curNumCoords: coordsI;
  inputCoords: coordsI;
  setInputCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  setOutPutCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  currentTask: currentTaskE;
  outputCoords: coordsI;
  doubleNumber: (num: number) => number;
}

const Callback = (props: CallbackI) => {
  return (
    <div
      style={{
        padding: "5px",
        marginTop: "2px",
        display: "flex",
        justifyContent: "space-around",
      }}
      className={`callbackFunc purple lighten-3 valign-wrapper center-align z-depth-3`}
    >
      <h5 className="purple lighten-2" style={{ padding: "3px" }}>
        callback function
      </h5>

      <div
        className="functionCode"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {props.algoHasStarted ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h5 className="input">
              input :{" "}
              {props.nums[props.curIdx] ? (
                <span
                  ref={(ele) => {
                    let curX = ele?.getBoundingClientRect().x;
                    if (props.inputCoords.x !== curX) {
                      let x = ele?.getBoundingClientRect().x;
                      let y = ele?.getBoundingClientRect().y;
                      if (x && y) {
                        y += 0;
                        props.setInputCoords({ x, y });
                        let numCoords = props.curNumCoords;
                        // props.setCurNumCoords({
                        //   x: numCoords.x,
                        //   y: numCoords.y,
                        // });
                      }
                    }
                  }}
                >
                  {" "}
                  {props.nums[props.curIdx]}
                </span>
              ) : (
                ""
              )}
            </h5>
            <h5 className="output">
              output :{" "}
              {props.nums[props.curIdx] &&
              props.currentTask === currentTaskE.output ? (
                <span
                  ref={(ele) => {
                    let x = ele?.getBoundingClientRect().x;
                    let y = ele?.getBoundingClientRect().y;
                    if (x && y && x + 8 !== props.outputCoords.x) {
                      y += 28;
                      x += 8;
                      props.setOutPutCoords({ x, y });
                    }
                  }}
                >
                  {" "}
                  {props.doubleNumber(props.nums[props.curIdx])}{" "}
                </span>
              ) : props.nums[props.curIdx] &&
                props.currentTask === currentTaskE.input ? (
                <span>?</span>
              ) : (
                "undefined"
              )}
            </h5>
          </div>
        ) : (
          ""
        )}
        <div className="funcBody">
          <h5>const doubleNumber = (num: number) {"=>"}</h5>
          <h5> num * 2 </h5>
        </div>
      </div>
    </div>
  );
};

export default Callback;
