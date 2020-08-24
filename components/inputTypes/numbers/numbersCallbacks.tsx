import React from "react";

enum numberCallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
}
interface NumbersCallbacksI {
  updateNumberCallBacks: React.Dispatch<React.SetStateAction<numberCallbacksE>>;

  // setNums: React.Dispatch<React.SetStateAction<number[]>>;
  // resetting: () => void;
}
const NumberCallbacks = (props: NumbersCallbacksI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        <li>
          <button
            onClick={() => {
              props.updateNumberCallBacks(numberCallbacksE.halve);
            }}
            className={`btn waves-effect`}
          >
            <span>halve number </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.updateNumberCallBacks(numberCallbacksE.double);
            }}
            className={`btn waves-effect`}
          >
            <span>double number </span>
          </button>{" "}
        </li>
        <li>
          <button
            onClick={() => {
              props.updateNumberCallBacks(numberCallbacksE.triple);
            }}
            className={`btn waves-effect`}
          >
            <span>triple number </span>
          </button>{" "}
        </li>
        <li>
          {" "}
          <button
            onClick={() => {
              props.updateNumberCallBacks(numberCallbacksE.square);
            }}
            className={`btn waves-effect`}
          >
            <span>square number</span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NumberCallbacks;
