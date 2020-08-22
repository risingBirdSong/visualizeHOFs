import React, { useEffect } from "react";
interface MapMainControlsI {
  takeStep: (restart: boolean) => void;
  algoHasStarted: boolean;
  algoHasFinished: boolean;
  algoWillReset: boolean;
  setExplainer: React.Dispatch<React.SetStateAction<boolean>>;
  setshowAllButtons: React.Dispatch<React.SetStateAction<boolean>>;
  showAllButtons: boolean;
  setShowInputsOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapMainControls = (props: MapMainControlsI) => {
  return (
    <ul className="row">
      <div style={{ display: "flex", flex: "row" }}>
        <li className="z-depth-3">
          <button
            onClick={() => {
              props.setshowAllButtons(true);
              setTimeout(() => {
                props.setshowAllButtons(false);
              }, 2000);
            }}
            className="waves-effect waves-light btn"
          >
            <span className={`showButton`}>show all buttons</span>
          </button>
        </li>
        <li className="z-depth-3">
          <button
            onClick={() => {
              props.takeStep(props.algoHasFinished === true ? true : false);
            }}
            className={`waves-effect waves-light btn`}
          >
            <span className={`${props.showAllButtons ? "showButton" : ""}`}>
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
            <span className={` ${props.showAllButtons ? "showButton" : ""}`}>
              swap inputs + callbacks
            </span>
          </button>
        </li>
      </div>
    </ul>
  );
};

export { MapMainControls };
