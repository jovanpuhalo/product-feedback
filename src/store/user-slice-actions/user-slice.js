import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userIsUpdating: false,
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserIsUpdating(state, action) {
      state.userIsUpdating = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
