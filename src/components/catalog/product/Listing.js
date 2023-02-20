import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./Listing.module.css";
import Name from "../../ui/name/Name";
import Price from "../../ui/price/Price";
import Image from "../../ui/image/Image";
import useHttp from "../../../hooks/use-http";
import MagentoConfig from "../../../config/Magento";
const Listing = (props) => {
  const location = useLocation();
  const { id } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = (catObject) => {
    setLoading(false);
    //console.log(catObject?.items === null);
    const categoryProducts = [];
    if (catObject?.items !== null) {
      let image = null;
      let url = null;
      for (const product of catObject?.items) {
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
    setProducts(categoryProducts);
  };
  const searchCriteria = `searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&fields=items[id,sku,name,url,price,custom_attributes]`;
  const {
    isLoading,
    error,
    sendRequest: categoryProducts,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.category + searchCriteria,
    },
    getProducts
  );
  useEffect(() => {
    setLoading(true);
    categoryProducts();
  }, [categoryProducts, id]);

  return (
    <div>
      {loading && <div className="loading"></div>}
      {!loading && products.length > 0 && (
        <div className="row mb-32">
          {products.map((product) => (
            <Link
              to={`/product/${product.url}`}
              state={{ sku: product.sku }}
              className={`${styles.c__main__gray} ${styles.cursor__pointer} col-xs-6 col-lg-3 col-md-4  product-item `}
              key={product.id}
            >
              <div
                className={`${styles.prod__list__item} ml-5 mr-5 prod-list-item c-main-gray mb-20`}
              >
                <div className={`${styles._thumb} pos-relt`}>
                  <div
                    className={`${styles._inner} bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden`}
                  >
                    {product.image !== null &&
                      product.image !== "no_selection" && (
                        <img
                          className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden"
                          alt={product.name}
                          src={`${MagentoConfig.mediaUrl}catalog/product/${product.image}`}
                        />
                      )}

                    {(product.image === null ||
                      product.image === "no_selection") && (
                      <img
                        className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden"
                        alt={product.name}
                        src={`${MagentoConfig.thumb}`}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.pr__22} ${styles.mt__5} m-0 fw-4 pos-relt _title ws-normal`}
                >
                  <div className="d-il-block fw-4 c-dark-gray fw-6 ls-048 en-font fs-16 lh-20">
                    ${product.price}
                  </div>
                </div>
                <div
                  className={`${styles.c__dark__gray} ${styles.txt__overflow__ellipsis} ${styles.mt__4} m-0 fw-4 fs-14 lh-18 ls-064 `}
                >
                  <span>{product.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && (
        <div className={styles.message__empty}>
          <div>We can't find products matching the selection.</div>
        </div>
      )}
    </div>
  );
};

export default Listing;
