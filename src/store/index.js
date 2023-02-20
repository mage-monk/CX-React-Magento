// Redux store
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import checkoutSlice from "./checkout-slice";
import customerSlice from "./customer-slice";
import catalogSlice from "./catalog-slice";
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    customer: customerSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});
export default store;
