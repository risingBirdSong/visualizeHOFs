import React from "react";
import { hofType } from "../../Hof";
enum CallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
  "toUpper" = "toUpper",
  "reverse" = "reverse",
  "emojiBeHappy" = "emojiBeHappy",
}
interface StringCallbacksI {
  updateCallBacks: React.Dispatch<React.SetStateAction<string>>;
  strMapCallBackContainer: ((str: number | string) => string)[];
  strFilterCallBackContainer: ((str: string) => boolean)[];
  typeHof: hofType;
  // setNums: React.Dispatch<React.SetStateAction<number[]>>;
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
        {/* @ts-ignore */}
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
        {/* <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateCallBacks(CallbacksE.toUpper);
            }}
            className={`btn amber waves-effect`}
          >
            <span>toUpper </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.resetting();
              props.updateCallBacks(CallbacksE.reverse);
            }}
            className={`btn amber waves-effect`}
          >
            <span>reverse </span>
          </button>{" "}
        </li> */}
      </ul>
    </div>
  );
};

export default StringCallbacks;
