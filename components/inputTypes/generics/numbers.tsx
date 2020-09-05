import React, { useEffect } from "react";
import GenericsInputs from "./genericInputs";
import NumberCallbacks from "./numberCallbacks";
import StringCallbacks from "./stringCallbacks";
import { useState } from "react";
import { hofType, inputTypeChoiceE } from "../../Hof";

interface NumbersI {
  setMainArray: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  resetting: () => void;
  boolSwitch: boolean;
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  inputType: inputTypeChoiceE;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
  mapNumCallBackContainer: ((num: number | string) => number)[];
  filterNumCallBackContainer: ((num: number) => boolean)[];
  hof: hofType;
}
const Numbers = (props: NumbersI) => {
  const [showArrays, setShowArrays] = useState(false);
  const [showCallbacks, setShowCallbacks] = useState(false);
  return (
    <div>
      <div>
        <ul className="row">
          <li>
            <button
              onClick={() => {
                setShowArrays((prev) => !prev);
                setShowCallbacks(false);
              }}
              className={`btn waves-effect`}
            >
              number arrays
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowCallbacks((prev) => !prev);
                setShowArrays(false);
              }}
              className={`btn waves-effect`}
            >
              number callbacks
            </button>
          </li>
        </ul>
      </div>
      {showArrays ? <GenericsInputs {...props} /> : ""}
      {showCallbacks &&
      props.inputType === inputTypeChoiceE.numbers &&
      props.hof === "MAP" ? (
        <NumberCallbacks
          callBackContainer={props.mapNumCallBackContainer}
          {...props}
        />
      ) : showCallbacks &&
        props.inputType === inputTypeChoiceE.numbers &&
        props.hof === "FILTER" ? (
        <NumberCallbacks
          callBackContainer={props.filterNumCallBackContainer}
          {...props}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Numbers;
