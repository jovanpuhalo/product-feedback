import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice/ui-slice";

const MenuButton = (props) => {
  console.log("renderujem button");
  const menuIsOpen = useSelector((state) => state.uiReducer.menuIsOpen);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(uiActions.setMenuIsOpen(!menuIsOpen));
  };
  useEffect(() => {
    if (menuIsOpen && !props.desktop) document.body.style.overflow = "hidden";
    return () => {
      console.log("return");
      document.body.style.overflow = "auto";
      if (menuIsOpen) dispatch(uiActions.setMenuIsOpen(false));
      // dispatch(uiActions.setMenuIsOpen(false));
    };
  }, [menuIsOpen, dispatch, props.desktop]);

  return (
    <div
      className={`${menuIsOpen ? "menu-mobile-button__close" : "menu-mobile-button__open"} ${
        props.desktop ? "button-desktop" : ""
      } `}
      onClick={onClickHandler}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default React.memo(MenuButton);
