import React, { useEffect } from "react";
import { useState } from "react";
import StringInputs from "../strings/stringInputs";
import StringCallbacks from "./stringCallbacks";
import { hofType } from "../../Hof";

// enum numberCallbacksE {
//   "double" = "double",
//   "halve" = "halve",
//   "square" = "square",
//   "triple" = "triple",
// }

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
interface StringsI {
  setMainArray: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  strMapCallBackContainer: ((str: number | string) => string)[];
  strFilterCallBackContainer: ((str: string) => boolean)[];
  resetting: () => void;
  typeHof: hofType;
  // boolSwitch: boolean;
  // updateNumberCallBacks: React.Dispatch<React.SetStateAction<numberCallbacksE>>;
}
const Strings = (props: StringsI) => {
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
              string arrays
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
              string callbacks
            </button>
            {/* <NumberCallbacks /> */}
          </li>
        </ul>
      </div>
      {showArrays ? <StringInputs {...props} /> : ""}
      {showCallbacks ? <StringCallbacks {...props} /> : ""}
    </div>
  );
};

export default Strings;
