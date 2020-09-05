import React from "react";
import { inputTypeChoiceE } from "../../Hof";
interface GenericsInputsI {
  setMainArray: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;

  resetting: () => void;
}
const GenericsInputs = (props: GenericsInputsI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        <li>
          <button
            onClick={() => {
              props.setMainArray([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
              props.setType(inputTypeChoiceE.numbers);
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
              props.setMainArray([
                1,
                1,
                2,
                3,
                5,
                8,
                13,
                21,
                34,
                55,
                89,
                144,
                233,
              ]);
              props.setType(inputTypeChoiceE.numbers);
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
              props.setType(inputTypeChoiceE.numbers);

              props.setMainArray(numbers);
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

export default GenericsInputs;
