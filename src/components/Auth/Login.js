import React, { useEffect, useRef } from "react";
import Button from "../ui/Buttons/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
import { login } from "../../store/auth-slice-actions/auth-actions";

const override = {
  translate: "0 -8px",
};
const Login = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const logInHandler = () => {
    dispatch(login(emailRef.current.value, passwordRef.current.value));
  };

  useEffect(() => {
    if (isUserLoggedIn) navigate("/", { replace: true });
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="auth-layout">
      <div className="login-container">
        <div className="login-form">
          <h2>Sign In</h2>
          <div className="login-form__input-box">
            <input type="text" required="required" ref={emailRef} />
            <span>Email</span>
            <i></i>
          </div>
          <div className="login-form__input-box">
            <input type="password" required="required" ref={passwordRef} />
            <span>Password</span>
            <i></i>
          </div>
          <Button style={{ width: "100%", marginTop: "3rem" }} onClick={logInHandler}>
            {isLoading ? <PropagateLoader loading={isLoading} color={"white"} cssOverride={override} /> : "Login"}
          </Button>
          <div className="login-form__links">
            <NavLink to={"/"}> Forgot Password</NavLink>
            <NavLink to={"/auth/signup"}> Signup</NavLink>
          </div>
        </div>
      </div>
      <NavLink className="exit" to={"/"}>
        <img src="/assets/xbutton.png" alt="" />
      </NavLink>
    </div>
  );
};

export default Login;
