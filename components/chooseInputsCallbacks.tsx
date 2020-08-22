import React from "react";
// import inputTypeChoiceE from "./Map"; doesnt import enum correctly, so redefine it
enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
  "emojis" = "emojis",
  "defualt" = "defualt",
}

interface ChooseInputsCallbacksI {
  setinputTypeChoice: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
}

const ChooseInputsCallbacks = (props: ChooseInputsCallbacksI) => {
  return (
    <ul className="row">
      <li>
        <button
          onClick={() => {
            props.setinputTypeChoice(inputTypeChoiceE.numbers);
          }}
          className={`waves-effect purple-text amber lighten-1 waves-light btn`}
        >
          <span>numbers</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            props.setinputTypeChoice(inputTypeChoiceE.strings);
          }}
          className={`waves-effect purple-text amber waves-light btn`}
        >
          strings
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            props.setinputTypeChoice(inputTypeChoiceE.emojis);
          }}
          className={`waves-effect purple-text amber darken-1 waves-light btn`}
        >
          emojis
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            props.setinputTypeChoice(inputTypeChoiceE.defualt);
          }}
          className={`waves-effect purple-text amber darken-1 waves-light btn`}
        >
          default
        </button>
      </li>
    </ul>
  );
};

export default ChooseInputsCallbacks;
