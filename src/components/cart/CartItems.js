import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MagentoConfig from "../../config/Magento";
import { uiActions } from "../../store/ui-slice";
import classes from "./CartItems.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const CartItems = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let items = [];
  let subtotal = 0;
  useSelector((state) => {
    items = state.cart.items;
    subtotal = state.cart.subtotal;
  });
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const proceedToCheckout = () => {
    if (showCart) dispatch(uiActions.toggle());
    navigate("/checkout/shipping");
  };

  return (
    <div className={classes.block__minicart}>
      <div className={`${classes.minicart} ${props.className}`}>
        <h3 className={classes.close__minicart}>
          Mini Cart
          <button id="close-minicart" onClick={props.minicartClose}>
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
        </h3>
        <div className={classes.minicart__items_wrapper}>
          <ul className={classes.minicart__items_ul}>
            {items.length > 0 &&
              items.map((item, index) => (
                <li key={index} className={classes.item}>
                  <div className={classes.product__item}>
                    <div className={classes.product}>
                      <div className={classes.product__item_photo}>
                        <span className={classes.product__image_container}>
                          <span className={classes.product__image_wrapper}>
                            {item?.extension_attributes?.image &&
                              item?.extension_attributes?.image !==
                                "no_selection" && (
                                <img
                                  src={`${MagentoConfig.mediaUrl}catalog/product${item.extension_attributes.image}`}
                                  alt={`${item.name}`}
                                />
                              )}

                            {item?.image && (
                              <img
                                src={`${MagentoConfig.mediaUrl}catalog/product${item.image}`}
                                alt={`${item.name}`}
                              />
                            )}

                            {(item.image === null ||
                              item.image === "no_selection") && (
                              <img src={MagentoConfig.thumb} />
                            )}
                          </span>
                        </span>
                      </div>
                      <div className={classes.product__item_details}>
                        <strong className={classes.product__item_name}>
                          {item.name}
                        </strong>
                        <div className={classes.product__item__pricing}>
                          <div className={classes.price}>
                            <span className={classes.itemprice}>
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <div className={classes.details__qty}>
                            <label>Qty:</label>
                            <span className={classes.cart__item_qty}>
                              {item.qty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            {items.length === 0 && (
              <li>
                <h2>Shopping Cart is Empty 😰</h2>
              </li>
            )}
          </ul>
        </div>
        {items.length > 0 && (
          <React.Fragment>
            <div className={classes.subtotal}>
              <span className={classes.label}>
                <span>Total</span>
              </span>
              <div className={classes.amount}>
                <span className={classes.price_wrapper}>
                  <span className={classes.price}>${subtotal}</span>
                </span>
              </div>
            </div>
            <div className="flex middle-xs bitween-xs mb-16">
              <div className="w100p p-10">
                <a
                  className="fs-14 fw-6 ta-c cap h-48 b-box br-40 d-il-block c-white ml-auto bg-green pt-15 pb-15 w100p"
                  onClick={proceedToCheckout}
                  role="link"
                >
                  <div className="flex center-xs">
                    <div>Proceed to Checkout</div>
                  </div>
                </a>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CartItems;
