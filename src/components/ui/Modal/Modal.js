import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

// import "./modal.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={(e) => props.onClose(e)}></div>;
};
const ModalOverlay = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`modal-container ${props.classContainer}`}>
      <div className={`modal ${props.className}`}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />

      <ModalOverlay className={props.className} classContainer={props.classContainer}>
        {props.children}
      </ModalOverlay>
    </Fragment>
  );
};

export default Modal;
