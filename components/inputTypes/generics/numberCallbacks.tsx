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
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  callBackContainer: Function[];
  // setNums: React.Dispatch<React.SetStateAction<number[]>>;
  resetting: () => void;
}
const NumberCallbacks = (props: GenericsCallbacksI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        {props.callBackContainer.map((func, idx) => {
          return (
            <li>
              <button
                onClick={() => {
                  props.resetting();
                  props.updateCallBacks(func.name);
                }}
                className={`btn amber waves-effect`}
              >
                <span>{func.name} </span>
              </button>
            </li>
          );
        })}
        {/* <li>
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
        </li> */}
      </ul>
    </div>
  );
};

export default NumberCallbacks;
