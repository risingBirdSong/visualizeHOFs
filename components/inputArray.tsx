import React from "react";
import { emojiArr } from "./Hof";

interface coordsI {
  x: number;
  y: number;
}

enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
  "emojis" = "emojis",
}

interface inputArrayI {
  animInput: boolean;
  curIdx: number;
  //TODO make generic
  mainArray: (number | string)[];
  curNumCoords: coordsI;
  setCurNumCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  animTarget: string;
  fastRefToggler: boolean;
  inputTypeChoice: inputTypeChoiceE;
}
const InputArray = (props: inputArrayI) => {
  return (
    <ul
      className={`numArr segment valign-wrapper row pink lighten-4 center-align inputArrayNums z-depth-2 ${
        props.animTarget === "inputArrayAnim" ? "inputArrayAnim" : ""
      }`}
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
          <span>
            {props.inputTypeChoice === inputTypeChoiceE.numbers
              ? "number [ ]"
              : "string [ ]"}{" "}
          </span>{" "}
          ={" "}
        </h5>
      </div>
      <li className={"arrBrkt col s1 bracket"}>[</li>
      {props.inputTypeChoice === inputTypeChoiceE.numbers ||
      props.inputTypeChoice === inputTypeChoiceE.strings
        ? props.mainArray.map((val, idx) => {
            // is emoji?
            // console.log("emoji includes?", emojiArr.includes(val));

            let currentVal = (
              <p
                //@ts-ignore
                style={{ fontSize: `${emojiArr.includes(val) ? "25px" : ""}` }}
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
                {val}
              </p>
            );
            return (
              <li className={"col s1"} key={idx}>
                {idx === props.curIdx && props.fastRefToggler ? (
                  currentVal
                ) : idx === props.curIdx && !props.fastRefToggler ? (
                  currentVal
                ) : (
                  <p
                    style={{
                      //@ts-ignore
                      fontSize: `${emojiArr.includes(val) ? "25px" : ""}`,
                    }}
                    className={`num z-depth-3`}
                  >
                    {val}
                  </p>
                )}
              </li>
            );
          })
        : ""}

      <li className={`arrBrkt col s1 bracket`}>]</li>
    </ul>
  );
};

export default InputArray;
