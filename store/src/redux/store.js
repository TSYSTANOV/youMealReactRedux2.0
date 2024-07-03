import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import ProductsSlice from "./ProductsSlice";
import ModalItemSlice from "./ModalItemSlice";
import CartSlice from "./CartSlice";
import ModalOrderSlice from "./ModalOrderSlice";

export const store = configureStore({
  reducer: {
    categories: CategorySlice,
    products: ProductsSlice,
    modal: ModalItemSlice,
    cart: CartSlice,
    order: ModalOrderSlice,
  },
});
