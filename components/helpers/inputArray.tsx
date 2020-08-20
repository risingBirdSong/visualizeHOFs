import React from "react";

interface coordsI {
  x: number;
  y: number;
}
interface inputArrayI {
  animInput: boolean;
  curIdx: number;
  //TODO make generic
  nums: number[];
  curNumCoords: coordsI;
  setCurNumCoords: React.Dispatch<React.SetStateAction<coordsI>>;
}
const InputArray = (props: inputArrayI) => {
  return (
    <ul
      className={`numArr valign-wrapper row pink lighten-4 center-align inputArrayNums z-depth-2 ${
        props.animInput ? "inputArrayNumsAnimate" : ""
      }`}
    >
      <h5>inputArr : number[] </h5>
      <h5>=</h5>
      <li className={"arrBrkt col s1 bracket"}>[</li>
      {props.nums.map((num, idx) => {
        return (
          <li className={"col s1"} key={idx}>
            {idx === props.curIdx ? (
              <p
                ref={(ele) => {
                  //perhaps TODO later remove bang
                  let x = ele?.getBoundingClientRect().x;
                  let y = ele?.getBoundingClientRect().y;
                  if (x && y) {
                    if (x !== props.curNumCoords.x) {
                      props.setCurNumCoords({ x: x, y: y });
                    }
                  }
                }}
                className={`num pink lighten-3 z-depth-5`}
              >
                {num}
              </p>
            ) : (
              <p className={`num z-depth-3`}>{num}</p>
            )}
          </li>
        );
      })}
      <li className={`arrBrkt col s1 bracket`}>]</li>
    </ul>
  );
};

export default InputArray;
