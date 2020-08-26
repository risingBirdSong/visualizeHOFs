import React, { useEffect } from "react";
import NumberInputs from "./numberInputs";
import NumberCallbacks from "./numberCallbacks";
import { useState } from "react";

enum numberCallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
}
enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
  "emojis" = "emojis",
}
interface NumbersI {
  setNums: React.Dispatch<React.SetStateAction<number[]>>;
  resetting: () => void;
  boolSwitch: boolean;
  updateNumberCallBacks: React.Dispatch<
    React.SetStateAction<numberCallbacksE | undefined>
  >;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
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
            {/* <NumberCallbacks /> */}
          </li>
        </ul>
      </div>
      {showArrays ? <NumberInputs {...props} /> : ""}
      {showCallbacks ? <NumberCallbacks {...props} /> : ""}
    </div>
  );
};

export default Numbers;
