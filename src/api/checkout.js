import React from "react";
import { uiActions } from "../store/ui-slice";
import { checkoutActions } from "../store/checkout-slice";
import axios from "axios";
import MagentoConfig from "../config/Magento";

export const estimatedShipping = (token, address) => {
  return async (dispatch) => {
    const getEstimatedShippingMethods = async () => {
      try {
        dispatch(
          checkoutActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.checkout.shipping.methods,
          data: address,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            checkoutActions.isLoading({
              loader: false,
            })
          );
          return res.data;
        }
        return []; // Don't forget to return something
      } catch (err) {
        console.error(err);
      }
    };

    try {
      const methodsInfo = await getEstimatedShippingMethods(token, address);

      //console.log(address);
      dispatch(
        checkoutActions.estimatedShippingMethods({
          methods: methodsInfo || [],
          address: address || {},
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

export const saveShippingInfoAndGetPayments = (token, addressObject) => {
  return async (dispatch) => {
    const setShippingInfo = async () => {
      try {
        dispatch(
          checkoutActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.checkout.payment.methods,
          data: addressObject,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            checkoutActions.isLoading({
              loader: false,
            })
          );
          return res.data;
        }
        return []; // Don't forget to return something
      } catch (err) {
        console.error(err);
      }
    };

    try {
      const methodsInfo = await setShippingInfo(token, addressObject);
      dispatch(
        checkoutActions.availablePaymentMethods({
          payment_methods: methodsInfo.payment_methods || [],
          totals: methodsInfo.totals || {},
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

export const placeOrder = (token, paymentInfo) => {
  return async (dispatch) => {
    const place = async () => {
      try {
        dispatch(
          checkoutActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.checkout.order.place,
          data: paymentInfo,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            checkoutActions.isLoading({
              loader: false,
            })
          );
          return res.data;
        }
        return []; // Don't forget to return something
      } catch (err) {
        console.error(err);
      }
    };

    try {
      const orderId = await place(token, paymentInfo);
      dispatch(
        checkoutActions.placeOrder({
          order_id: orderId || 0,
        })
      );
      return orderId;
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
