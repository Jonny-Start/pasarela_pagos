import { createSlice } from "@reduxjs/toolkit";

const initialState = { stepMethod: "", stepData: "" };
/**
 * Redux slice for managing the payment step in a payment gateway.
 *
 * @typedef {Object} StepPayState
 * @property {string} stepMethod - The selected payment method.
 * @property {string} stepData - The payment Data.
 *
 * @typedef {Object} StepPayAction
 * @property {string} type - The type of the action.
 * @property {*} payload - The payload of the action.
 *
 * @typedef {Object} StepPaySlice
 * @property {StepPayState} initialState - The initial state of the slice.
 * @property {Object.<string, function>} reducers - The reducer functions for updating the state.
 *
 * @type {StepPaySlice}
 */
export const stepPaySlice = createSlice({
  name: "stepPay",
  initialState,
  reducers: {
    /**
     * Sets the selected payment method.
     *
     * @param {StepPayState} state - The current state.
     * @param {StepPayAction} action - The action object.
     */
    setStepMethod: (state, action) => {
      state.stepMethod = action.payload;
    },

    /**
     * Sets the payment Data.
     *
     * @param {StepPayState} state - The current state.
     * @param {StepPayAction} action - The action object.
     */
    setStepData: (state, action) => {
      state.stepData = action.payload;
    },

    /**
     * Removes the selected payment method.
     *
     * @param {StepPayState} state - The current state.
     */
    removeStepMethod: (state) => {
      state.stepMethod = "";
    },

    /**
     * Removes the payment Data.
     *
     * @param {StepPayState} state - The current state.
     */
    removeStepData: (state) => {
      state.stepData = "";
    },

    /**
     * Change all the payment step state to the localStorage state.
     *
     * @param {StepPayState} state - The current state.
     */
    changeStepPayState: (state, action) => {
      const { stepMethod, stepData } = action.payload
        ? action.payload
        : initialState;
      state.stepMethod = stepMethod ? stepMethod : "";
      state.stepData = stepData ? stepData : "";
    },
  },
});

export const {
  setStepMethod,
  setStepData,
  removeStepMethod,
  removeStepData,
  changeStepPayState,
} = stepPaySlice.actions;
export default stepPaySlice.reducer;
