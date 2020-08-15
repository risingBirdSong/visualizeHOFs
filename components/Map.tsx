import * as React from "react";
import { useState } from "react";

enum cls {
  numArr = "numArr",
  num = "num",
  arrBrkt = "arrBrkt",
}
const Map = () => {
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ display: "flex", justifySelf: "center" }}>num array</h3>
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
