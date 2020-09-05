import React, { useEffect } from "react";
import { useState } from "react";
import StringInputs from "../strings/stringInputs";
import StringCallbacks from "./stringCallbacks";
import { hofType, inputTypeChoiceE } from "../../Hof";

interface StringsI {
  setMainArray: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  strMapCallBackContainer: ((str: number | string) => string)[];
  strFilterCallBackContainer: ((str: string) => boolean)[];
  resetting: () => void;
  typeHof: hofType;
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
          </li>
        </ul>
      </div>
      {showArrays ? <StringInputs {...props} /> : ""}
      {showCallbacks ? <StringCallbacks {...props} /> : ""}
    </div>
  );
};

export default Strings;
