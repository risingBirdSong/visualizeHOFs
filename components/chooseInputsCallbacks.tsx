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
  "isEven" = "isEven",
  "fourLetterWord" = "fourLetterWord",
}
interface ChooseInputsCallbacksI {
  setMainArray: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setinputTypeChoice: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
  setCurrentFunctionName: React.Dispatch<React.SetStateAction<string>>;
  resetting: () => void;
  setShowWriteCustomFunc: React.Dispatch<React.SetStateAction<boolean>>;
  hofType: "MAP" | "FILTER" | "REDUCE";
}

const ChooseInputsCallbacks = (props: ChooseInputsCallbacksI) => {
  return (
    <ul className="chooseinputs row">
      <li>
        <button
          onClick={() => {
            props.resetting();
            props.setMainArray([2, 4, 6, 8]);
            props.setinputTypeChoice(inputTypeChoiceE.numbers);
            props.hofType === "MAP"
              ? props.setCurrentFunctionName(CallbacksE.double)
              : props.hofType === "FILTER"
              ? props.setCurrentFunctionName(CallbacksE.isEven)
              : "";
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
            props.hofType === "MAP"
              ? props.setCurrentFunctionName(CallbacksE.toUpper)
              : props.hofType === "FILTER"
              ? props.setCurrentFunctionName(CallbacksE.fourLetterWord)
              : "";
            props.setMainArray([
              "gong",
              "guitar",
              "drum",
              "harp",
              "synth",
              "tuba",
              "flute",
              "banjo",
              "lute",
              "trumpet",
              "violin",
            ]);
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
            props.setShowWriteCustomFunc((prev) => !prev);
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
