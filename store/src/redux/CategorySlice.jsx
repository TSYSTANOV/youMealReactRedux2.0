import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORIES_API } from "../api/api";

export const getCategories = createAsyncThunk(
  "category/fetch",
  async (param, thunkApi) => {
    try {
      const response = await fetch(CATEGORIES_API).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
);
const CategorySlice = createSlice({
  name: "categories",
  initialState: {
    activeCategory: "burger",
    categories: [],
  },
  reducers: {
    changeActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {});
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {});
  },
});
export const { changeActiveCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
