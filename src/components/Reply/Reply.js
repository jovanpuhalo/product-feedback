import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateFeedbackComments } from "../../store/suggestions-slice-actions/suggestio-actions";

import { fetchGetUser } from "../../store/user-slice-actions/user-actions";
import ReplyForm from "../ReplyForm/ReplyForm";

const Reply = ({ reply, comment, scroll }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  let openedFeedback = useSelector((state) => state.suggestionsReducer.openedFeedback);

  const [user, setUser] = useState({});
  const [showReply, setShowReply] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const user = await fetchGetUser(reply.userId);
      setUser(user);
    }
    fetchUser();
  }, [reply]);

  const onDeleteHandler = () => {
    // let updatedFeedback = { ...openedFeedback };
    let comments = [...openedFeedback.comments];
    const indexComment = comments.indexOf(comment);

    let replies = [...comment.replies];
    const indexReply = replies.indexOf(reply);
    replies.splice(indexReply, 1);

    comment = { ...comment, replies };

    comments.splice(indexComment, 1, comment);

    openedFeedback = { ...openedFeedback, comments };

    const data = {
      method: "delete reply",
      feedbackId: openedFeedback.id,
      commentData: comments,
    };
    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));
  };

  const onReplyHandler = () => {
    setShowReply((prev) => !prev);
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
      method: "add reply",
      feedbackId: openedFeedback.id,
      commentData: comments,
    };

    dispatch(fetchUpdateFeedbackComments(data, openedFeedback));

    scroll();
  };
  return (
    <div className="reply">
      <div className="reply__header">
        <div className="reply__header__photo">
          <img src={user.image} alt="" />
        </div>
        <div className="reply__header__user">
          <span>{user.name}</span>
          <span>@{user.username}</span>
        </div>
        <div className="reply__header__reply">
          {reply.userId !== currentUser.userId ? (
            <div onClick={onReplyHandler}>{showReply ? "Cancel" : "Reply"}</div>
          ) : (
            <div className="reply__header__reply__edit-delete">
              <div onClick={onDeleteHandler}>Delete</div>
            </div>
          )}
        </div>
      </div>
      <div className="reply__text">
        <span className="reply__text__reply-to"> @{reply.replyTo} </span>
        {reply.reply}
      </div>
      <ReplyForm className={showReply ? "show-reply" : ""} postReplyHandler={onPostReplyHandler} />
    </div>
  );
};

export default React.memo(Reply);
