import React from "react";

const FurtherReading = () => {
  return (
    <div>
      <h1>Further Reading</h1>
      <h4>There are plenty of great resources to read further</h4>
      <ul>
        <li>
          {" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">
            MDN documentation{" "}
          </a>{" "}
        </li>

        <li>
          {" "}
          <a href="https://www.freecodecamp.org/news/javascript-map-reduce-and-filter-explained-with-examples/">
            by Beau Carnes{" "}
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4">
            by João Miguel Cunha{" "}
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="https://willtaylor.blog/javascript-map-filter-reduce/">
            by Will Taylor{" "}
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="https://flaviocopes.com/javascript-loops-map-filter-reduce-find/">
            by Flavio Copes{" "}
          </a>{" "}
        </li>
      </ul>
    </div>
  );
};
export default FurtherReading;
