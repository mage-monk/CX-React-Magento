import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer_id: null,
    customer: {},
    token: null,
    changed: false,
    loading: false,
  },
  reducers: {
    isLoading(state, action) {
      state.loading = action.payload.loader;
    },
    setCustomerInfo(state, action) {
      state.customer = action.payload.customer;
    },
    setCustomerToken(state, action) {
      state.token = action.payload.token;
    },
  },
});
export const customerActions = customerSlice.actions;
export default customerSlice;
