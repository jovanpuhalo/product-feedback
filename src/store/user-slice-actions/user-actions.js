import { getUser, getUsers, updateUser } from "../../firebase/firebase";
import { userActions } from "./user-slice";
import { authActions } from "../auth-slice-actions/auth-slice";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await getUsers();
      dispatch(userActions.setUsers(res));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchGetUser = async (userId) => {
  try {
    const res = await getUser(userId);
    // dispatch(userActions.setUser(res));
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateUser = (userId, data) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.setUserIsUpdating(true));
      await updateUser(userId, data);
      dispatch(authActions.updateCurrentUser(data));
      dispatch(userActions.setUserIsUpdating(false));
    } catch (error) {
      console.log(error);
    }
  };
};
