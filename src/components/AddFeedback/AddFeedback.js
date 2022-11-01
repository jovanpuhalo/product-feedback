import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { optionsAddFeedback, customStyles } from "../../helper/select-style-options";
import Button from "../ui/Buttons/Button";
import { fetchAddFeedback } from "../../store/suggestions-slice-actions/suggestio-actions";
// import { useQuery } from "@tanstack/react-query";

const AddFeedback = () => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispach = useDispatch();

  const categoryRef = useRef();

  const cancelHandler = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    const feedbackData = {
      ...data,
      category: categoryRef.current.props.value.value,
      upVotes: 0,
      comments: [],
      userId: currentUser.userId,
    };
    dispach(fetchAddFeedback(feedbackData));
    navigate("/", { replace: true });
  };

  return (
    <Fragment>
      <div className="add-feedback">
        <h2>Create New Feedback</h2>
        <img src="./assets/shared/icon-new-feedback.svg" alt="" className="add-feedback__icon" />
        <div className={`add-feedback__controls ${errors.title?.message && "error"}`}>
          <p data-title>Feedback Title</p>
          <p data-dscription>Add a short, descriptive headline</p>
          <input
            type="text"
            {...register("title", {
              required: { message: "Title is required!", value: true },
              maxLength: { message: "Max length is 60!", value: 60 },
            })}
          />
          {errors.title && <p className="error-message">{errors.title?.message}</p>}
        </div>

        <div className="add-feedback__controls">
          <p data-title>Category</p>
          <p data-dscription>Choose a category for your feedback</p>
          <Select
            options={optionsAddFeedback}
            defaultValue={optionsAddFeedback[0]}
            placeholder="Feature"
            styles={customStyles}
            ref={categoryRef}
          />
        </div>

        <div className={`add-feedback__controls ${errors.description?.message && "error"}`}>
          <p data-title>Feedback Detail</p>
          <p data-dscription>Include any specific comments on what should be improved, added, etc.</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            {...register("description", {
              required: { message: "Detail is required", value: true },
              minLength: { message: "Too short description!", value: 20 },
            })}
          ></textarea>
          {errors.description && <p className="error-message">{errors.description?.message}</p>}
        </div>

        <div className="add-feedback__buttons">
          <Button onClick={handleSubmit(onSubmit)}>Add Feedback</Button>
          <Button className={"cancel"} onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddFeedback;
