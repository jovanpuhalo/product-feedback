import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Feedback from "../Feedback/Feedback";
import GoBack from "../ui/GoBack/GoBack";
import Button from "../ui/Buttons/Button";
import MoonLoader from "react-spinners/MoonLoader";
import PropagateLoader from "react-spinners/PropagateLoader";

import {
  fetchDeleteFeedback,
  fetchGetFeedback,
  fetchUpdateFeedbackComments,
} from "../../store/suggestions-slice-actions/suggestio-actions";
import Comment from "../Comment/Comment";
import CommentsLayout from "../layouts/CommentsLayout/CommentsLayout";
import { uiActions } from "../../store/ui-slice/ui-slice";

const override = {
  translate: "0 -8px",
};

const FeedbackDetail = () => {
  const feedbackIsFetching = useSelector((state) => state.suggestionsReducer.feedbackIsFetching);
  const feedbackIsUpdating = useSelector((state) => state.suggestionsReducer.feedbackIsUpdating);
  const feedbackIsDeleting = useSelector((state) => state.suggestionsReducer.feedbackIsDeleting);
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  let openedFeedback = useSelector((state) => state.suggestionsReducer.openedFeedback);

  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const textCountHandler = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const feedbackId = localStorage.getItem("feedbackId");
    if (feedbackId && Object.keys(openedFeedback).length === 0) {
      dispatch(fetchGetFeedback(feedbackId));
    }
    if (feedbackIsUpdating) setComment("");
    if (!feedbackId) navigate("/", { replace: true });
  }, [dispatch, navigate, openedFeedback, feedbackIsUpdating, feedbackIsDeleting]);

  const postCommentHandler = () => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }

    if (comment.length === 0) return;

    const data = {
      method: "add",
      feedbackId: openedFeedback.id,
      commentData: { userId: currentUser.userId, comment: comment, replies: [] },
    };
    openedFeedback = { ...openedFeedback, comments: [...openedFeedback.comments, data.commentData] };
    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
  };

  const onDeleteHandler = () => {
    dispatch(fetchDeleteFeedback(openedFeedback.id));
  };

  const onEditHandler = () => {
    navigate(`/feedback/${openedFeedback.id}/edit`, { replace: true });
  };
  return (
    <Fragment>
      {!feedbackIsFetching ? (
        <div className="feedback-detail-layout">
          <div className="feedback-detail__header">
            <GoBack />
            {currentUser.userId === openedFeedback.userId || currentUser.status === "administrator" ? (
              <>
                <Button
                  className="delete"
                  style={{ marginLeft: "auto", marginRight: "1rem" }}
                  onClick={onDeleteHandler}
                >
                  {feedbackIsDeleting ? (
                    <PropagateLoader loading={feedbackIsDeleting} color={"white"} cssOverride={override} />
                  ) : (
                    "Delete Feedback"
                  )}
                </Button>

                <Button className="edit" onClick={onEditHandler}>
                  Edit Feedback
                </Button>
              </>
            ) : null}
          </div>

          <Feedback item={openedFeedback} />
          <CommentsLayout numberOfComemnts={openedFeedback.comments?.length}>
            {openedFeedback.comments?.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </CommentsLayout>
          <div className="add-comment">
            <div className="add-comment__title">Add Comment</div>
            <textarea
              cols="30"
              rows="4"
              placeholder="Type your comment here"
              value={comment}
              maxLength="250"
              onChange={textCountHandler}
            ></textarea>
            <div className="add-comment__character-button">
              <div> {250 - comment.length} characters left</div>
              <Button onClick={postCommentHandler}>
                {feedbackIsUpdating ? (
                  <PropagateLoader loading={feedbackIsUpdating} color={"white"} cssOverride={override} />
                ) : (
                  "Post Comment"
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-layout">
          <MoonLoader size={100} speedMultiplier={1} color="rgb(70, 97, 230)" />
        </div>
      )}
    </Fragment>
  );
};

export default FeedbackDetail;
