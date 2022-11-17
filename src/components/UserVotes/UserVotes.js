import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeedback } from "../../firebase/firebase";
import MoonLoader from "react-spinners/MoonLoader";

import Feedback from "../Feedback/Feedback";
import GoBack from "../ui/GoBack/GoBack";
import UserInfo from "../UserInfo/UserInfo";
import { variantsPage } from "../../helper/variants";
import { motion, LayoutGroup } from "framer-motion";

const UserVotes = () => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const [feedbacks, setFeedbacks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser.upVotedSugestions?.forEach(async (id) => {
      const feedback = await getFeedback(id);
      setFeedbacks((prev) => [...prev, feedback]);
    });
    return () => {
      setFeedbacks([]);
    };
  }, [currentUser.upVotedSugestions, dispatch]);

  const items = feedbacks.map((item, index) => <Feedback key={Math.random()} item={item} clickable />);
  const loading = currentUser.upVotedSugestions?.length !== feedbacks.length;

  return (
    <motion.div
      className="feedback-detail-layout votes"
      variants={variantsPage}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <GoBack />

      {loading ? (
        <div className="spinner-layout">
          <MoonLoader size={100} speedMultiplier={1} color="rgb(70, 97, 230)" />
        </div>
      ) : (
        <div className="votes__header">
          <UserInfo />
          <div className="votes__header__number">
            You have upvoted <br /> {currentUser.upVotedSugestions?.length} suggestions
          </div>
        </div>
      )}
      <LayoutGroup>
        <motion.ul layout transition={{ duration: 0 }}>
          {items}
        </motion.ul>
      </LayoutGroup>
    </motion.div>
  );
};

export default UserVotes;
