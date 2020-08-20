import React from "react";
interface MapMainControlsI {
  takeStep: (restart: boolean) => void;
  algoHasStarted: boolean;
  algoHasFinished: boolean;
  algoWillReset: boolean;
  setExplainer: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapMainControls = (props: MapMainControlsI) => {
  return (
    <ul className="row">
      <li className="z-depth-3">
        <button
          onClick={() => {
            props.takeStep(props.algoHasFinished === true ? true : false);
          }}
          className="waves-effect waves-light btn"
        >
          {!props.algoHasStarted && !props.algoHasFinished
            ? "start"
            : props.algoWillReset
            ? "restart"
            : "step"}
        </button>
      </li>
      {/* do we really want to be able to toggle explainer? */}
      <li className="z-depth-3">
        <button
          className="waves-effect waves-light btn"
          onClick={() => {
            props.setExplainer((past) => !past);
          }}
        >
          explain{" "}
        </button>
      </li>
      <li className="z-depth-3">
        <button className="waves-effect waves-light btn">todo 2</button>
      </li>
    </ul>
  );
};

export { MapMainControls };
