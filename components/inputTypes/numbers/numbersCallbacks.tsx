import React from "react";
interface NumbersCallbacksI {
  // setNums: React.Dispatch<React.SetStateAction<number[]>>;
  // resetting: () => void;
}
const NumberCallbacks = (props: NumbersCallbacksI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        <li>
          <span>Select a different callback</span>
        </li>
        <li>
          <button className={`btn waves-effect`}>
            <span>halve number </span>
          </button>
        </li>
        <li>
          <button className={`btn waves-effect`}>
            <span>triple number </span>
          </button>{" "}
        </li>
        <li>
          {" "}
          <button className={`btn waves-effect`}>
            <span>square number</span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NumberCallbacks;
