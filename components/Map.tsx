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
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h4>callback function</h4>
      </div>
      <div
        style={{ padding: "5px", marginTop: "5px" }}
        className={`${cls.callbackFunc}  purple lighten-3`}
      >
        <h5>
          const doubleNumber = (num: number) {"=>"} {"{"}{" "}
        </h5>
        <h5> return num * 2; </h5>
        <h5> {"};"} </h5>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>inputArray : number[]</h3>
      </div>
      <ul className={`${cls.numArr} valign-wrapper row pink lighten-4 center-align array`}>
        <li className={`${cls.arrBrkt} col s1 bracket`}>[</li>
        {nums.map((num, idx) => {
          return (
            <li className={"col s1"} key={idx}>
              <p className={cls.num}>{num}</p>
            </li>
          );
        })}
        <li className={`${cls.arrBrkt} col s1 bracket`}>]</li>
      </ul>
    </div>
  );
};

export default Map;
