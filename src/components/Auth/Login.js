import React, { useEffect, useRef } from "react";
import Button from "../ui/Buttons/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
import { login } from "../../store/auth-slice-actions/auth-actions";
import XButton from "../../assets/xbutton.png";

import { uiActions } from "../../store/ui-slice/ui-slice";
import { variantsPage } from "../../helper/variants";
import { motion } from "framer-motion";

const override = {
  translate: "0 -8px",
};
const Login = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);
  const error = useSelector((state) => state.authReducer.error);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const logInHandler = () => {
    dispatch(login(emailRef.current.value, passwordRef.current.value));
    dispatch(uiActions.setMenuIsOpen(false));
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.getElementsByTagName("html")[0].style.overflowX = "hidden";
    if (isUserLoggedIn) navigate("/", { replace: true });
    return () => {
      document.body.style = {};
      document.getElementsByTagName("html")[0].style = {};
    };
  }, [isUserLoggedIn, navigate]);

  return (
    <motion.div className="auth-layout" variants={variantsPage} initial="hidden" animate="visible" exit="exit">
      <div className="login-container">
        <div className="login-form">
          <h2>Sign In</h2>
          <div className="login-form__input-box">
            <input type="text" required="required" defaultValue={"zenakelley@email.com"} ref={emailRef} />
            <span>Email</span>
            <i></i>
          </div>
          <div className="login-form__input-box">
            <input type="password" required="required" defaultValue={"zenakelley"} ref={passwordRef} />
            <span>Password</span>
            <i></i>
          </div>
          <div className="login-form__error">{error}</div>
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
        <img src={XButton} alt="" />
      </NavLink>
    </motion.div>
  );
};

export default Login;
