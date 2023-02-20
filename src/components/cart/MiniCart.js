import React, { useEffect, useContext, useState } from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { BsBag } from "react-icons/bs";
import AuthContext from "../../store/auth-context";
import { fetchCartItems, fetchCartTotals } from "../../api/cart";
import CartItems from "./CartItems";

import styles from "./MiniCart.module.css";

const MiniCart = (props) => {
  const dispatch = useDispatch();
  const ctx = useContext(AuthContext);
  const token = ctx?.token;

  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems(token));
      dispatch(fetchCartTotals(token));
    }
  }, [dispatch, token]);

  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const toggleCartHandle = () => {
    dispatch(uiActions.toggle());
  };
  const miniClass = showCart
    ? `${styles.minicart_active}`
    : `${styles.minicart_inactive}`;

  const wrapperClass = showCart
    ? `${styles.wrapper__active}`
    : `${styles.minicart__wrapper}`;

  const minicartCloseHandler = () => {
    dispatch(uiActions.toggle());
  };

  const counter = useSelector((state) => state.cart.item_count);
  return (
    <div className={`${wrapperClass}`}>
      <a className={styles.showcart} onClick={toggleCartHandle}>
        <BsBag size={25} />
        <span className={styles.text}>My Cart</span>
        <span className={styles.counter_qty}>
          <span className={styles.counter_number}>{counter}</span>
        </span>
      </a>

      <CartItems className={miniClass} minicartClose={minicartCloseHandler} />
    </div>
  );
};

export default MiniCart;
