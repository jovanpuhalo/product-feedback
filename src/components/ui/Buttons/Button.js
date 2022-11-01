import React from "react";

const Button = (props) => {
  const onClickHandler = () => {
    props.onClick(props.children);
  };
  return (
    <button
      className={`ui-button ui-button--${props.className} ${props.active ? "active" : ""}`}
      style={{ ...props.style }}
      onClick={onClickHandler}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
