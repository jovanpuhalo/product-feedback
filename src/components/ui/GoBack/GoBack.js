import React from "react";
import { useNavigate } from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";

const GoBack = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <div className="go-back" onClick={onClickHandler}>
      <MdKeyboardArrowLeft className="go-back__icon" />
      <div> Go Back</div>
    </div>
  );
};

export default GoBack;
