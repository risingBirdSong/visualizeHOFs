import React from "react";
interface NumbersInputsI {
  setNums: React.Dispatch<React.SetStateAction<number[]>>;
  resetting: () => void;
}
const NumberInputs = (props: NumbersInputsI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        <li>
          {/* todo */}
          {/* <h5 className="valign-wrapper">number array choices</h5> */}
        </li>
        <li>
          <button
            onClick={() => {
              props.setNums([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
              props.resetting();
            }}
            className={`btn amber waves-effect`}
          >
            <span>square numbers</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.setNums([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]);
            }}
            className={`btn amber waves-effect`}
          >
            <span>fibonacci numbers</span>
          </button>{" "}
        </li>
        <li>
          {" "}
          <button
            onClick={() => {
              let numbers = [];
              for (let i = 0; i <= 10; i++) {
                numbers.push(Math.round(Math.random() * 100));
              }
              props.resetting();
              props.setNums(numbers);
            }}
            className={`btn amber waves-effect`}
          >
            <span>random numbers </span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NumberInputs;
