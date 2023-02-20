import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Totals from "./Totals";

const Items = () => {
  const items = useSelector((state) => state.checkout.totals);
  console.log(items);

  return (
    <React.Fragment>
      <div className="c-header-title checkout_title">Order Summary</div>
      <div className="summary__cart_container">
        <div className="summary__cart_wrapper">
          <ol className="summary_items">
            <li className="product_item">
              <div className="product">
                <span className="product__image_container">
                  <span className="product__image_container">
                    <img
                      src="https://claue2.arrowtheme.com/media/catalog/product/cache/3436aef564c89fc2edeeb87b35992612/6/_/6_1_1_6.jpg"
                      width="78"
                      height="78"
                      alt="Tuk Peacock Shoes"
                      title="Tuk Peacock Shoes"
                    />
                  </span>
                </span>
                <div className="product__item_details">
                  <div className="product__item_inner">
                    <div className="product__item_name_block">
                      <a href="abc">ABC</a>
                    </div>
                    <div className="product__item_qty_block">
                      <div className="details_qty">
                        <span className="label">
                          <span>QTY:</span>
                        </span>
                        <div className="control">
                          <input type="input" className="item_qty" value="10" />
                        </div>
                      </div>
                    </div>
                    <div className="subtotal">
                      <div className="subtotal">
                        <span className="cart_price">
                          <span className="price">$150</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="product_item">
              <div className="product">
                <span className="product__image_container">
                  <span className="product__image_container">
                    <img
                      src="https://claue2.arrowtheme.com/media/catalog/product/cache/3436aef564c89fc2edeeb87b35992612/6/_/6_1_1_6.jpg"
                      width="78"
                      height="78"
                      alt="Tuk Peacock Shoes"
                      title="Tuk Peacock Shoes"
                    />
                  </span>
                </span>
                <div className="product__item_details">
                  <div className="product__item_inner">
                    <div className="product__item_name_block">
                      <a href="abc">ABC</a>
                    </div>
                    <div className="product__item_qty_block">
                      <div className="details_qty">
                        <span className="label">
                          <span>QTY:</span>
                        </span>
                        <div className="control">
                          <input type="input" className="item_qty" value="10" />
                        </div>
                      </div>
                    </div>
                    <div className="subtotal">
                      <div className="subtotal">
                        <span className="cart_price">
                          <span className="price">$150</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <Totals></Totals>
    </React.Fragment>
  );
};

export default Items;
