import React, { useEffect, useState } from "react";
import Button from "../ui/Buttons/Button";

const ReplyForm = (props) => {
  const [comment, setComment] = useState("");

  const postReplyHandler = () => {
    if (props.commentIfEdit) {
      props.editReply(comment);
    } else {
      props.postReplyHandler(comment);
    }

    setTimeout(() => {
      setComment("");
    }, 300);
  };

  const textCountHandler = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    if (props.commentIfEdit) setComment(props.commentIfEdit);
  }, [props.commentIfEdit]);

  return (
    <div className={`reply-form ${props.className}`}>
      <div className="reply-form-container">
        <textarea
          cols="30"
          rows="3"
          placeholder="Type your Reply here"
          value={comment}
          maxLength="250"
          onChange={textCountHandler}
        ></textarea>

        <Button style={{ width: "10rem", height: "3.5rem", fontSize: "1.3rem" }} onClick={postReplyHandler}>
          {props.commentIfEdit ? "Edit" : "Post reply"}
        </Button>
      </div>
      <div> {250 - comment?.length} characters left</div>
    </div>
  );
};

export default ReplyForm;
