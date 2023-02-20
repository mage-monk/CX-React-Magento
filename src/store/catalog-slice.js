import { createSlice } from "@reduxjs/toolkit";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    filterApplied: false,
    hasProducts: false,
    related: [],
    relatedDiv: null,
    loading: false,
  },
  reducers: {
    isLoading(state, action) {
      state.loading = action.payload.loader;
    },
    setHasProducts(state, action) {
      state.hasProducts = action.payload.hasProducts;
    },
    applyFilters(state, action) {
      state.filterApplied = action.payload.applied;
    },
    setRelated(state, action) {
      state.related = action.payload.skus;
    },
    relatedDiv(state, action) {
      state.relatedDiv = action.payload.elm;
    },
  },
});
export const catalogActions = catalogSlice.actions;
export default catalogSlice;
