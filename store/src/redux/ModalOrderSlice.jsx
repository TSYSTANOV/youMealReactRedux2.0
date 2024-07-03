import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";
export const postOrder = createAsyncThunk(
  "order/post",
  async (order, thunkApi) => {
    console.log(order);
    thunkApi.dispatch(closeModal());
    thunkApi.dispatch(resetOrder());
    toast.success(`Order is success. №${order.id}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
);

const ModalOrderSlice = createSlice({
  name: "modalOrder",
  initialState: {
    isOpen: false,
    order: {
      id: "",
      phone: "",
      name: "",
      address: "",
      floor: "",
      goodsList: [],
      domofon: "",
      delivery: "",
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    setOrder: (state, action) => {
      state.order[action.payload.title] = action.payload.value;
    },
    resetOrder: (state, action) => {
      state.order = {
        id: "",
        phone: "",
        name: "",
        address: "",
        floor: "",
        goodsList: [],
        domofon: "",
        delivery: "",
      };
    },
  },
});
export const { openModal, closeModal, setOrder, resetOrder } =
  ModalOrderSlice.actions;
export default ModalOrderSlice.reducer;
