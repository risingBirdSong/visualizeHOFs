import React from "react";

const About = () => {
  return (
    <div>
      <h2 className="center-align">let's visualize .map and .filter</h2>
      <div className="center-align">
        <h5>map</h5>
        <p>
          transform each element of an input array and place the new value into
          an output array
        </p>
        <h5>filter</h5>
        <p>
          the callback will either accept or reject elements from the input
          array according to a truth test. It'll place the accepted values into
          an output array.
        </p>
      </div>
      <h2 className="center-align">credits</h2>
      <ul className="center-align">
        <li>
          <span style={{ fontSize: "25px", color: "darkblue" }}>
            Paul Ferguson
          </span>{" "}
          <p> for odds and ends help</p>
        </li>
        <li>
          <span style={{ fontSize: "25px", color: "darkblue" }}>
            {" "}
            Kate Raskauskas
          </span>{" "}
          <p>
            {" "}
            for a good idea about showing how the code looks like when called.
            for example let output = input.map(str {"=>"} str.toUpperCase())
          </p>{" "}
          <br />
          <p>
            and for suggesting a better place to put the trash can, looks much
            nicer
          </p>
        </li>
      </ul>
    </div>
  );
};
export default About;
