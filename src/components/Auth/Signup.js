import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropagateLoader from "react-spinners/PropagateLoader";
import Button from "../ui/Buttons/Button";
import { createUser } from "../../store/auth-slice-actions/auth-actions";
import { authActions } from "../../store/auth-slice-actions/auth-slice";
import ProgressBar from "../ProgressBar/ProgressBar";
import XButton from "../../assets/xbutton.png";

import { motion } from "framer-motion";
import { variantsPage } from "../../helper/variants";

const override = {
  translate: "0 -8px",
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signup = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const error = useSelector((state) => state.authReducer.error);
  const userIsCreated = useSelector((state) => state.authReducer.userIsCreated);
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn);

  const [inputData, setInputData] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const types = ["image/png", "image/jpeg"];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setInputData({
      ...data,
      upVotedSugestions: [],
    });
    setIsUploading(true);
  };

  const onChangeHandler = (e) => {
    console.log("slika", e.target.files[0].name);
    // console.log("e.target", e.target.files[0]);
    if (e.target.files[0]) {
      console.log("setujem sliku", e.target.files[0].name);
      // setImageName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.getElementsByTagName("html")[0].style.overflowX = "hidden";
    if (userIsCreated) {
      navigate("/auth/login");
      dispatch(authActions.setIsLoading(false));
    }
    if (isUserLoggedIn) navigate("/", { replace: true });

    return () => {
      document.body.style = {};
      document.getElementsByTagName("html")[0].style = {};
    };
  }, [userIsCreated, navigate, dispatch, isUserLoggedIn]);

  useEffect(() => {
    if (imgUrl || (isUploading && !file)) {
      const userData = {
        ...inputData,
        image: imgUrl,
      };
      console.log(userData);
      dispatch(createUser(userData));
    }
  }, [imgUrl, inputData, dispatch, isUploading, file]);

  return (
    <motion.div className="auth-layout" variants={variantsPage} initial="hidden" animate="visible" exit="exit">
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
        <div className="signup-form__input-box">
          <div>
            <label htmlFor="file">Choose a photo</label>
            {errors.image?.message && <p className="signup-error">{errors.image.message}</p>}
          </div>
          <div data-photo>{file.name}</div>

          <input
            type="file"
            id="file"
            {...register("image", {
              onChange: (e) => onChangeHandler(e),
              validate: (value) => {
                if (!value[0]) return;
                return types.includes(value[0]?.type) || "Wrong image format";
              },
            })}
            accept="image/*"
          />
        </div>

        {isUploading && file && (
          <ProgressBar
            file={file}
            setImgUrl={setImgUrl}
            setIsUploading={setIsUploading}
            setUploadError={setUploadError}
          />
        )}

        {error && <p className="signup-error">{error}</p>}
        {uploadError && <p className="signup-error">{uploadError}</p>}
        <Button style={{ width: "100%", marginTop: "3rem" }} onClick={handleSubmit(onSubmit)}>
          {isLoading ? <PropagateLoader loading={isLoading} color={"white"} cssOverride={override} /> : "Sign Up"}
        </Button>
        <div className="signup-form__sign-in">
          Have an Acount? <NavLink to={"/auth/login"}>Sign In</NavLink>
        </div>
      </div>

      <NavLink className="exit" to={"/"}>
        <img src={XButton} alt="" />
      </NavLink>
    </motion.div>
  );
};

export default Signup;
