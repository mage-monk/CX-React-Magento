import React, { useState, useEffect } from "react";
import styles from "./View.module.css";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import MagentoConfig from "../../../config/Magento";

import Media from "./view/Media";
import AddToCart from "./view/AddToCart";
import TabList from "./view/TabList";

const View = (props) => {
  const location = useLocation();
  const { sku } = location.state;
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});
  const getProduct = (productObject) => {
    productObject.image = null;
    setLoading(false);
    if (productObject?.custom_attributes.length > 0) {
      for (const loadedProduct of productObject?.custom_attributes) {
        if (loadedProduct.attribute_code === "image") {
          productObject.image = loadedProduct.value;
        }
      }
    }
    setProduct(productObject);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchProduct,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.product + sku,
    },
    getProduct
  );
  useEffect(() => {
    setLoading(true);
    fetchProduct();
  }, [fetchProduct, sku]);

  return (
    <React.Fragment>
      {loading && <div className="loading"></div>}
      {!loading && product.id && (
        <React.Fragment>
          <div className="pt-24 pb-24 flex between-xs">
            <div className="pr-r-40 w100p">
              <div className="row">
                {product && <Media mediaImgs={product.media_gallery_entries} />}
              </div>
            </div>
            <div>
              <div className="w-380 pt-16">
                {product.name && (
                  <div className="fs-16 lh-20 ls-073 c-dark-gray mt-8">
                    <h1>{product.name}</h1>
                  </div>
                )}
                {product.price && (
                  <div className="fs-18 lh-24 ls-032 mt-8 fw-6">
                    <div className="flex middle-xs">
                      <div className="fs-18 fw-6 c-dark-gray middle-xs en-font">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                )}
                {product.status && (
                  <React.Fragment>
                    <AddToCart
                      sku={product.sku}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                    />
                    <hr className="bg-very-light-pink-gray mb-16 mt-6" />
                    <div>
                      <div className="flex middle-xs mb-15" role="button">
                        <div className="fw-5 c-main-gray fs-14 lh-18 ls-064">
                          Product Information
                        </div>
                        <div className="flex middle-xs ml-auto">
                          <div className="rot-180 transition-03">
                            <div></div>
                          </div>
                        </div>
                      </div>
                      <div className="c-dark-gray fs-12 pos-relt">
                        <div className="flex mb-8 fs-12 lh-16 ls-072">
                          <div className="fw-5">Product Code:</div>
                          <div className="col-xs-6 en-font c-brown-gray ml-r-5">
                            <p>{product.sku}</p>
                          </div>
                        </div>
                        <div className="flex mb-8 fs-12 lh-16 ls-072">
                          <div className="fw-5">ISBN:</div>
                          <div className="col-xs-6 en-font c-brown-gray ml-r-5">
                            <p>{product.sku}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>

          {product.custom_attributes && (
            <div className="pt-24 pb-24 flex between-xs">
              <TabList productAttributes={product.custom_attributes} />
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default View;
