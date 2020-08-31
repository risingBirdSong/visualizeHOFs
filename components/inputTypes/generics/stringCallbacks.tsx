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
interface StringCallbacksI {
  updateCallBacks: React.Dispatch<React.SetStateAction<CallbacksE | undefined>>;

  // setNums: React.Dispatch<React.SetStateAction<number[]>>;
  resetting: () => void;
}
const StringCallbacks = (props: StringCallbacksI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateCallBacks(CallbacksE.toUpper);
            }}
            className={`btn amber waves-effect`}
          >
            <span>toUpper </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateCallBacks(CallbacksE.reverse);
            }}
            className={`btn amber waves-effect`}
          >
            <span>reverse </span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default StringCallbacks;
