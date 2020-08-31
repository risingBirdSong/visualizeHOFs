import React, { useEffect } from "react";
import GenericsInputs from "./genericInputs";
import GenericCallbacks from "./genericCallbacks";
import { useState } from "react";

enum CallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
  "toUpper" = "toUpper",
  "reverse" = "reverse",
  "emojiBeHappy" = "emojiBeHappy",
}
enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
}
interface NumbersI {
  setMainArray: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  resetting: () => void;
  boolSwitch: boolean;
  updateCallBacks: React.Dispatch<
    React.SetStateAction<CallbacksE | undefined>
  >;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
}
const Generics = (props: NumbersI) => {
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
      {showArrays ? <GenericsInputs {...props} /> : ""}
      {showCallbacks ? <GenericCallbacks {...props} /> : ""}
    </div>
  );
};

export default Generics;