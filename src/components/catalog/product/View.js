import React, { useState, useEffect, useCallback } from "react";
import styles from "./View.module.css";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import MagentoConfig from "../../../config/Magento";

import Media from "./view/Media";
import AddToCart from "./view/AddToCart";
import TabList from "./view/TabList";
import Related from "./view/Related";
import Share from "../../share/Share";

const View = (props) => {
  const location = useLocation();
  const { sku } = location.state;
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [relatedDiv, setRelatedDiv] = useState(null);
  const shareUrl = window.location.href;

  const getProduct = (productObject) => {
    productObject.image = null;
    const relatedProducts = [];
    setLoading(false);
    if (productObject?.custom_attributes.length > 0) {
      for (const loadedProduct of productObject?.custom_attributes) {
        if (loadedProduct.attribute_code === "image") {
          productObject.image = loadedProduct.value;
        }
      }
    }
    if (productObject?.product_links.length > 0) {
      productObject.product_links.map((rProd) => {
        if (rProd.link_type === "related") {
          relatedProducts.push(rProd.linked_product_sku);
        }
      });
      if (relatedProducts.length > 0) {
        setRelated(relatedProducts);
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
    setRelated([]);
    fetchProduct();
  }, [fetchProduct, sku]);

  const onSimilarClick = () => {
    relatedDiv.current.scrollIntoView({
      behavior: "smooth" /*or smooth*/,
      block: "nearest",
    });
  };
  const onRelatedElmLoad = (elm) => {
    setRelatedDiv(elm);
  };
  return (
    <React.Fragment>
      {loading && <div className="loading"></div>}
      {!loading && product.id && (
        <React.Fragment>
          <div className="pt-24 pb-24 flex between-xs overflow-hidden">
            <div className="pr-r-40 w100p">
              <div className="row">
                {product && (
                  <Media
                    mediaImgs={product.media_gallery_entries}
                    similarClick={onSimilarClick}
                  />
                )}
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
                <Share url={shareUrl} />
                {product.custom_attributes && (
                  <div className="pt-24 pb-24  between-xs">
                    <TabList productAttributes={product.custom_attributes} />
                  </div>
                )}
              </div>
            </div>
          </div>
          {related.length > 0 && (
            <Related skus={related} realtedLoad={onRelatedElmLoad} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default View;
