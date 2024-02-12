import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   {
  //     id: 1,
  //     name: "",
  //     img: "https://via.placeholder.com/150",
  //     priceUnit: 0,
  //     quantity: 0,
  //   },
};

/**
 * Redux slice for managing the cart state.
 *
 * @typedef {Object} CartSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the cart.
 * @property {Function} reducers.addProduct - Reducer function for adding a product to the cart.
 * @property {Function} reducers.removeProduct - Reducer function for removing a product from the cart.
 * @property {Function} reducers.moreUnit - Reducer function for increasing the quantity of a product in the cart.
 * @property {Function} reducers.lessUnit - Reducer function for decreasing the quantity of a product in the cart.
 * @property {Function} reducers.addAllProductsCart - Reducer function for adding all products to the cart.
 * @property {Function} reducers.removeAllProductsCart - Reducer function for removing all products from the cart.
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { id, name, img, priceUnit, quantity } = action.payload;
      state.cart.push({ id, name, img, priceUnit, quantity });
    },

    removeProduct: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((product) => product.id !== id);
    },

    moreUnit: (state, action) => {
      const id = action.payload;
      state.cart.map((product) => {
        if (product.id === id) {
          product.quantity++;
        }
      });
    },

    lessUnit: (state, action) => {
      const id = action.payload;
      state.cart.map((product) => {
        if (product.id === id) {
          product.quantity--;
        }
      });
    },

    addAllProductsCart: (state, action) => {
      state.cart = action.payload;
    },

    removeAllProductsCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  moreUnit,
  lessUnit,
  addAllProductsCart,
  removeAllProductsCart,
} = cartSlice.actions;
export default cartSlice.reducer;
