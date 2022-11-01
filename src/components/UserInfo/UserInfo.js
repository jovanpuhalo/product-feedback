import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../helper/dateFormater";
import Modal from "../ui/Modal/Modal";

const UserInfo = ({ feedback, user, createdAt }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="user">
      <div className="user__photo">
        <img src={feedback ? user?.image : currentUser.image} alt="" />
      </div>
      <div className="user__name">{feedback ? user?.name : currentUser.name}</div>
      {feedback ? (
        <div className="user__date-published">{createdAt ? formatDate(createdAt) : "Loading..."}</div>
      ) : (
        <div className="user__username">{`@${currentUser.username}`}</div>
      )}
    </div>
  );
};

export default UserInfo;
