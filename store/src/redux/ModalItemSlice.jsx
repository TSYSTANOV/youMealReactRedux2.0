import { createSlice } from "@reduxjs/toolkit";

const ModalItemSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    activeItem: [],
  },
  reducers: {
    handleModal: (state, action) => {
      state.isOpen = !state.isOpen;
      state.activeItem = action.payload;
    },
  },
});
export const { handleModal } = ModalItemSlice.actions;
export default ModalItemSlice.reducer;
