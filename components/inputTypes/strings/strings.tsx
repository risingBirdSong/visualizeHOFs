import React, { useEffect } from "react";
import { useState } from "react";
import StringInputs from "./stringArrays";

// enum numberCallbacksE {
//   "double" = "double",
//   "halve" = "halve",
//   "square" = "square",
//   "triple" = "triple",
// }
interface StringsI {
  setStrings: React.Dispatch<React.SetStateAction<string[]>>;
  resetting: () => void;
  boolSwitch: boolean;
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
              Arrays
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
              Callbacks
            </button>
            {/* <NumberCallbacks /> */}
          </li>
        </ul>
      </div>
      {showArrays ? <StringInputs {...props} /> : ""}
      {/* {showCallbacks ? <StringCallbacks {...props} /> : ""} */}
    </div>
  );
};

export default Strings;
