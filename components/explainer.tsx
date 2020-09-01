import React from "react";
type HofType = "MAP" | "FILTER" | "REDUCE";

interface ExplainerI {
  explainer: boolean;
  setAnimInput: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimTarget: React.Dispatch<React.SetStateAction<string>>;
  setfastRefToggler: React.Dispatch<React.SetStateAction<boolean>>;
  hof: HofType;
}

const Explainer = (props: ExplainerI) => {
  const fastToggler = () => {
    let counter = 100;
    const recurse = () => {
      if (counter > 0) {
        counter--;
        props.setfastRefToggler((prev) => !prev);
        setTimeout(() => {
          recurse();
        }, 1);
      }
    };
    recurse();
  };
  return props.explainer ? (
    <div
      className="explanation blue lighten-1 z-depth-2 "
      style={{ padding: "10px", marginBottom: "15px", borderRadius: "5px" }}
    >
      <h5 className="amber-text center-align">
        the {props.hof === "MAP" ? ".map" : ".filter"} method boils down to 3
        basic steps
      </h5>
      <ul className={`explainList row`}>
        <div style={{ display: "flex" }}>
          <li>
            <button
              className={`waves-effect purple lighten-2  btn tolowercase`}
              onClick={() => {
                fastToggler();
                props.setAnimInput(true);
                props.setAnimTarget("inputArrayAnim");
                setTimeout(() => {
                  props.setAnimInput(false);
                  props.setAnimTarget("");
                }, 2000);
              }}
            >
              <span>iterate input array</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                fastToggler();

                props.setAnimInput(true);
                props.setAnimTarget("callBackAnimate");
                setTimeout(() => {
                  props.setAnimInput(false);

                  props.setAnimTarget("");
                }, 2000);
              }}
              className={`waves-effect purple lighten-2  btn tolowercase`}
            >
              <span>call callback with each element</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                fastToggler();

                props.setAnimInput(true);

                props.setAnimTarget("outputAnimate");
                setTimeout(() => {
                  props.setAnimInput(false);

                  props.setAnimTarget("");
                }, 2000);
              }}
              className="waves-effect purple lighten-2 btn tolowercase"
            >
              <span>put the returned element into output array.</span>
            </button>
          </li>
        </div>
      </ul>
    </div>
  ) : (
    //to keep TS happy
    <p>""</p>
  );
};

export default Explainer;
