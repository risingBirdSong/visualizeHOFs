import React from "react";

export interface coordsI {
  x: number;
  y: number;
}
type hofType = "MAP" | "FILTER" | "REDUCE";

enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
  "emojis" = "emojis",
}

interface OutputArrI {
  algoHasStarted: boolean;
  algoHasFinished: boolean;
  //todo make generic
  curIdx: number;
  outputArray: (number | string)[];
  curOutputNumCoords: coordsI;
  setCurOutputNumCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  inputTypeChoice: inputTypeChoiceE;
  algoWillReset: boolean;
  animTarget: string;
  fastRefToggler: boolean;
  typeHof: hofType;
}
const OutputArray = (props: OutputArrI) =>
  props.algoHasStarted && !props.algoHasFinished ? (
    <ul
      className={`numArr valign-wrapper row pink lighten-2 center-align array ${
        props.animTarget === "outputAnimate" ? "outputAnimate" : ""
      }`}
      style={{ borderRadius: "5px" }}
    >
      <div
        className="z-depth-1"
        style={{ borderRadius: "5px", marginLeft: "2em", padding: "4px" }}
      >
        <h5>
          <span className="blue-text text-darken-3">output :</span>{" "}
          <span>
            {props.inputTypeChoice === inputTypeChoiceE.numbers
              ? "number[ ]"
              : "string [ ]"}
          </span>{" "}
          =
        </h5>
      </div>
      <li className={`arrBrkt col s1 bracket`}>[</li>
      {props.outputArray.map((num, idx) => {
        console.log("num", num);

        let outputted = (
          <p
            className={`num amber lighten-1 z-depth-5`}
            ref={(ele) => {
              let x = ele?.getBoundingClientRect().x;
              let y = ele?.getBoundingClientRect().y;
              console.log("x ---- ", x);
              console.log("y ---- ", y);
              //yeah this only hits on map, not filter, why is that?
              // props.setCurOutputNumCoords({ x: x || 5, y: y || 5 });
              if (
                x &&
                y &&
                x !== props.curOutputNumCoords.x &&
                y !== props.curOutputNumCoords.y
              ) {
                props.setCurOutputNumCoords({ x, y });
              }
            }}
          >
            {num}
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
              <p className={`num amber lighten-4 z-depth-3`}>{num}</p>
            )}
          </li>
        );
      })}
      <li className={`arrBrkt col s1 bracket`}>]</li>
    </ul>
  ) : props.algoWillReset ? (
    <h5 className="center-align blue-text">
      algo complete! click restart to run again
    </h5>
  ) : (
    <h5 className="center-align blue-text">explanation</h5>
  );

export default OutputArray;
