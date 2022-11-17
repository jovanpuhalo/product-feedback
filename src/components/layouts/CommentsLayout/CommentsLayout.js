import React from "react";

const CommentsLayout = (props) => {
  return (
    <div className="comments">
      <div className="comments__number"> {props.numberOfComemnts} Comments</div>
      {props.children}
    </div>
  );
};

export default CommentsLayout;
