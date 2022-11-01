import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateFeedbackComments } from "../../store/suggestions-slice-actions/suggestio-actions";
import { fetchGetUser } from "../../store/user-slice-actions/user-actions";
import Reply from "../Reply/Reply";
import ReplyForm from "../ReplyForm/ReplyForm";

const Comment = ({ comment }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  let openedFeedback = useSelector((state) => state.suggestionsReducer.openedFeedback);
  const replyRef = useRef();
  const [user, setUser] = useState({});
  const [showReply, setShowReply] = useState(false);
  // const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
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
    console.log(comment);
    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
  };

  const onReplyHandler = () => {
    setShowReply((prev) => !prev);
  };

  const scroll = () => {
    window.scrollTo({ top: replyRef.current.getBoundingClientRect().bottom - 170, behavior: "smooth" });
  };

  const onPostReplyHandler = (text) => {
    setShowReply(false);
    if (text.trim() === "") return;
    const replyData = { userId: currentUser.userId, reply: text, replyTo: user.username };

    const updatedComment = { ...comment, replies: [...comment.replies, replyData] };

    let comments = [...openedFeedback.comments];
    const index = comments.indexOf(comment);
    comments.splice(index, 1, updatedComment);
    openedFeedback = { ...openedFeedback, comments: [...comments] };

    const data = {
      method: "update",
      feedbackId: openedFeedback.id,
      commentData: comments,
    };

    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
    scroll();
    // updatereply(feedbackId, reply);
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
              <div>Edit</div>
            </div>
          )}
        </div>
      </div>
      <div className="comment__text">{comment.comment}</div>
      <ReplyForm className={showReply ? "show-reply" : ""} postReplyHandler={onPostReplyHandler} />
      {/* <Reply /> */}
      {comment.replies?.map((reply, index) => (
        <Reply key={index} reply={reply} comment={comment} scroll={scroll} />
      ))}
    </div>
  );
};

export default Comment;
