import React from "react";
import { inputTypeChoiceE } from "../../Hof";

interface StringArraysI {
  setMainArray: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setType: React.Dispatch<React.SetStateAction<inputTypeChoiceE>>;
  resetting: () => void;
}
const StringInputs = (props: StringArraysI) => {
  return (
    <div>
      <ul className="stringArrayChoices row">
        <li>
          <button
            onClick={() => {
              props.setType(inputTypeChoiceE.strings);
              props.resetting();
              props.setMainArray([
                "bend",
                "stream",
                "lake",
                "river",
                "cove",
                "creek",
                "canal",
                "loch",
                "beach",
                "ocean",
                "moat",
                "waterfall",
              ]);
            }}
            className={`btn amber waves-effect`}
          >
            <span>bodies of water</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.setMainArray([
                "bunny",
                "wombat",
                "bear",
                "anteater",
                "lamb",
                "kitten",
                "foal",
                "sloth",
                "boar",
                "otter",
                "panda",
                "goat",
                "penguin",
                "owl",
              ]);
            }}
            className={`btn amber waves-effect`}
          >
            <span>cute animals</span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default StringInputs;
