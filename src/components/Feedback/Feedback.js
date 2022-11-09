import React, { useEffect, useState } from "react";
import VoteButton from "../VoteButton/VoteButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserInfo from "../UserInfo/UserInfo";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";
import { fetchGetUser } from "../../store/user-slice-actions/user-actions";

const Feedback = ({ item, clickable }) => {
  console.log("feedback renderujem");
  const [showMore, setShowMore] = useState(true);
  const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchGetUser(item.userId);
      setUser(user);

      return user;
    };
    if (item.userId) fetchUser();
    return () => {
      setUser({});
    };
  }, [item.userId]);

  const onFeedbackClikcHandler = () => {
    if (clickable) {
      dispatch(suggestionActions.setOpenedFeedback(item));
      localStorage.setItem("feedbackId", item.id);
      navigate(`feedback/${item.id}`);
    }
  };

  const onClickMoreHandler = (e) => {
    e.stopPropagation();
    setShowMore((prev) => !prev);
  };

  const description = (
    <>
      {!showMore ? `${item.description?.slice(0, 150)}... ` : item.description}
      <span className="feedback__feedback__description__more" onClick={onClickMoreHandler}>
        {!showMore ? "More" : "  Less"}
      </span>
    </>
  );
  return (
    <div className={`feedback ${clickable ? "feedback__clickable" : ""}`} onClick={onFeedbackClikcHandler}>
      <VoteButton item={item} />
      <UserInfo feedback={true} createdAt={item.createdAt} user={user} />

      <div className="feedback__feedback">
        <div className="feedback__feedback__title">{item?.title}</div>
        <div className="feedback__feedback__description">
          {item.description?.length > 150 ? description : item.description}
        </div>
      </div>

      <div className="feedback__category">{item.category}</div>

      <div className={`feedback__comments ${showMore ? "feedback__comments--full" : ""}`}>
        <img src="/assets/shared/icon-comments.svg" alt="" />
        <div>{item.comments?.length}</div>
      </div>
    </div>
  );
};

export default React.memo(Feedback);
