import React from "react";
enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
}
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
          {/* todo */}
          {/* <h5 className="valign-wrapper">number array choices</h5> */}
        </li>
        <li>
          <button
            onClick={() => {
              props.setType(inputTypeChoiceE.strings);
              props.resetting();
              props.setMainArray([
                "stream",
                "lake",
                "river",
                "creek",
                "canal",
                "beach",
                "ocean",
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
                "bunnies",
                "puppies",
                "kittens",
                "sloths",
                "otters",
                "pandas",
                "penguins",
                "owls",
              ]);
            }}
            className={`btn amber waves-effect`}
          >
            <span>cute baby animals</span>
          </button>{" "}
        </li>
        {/* <li>
          <button
            onClick={() => {
              props.resetting();
              props.setStrings(["😟", "😀", "😁", "😆", "😅"]);
            }}
            className={`btn amber waves-effect`}
          >
            <span>emoji</span>
          </button>{" "}
        </li> */}
      </ul>
    </div>
  );
};

export default StringInputs;
