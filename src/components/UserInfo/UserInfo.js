import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../helper/dateFormater";
import MoonLoader from "react-spinners/MoonLoader";
import { motion } from "framer-motion";

const UserInfo = ({ feedback, user, createdAt }) => {
  const [feedbackUser, setFeedbackUser] = useState({});
  const currentUser = useSelector((state) => state.authReducer.currentUser); //for user info in UserMenu(loggin button)
  useEffect(() => {
    setFeedbackUser(user);
  }, [user]);

  let loading = true;
  if (feedbackUser === undefined) {
    loading = false;
  } else {
    loading = Object.keys(feedbackUser).length === 0;
  }

  return (
    <motion.div layout transition={{ duration: 0 }} className="user">
      <div className="user__photo">
        {loading ? (
          <div className="spinner-layout">
            <MoonLoader loading={loading} size={30} speedMultiplier={1} color="rgb(70, 97, 230)" />
          </div>
        ) : (
          <img src={feedback ? feedbackUser?.image : currentUser.image} alt="" />
        )}
      </div>
      <div className="user__name">{feedback ? feedbackUser?.name : currentUser.name}</div>
      {feedback ? (
        <div className="user__date-published">{createdAt && formatDate(createdAt)}</div>
      ) : (
        <div className="user__username">{`@${currentUser.username}`}</div>
      )}
    </motion.div>
  );
};

export default UserInfo;
