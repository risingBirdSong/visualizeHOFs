import React from "react";

const About = () => {
  return (
    <div>
      <h2 className="center-align amber" style={{ color: "whitesmoke" }}>
        let's visualize .map and .filter
      </h2>
      <div className="center-align">
        <span
          className="blue center-align amber-text"
          style={{ padding: "5px", borderRadius: "6px", fontSize: "25px" }}
        >
          .map
        </span>
        <p>
          transform each element of an input array and place the new value into
          an output array
        </p>
        <span
          className="blue center-align amber-text"
          style={{ padding: "5px", borderRadius: "6px", fontSize: "25px" }}
        >
          .filter
        </span>
        <p>
          the callback will either accept or reject elements from the input
          array according to a truth test. It'll place the accepted values into
          an output array.
        </p>
      </div>
      <h2 className="center-align" style={{ textDecoration: "underline" }}>
        credits
      </h2>
      <ul className="center-align">
        <li>
          <span
            style={{ fontSize: "25px", padding: "5px", borderRadius: "6px" }}
            className="purple amber-text"
          >
            Paul Ferguson
          </span>{" "}
          <p> for odds and ends help</p>
        </li>
        <li>
          <span
            style={{ fontSize: "25px", padding: "5px", borderRadius: "6px" }}
            className="purple amber-text"
          >
            {" "}
            Kate Raskauskas
          </span>{" "}
          <p>
            {" "}
            for a good idea about showing how the code looks like when called.
            for example let output = input.map(str {"=>"} str.toUpperCase())
          </p>{" "}
          <p>
            and for suggesting a better place to put the trash can, looks much
            nicer
          </p>
        </li>
        <li>
          <span
            style={{ fontSize: "25px", padding: "5px", borderRadius: "6px" }}
            className="purple amber-text"
          >
            {" "}
            Kit Fuderich
          </span>{" "}
          <p>
            {" "}
            for numerous ideas and helpful feedback along the process of making
            it.
          </p>{" "}
        </li>
      </ul>
    </div>
  );
};
export default About;
