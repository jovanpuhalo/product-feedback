import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice/ui-slice";

const RoadmapView = () => {
  const suggestions = useSelector((state) => state.suggestionsReducer.suggestions);
  const planned = suggestions.filter((item) => item.status === "Planned");
  const inProgress = suggestions.filter((item) => item.status === "In-progress");
  const live = suggestions.filter((item) => item.status === "Live");
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(uiActions.setMenuIsOpen(false));
  };
  return (
    <div className="roadmap">
      <div>
        <p>Roadmap</p>
        <NavLink to={"/roadmap"} onClick={onClickHandler}>
          View
        </NavLink>
      </div>

      <ul>
        <li>
          <span>Planned</span>
          <span>{planned.length}</span>
        </li>
        <li>
          <span>In-Progress</span>
          <span>{inProgress.length}</span>
        </li>
        <li>
          <span>Live</span>
          <span>{live.length}</span>
        </li>
      </ul>
    </div>
  );
};

export default RoadmapView;
