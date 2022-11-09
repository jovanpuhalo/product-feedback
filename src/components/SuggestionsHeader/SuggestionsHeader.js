import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionsSort, sortStyles } from "../../helper/select-style-options";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";

import Select from "react-select";

import { useNavigate } from "react-router";
import Button from "../ui/Buttons/Button";
import { uiActions } from "../../store/ui-slice/ui-slice";

const SuggestionsHeader = () => {
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);
  let filteredSuggestions = useSelector((state) => state.suggestionsReducer.filteredSuggestions);

  filteredSuggestions = filteredSuggestions.filter((item) => item.status === "suggestion");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortRef = useRef();

  const onClickHandler = () => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }
    navigate("/addFeedback");
  };
  const onChangeHandler = (data) => {
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
        styles={sortStyles}
        ref={sortRef}
        isSearchable={false}
        onChange={onChangeHandler}
      />
      <Button onClick={onClickHandler}>+ Add Fedback</Button>
    </div>
  );
};

export default SuggestionsHeader;
