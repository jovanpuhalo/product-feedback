import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Select from "react-select";
import EditFeedbackImage from "../../assets/shared/icon-edit-feedback.svg";

import { optionsStatusFeedback, optionsAddFeedback, customStyles } from "../../helper/select-style-options";
import Button from "../ui/Buttons/Button";
import { fetchUpdateFeedback } from "../../store/suggestions-slice-actions/suggestio-actions";

const EditFeedback = () => {
  const openedFeedback = useSelector((state) => state.suggestionsReducer.openedFeedback);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const dispach = useDispatch();

  const categoryRef = useRef();
  const statusRef = useRef();

  const cancelHandler = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    const feedbackData = {
      ...openedFeedback,
      ...data,
      category: categoryRef.current.props.value.value,
      status: statusRef.current.props.value.value,
    };

    dispach(fetchUpdateFeedback(feedbackData));
    navigate("/", { replace: true });
  };

  return (
    <Fragment>
      <div className="add-feedback">
        <h2>Editing </h2>
        <img src={EditFeedbackImage} alt="" className="add-feedback__icon2" />
        <div className={`add-feedback__controls ${errors.title?.message && "error"}`}>
          <p data-title>Feedback Title</p>
          <p data-dscription>Add a short, descriptive headline</p>
          <input
            type="text"
            maxLength={45}
            {...register("title", {
              value: openedFeedback.title,
              required: { message: "Title is required!", value: true },
              maxLength: { message: "Max length is 45!", value: 45 },
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
            styles={customStyles}
            isSearchable={false}
            ref={categoryRef}
          />
        </div>
        <div className="add-feedback__controls">
          <p data-title>Status</p>
          <p data-dscription>Choose a status for your feedback</p>
          <Select
            options={optionsStatusFeedback}
            defaultValue={optionsStatusFeedback[0]}
            styles={customStyles}
            isSearchable={false}
            ref={statusRef}
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
              value: openedFeedback.description,
              required: { message: "Detail is required", value: true },
              minLength: { message: "Too short description!", value: 20 },
            })}
          ></textarea>
          {errors.description && <p className="error-message">{errors.description?.message}</p>}
        </div>

        <div className="add-feedback__buttons">
          <Button onClick={handleSubmit(onSubmit)}>Edit Feedback</Button>
          <Button className={"cancel"} onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditFeedback;
