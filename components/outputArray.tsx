import React from "react";
import { coordsI, hofType, inputTypeChoiceE, emojiArr } from "./Hof";

interface OutputArrI {
  algoHasStarted: boolean;
  algoHasFinished: boolean;
  curIdx: number;
  outputArray: (number | string)[];
  curOutputNumCoords: coordsI;
  setCurOutputNumCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  inputTypeChoice: inputTypeChoiceE;
  algoWillReset: boolean;
  animTarget: string;
  fastRefToggler: boolean;
  typeHof: hofType;
  curTrashCoords: coordsI;
  setCurTrashCoords: React.Dispatch<React.SetStateAction<coordsI>>;
}
const OutputArray = (props: OutputArrI) => {
  let trashCan = (
    <div style={{ marginLeft: "-1.5em", marginRight: ".5em" }}>
      <h5
        className={`${
          props.animTarget === "trashCanAnimate" ? "trashCanAnimate" : ""
        }`}
      >
        trash can
        <span
          ref={(ele) => {
            let trashX = ele?.getBoundingClientRect().x;
            let trashY = ele?.getBoundingClientRect().y;
            if (trashX && trashY) {
              if (
                props.curTrashCoords.x !== trashX &&
                props.curTrashCoords.y !== trashY
              ) {
                props.setCurTrashCoords({ x: trashX, y: trashY });
              }
            }
          }}
        >
          🗑️
        </span>
      </h5>
    </div>
  );
  return props.algoHasStarted && !props.algoHasFinished ? (
    <ul
      className={`${
        props.typeHof === "MAP" ? "numArr" : "filterOutputArr"
      } segment valign-wrapper row pink lighten-2 center-align ${
        props.animTarget === "outputAnimate" ? "outputAnimate" : ""
      }`}
    >
      <div
        className="z-depth-1"
        style={{
          borderRadius: "5px",
          padding: "4px",
          alignSelf: "center",
          marginLeft: "1em",
        }}
      >
        <h6>
          <span className="blue-text text-darken-3">output :</span>{" "}
          <span>
            {props.inputTypeChoice === inputTypeChoiceE.numbers
              ? "number[ ]"
              : "string [ ]"}
          </span>{" "}
          =
        </h6>
      </div>
      <li className={`arrBrkt col s1 bracket`}>[</li>
      {props.outputArray.map((val, idx) => {
        let outputted = (
          <p
            style={{
              //@ts-ignore
              fontSize: `${emojiArr.includes(val) ? "25px" : ""}`,
            }}
            className={`num amber lighten-1 z-depth-5`}
            ref={(ele) => {
              let x = ele?.getBoundingClientRect().x;
              let y = ele?.getBoundingClientRect().y;

              if (props.typeHof === "MAP") {
                if (x && y && x !== props.curOutputNumCoords.x) {
                  props.setCurOutputNumCoords({ x, y });
                }
              } else if (props.typeHof === "FILTER") {
                if (
                  props.curOutputNumCoords.x === 0 &&
                  props.curOutputNumCoords.y === 0 &&
                  x &&
                  y
                ) {
                  props.setCurOutputNumCoords({ x, y });
                }
              }
            }}
          >
            {val}
          </p>
        );
        if (props.typeHof === "FILTER") {
          return (
            <li className={"col s1"} key={idx}>
              {outputted}
            </li>
          );
        }
        return (
          <li className={"col s1"} key={idx}>
            {idx === props.curIdx && props.fastRefToggler ? (
              outputted
            ) : idx === props.curIdx && !props.fastRefToggler ? (
              outputted
            ) : (
              <p
                style={{
                  fontSize: `${
                    //@ts-ignore
                    emojiArr.includes(val) ? "25px" : ""
                  }`,
                }}
                className={`num amber lighten-4 z-depth-3`}
              >
                {val}
              </p>
            )}
          </li>
        );
      })}
      <li className={`arrBrkt col s1 bracket`}>]</li>

      {props.typeHof === "FILTER" && props.fastRefToggler
        ? trashCan
        : props.typeHof === "FILTER" && !props.fastRefToggler
        ? trashCan
        : ""}
    </ul>
  ) : props.algoWillReset ? (
    <h5 className="center-align blue-text">
      {props.typeHof === "MAP" ? "Mapping" : "Filtering"} complete! click
      restart to run again
    </h5>
  ) : (
    <h5 className="center-align blue-text">explanation</h5>
  );
};

export default OutputArray;
