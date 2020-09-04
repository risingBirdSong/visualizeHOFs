import React, { useEffect } from "react";
import { coordsI } from "./outputArray";
interface MapMainControlsI {
  takeStep: (restart: boolean) => void;
  algoHasStarted: boolean;
  algoHasFinished: boolean;
  algoWillReset: boolean;
  setExplainer: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInputsOptions: React.Dispatch<React.SetStateAction<boolean>>;
  hofType: "MAP" | "FILTER" | "REDUCE";
  setCurOutputNumCoords: React.Dispatch<React.SetStateAction<coordsI>>;
  setshowtutorialPanel: React.Dispatch<React.SetStateAction<boolean>>;
  showtutorialPanel: boolean;
}

const MainControls = (props: MapMainControlsI) => {
  return (
    <div
      className="row"
      style={{ justifyContent: "center", marginTop: -7, marginBottom: -18 }}
    >
      <ul className="row buttonul">
        <div style={{ display: "flex", flex: "row" }}>
          <li className="z-depth-3 stepper">
            <button
              onClick={() => {
                props.setShowInputsOptions(false);
                props.takeStep(props.algoHasFinished === true ? true : false);
                if (props.hofType === "FILTER") {
                  props.setCurOutputNumCoords({ x: 0, y: 0 });
                }
              }}
              className={`waves-effect waves-light stepper btn`}
            >
              <span>
                {!props.algoHasStarted && !props.algoHasFinished
                  ? "start"
                  : props.algoWillReset
                  ? "restart"
                  : "step"}
              </span>
            </button>
            {/* do we really want to be able to toggle explainer? */}
          </li>
          {/* <li className="z-depth-3">
          <button
          className={`waves-effect waves-light btn`}
          onClick={() => {
            props.setExplainer((past) => !past);
          }}
          >
          <span className={`${props.showAllButtons ? "showButton" : ""}`}>
          explain{" "}
          </span>
          </button>
        </li> */}
          <li className="z-depth-3">
            <button
              className={`waves-effect waves-light btn`}
              onClick={() => {
                props.setShowInputsOptions((prev) => !prev);
              }}
            >
              <span>swap inputs and callbacks</span>
            </button>
          </li>
          <li className="z-depth-3">
            <button
              onClick={() => {
                props.setshowtutorialPanel((state) => !state);
              }}
              className={`waves-effect waves-light btn`}
            >
              <span>tutorial (work in progress)</span>
            </button>
          </li>
        </div>
      </ul>
      {props.showtutorialPanel ? (
        <ul className="row buttonul">
          <li className="z-depth-3">
            <button className={`waves-effect waves-light btn`}>step</button>
          </li>
          <li className="z-depth-3">
            <button className={`waves-effect waves-light btn`}>update</button>
          </li>
          <li className="z-depth-3">
            <button className={`waves-effect waves-light btn`}>
              explainer
            </button>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export { MainControls as MapMainControls };