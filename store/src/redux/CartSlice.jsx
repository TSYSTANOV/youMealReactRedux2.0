import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CART_API } from "../api/api";

export const getCartItems = createAsyncThunk(
  "cart/fetch",
  async (cart, thunkApi) => {
    try {
      const idObj = cart.reduce((acc, el) => {
        acc.push(el.id);
        return acc;
      }, []);

      const res = await fetch(CART_API + idObj.join(",")).then((res) =>
        res.json()
      );
      const arrID = thunkApi.getState().cart.cart;

      const cartList = res.reduce((acc, el) => {
        arrID.forEach((elem) => {
          if (elem.id === el.id) {
            el.count = elem.count;
            acc.push(el);
          }
        });
        return acc;
      }, []);
      return cartList;
    } catch (error) {}
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isOpen: false,
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.isOpen = false;
    },
    openCart: (state, action) => {
      state.isOpen = true;
    },
    closeCart: (state, action) => {
      state.isOpen = false;
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.reduce((acc, el) => {
        if (el.id === action.payload) {
          el.count += 1;
        }
        acc.push(el);
        return acc;
      }, []);
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.reduce((acc, el) => {
        if (el.id === action.payload) {
          el.count -= 1;
        }
        if (el.count > 0) {
          acc.push(el);
        }
        return acc;
      }, []);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase("categories/changeActiveCategory", (state, action) => {
      state.isOpen = false;
    });
  },
});
export const { addToCart, openCart, closeCart, increaseCount, decreaseCount } =
  CartSlice.actions;
export default CartSlice.reducer;
