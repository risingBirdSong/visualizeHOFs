import * as React from "react";
import { useState } from "react";
import HOF from "./components/Hof";
const App = () => {
  let [shown, setShown] = useState(<HOF hofType={"MAP"} />);
  return (
    <main className="container">
      <nav>
        <ul className="row z-depth-2">
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Further Reading</a>
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
