import React from "react";

enum CallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
  "toUpper" = "toUpper",
  "reverse" = "reverse",
  "emojiBeHappy" = "emojiBeHappy",
}
interface GenericsCallbacksI {
  updateCallBacks: React.Dispatch<React.SetStateAction<CallbacksE | undefined>>;

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
              props.updateCallBacks(CallbacksE.halve);
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
              props.updateCallBacks(CallbacksE.double);
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
              props.updateCallBacks(CallbacksE.triple);
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
              props.updateCallBacks(CallbacksE.square);
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
