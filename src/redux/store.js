import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import appReducer from "./appSlice.js";
import cartReducer from "./cartSlice.js";
import stepPayReducer from "./stepPaySlice.js";

/**
 * Redux store configuration.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
const store = configureStore({
  reducer: {
    products: productsReducer,
    app: appReducer,
    cart: cartReducer,
    stepPay: stepPayReducer,
  },
});

export default store;
