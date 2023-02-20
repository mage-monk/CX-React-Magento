import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRelated, setRelatedElm } from "../../../../api/catalog";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MagentoConfig from "../../../../config/Magento";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Related = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const relatedCaro = useRef(null);

  const { sku } = location.state;
  const relatedProducts = [];
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    const skus = props?.skus || [];
    if (skus.length > 0) {
      dispatch(getRelated(skus)).then(function (related) {
        if (related?.length > 0) {
          related.map((rel) => {
            let image = null;
            let url = null;

            if (rel?.custom_attributes?.length > 0) {
              for (const attribute of rel.custom_attributes) {
                if (attribute.attribute_code === "image") {
                  image = attribute.value;
                }
                if (attribute.attribute_code === "url_key") {
                  url = attribute.value;
                }
              }
            }
            relatedProducts.push({
              id: rel.id,
              sku: rel.sku,
              name: rel.name,
              price: rel.price,
              image,
              url,
            });
          });
          setRelatedItems(relatedProducts);
        }
      });
    }
  }, [props, sku]);

  const onLoadHandler = () => {
    props.realtedLoad(relatedCaro);
  };

  return (
    <React.Fragment>
      {relatedItems.length > 0 && (
        <div
          className="bg-light-gray pt-32 pb-32"
          ref={relatedCaro}
          onLoad={onLoadHandler}
        >
          <div className="container-browser row center-xs">
            <div className="fw-6 mt-16 fs-18 lh-24 ls-032 mb-24">
              SIMILAR PRODUCTS
            </div>
            <div className="category-carousel pos-relt">
              <div className="cat-slide overflow-hidden ws-nowrap">
                <Carousel
                  responsive={responsive}
                  itemClass="realeted-product"
                  className="related-products"
                  partialVisible={false}
                >
                  {relatedItems.map((item) => (
                    <Link
                      to={`/product/${item.url}`}
                      state={{ sku: item.sku }}
                      title={item.name}
                      className="d-block c-main-gray cursor-default product-item cursor-pointer"
                      key={item.id}
                    >
                      <div className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden">
                        {item.image !== null &&
                          item.image !== "no_selection" && (
                            <img
                              className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden"
                              alt={item.name}
                              src={`${MagentoConfig.mediaUrl}catalog/product/${item.image}`}
                            />
                          )}

                        {(item.image === null ||
                          item.image === "no_selection") && (
                          <img
                            className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden"
                            alt={item.name}
                            src={`${MagentoConfig.thumb}`}
                          />
                        )}
                      </div>
                      <div className="m-0 mt-2 fw-4 pos-relt _title ws-normal pr-22">
                        <div className="d-il-block fw-4 c-dark-gray fw-6 ls-048 en-font fs-16 lh-20">
                          ${item.price}
                        </div>
                      </div>
                      <div className="m-0 fw-4 txt-overflow-ellipsis c-dark-gray fs-14 lh-18 ls-064 ">
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Related;
