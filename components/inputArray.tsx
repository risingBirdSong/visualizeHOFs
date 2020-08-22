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
  animTarget: string;
  fastRefToggler: boolean;
}
const InputArray = (props: inputArrayI) => {
  return (
    <ul
      className={`numArr valign-wrapper row pink lighten-4 center-align inputArrayNums z-depth-2 ${
        props.animTarget === "inputArrayAnim" ? "inputArrayAnim" : ""
      }`}
      style={{ borderRadius: "5px" }}
    >
      <div
        className="z-depth-1"
        style={{
          padding: "4px",
          borderRadius: "4px",
          alignSelf: "center",
          marginLeft: "2em",
        }}
      >
        <h5>
          <span className="blue-text text-darken-4">input</span> :{" "}
          <span className="pink-text text-accent-4"> number [ ]</span> ={" "}
        </h5>
      </div>
      <li className={"arrBrkt col s1 bracket"}>[</li>
      {props.nums.map((num, idx) => {
        let currentNumber = (
          <p
            ref={(ele) => {
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
        );
        return (
          <li className={"col s1"} key={idx}>
            {idx === props.curIdx && props.fastRefToggler ? (
              currentNumber
            ) : idx === props.curIdx && !props.fastRefToggler ? (
              currentNumber
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
