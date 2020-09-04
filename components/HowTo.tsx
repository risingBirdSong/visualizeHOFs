import React from "react";

const HowToUse = () => {
  return (
    <div>
      <ul className="center-align">
        <li>
          <h2 className="center-align">step / restart button</h2>
          <p>
            the main button that will iterate the array and process each element
            with the callback function
          </p>
        </li>
        <li>
          <h2>swap inputs and callbacks button</h2>
          <p>
            try out different input arrays and callback functions. Works with
            numbers, strings and emojis. The callbacks are simple little
            functions just to help demonstrate the concepts with different
            examples.
          </p>
        </li>
        <li>
          <h2>more buttons</h2>
          <p>
            the buttons in the blue area will wiggle the corresponding section
            that they describe
          </p>
        </li>
      </ul>
    </div>
  );
};
export default HowToUse;
