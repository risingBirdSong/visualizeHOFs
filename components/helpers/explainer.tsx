import React from "react";

interface ExplainerI {
  explainer: boolean;
  setAnimInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const Explainer = (props: ExplainerI) =>
  props.explainer ? (
    <div
      className="explanation blue lighten-1 z-depth-2 "
      style={{ padding: "10px" }}
    >
      <h5 className="amber-text center-align">
        the .map method boils down to 3 basic steps
      </h5>
      <ul className="explainList row">
        <li>
          <button
            className="waves-effect purple lighten-2  btn tolowercase"
            onClick={() => {
              props.setAnimInput(true);
              setTimeout(() => {
                props.setAnimInput(false);
              }, 1000);
            }}
          >
            iterate input array
          </button>
        </li>
        <li>
          <button className="waves-effect purple btn tolowercase">
            call callback with each element
          </button>
        </li>
        <li>
          <button className="waves-effect purple darken-2 btn tolowercase">
            put the returned element into output array.
          </button>
        </li>
        <li></li>
      </ul>
    </div>
  ) : (
    //to keep TS happy
    <p>""</p>
  );

export default Explainer;
