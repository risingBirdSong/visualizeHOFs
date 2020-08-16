import * as React from "react";
import { useState } from "react";

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
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [algoUnderWay, setAlgoUnderWay] = useState(false);
  const [stepNumber, setStepNumber] = useState(-1);
  const [curIdx, setCurIdx] = useState(-1);
  const [outputArray, setOutputArray] = useState([]);

  // state object's job is to keep our disparate state's better organized, easier to remember, good intellisense...
  const stateObj = {
    nums: nums,
    algoUnderWay: algoUnderWay,
    outputArray: outputArray,
    stepNumber: stepNumber,
    curIdx: curIdx,
  };

  // same as state object but for set state.
  const setStateObj = {
    setNums: setNums,
    setAlgoUnderWay: setAlgoUnderWay,
    setOutputArray: setOutputArray,
    setStepNumber: setStepNumber,
    setCurIdx: setCurIdx,
  };

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
    }
  };

  return (
    <div>
      <ul className="row ">
        <li>
          <button onClick={takeStep} className="waves-effect waves-light btn">
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

        <h5>
          const doubleNumber = (num: number) {"=>"} {"{"}{" "}
        </h5>
        <h5> return num * 2; </h5>
        <h5> {"};"} </h5>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h4>inputArray : number[]</h4>
      </div>
      <ul
        className={`${cls.numArr} valign-wrapper row pink lighten-4 center-align array`}
      >
        <li className={`${cls.arrBrkt} col s1 bracket`}>[</li>
        {stateObj.nums.map((num, idx) => {
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
      {algoUnderWay ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>output array </h4>
          <h3>{stateObj.curIdx}</h3>
        </div>
      ) : (
        ""
      )}
      {algoUnderWay ? outputArray : ""}
    </div>
  );
};

export default Map;
