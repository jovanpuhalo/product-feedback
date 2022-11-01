import React from "react";
import VoteButton from "../ui/Buttons/VoteButton";
import { useSelector, useDispatch } from "react-redux";

// import { formatDate } from "../../helper/dateFormater";
import { useNavigate } from "react-router";
import UserInfo from "../UserInfo/UserInfo";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";
// import { fetchUpdateFeedback } from "../../store/suggestions-slice-actions/suggestio-actions";
// import { fetchUpdateUser } from "../../store/user-slice-actions/user-actions";

const Feedback = ({ item, clickable }) => {
  console.log("renderujem feedback");
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  // const openedFeedback = useSelector((state) => state.suggestionsReducer.openedFeedback);
  // const currentUser = useSelector((state) => state.authReducer.currentUser);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const user = users.find((user) => user.id === item.userId);
  // const isVoted = currentUser.upVotedSugestions?.some((feedbackId) => feedbackId === item.id);
  // console.log("alredyVoted", isVoted, currentUser.upVotedSugestions);

  const onFeedbackClikcHandler = () => {
    if (clickable) {
      dispatch(suggestionActions.setOpenedFeedback(item));
      localStorage.setItem("feedbackId", item.id);
      navigate(`feedback/${item.id}`);
    }
    // navigate(`feedback/${item.id}`, { state: { item: { ...item } } });
  };

  return (
    <div className={`feedback ${clickable ? "feedback__clickable" : ""}`} onClick={onFeedbackClikcHandler}>
      <VoteButton item={item} />
      <UserInfo feedback={true} createdAt={item.createdAt} user={user} />

      <div className="feedback__feedback">
        <div className="feedback__feedback__title">{item?.title}</div>
        <div className="feedback__feedback__description">
          {item.description?.length > 150 ? `${item.description.slice(0, 150)}....` : item.description}
        </div>
      </div>

      <div className="feedback__category">{item.category}</div>

      <div className="feedback__comments">
        <img src="/assets/shared/icon-comments.svg" alt="" />
        <div>{item.comments?.length}</div>
      </div>
    </div>
  );
};

export default React.memo(Feedback);
