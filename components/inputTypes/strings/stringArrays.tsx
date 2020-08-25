import React from "react";
interface StringArraysI {
  setStrings: React.Dispatch<React.SetStateAction<string[]>>;
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
              props.setStrings([
                "stream, lake, river, creek, canal, beach, ocean, waterfall",
              ]);
              props.resetting();
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
              props.setStrings([
                "bunnies, puppies, kittens, sloths, otters, pandas, penguins, owls",
              ]);
            }}
            className={`btn amber waves-effect`}
          >
            <span>cute baby animals</span>
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default StringInputs;
