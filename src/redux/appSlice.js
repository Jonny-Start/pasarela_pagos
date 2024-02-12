import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
  loading: false,
};
/**
 * Redux slice for managing the 'app' state.
 *
 * @typedef {Object} AppSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {boolean} initialState.loading - The loading state.
 * @property {Array} initialState.message - The array of messages.
 * @property {Function} reducers.changeLoading - Reducer function to change the loading state.
 * @property {Function} reducers.addMessage - Reducer function to add a message to the array.
 * @property {Function} reducers.removeAllMessages - Reducer function to remove all messages from the array.
 */

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /**
     * Reducer function to change the loading state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action object.
     * @param {boolean} action.payload - The new loading state.
     */
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },

    /**
     * Reducer function to add a message to the array.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action object.
     * @param {Object} action.payload - The message object to be added.
     * @param {string} action.payload.type - The type of the message.
     * @param {string} action.payload.title - The title of the message.
     * @param {string} action.payload.time - The time of the message.
     * @param {string} action.payload.body - The body of the message.
     */
    addMessage: (state, action) => {
      const { type, title, time, body } = action.payload;
      if (!state.message) {
        state.message = [];
      }
      state.message.push({ type, title, time, body });
    },

    /**
     * Reducer function to remove all messages from the array.
     *
     * @param {Object} state - The current state.
     */
    removeAllMessages: (state) => {
      state.message = [];
    },
  },
});

export const { changeLoading, addMessage, removeAllMessages } =
  appSlice.actions;
export default appSlice.reducer;
