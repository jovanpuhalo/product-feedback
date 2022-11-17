import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice/ui-slice";
import FeedbackFilter from "../FedbackFilter/FeedbackFilter";
import { useNavigate } from "react-router";
import RoadmapView from "../Roadmap/RoadmapView";
import Button from "../ui/Buttons/Button";
import UserMenu from "../UserMenu/UserMenu";

const Menu = () => {
  const menuIsOpen = useSelector((state) => state.uiReducer.menuIsOpen);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCloseHandler = () => {
    dispatch(uiActions.setMenuIsOpen(false));
  };
  const loginHandler = () => {
    navigate("/auth/login");
  };
  const registerHandler = () => {
    navigate("/auth/signup");
  };

  return (
    <Fragment>
      <div className={`menu ${menuIsOpen ? "menu-show" : "menu-hide"}`}>
        {isUserLoggedIn ? (
          <div className="menu__user">
            <UserMenu mobile />
          </div>
        ) : (
          <div className="menu__button-box">
            <Button className="login-mobile" onClick={loginHandler}>
              LOGIN
            </Button>
            <Button className="register-mobile" onClick={registerHandler}>
              REGISTER
            </Button>
          </div>
        )}
        <FeedbackFilter />
        <RoadmapView />
      </div>
      <div className={`backdrop-menu ${menuIsOpen ? "backdrop-menu__show" : ""}`} onClick={onCloseHandler}></div>
    </Fragment>
  );
};

export default Menu;
