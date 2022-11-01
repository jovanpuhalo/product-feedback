import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionsSort, sortStyles } from "../../helper/select-style-options";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";

import Select from "react-select";

import { useNavigate } from "react-router";
import Button from "../ui/Buttons/Button";

const SuggestionsHeader = () => {
  console.log("render HEADER");
  const filteredSuggestions = useSelector((state) => state.suggestionsReducer.filteredSuggestions);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortRef = useRef();

  const onClickHandler = () => {
    navigate("/addFeedback");
  };
  const onChangeHandler = (data) => {
    // console.log("ddddddddd", data.value);
    dispatch(suggestionActions.sortSuggestions(data.value));
  };

  return (
    <div className="suggestions-header">
      <img src="/assets/bulb.png" alt="" />
      <div className="suggestions-header__number">{filteredSuggestions.length} Suggestions</div>
      <div className="suggestions-header__sort">Sort by:</div>
      <Select
        options={optionsSort}
        defaultValue={optionsSort[0]}
        placeholder="Feature"
        styles={sortStyles}
        ref={sortRef}
        onChange={onChangeHandler}
      />
      <Button onClick={onClickHandler}>+ Add Fedback</Button>
    </div>
  );
};

export default SuggestionsHeader;
