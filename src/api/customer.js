import React from "react";
import { uiActions } from "../store/ui-slice";
import { customerActions } from "../store/customer-slice";
import axios from "axios";
import MagentoConfig from "../config/Magento";

export const customerToken = (credentials) => {
  return async (dispatch) => {
    const getCustomerToken = async () => {
      try {
        dispatch(
          customerActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.customer.token,
          method: "POST",
          data: credentials,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
          },
        });
        if (res.status == 200) {
          dispatch(
            customerActions.isLoading({
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
      const token = await getCustomerToken(credentials);
      if (token) {
        dispatch(
          customerActions.setCustomerToken({
            token: token || null,
          })
        );
      }
      return token || null;
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
export const customerInfo = (token) => {
  return async (dispatch) => {
    const getCustomer = async () => {
      try {
        dispatch(
          customerActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.customer.info,
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
          dispatch(
            customerActions.isLoading({
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
      const customer = await getCustomer(token);

      if (customer?.id) {
        dispatch(
          customerActions.setCustomerInfo({
            customer: customer || {},
          })
        );
        sessionStorage.setItem("id", customer.id);
      }
      return customer || {};
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

export const customerOrders = (customerId, adminToken) => {
  return async (dispatch) => {
    const getOrders = async () => {
      try {
        const searchCriteria = `searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=${customerId}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&fields=items[entity_id,increment_id,customer_firstname,customer_lastname,customer_email,subtotal,shipping_amount,discount_amount,grand_total,status,created_at]`;
        dispatch(
          customerActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url:
            MagentoConfig.url +
            MagentoConfig.api.customer.orders +
            searchCriteria,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${adminToken}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            customerActions.isLoading({
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
      const orders = await getOrders(customerId, adminToken);

      return orders || {};
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
