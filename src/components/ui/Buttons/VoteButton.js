import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateFeedbackVotes } from "../../../store/suggestions-slice-actions/suggestio-actions";
import { fetchUpdateUser } from "../../../store/user-slice-actions/user-actions";

import { MdKeyboardArrowUp } from "react-icons/md";

const VoteButton = ({ item }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const feedbackIsUpdating = useSelector((state) => state.suggestionsReducer.feedbackIsUpdating);
  const userIsUpdating = useSelector((state) => state.userReducer.userIsUpdating);

  const dispatch = useDispatch();

  const isVoted = currentUser.upVotedSugestions?.some((feedbackId) => feedbackId === item.id);
  let upVotes = item.upVotes;
  const onVoteClickHandler = (e) => {
    e.stopPropagation();

    if (!feedbackIsUpdating && !userIsUpdating) {
      if (!isVoted) {
        dispatch(fetchUpdateFeedbackVotes({ ...item, upVotes: item.upVotes + 1 }));
        dispatch(
          fetchUpdateUser(currentUser.userId, {
            upVotedSugestions: [...currentUser.upVotedSugestions, item.id],
          })
        );
      } else {
        dispatch(fetchUpdateFeedbackVotes({ ...item, upVotes: item.upVotes - 1 }));
        dispatch(
          fetchUpdateUser(currentUser.userId, {
            upVotedSugestions: [...currentUser.upVotedSugestions.filter((id) => id !== item.id)],
          })
        );
      }
    }
  };
  return (
    <div className={`vote ${isVoted ? "vote__active" : ""}`} onClick={onVoteClickHandler}>
      <MdKeyboardArrowUp className="vote__icon" />
      <div>{upVotes}</div>
    </div>
  );
};

export default VoteButton;
