import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Star, Text, Circle, Line } from "react-konva";
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

const Map = () => {
  const inputEl = useRef(null);
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [algoUnderWay, setAlgoUnderWay] = useState(false);
  const [stepNumber, setStepNumber] = useState(-1);
  const [curIdx, setCurIdx] = useState(-1);
  const [outputArray, setOutputArray] = useState<Number[]>([]);
  const [curNumCoords, setCurNumCoords] = useState({ x: 0, y: 0 });
  const [inputCoords, setInputCoords] = useState({ x: 0, y: 0 });
  // state object's job is to keep our disparate state's better organized, easier to remember, good intellisense...
  const stateObj = {
    nums: nums,
    algoUnderWay: algoUnderWay,
    outputArray: outputArray,
    stepNumber: stepNumber,
    curIdx: curIdx,
    curNumCoords: curNumCoords,
    inputCoords: inputCoords,
  };

  // same as state object but for set state.
  const setStateObj = {
    setNums: setNums,
    setAlgoUnderWay: setAlgoUnderWay,
    setOutputArray: setOutputArray,
    setStepNumber: setStepNumber,
    setCurIdx: setCurIdx,
    setCurNumCoords: setCurNumCoords,
    setInputCoords: setInputCoords,
  };

  useEffect(() => {
    console.log("curNumCoords", curNumCoords);
  }, [curNumCoords]);

  const takeStep = () => {
    setStateObj.setAlgoUnderWay(true);
    setStateObj.setStepNumber((val) => ++val);

    // only 2 mod steps so far but could imagin adding more fine grain control later.
    // for example, 1 step iterate input, 2 step animate passing num to callback, 3 step processing callback
    // 4 step adding to output...

    //even steps will pass control to callback funtion to process input ele
    if (stepNumber % 2 === 0) {
      setStateObj.setCurIdx((idx) => ++idx);
    }
    //odd steps will send control to adding transformed ele to output
    else if (stepNumber % 2 !== 0) {
      if (stateObj.nums[stateObj.curIdx]) {
        let copy = [...stateObj.outputArray];
        copy.push(doubleNumber(stateObj.nums[stateObj.curIdx]));
        setStateObj.setOutputArray(copy);
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
            {console.log("inputEl", inputEl)}
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
            {algoUnderWay ? (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h5
                  className="input"
                  ref={(ele) => {
                    if (!stateObj.inputCoords) {
                      let x = ele?.getBoundingClientRect().x;
                      let y = ele?.getBoundingClientRect().y;
                      if (x && y) {
                        setStateObj.setInputCoords({ x, y });
                      }
                    }
                  }}
                >
                  input :{" "}
                  {stateObj.nums[stateObj.curIdx]
                    ? stateObj.nums[stateObj.curIdx]
                    : "undefined"}
                </h5>
                <h5 className="output">
                  output :{" "}
                  {stateObj.nums[stateObj.curIdx]
                    ? doubleNumber(stateObj.nums[stateObj.curIdx])
                    : "undefined"}
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
                      console.log("ele", ele?.getBoundingClientRect().x);

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

        {algoUnderWay ? (
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
                    <p className={`${cls.num} pink lighten-3`}>{num}</p>
                  ) : (
                    <p className={cls.num}>{num}</p>
                  )}
                </li>
              );
            })}
            <li className={`${cls.arrBrkt} col s1 bracket`}>]</li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="overlay"
      >
        <Layer>
          {stateObj.curNumCoords.x ? (
            // <Circle
            //   radius={20}
            //   x={stateObj.curNumCoords.x}
            //   y={stateObj.curNumCoords.y}
            //   fill="green"
            // />
            //@ts-ignore

            <Line
              stroke="black"
              points={[
                stateObj.curNumCoords.x,
                stateObj.curNumCoords.y,
                stateObj.curNumCoords.x - 10,
                stateObj.curNumCoords.y - 50,
                stateObj.inputCoords.x - 10,
                stateObj.inputCoords.y + 50,
                stateObj.inputCoords.x,
                stateObj.inputCoords.y,
              ]}
              // points={[50, 60, 110, 50, 220, 50, 330, 40]}
              bezier
            />
          ) : // <Line
          //   stroke="black"
          //   points={[50, 50, 200, 50, 200, 200, 50, 200]}
          //   bezier
          // />
          // <Circle radius={20} x={10} y={10} />
          null}
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
