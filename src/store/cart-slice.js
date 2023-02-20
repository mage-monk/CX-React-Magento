import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    item_count: 0,
    changed: false,
    subtotal: 0,
  },
  reducers: {
    replaceCartItems(state, action) {
      state.items = action.payload.items;
      state.item_count = action.payload.item_count;
    },
    replaceCartTotals(state, action) {
      state.subtotal = action.payload.subtotal;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.item_id === newItem.item_id
      );
      //state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          item_id: newItem.item_id,
          price: newItem.price,
          qty: 1,
          name: newItem.name,
          image: newItem.image,
        });
        state.item_count = state.item_count + 1;
      } else {
        existingItem.qty++;
      }
      state.subtotal = state.subtotal + newItem.price;
    },
    removeItemFromCart(state, action) {
      // const id = action.payload;
      // const existingItem = state.items.find((item) => item.id === id);
      // state.totalQuantity--;
      // if (existingItem.quantity === 1) {
      //   state.items = state.items.filter((item) => item.id !== id);
      // } else {
      //   existingItem.quantity--;
      //   existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      // }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
