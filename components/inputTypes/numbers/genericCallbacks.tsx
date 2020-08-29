import React from "react";

enum numberCallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
}
interface GenericsCallbacksI {
  updateNumberCallBacks: React.Dispatch<
    React.SetStateAction<numberCallbacksE | undefined>
  >;

  // setNums: React.Dispatch<React.SetStateAction<number[]>>;
  resetting: () => void;
}
const GenericCallbacks = (props: GenericsCallbacksI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateNumberCallBacks(numberCallbacksE.halve);
            }}
            className={`btn amber waves-effect`}
          >
            <span>halve number </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateNumberCallBacks(numberCallbacksE.double);
            }}
            className={`btn amber waves-effect`}
          >
            <span>double number </span>
          </button>{" "}
        </li>
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateNumberCallBacks(numberCallbacksE.triple);
            }}
            className={`btn amber waves-effect`}
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
            className={`btn amber waves-effect`}
          >
            <span>square number</span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default GenericCallbacks;
