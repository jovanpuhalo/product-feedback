import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    menuIsOpen: false,
    modalIsOpen: false,
    modalMessage: "",
  },
  reducers: {
    setMenuIsOpen(state, action) {
      state.menuIsOpen = action.payload;
    },
    setModalIsOpen(state, action) {
      state.modalIsOpen = action.payload;
    },
    setModalMessage(state, action) {
      state.modalMessage = action.payload;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
