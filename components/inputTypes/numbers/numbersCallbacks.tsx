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
          <span>Callback todo</span>
        </li>
        <li>
          <button className={`btn waves-effect`}>
            <span>todo 1 </span>
          </button>
        </li>
        <li>
          <button className={`btn waves-effect`}>
            <span>todo 2 </span>
          </button>{" "}
        </li>
        <li>
          {" "}
          <button className={`btn waves-effect`}>
            <span>todo 3</span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NumberCallbacks;
