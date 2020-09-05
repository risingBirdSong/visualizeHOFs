import React from "react";

interface GenericsCallbacksI {
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  callBackContainer: Function[];
  resetting: () => void;
}
const NumberCallbacks = (props: GenericsCallbacksI) => {
  return (
    <div>
      <ul className="numberArrayChoices row">
        {props.callBackContainer.map((func, idx) => {
          return (
            <li>
              <button
                onClick={() => {
                  props.resetting();
                  props.updateCallBacks(func.name);
                }}
                className={`btn amber waves-effect`}
              >
                <span>{func.name} </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NumberCallbacks;
