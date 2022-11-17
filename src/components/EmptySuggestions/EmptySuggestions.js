import React from "react";
import Button from "../ui/Buttons/Button";
import { useNavigate } from "react-router";
import EmptyIlustration from "../../assets/shared/illustration-empty.svg";

const EmptySuggestions = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/addFeedback");
  };
  return (
    <div className="empty">
      <img src={EmptyIlustration} alt="" />
      <p className="empty__title">There is no feedback yet.</p>
      <p className="empty__text">
        Got a suggestion? Found a bug that needs to be squashed? <br /> We love hearing about new ideas to improve our
        app.
      </p>
      <Button onClick={onClickHandler}> + Add feedback</Button>
    </div>
  );
};

export default EmptySuggestions;
