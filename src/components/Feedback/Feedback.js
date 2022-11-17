import React, { useEffect, useState } from "react";
import VoteButton from "../VoteButton/VoteButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserInfo from "../UserInfo/UserInfo";
import { suggestionActions } from "../../store/suggestions-slice-actions/suggestion-slice";
import { fetchGetUser } from "../../store/user-slice-actions/user-actions";
import { variantsFeedback } from "../../helper/variants";
import CommentsImg from "../../assets/shared/icon-comments.svg";

import { motion, useAnimation } from "framer-motion";

const Feedback = ({ item, clickable }) => {
  const [showMore, setShowMore] = useState(false);
  console.log("feedback renderujem", showMore);
  const [user, setUser] = useState({});
  const controls = useAnimation();
  clickable === true ? controls.start(variantsFeedback.in) : controls.stop();
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
      navigate(`/feedback/${item.id}`);
    }
  };

  const onClickMoreHandler = (e) => {
    e.stopPropagation();
    setShowMore((prev) => !prev);
  };

  const description = (
    <motion.div>
      {!showMore ? `${item.description?.slice(0, 150)}... ` : item.description}
      <span className="feedback__feedback__description__more" onClick={onClickMoreHandler}>
        {!showMore ? "More" : "  Less"}
      </span>
    </motion.div>
  );
  return (
    <motion.li
      className={`feedback ${clickable ? "feedback__clickable" : ""} ${!showMore ? "feedback__expand" : ""}`}
      onClick={onFeedbackClikcHandler}
      variants={variantsFeedback}
      initial={clickable === true ? "initial" : "stop"}
      animate={controls}
      transition={{ duration: item.description?.length > 150 ? 0.1 : 0.5 }}
      layout={clickable ? true : "size"}
      layoutId={clickable ? item.id : false}
    >
      <motion.div layout transition={{ duration: 0 }}>
        <VoteButton item={item} />
      </motion.div>
      <UserInfo feedback={true} createdAt={item.createdAt} user={user} />

      <div className="feedback__feedback">
        <motion.div layout transition={{ duration: 0 }} className="feedback__feedback__title">
          {item?.title}
        </motion.div>
        <motion.div layout transition={{ duration: 0 }} className="feedback__feedback__description">
          {item.description?.length > 150 ? description : item.description}
        </motion.div>
      </div>

      <motion.div layout transition={{ duration: 0 }} className="feedback__category">
        {item.category}
      </motion.div>

      <motion.div
        layout
        transition={{ duration: 0 }}
        className={`feedback__comments ${!showMore ? "feedback__comments--full" : ""}`}
      >
        <img src={CommentsImg} alt="" />
        <div>{item.comments?.length}</div>
      </motion.div>
    </motion.li>
  );
};

export default React.memo(Feedback);
