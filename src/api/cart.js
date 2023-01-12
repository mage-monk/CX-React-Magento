import React from "react";
import { uiActions } from "../store/ui-slice";
import { cartActions } from "../store/cart-slice";
import axios from "axios";
import MagentoConfig from "../config/Magento";

export const fetchCartItems = (token) => {
  return async (dispatch) => {
    const fetchItems = async () => {
      try {
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.quote.cart,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          return res.data;
        }
        return []; // Don't forget to return something
      } catch (err) {
        console.error(err);
      }
    };

    try {
      const cartData = await fetchItems(token);
      dispatch(
        cartActions.replaceCartItems({
          items: cartData.items || [],
          item_count: cartData.items_count || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const fetchCartTotals = (token) => {
  return async (dispatch) => {
    const fetchTotals = async () => {
      try {
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.quote.totals,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          return res.data;
        }
        return []; // Don't forget to return something
      } catch (err) {
        console.error(err);
      }
    };

    try {
      const cartTotals = await fetchTotals(token);
      //console.log(cartTotals);
      dispatch(
        cartActions.replaceCartTotals({
          subtotal: cartTotals.subtotal || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const unsetMiniCart = () => {
  return async (dispatch) => {
    try {
      dispatch(
        cartActions.replaceCartItems({
          items: [],
          item_count: 0,
        })
      );

      try {
        dispatch(
          cartActions.replaceCartTotals({
            subtotal: 0,
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching cart data failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
