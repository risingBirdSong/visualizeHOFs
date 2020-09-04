import React from "react";
import { CallbacksE } from "./Hof";
interface lookslikeI {
  hofType: "MAP" | "FILTER" | "REDUCE";
  func: string;
}
const LooksLike = (props: lookslikeI) => {
  return (
    <div
      className="purple lighten-3 valign-wrapper center-align z-depth-3"
      style={{ justifyContent: "center" }}
    >
      <p>
        {`let output = input.${props.hofType.toLocaleLowerCase()}(${
          props.func
        })`}
      </p>
    </div>
  );
};

export default LooksLike;
