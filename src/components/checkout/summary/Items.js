import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Totals from "./Totals";
import MagentoConfig from "../../../config/Magento";

const Items = () => {
  const [summary, setSummary] = useState({});
  const quotedata = useSelector((state) => state.checkout.totals);
  useEffect(() => {
    setSummary(quotedata);
  }, [quotedata]);
  //console.log(summary);
  return (
    <React.Fragment>
      {summary?.items?.length > 0 && (
        <React.Fragment>
          <div className="c-header-title checkout_title">Order Summary</div>
          <div className="summary__cart_container">
            <div className="summary__cart_wrapper">
              <ol className="summary_items">
                {summary?.items?.map((item, index) => (
                  <li key={index} className="product_item">
                    <div className="product">
                      <span className="product__image_container">
                        <span className="product__image_container">
                          {item?.extension_attributes?.image &&
                            item?.extension_attributes?.image !==
                              "no_selection" && (
                              <img
                                src={`${MagentoConfig.mediaUrl}catalog/product${item.extension_attributes.image}`}
                                alt={`${item.name}`}
                                title={item.name}
                                width="78"
                                height="78"
                              />
                            )}

                          {item?.image && (
                            <img
                              src={`${MagentoConfig.mediaUrl}catalog/product${item.image}`}
                              alt={`${item.name}`}
                              title={item.name}
                              width="78"
                              height="78"
                            />
                          )}
                        </span>
                      </span>
                      <div className="product__item_details">
                        <div className="product__item_inner">
                          <div className="product__item_name_block">
                            <Link
                              to={`/product/${item?.extension_attributes?.url_key}`}
                              state={{ sku: item?.extension_attributes?.sku }}
                            >
                              {item.name}
                            </Link>
                            <span>SKU:{item?.extension_attributes?.sku}</span>
                          </div>
                          <div className="product__item_qty_block">
                            <div className="details_qty">
                              <span className="label">
                                <span>QTY:</span>
                              </span>
                              <div className="control">
                                <input
                                  type="input"
                                  className="item_qty"
                                  defaultValue={item.qty}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="product__item_subtotal_block subtotal">
                            <div className="subtotal">
                              <span className="cart_price">
                                <span className="price">${item.price}</span>
                              </span>
                            </div>
                          </div>
                          <div className="subtotal">
                            <div className="subtotal">
                              <span className="cart_price">
                                <span className="price">${item.row_total}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Totals totals={quotedata?.total_segments} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Items;
