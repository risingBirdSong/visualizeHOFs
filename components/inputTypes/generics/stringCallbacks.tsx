import React from "react";
import { hofType } from "../../Hof";

interface StringCallbacksI {
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  strMapCallBackContainer: ((str: number | string) => string)[];
  strFilterCallBackContainer: ((str: string) => boolean)[];
  typeHof: hofType;
  resetting: () => void;
}
const StringCallbacks = (props: StringCallbacksI) => {
  let stringCallbacks =
    props.typeHof === "MAP"
      ? props.strMapCallBackContainer
      : (props.strFilterCallBackContainer as Function[]);
  return (
    <div>
      <ul className="numberArrayChoices row">
        {/* TODO why this TS error why I cant map over this? either case is an array... */}
        {/* Hmmm seems to work now */}

        {stringCallbacks.map((strFunc) => {
          return (
            <li>
              <button
                onClick={() => {
                  props.resetting();
                  props.updateCallBacks(strFunc.name);
                }}
                className={`btn amber waves-effect`}
              >
                <span>{strFunc.name} </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StringCallbacks;
