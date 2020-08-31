import React from "react";
// import inputTypeChoiceE from "./Map"; doesnt import enum correctly, so redefine it
enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
}
enum CallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
  "toUpper" = "toUpper",
  "reverse" = "reverse",
  "emojiBeHappy" = "emojiBeHappy",
}
interface ChooseInputsCallbacksI {
  setMainArray: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setinputTypeChoice: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
  setCurrentFunctionName: React.Dispatch<
    React.SetStateAction<CallbacksE | undefined>
  >;
  resetting: () => void;
  setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChooseInputsCallbacks = (props: ChooseInputsCallbacksI) => {
  return (
    <ul className="chooseinputs row">
      <li>
        <button
          onClick={() => {
            props.resetting();
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
            props.resetting();
            props.setCurrentFunctionName(CallbacksE.toUpper);
            props.setMainArray(["guitar", "drum", "synth", "tuba", "flute"]);
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
            props.resetting();
            props.setinputTypeChoice(inputTypeChoiceE.strings);
            props.setCurrentFunctionName(CallbacksE.emojiBeHappy);
            props.setMainArray(["😔", "🙁", "😣", "😫", "😭", "😡", "👿"]);
          }}
          className={`waves-effect purple-text amber darken-1 waves-light btn`}
        >
          emoji
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            props.setShowTextArea((prev) => !prev);
          }}
          className={`waves-effect purple-text amber darken-1 waves-light btn`}
        >
          write your own
        </button>
      </li>
    </ul>
  );
};

export default ChooseInputsCallbacks;
