import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_API } from "../api/api";

export const getProducts = createAsyncThunk(
  "products/fetch",
  async (category, thunkApi) => {
    try {
      const res = await fetch(PRODUCTS_API + `${category}`).then((res) =>
        res.json()
      );
      return res;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsList = action.payload;
    });
  },
});

export default ProductsSlice.reducer;
