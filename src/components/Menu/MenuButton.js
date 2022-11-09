import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice/ui-slice";

const MenuButton = () => {
  const menuIsOpen = useSelector((state) => state.uiReducer.menuIsOpen);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(uiActions.setMenuIsOpen(!menuIsOpen));
  };
  useEffect(() => {
    if (menuIsOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      // dispatch(uiActions.setMenuIsOpen(false));
    };
  }, [menuIsOpen, dispatch]);

  return (
    <div
      className={` ${menuIsOpen ? "menu-mobile-button__close" : "menu-mobile-button__open"}`}
      onClick={onClickHandler}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default MenuButton;
