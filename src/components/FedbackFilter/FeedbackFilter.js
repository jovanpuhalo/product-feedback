import React, { useState } from "react";
import Button from "../ui/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";

const FeedbackFilter = () => {
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.suggestionsReducer.filter);

  // const [activeButton, setActiveButton] = useState("All");

  const onClickHandler = (buttonName) => {
    // setActiveButton(buttonName);
    dispatch(suggestionActions.setFilter(buttonName));
  };
  return (
    <div className="feedback-filter">
      <Button className="filter" active={activeButton === "All"} onClick={onClickHandler}>
        All
      </Button>
      <Button className="filter" active={activeButton === "UI"} onClick={onClickHandler}>
        UI
      </Button>
      <Button className="filter" active={activeButton === "UX"} onClick={onClickHandler}>
        UX
      </Button>
      <Button className="filter" active={activeButton === "Enhancement"} onClick={onClickHandler}>
        Enhancement
      </Button>
      <Button className="filter" active={activeButton === "Bug"} onClick={onClickHandler}>
        Bug
      </Button>
      <Button className="filter" active={activeButton === "Feature"} onClick={onClickHandler}>
        Feature
      </Button>
    </div>
  );
};

export default FeedbackFilter;
