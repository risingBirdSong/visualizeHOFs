import * as React from "react";
import Map from "./components/Map";
const App = () => {
  return (
    <main className="container">
      <nav>
        <ul className="row">
          <li>
            <a>about</a>
          </li>
          <li>
            <a>further reading</a>
          </li>
          <li>
            <a>map</a>
          </li>
          <li>
            <a>filter</a>
          </li>
          <li>
            <a>reduce</a>
          </li>
        </ul>
      </nav>
      <Map />
    </main>
  );
};

export default App;
