import React from "react";

interface ExplainerI {
  explainer: boolean;
  setAnimInput: React.Dispatch<React.SetStateAction<boolean>>;
  showAllButtons: boolean;
  setAnimTarget: React.Dispatch<React.SetStateAction<string>>;
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
      <ul className={`explainList row`}>
        <div style={{ display: "flex" }}>
          <li>
            <button
              className={`waves-effect purple lighten-2  btn tolowercase`}
              onClick={() => {
                props.setAnimInput(true);
                props.setAnimTarget("inputArrayAnim");
                setTimeout(() => {
                  props.setAnimInput(false);
                  props.setAnimTarget("");
                }, 1000);
              }}
            >
              <span className={` ${props.showAllButtons ? "showButton" : ""}`}>
                iterate input array
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                props.setAnimInput(true);
                props.setAnimTarget("callBackAnimate");
                setTimeout(() => {
                  props.setAnimInput(false);

                  props.setAnimTarget("");
                }, 1000);
              }}
              className={`waves-effect purple lighten-2  btn tolowercase`}
            >
              <span className={` ${props.showAllButtons ? "showButton" : ""}`}>
                call callback with each element
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                props.setAnimInput(true);

                props.setAnimTarget("outputAnimate");
                setTimeout(() => {
                  props.setAnimInput(false);

                  props.setAnimTarget("");
                }, 1000);
              }}
              className="waves-effect purple lighten-2 btn tolowercase"
            >
              <span className={` ${props.showAllButtons ? "showButton" : ""}`}>
                put the returned element into output array.
              </span>
            </button>
          </li>
        </div>
      </ul>
    </div>
  ) : (
    //to keep TS happy
    <p>""</p>
  );

export default Explainer;
