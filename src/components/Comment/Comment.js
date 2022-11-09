import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateFeedbackComments } from "../../store/suggestions-slice-actions/suggestio-actions";
import { uiActions } from "../../store/ui-slice/ui-slice";
import { fetchGetUser } from "../../store/user-slice-actions/user-actions";
import Reply from "../Reply/Reply";
import ReplyForm from "../ReplyForm/ReplyForm";

const Comment = ({ comment }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  let openedFeedback = useSelector((state) => state.suggestionsReducer.openedFeedback);
  const replyRef = useRef();
  const [user, setUser] = useState({});
  const [showReply, setShowReply] = useState(false);
  const [editComent, setEditComment] = useState(false);
  // const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }
    // let updatedFeedback = { ...openedFeedback };
    let comments = [...openedFeedback.comments];
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    openedFeedback = { ...openedFeedback, comments: [...comments] };

    const data = {
      method: "remove",
      feedbackId: openedFeedback.id,
      commentData: comment,
    };
    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
  };

  const onReplyHandler = () => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }
    setShowReply((prev) => !prev);
  };

  const scroll = () => {
    window.scrollTo({ top: replyRef.current.getBoundingClientRect().bottom - 170, behavior: "smooth" });
  };

  const onPostReplyHandler = (text) => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }
    setShowReply(false);
    if (text.trim() === "") return;
    const replyData = { userId: currentUser.userId, reply: text, replyTo: user.username };

    const updatedComment = { ...comment, replies: [...comment.replies, replyData] };

    let comments = [...openedFeedback.comments];
    const index = comments.indexOf(comment);
    comments.splice(index, 1, updatedComment);
    openedFeedback = { ...openedFeedback, comments: [...comments] };

    const data = {
      method: "add reply",
      feedbackId: openedFeedback.id,
      commentData: comments,
    };

    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
    scroll();
    // updatereply(feedbackId, reply);
  };
  const onPostEditHandler = (text) => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }
    setShowReply(false);
    if (text.trim() === "") return;

    const updatedComment = { ...comment, comment: text };

    let comments = [...openedFeedback.comments];
    const index = comments.indexOf(comment);
    comments.splice(index, 1, updatedComment);

    openedFeedback = { ...openedFeedback, comments: [...comments] };

    const data = {
      method: "add reply",
      feedbackId: openedFeedback.id,
      commentData: comments,
    };

    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
  };

  const onEditHandler = () => {
    if (!isUserLoggedIn) {
      dispatch(uiActions.setModalIsOpen(true));
      dispatch(uiActions.setModalMessage("You are not logged in."));
      return;
    }
    setShowReply((prev) => !prev);
    setEditComment(comment.comment);
  };

  useEffect(() => {
    async function fetchUser() {
      const user = await fetchGetUser(comment.userId);
      setUser(user);
    }
    fetchUser();
  }, [comment]);

  return (
    <div className="comment" ref={replyRef}>
      <div className="comment__header">
        <div className="comment__header__photo">
          <img src={user.image} alt="" />
        </div>
        <div className="comment__header__user">
          <span>{user.name}</span>
          <span>@{user.username}</span>
        </div>
        <div className="comment__header__reply">
          {comment.userId !== currentUser.userId ? (
            <div onClick={onReplyHandler}>{showReply ? "Cancel" : "Reply"}</div>
          ) : (
            <div className="comment__header__reply__edit-delete">
              <div onClick={onDeleteHandler}>Delete</div>
              <div onClick={onEditHandler}>Edit</div>
            </div>
          )}
        </div>
      </div>
      <div className="comment__text">{comment.comment}</div>
      <ReplyForm
        className={showReply ? "show-reply" : ""}
        postReplyHandler={onPostReplyHandler}
        commentIfEdit={editComent}
        editReply={onPostEditHandler}
      />
      {/* <Reply /> */}
      {comment.replies?.map((reply, index) => (
        <Reply key={index} reply={reply} comment={comment} scroll={scroll} />
      ))}
    </div>
  );
};

export default Comment;
