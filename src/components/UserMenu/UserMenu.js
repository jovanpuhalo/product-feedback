import React, { useState } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice-actions/auth-actions";
import useWindowSize from "../../hooks/useWindowWidth";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const width = useWindowSize();
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="user-menu-layout" onClick={() => setShowMenu((prev) => !prev)}>
      <UserInfo />

      <div className={`login-menu-button  ${showMenu && "login-menu-button__close"}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {showMenu && width > 786 && (
        <div className="user-menu">
          <div className="user-menu__backdrop"></div>
          <div>Your UpVotes</div>
          <div onClick={logOutHandler}>Log Out</div>
        </div>
      )}
      {width < 786 && (
        <div className="user-menu__mobile">
          <div>Your UpVotes</div>
          <div>Your Coments</div>

          <div onClick={logOutHandler}>Log Out</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
