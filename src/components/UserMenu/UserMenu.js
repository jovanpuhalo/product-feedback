import React, { useState } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth-slice-actions/auth-actions";
import useWindowSize from "../../hooks/useWindowWidth";
import { initDeleteUsers } from "../../firebase/firebase";
import MenuButton from "../Menu/MenuButton";
import { uiActions } from "../../store/ui-slice/ui-slice";
import { motion } from "framer-motion";

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const UserMenu = (props) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser); //for user info in UserMenu(loggin button)
  const menuIsOpen = useSelector((state) => state.uiReducer.menuIsOpen);

  const [showMenu, setShowMenu] = useState(false);
  const width = useWindowSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = () => {
    dispatch(logout());
  };
  const deleteUsers = () => {
    initDeleteUsers();
  };
  const goToYourVotes = () => {
    navigate("/your-votes");
  };

  return (
    <div
      className="user-menu-layout"
      onClick={() => {
        setShowMenu((prev) => !prev);
        dispatch(uiActions.setMenuIsOpen(!menuIsOpen));
      }}
    >
      <UserInfo />

      {!props.mobile && <MenuButton desktop />}

      {showMenu && width > 786 && (
        <motion.div className="user-menu" variants={menuVariants} initial="hidden" animate="visible">
          <div className="user-menu__backdrop"></div>
          <div onClick={goToYourVotes}>Your UpVotes</div>
          <div onClick={logOutHandler}>Log Out</div>
          {currentUser.status === "administrator" && <div onClick={deleteUsers}>Brisi usere</div>}
        </motion.div>
      )}
      {width < 786 && (
        <div className="user-menu__mobile">
          <div onClick={goToYourVotes}>Your UpVotes</div>

          <div onClick={logOutHandler}>Log Out</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
