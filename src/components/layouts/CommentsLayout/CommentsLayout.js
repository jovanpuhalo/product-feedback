import React from "react";

const CommentsLayout = (props) => {
  console.log("renderujem komentare");
  return (
    <div className="comments">
      <div className="comments__number"> {props.numberOfComemnts} Comments</div>
      {props.children}
    </div>
  );
};

export default CommentsLayout;
