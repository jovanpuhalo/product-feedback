import React from "react";
import VoteButton from "../VoteButton/VoteButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";
import { roadMapItemVariants } from "../../helper/variants";
import CommentImg from "../../assets/shared/icon-comments.svg";

import { motion } from "framer-motion";

const FeedbackRoadmap = ({ item, clickable, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFeedbackClikcHandler = () => {
    if (clickable) {
      dispatch(suggestionActions.setOpenedFeedback(item));
      localStorage.setItem("feedbackId", item.id);
      navigate(`/feedback/${item.id}`);
    }
  };

  const classes = `feedback-roadmap ${clickable ? "feedback__clickable" : ""}  ${className ? className : ""}`;
  return (
    <motion.div
      className={classes}
      onClick={onFeedbackClikcHandler}
      variants={roadMapItemVariants}
      initial="hidden"
      animate="visible"
    >
      <span>{className}</span>
      <div className="feedback-roadmap__feedback">
        <div className="feedback-roadmap__feedback__title">{item?.title}</div>
        <div className="feedback-roadmap__feedback__description">
          {item.description?.length > 95 ? `${item.description.slice(0, 95)}....` : item.description}
        </div>
      </div>

      <div className="feedback-roadmap__category">{item.category}</div>
      <div className="feedback-roadmap__comment-vote">
        <VoteButton item={item} className="vote__roadmap" />
        <div className="feedback-roadmap__comment-vote__comments">
          <img src={CommentImg} alt="" />
          <div>{item.comments?.length}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackRoadmap;
