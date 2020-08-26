import React from "react";

enum stringCallbacksE {
  "toUpper" = "toUpper",
  "reverse" = "reverse",
  "emojiBeHappy" = "emojiBeHappy",
}
interface StringCallbacksI {
  updateStringCallBacks: React.Dispatch<
    React.SetStateAction<stringCallbacksE | undefined>
  >;

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
              props.updateStringCallBacks(stringCallbacksE.toUpper);
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
              props.updateStringCallBacks(stringCallbacksE.reverse);
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
