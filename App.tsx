import * as React from "react";
import { useState } from "react";
import HOF from "./components/Hof";
import About from "./components/About";
import FurtherReading from "./components/FurtherRead";
import HowToUse from "./components/HowTo";
const App = () => {
  let [shown, setShown] = useState(<HOF hofType={"MAP"} />);
  let aboutAndHof = (
    <div>
      <About />
    </div>
  );
  return (
    <main className="container">
      <nav>
        <ul className="row z-depth-2">
          <li>
            <a
              onClick={() => {
                setShown(aboutAndHof);
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setShown(FurtherReading);
              }}
            >
              Further Reading
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setShown(HowToUse);
              }}
            >
              How to use{" "}
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setShown(<HOF hofType={"MAP"} />);
              }}
            >
              Map
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setShown(<HOF hofType={"FILTER"} />);
              }}
            >
              Filter
            </a>
          </li>
          {/* TODO someday */}
          {/* <li>
            <a>Reduce</a>
          </li> */}
        </ul>
      </nav>
      {shown}
    </main>
  );
};

export default App;
