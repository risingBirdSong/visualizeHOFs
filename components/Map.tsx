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
  const [outputArray, setOutputArray] = useState([]);

  const stateObj = {
    nums: nums,
    algoUnderWay: algoUnderWay,
    outputArray: outputArray,
    stepNumber: stepNumber,
  };

  const setStateObj = {
    setNums: setNums,
    setAlgoUnderWay: setAlgoUnderWay,
    setOutputArray: setOutputArray,
    setStepNumber: setStepNumber,
  };

  const takeStep = () => {
    setStateObj.setAlgoUnderWay(true);
    setStateObj.setStepNumber((val) => ++val);
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
              <p className={cls.num}>{num}</p>
            </li>
          );
        })}
        <li className={`${cls.arrBrkt} col s1 bracket`}>]</li>
      </ul>
      {algoUnderWay ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>output array </h4>
          <h3>{stepNumber}</h3>
        </div>
      ) : (
        ""
      )}
      {algoUnderWay ? outputArray : ""}
    </div>
  );
};

export default Map;
