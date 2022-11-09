import React from "react";
import { useNavigate } from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";

const GoBack = (props) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <div className={`go-back ${props.className ? "goback-roadmap" : ""}`} onClick={onClickHandler}>
      <MdKeyboardArrowLeft className={`go-back__icon ${props.className ? "goback-roadmap__icon" : ""}`} />
      <div> Go Back</div>
    </div>
  );
};

export default GoBack;
