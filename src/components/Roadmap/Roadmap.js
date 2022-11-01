import React from "react";
import { NavLink } from "react-router-dom";

const Roadmap = () => {
  return (
    <div className="roadmap">
      <div>
        <p>Roadmap</p>
        <NavLink to={"/"}>View</NavLink>
      </div>

      <ul>
        <li>
          <span>Planned</span>
          <span>2</span>
        </li>
        <li>
          <span>In-Progress</span>
          <span>2</span>
        </li>
        <li>
          <span>Live</span>
          <span>2</span>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
