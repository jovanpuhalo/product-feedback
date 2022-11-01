import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userIsUpdating: false,
    users: [],
    user: {},
  },
  reducers: {
    setUsers(state, action) {
      state.users = [...action.payload];
    },
    setUser(state, action) {
      console.log("Stigao user", action.payload);
      state.user = action.payload;
    },
    setUserIsUpdating(state, action) {
      state.userIsUpdating = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
