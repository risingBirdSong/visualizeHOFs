import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Star, Text, Circle, Line, Wedge } from "react-konva";
import ReactDOM from "react-dom";
// import { Ellipse } from "konva/types/shapes/Ellipse";

enum cls {
  numArr = "numArr",
  num = "num",
  arrBrkt = "arrBrkt",
  callbackFunc = "callbackFunc",
}

const doubleNumber = (num: number) => {
  return num * 2;
};

enum currentTaskE {
  "inactive",
  "input",
  "output",
}

const Map = () => {
  const inputEl = useRef(null);
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [algoHasStarted, setAlgoHasStarted] = useState(false);
  const [algoHasFinished, setAlgoHasFinished] = useState(false);
  const [stepNumber, setStepNumber] = useState(-1);
  const [curIdx, setCurIdx] = useState(-1);
  const [outputArray, setOutputArray] = useState<Number[]>([]);
  const [curNumCoords, setCurNumCoords] = useState({ x: 0, y: 0 });
  const [curOutputNumCoords, setCurOutputNumCoords] = useState({ x: 0, y: 0 });
  const [inputCoords, setInputCoords] = useState({ x: 0, y: 0 });
  const [outputCoords, setOutPutCoords] = useState({ x: 0, y: 0 });
  const [currentTask, setCurrentTask] = useState<currentTaskE>(
    currentTaskE.inactive
  );
  // state object's job is to keep our disparate state's better organized, easier to remember, good intellisense...
  const stateObj = {
    nums: nums,
    algoHasStarted: algoHasStarted,
    outputArray: outputArray,
    stepNumber: stepNumber,
    curIdx: curIdx,
    curNumCoords: curNumCoords,
    inputCoords: inputCoords,
    outputCoords: outputCoords,
    currentTask: currentTask,
    curOutputNumCoords: curOutputNumCoords,
    algoHasFinished: algoHasFinished,
  };

  // same as state object but for set state.
  const setStateObj = {
    setNums: setNums,
    setAlgoHasStarted: setAlgoHasStarted,
    setOutputArray: setOutputArray,
    setStepNumber: setStepNumber,
    setCurIdx: setCurIdx,
    setCurNumCoords: setCurNumCoords,
    setInputCoords: setInputCoords,
    setOutPutCoords: setOutPutCoords,
    setCurrentTask: setCurrentTask,
    setCurOutputNumCoords: setCurOutputNumCoords,
    setAlgoHasFinished: setAlgoHasFinished,
  };

  useEffect(() => {
    // console.log("curNumCoords", curNumCoords);
    // console.log("inputCoords", inputCoords);
  }, [curNumCoords, inputCoords]);

  const takeStep = () => {
    setStateObj.setAlgoHasStarted(true);
    setStateObj.setStepNumber((val) => ++val);

    // only 2 mod steps so far but could imagin adding more fine grain control later.
    // for example, 1 step iterate input, 2 step animate passing num to callback, 3 step processing callback
    // 4 step adding to output...

    //even steps will pass control to callback funtion to process input ele
    if (stateObj.curIdx > stateObj.nums.length) {
      setStateObj.setAlgoHasFinished(true);
      return;
    }
    if (stepNumber % 2 === 0) {
      setStateObj.setCurIdx((idx) => ++idx);
      setStateObj.setCurrentTask(currentTaskE.input);
    }
    //odd steps will send control to adding transformed ele to output
    else if (stepNumber % 2 !== 0) {
      if (stateObj.nums[stateObj.curIdx]) {
        let copy = [...stateObj.outputArray];
        copy.push(doubleNumber(stateObj.nums[stateObj.curIdx]));
        setStateObj.setOutputArray(copy);
        setStateObj.setCurrentTask(currentTaskE.output);
      }
    }
  };

  return (
    <div className="allApp">
      <div className="foundation">
        <ul className="row ">
          <li>
            <button
              onClick={takeStep}
              //TESTING CASE
              // ref={(ele) => {
              //   if (!ele) {
              //     console.log("no ref!");
              //     return;
              //   }
              //   const xCoord = ele.getBoundingClientRect().x;
              //   const yCoord = ele.getBoundingClientRect().y;
              //   if (!stateObj.curNumCoords.x) {
              //     setStateObj.setCurNumCoords({ x: xCoord, y: yCoord });
              //   }
              // }}
              className="waves-effect waves-light btn"
            >
              step
            </button>
          </li>
          <li>
            <button className="waves-effect waves-light btn">todo 1 </button>
          </li>
          <li>
            <button className="waves-effect waves-light btn">todo 2</button>
          </li>
        </ul>
        <div style={{ display: "flex", justifyContent: "center" }}></div>
        <div
          style={{
            padding: "5px",
            marginTop: "5px",
            display: "flex",
            justifyContent: "space-around",
          }}
          className={`${cls.callbackFunc}  purple lighten-3 valign-wrapper center-align`}
        >
          <h5 className="purple lighten-2" style={{ padding: "3px" }}>
            callback function
          </h5>

          <div
            className="functionCode"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {algoHasStarted ? (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h5 className="input">
                  input :{" "}
                  {stateObj.nums[stateObj.curIdx] ? (
                    <span
                      ref={(ele) => {
                        if (!stateObj.inputCoords.x) {
                          let x = ele?.getBoundingClientRect().x;
                          let y = ele?.getBoundingClientRect().y;
                          if (x && y) {
                            y += 25;
                            setStateObj.setInputCoords({ x, y });
                          }
                        }
                      }}
                    >
                      {" "}
                      {stateObj.nums[stateObj.curIdx]}
                    </span>
                  ) : (
                    "undefined"
                  )}
                </h5>
                <h5 className="output">
                  output :{" "}
                  {stateObj.nums[stateObj.curIdx] &&
                  stateObj.currentTask === currentTaskE.output ? (
                    <span
                      ref={(ele) => {
                        let x = ele?.getBoundingClientRect().x;
                        let y = ele?.getBoundingClientRect().y;
                        if (x && y && x + 8 !== stateObj.outputCoords.x) {
                          y += 28;
                          x += 8;
                          setStateObj.setOutPutCoords({ x, y });
                        }
                      }}
                    >
                      {" "}
                      {doubleNumber(stateObj.nums[stateObj.curIdx])}{" "}
                    </span>
                  ) : stateObj.nums[stateObj.curIdx] &&
                    stateObj.currentTask === currentTaskE.input ? (
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

        <ul
          className={`${cls.numArr} valign-wrapper row pink lighten-4 center-align array`}
        >
          <h5>inputArr : number[] </h5>
          <h5>=</h5>
          <li className={`${cls.arrBrkt} col s1 bracket`}>[</li>
          {stateObj.nums.map((num, idx) => {
            return (
              <li className={"col s1"} key={idx}>
                {idx === stateObj.curIdx ? (
                  <p
                    ref={(ele) => {
                      //perhaps TODO later remove bang
                      let x = ele?.getBoundingClientRect().x;
                      let y = ele?.getBoundingClientRect().y;
                      if (x && y) {
                        if (x !== stateObj.curNumCoords.x) {
                          setStateObj.setCurNumCoords({ x: x, y: y });
                        }
                      } else {
                        console.log("x and y not found");
                      }
                    }}
                    className={`${cls.num} pink lighten-3`}
                  >
                    {num}
                  </p>
                ) : (
                  <p className={cls.num}>{num}</p>
                )}
              </li>
            );
          })}
          <li className={`${cls.arrBrkt} col s1 bracket`}>]</li>
        </ul>

        {algoHasStarted && !algoHasFinished ? (
          <ul
            className={`${cls.numArr} valign-wrapper row pink lighten-4 center-align array`}
          >
            <h5>output : number[] </h5>
            <h5>=</h5>
            <li className={`${cls.arrBrkt} col s1 bracket`}>[</li>
            {stateObj.outputArray.map((num, idx) => {
              return (
                <li className={"col s1"} key={idx}>
                  {idx === stateObj.curIdx ? (
                    <p
                      className={`${cls.num} pink lighten-3`}
                      ref={(ele) => {
                        let x = ele?.getBoundingClientRect().x;
                        let y = ele?.getBoundingClientRect().y;
                        if (x && y && x !== curOutputNumCoords.x) {
                          setStateObj.setCurOutputNumCoords({ x, y });
                        }
                      }}
                    >
                      {num}
                    </p>
                  ) : (
                    <p className={cls.num}>{num}</p>
                  )}
                </li>
              );
            })}
            <li className={`${cls.arrBrkt} col s1 bracket`}>]</li>
          </ul>
        ) : algoHasStarted && algoHasStarted ? (
          <h5>algo complete!</h5>
        ) : (
          <h5>please click step to begin</h5>
        )}
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="overlay"
      >
        {stateObj.curIdx < stateObj.nums.length ? (
          <Layer>
            {stateObj.currentTask === currentTaskE.input ? (
              // <Circle
              //   radius={20}
              //   x={stateObj.curNumCoords.x}
              //   y={stateObj.curNumCoords.y}
              //   fill="green"
              // />
              //@ts-ignore

              <React.Fragment>
                <Line
                  stroke="blue"
                  points={[
                    stateObj.curNumCoords.x,
                    stateObj.curNumCoords.y,
                    stateObj.curNumCoords.x - 10,
                    stateObj.curNumCoords.y - 50,
                    stateObj.inputCoords.x - 10,
                    stateObj.inputCoords.y + 50,
                    stateObj.inputCoords.x + 5,
                    stateObj.inputCoords.y + 6,
                  ]}
                  // points={[50, 60, 110, 50, 220, 50, 330, 40]}
                  bezier
                />
                <Wedge
                  x={stateObj.inputCoords.x + 3}
                  y={stateObj.inputCoords.y}
                  angle={60}
                  rotation={60}
                  radius={14}
                  fill="blue"
                />
              </React.Fragment>
            ) : stateObj.currentTask === currentTaskE.output ? (
              <React.Fragment>
                <Line
                  stroke="purple"
                  points={[
                    stateObj.curOutputNumCoords.x + 5,
                    stateObj.curOutputNumCoords.y - 10,
                    stateObj.curOutputNumCoords.x - 20,
                    stateObj.curOutputNumCoords.y - 20,
                    stateObj.outputCoords.x,
                    stateObj.outputCoords.y,
                    stateObj.outputCoords.x,
                    stateObj.outputCoords.y,
                  ]}
                  // points={[50, 60, 110, 50, 220, 50, 330, 40]}
                  bezier
                />
                <Wedge
                  x={stateObj.curOutputNumCoords.x + 3}
                  y={stateObj.curOutputNumCoords.y - 3}
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
    </div>
  );
};

export default Map;
