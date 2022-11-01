import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropagateLoader from "react-spinners/PropagateLoader";
import Button from "../ui/Buttons/Button";
import { createUser } from "../../store/auth-slice-actions/auth-actions";
import { authActions } from "../../store/auth-slice-actions/auth-slice";

const override = {
  translate: "0 -8px",
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signup = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const error = useSelector((state) => state.authReducer.error);
  const userIsCreated = useSelector((state) => state.authReducer.userIsCreated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      ...data,
      image: "",
      upVotedSugestions: [],
    };
    dispatch(createUser(userData));
  };

  useEffect(() => {
    if (userIsCreated) {
      navigate("/auth/login");
      dispatch(authActions.setIsLoading(false));
    }
  }, [userIsCreated, navigate, dispatch]);

  return (
    <div className="auth-layout">
      <div className="signup-form">
        <div className="signup-form__input-box">
          <div>
            <label>Full Name</label>
            {errors.fullname?.message && <p className="signup-error">{errors.fullname.message}</p>}
          </div>

          <input
            type="text"
            placeholder="Full Name"
            {...register("fullname", { required: { message: "Full name is required", value: true } })}
          />
        </div>
        <div className="signup-form__input-box">
          <div>
            <label>User Name</label>
            {errors.username?.message && <p className="signup-error">{errors.username.message}</p>}
          </div>

          <input
            type="text"
            placeholder="User Name"
            {...register("username", { required: { message: "Username is required", value: true } })}
          />
        </div>
        <div className="signup-form__input-box">
          <div>
            <label>Email</label>
            {errors.email?.message && <p className="signup-error">{errors.email.message}</p>}
          </div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { message: "Email is required", value: true },
              pattern: { message: "Wrong email format", value: emailRegex },
            })}
          />
        </div>
        <div className="signup-form__input-box">
          <div>
            <label>Password</label>
            {errors.password?.message && <p className="signup-error">{errors.password.message}</p>}
          </div>

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { message: "Password is required", value: true },
              minLength: { message: "Password must be at least 6 characters long?", value: 6 },
            })}
          />
        </div>
        {error && <p className="signup-error">{error}</p>}
        <Button style={{ width: "100%", marginTop: "3rem" }} onClick={handleSubmit(onSubmit)}>
          {isLoading ? <PropagateLoader loading={isLoading} color={"white"} cssOverride={override} /> : "Sign Up"}
        </Button>
        <div className="signup-form__sign-in">
          Have an Acount? <NavLink to={"/auth/login"}>Sign In</NavLink>
        </div>
      </div>

      <NavLink className="exit" to={"/"}>
        <img src="/assets/xbutton.png" alt="" />
      </NavLink>
    </div>
  );
};

export default Signup;
