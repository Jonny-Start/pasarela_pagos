import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

/**
 * Redux slice for managing products state.
 *
 * @typedef {Object} ProductSlice
 * @property {string} name - The name of the slice.
 * @property {any[]} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for the slice.
 * @property {Function} reducers.addAllProducts - Reducer function for adding all products.
 * @property {Function} reducers.changePrice - Reducer function for changing the price.
 */

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /**
     * Reducer function for adding all products.
     *
     * @param {any[]} state - The current state.
     * @param {Object} action - The action object.
     * @param {any[]} action.payload - The payload containing the products to be added.
     */
    addAllProducts: (state, action) => {
      action.payload.length > 1
        ? action.payload.forEach((product) => {
            state.push(product);
          })
        : state.push(action.payload);
    },
    /**
     * Reducer function for changing the price.
     *
     * @param {any[]} state - The current state.
     * @param {Object} action - The action object.
     * @param {number} action.payload - The new price value.
     */
    changePrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { addAllProducts, changePrice } = productSlice.actions;
export default productSlice.reducer;
