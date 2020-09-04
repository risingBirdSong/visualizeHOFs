import React from "react";
import { CallbacksE } from "./Hof";
interface lookslikeI {
  hofType: "MAP" | "FILTER" | "REDUCE";
  func: string;
}
const LooksLike = (props: lookslikeI) => {
  return (
    <div
      className="purple segment lighten-3 valign-wrapper center-align z-depth-3"
      style={{ justifyContent: "center" }}
    >
      <h5>
        <span className="amber-text">let </span>
        <span className="blue-text text-accent-4">output </span>
        <span style={{ color: "whitesmoke" }}>= </span>
        <span className="blue-text text-accent-4">input</span>
        <span style={{ color: "whitesmoke" }}>.</span>
        <span className="amber-text">{`${props.hofType.toLocaleLowerCase()}`}</span>
        <span>(</span>
        <span className={"blue-text text-accent-2"}>{props.func}</span>
        <span>)</span>
      </h5>
    </div>
  );
};

export default LooksLike;
