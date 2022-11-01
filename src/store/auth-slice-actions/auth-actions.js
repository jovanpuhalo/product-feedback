import { addUser, getUser, signIn, signUp, signOutUser, currentSignInUser } from "../../firebase/firebase";
import { authActions } from "./auth-slice";

export const createUser = (data) => {
  return async (dispatch) => {
    dispatch(authActions.setIsLoading(true));
    try {
      const res = await signUp(data.email, data.password);
      if (res)
        await addUser(
          {
            name: data.fullname,
            image: data.image,
            email: data.email,
            username: data.username,
            upVotedSugestions: data.upVotedSugestions,
          },
          res.user.uid
        );
      dispatch(authActions.createUser());
      //   dispatch(
      //     authActions.createUser({
      //       name: data.fullname,
      //       image: data.image,
      //       email: data.email,
      //       username: data.username,
      //       userId: res.user.uid,
      //     })
      //   );
    } catch (error) {
      console.log(error.message);
      dispatch(authActions.setError(error.message));
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authActions.setIsLoading(true));
    try {
      const res = await signIn(email, password);
      if (res) {
        const user = await getUser(res.uid);
        const data = {
          token: res.accessToken,
          userId: res.uid,
          ...user,
        };
        dispatch(authActions.userLogin(data));
      }
    } catch (error) {
      console.log(error.message);
      //   dispatch(authActions.setError(error.message));
    }
  };
};
export const getCurrentSignInUser = () => {
  return (dispatch) => {
    currentSignInUser(async (currentUser) => {
      const user = await getUser(currentUser.uid);
      const data = {
        token: currentUser.accessToken,
        userId: currentUser.uid,
        ...user,
      };
      dispatch(authActions.userLogin(data));
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOutUser();
      dispatch(authActions.userLogOut());
    } catch (error) {
      console.log(error.message);
    }
  };
};