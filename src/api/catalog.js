import React from "react";
import { uiActions } from "../store/ui-slice";
import { catalogActions } from "../store/catalog-slice";
import axios from "axios";
import MagentoConfig from "../config/Magento";

export const getProducts = (id, appliedFilters = "") => {
  return async (dispatch) => {
    const fetchProducts = async () => {
      let searchCriteria = `searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[filter_groups][1][filters][1][field]=visibility&searchCriteria[filter_groups][1][filters][1][value]=4&searchCriteria[filter_groups][1][filters][1][condition_type]=eq&searchCriteria[filter_groups][2][filters][2][field]=type_id&searchCriteria[filter_groups][2][filters][2][value]=simple&searchCriteria[filter_groups][2][filters][2][condition_type]=eq&searchCriteria[filter_groups][3][filters][3][field]=status&searchCriteria[filter_groups][3][filters][3][value]=1&searchCriteria[filter_groups][3][filters][3][condition_type]=eq`;

      if (appliedFilters.length > 0) {
        searchCriteria += appliedFilters;
        //console.log(searchCriteria);
      }
      searchCriteria += `&fields=items[id,sku,name,url,price,custom_attributes]`;
      try {
        dispatch(
          catalogActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.category + searchCriteria,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${MagentoConfig.authentication.integration.access_token}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            catalogActions.isLoading({
              loader: false,
            })
          );
          if (appliedFilters.length > 0) {
            dispatch(
              catalogActions.applyFilters({
                applied: true,
              })
            );
          } else {
            dispatch(
              catalogActions.applyFilters({
                applied: false,
              })
            );
          }
          return res.data;
        }
        return []; // Don't forget to return something
      } catch (err) {
        console.error(err);
      }
    };

    try {
      const products = await fetchProducts(id, appliedFilters);
      const categoryProducts = [];
      if (products?.items?.length > 0) {
        let image = null;
        let url = null;
        for (const product of products?.items) {
          if (product.custom_attributes.length > 0) {
            for (const attribute of product.custom_attributes) {
              if (attribute.attribute_code === "image") {
                image = attribute.value;
              }
              if (attribute.attribute_code === "url_key") {
                url = attribute.value;
              }
            }
          }
          categoryProducts.push({
            id: product?.id,
            sku: product?.sku,
            name: product?.name,
            price: product?.price,
            image,
            url,
          });
        }
      }
      return categoryProducts;
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

export const getFilters = () => {
  return async (dispatch) => {
    const fetchFilters = async () => {
      const searchCriteria = `searchCriteria[filterGroups][0][filters][0][field]=attribute_code&searchCriteria[filterGroups][0][filters][0][condition_type]=in&searchCriteria[filterGroups][0][filters][0][value]=color,size,new,sale&fields=items[attribute_code,frontend_input,options]`;
      try {
        dispatch(
          catalogActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.filters + searchCriteria,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${MagentoConfig.authentication.integration.access_token}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            catalogActions.isLoading({
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
      const filters = await fetchFilters();
      return filters?.items || [];
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

export const getRelated = (skus) => {
  return async (dispatch) => {
    const getRelatedProducts = async () => {
      const searchCriteria = `searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${skus}&searchCriteria[filter_groups][0][filters][0][condition_type]=in&searchCriteria[filter_groups][1][filters][1][field]=visibility&searchCriteria[filter_groups][1][filters][1][value]=4&searchCriteria[filter_groups][1][filters][1][condition_type]=eq&searchCriteria[filter_groups][2][filters][2][field]=type_id&searchCriteria[filter_groups][2][filters][2][value]=simple&searchCriteria[filter_groups][2][filters][2][condition_type]=eq&searchCriteria[filter_groups][3][filters][3][field]=status&searchCriteria[filter_groups][3][filters][3][value]=1&searchCriteria[filter_groups][3][filters][3][condition_type]=eq&fields=items[id,sku,name,price,url,custom_attributes]`;

      try {
        dispatch(
          catalogActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: MagentoConfig.url + MagentoConfig.api.search + searchCriteria,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": 86400,
            responseType: "json",
            Authorization: `Bearer ${MagentoConfig.authentication.integration.access_token}`,
          },
        });
        if (res.status == 200) {
          dispatch(
            catalogActions.isLoading({
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
      const related = await getRelatedProducts(skus);
      //   if (related?.items.length > 0) {
      //     dispatch(
      //       catalogActions.setRelated({
      //         skus: related?.items || [],
      //       })
      //     );
      //   }
      return related?.items || [];
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

export const search = (q) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const searchUrl = process.env.REACT_APP_ELASTICSEARCH_URL;
      const searchIndex = process.env.REACT_APP_ELASTICSEARCH_INDEX;
      const query = {
        query: {
          bool: {
            should: [
              {
                match: {
                  name: {
                    query: "relaxed fit sweatshirt",
                  },
                },
              },
            ],
          },
        },
      };
      //console.log(query);
      try {
        dispatch(
          catalogActions.isLoading({
            loader: true,
          })
        );
        let res = await axios({
          url: searchUrl + "magento2_product_1_v2/_search?pretty&q=relaxed",
          method: "GET",

          headers: {
            // "Content-Type": "application/json",
            // responseType: "json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
            "Access-Control-Allow-Headers": "x-requested-with, Content-Type",
          },
        });
        if (res.status == 200) {
          dispatch(
            catalogActions.isLoading({
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
      const result = await fetchData(q);
      //   if (related?.items.length > 0) {
      //     dispatch(
      //       catalogActions.setRelated({
      //         skus: related?.items || [],
      //       })
      //     );
      //   }
      console.log("Search ", result);
      return result || [];
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

export const setRelatedElm = (elm) => {
  return async (dispatch) => {
    try {
      dispatch(
        catalogActions.relatedDiv({
          elm: elm || null,
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
