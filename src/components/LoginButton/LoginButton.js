import React from "react";
import Button from "../ui/Buttons/Button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import UserInfo from "../UserInfo/UserInfo";
import UserMenu from "../UserMenu/UserMenu";

const LoginButton = () => {
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  const navigate = useNavigate();
  const login = () => {
    navigate("/auth/login");
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
