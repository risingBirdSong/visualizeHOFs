import * as React from "react";
import Map from "./components/Map";
const App = () => {
  return (
    <main className="container">
      <nav>
        <ul className="row">
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Further Reading</a>
          </li>
          <li className="active">
            <a>Map</a>
          </li>
          <li>
            <a>Filter</a>
          </li>
          <li>
            <a>Reduce</a>
          </li>
        </ul>
      </nav>
      <Map />
    </main>
  );
};

export default App;
