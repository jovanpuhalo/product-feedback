import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateFeedbackVotes } from "../../store/suggestions-slice-actions/suggestio-actions";
import { fetchUpdateUser } from "../../store/user-slice-actions/user-actions";

import { MdKeyboardArrowUp } from "react-icons/md";
import { uiActions } from "../../store/ui-slice/ui-slice";
import { motion } from "framer-motion";

const VoteButton = ({ item, className }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const feedbackIsUpdating = useSelector((state) => state.suggestionsReducer.feedbackIsUpdating);
  const userIsUpdating = useSelector((state) => state.userReducer.userIsUpdating);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  const dispatch = useDispatch();

  const isVoted = currentUser.upVotedSugestions?.some((feedbackId) => feedbackId === item.id);
  let upVotes = item.upVotes;
  const onVoteClickHandler = (e) => {
    e.stopPropagation();

    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }

    if (!feedbackIsUpdating && !userIsUpdating) {
      if (!isVoted) {
        dispatch(fetchUpdateFeedbackVotes("increment", { ...item, upVotes: item.upVotes + 1 }));
        dispatch(
          fetchUpdateUser(currentUser.userId, {
            upVotedSugestions: [...currentUser.upVotedSugestions, item.id],
          })
        );
      } else {
        dispatch(fetchUpdateFeedbackVotes("decrement", { ...item, upVotes: item.upVotes - 1 }));
        dispatch(
          fetchUpdateUser(currentUser.userId, {
            upVotedSugestions: [...currentUser.upVotedSugestions.filter((id) => id !== item.id)],
          })
        );
      }
    }
  };
  return (
    <motion.div
      layout
      transition={{ duration: 0 }}
      className={`vote ${isVoted ? "vote__active" : ""} ${className ? "vote__roadmap" : ""}`}
      onClick={onVoteClickHandler}
    >
      <MdKeyboardArrowUp className="vote__icon" />
      <div>{upVotes}</div>
    </motion.div>
  );
};

export default VoteButton;
