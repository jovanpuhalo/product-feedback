import React from "react";
import Button from "../ui/Buttons/Button";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import UserMenu from "../UserMenu/UserMenu";
import { uiActions } from "../../store/ui-slice/ui-slice";

const LoginButton = () => {
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    navigate("/auth/login");
    dispatch(uiActions.setMenuIsOpen(false));
  };
  return (
    <div className="login">
      {isUserLoggedIn ? (
        <UserMenu />
      ) : (
        <Button className={"login"} onClick={login}>
          Log In
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
