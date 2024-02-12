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
  },
});

export const {
  addProduct,
  removeProduct,
  moreUnit,
  lessUnit,
  addAllProductsCart,
} = cartSlice.actions;
export default cartSlice.reducer;
