import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../store/cart-slice";
import { uiActions } from "../../../../store/ui-slice";
import AuthContext from "../../../../store/auth-context";
import MagentoConfig from "../../../../config/Magento";
import useHttp from "../../../../hooks/use-http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Login from "../../../customer/login/Login";

const AddToCart = (props) => {
  const { id, sku, name, price, image } = props;
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const ctx = useContext(AuthContext);
  const token = ctx.token || null;
  const cartId = ctx.cartId || null;

  //console.log(token);
  const addItemToQuote = (item) => {
    const addedProduct = {
      item_id: item.item_id,
      sku: item.sku,
      name: item.name,
      price: item.price,
      image: image,
    };
    setLoading(false);
    dispatch(cartActions.addItemToCart(addedProduct));
    if (!showCart) dispatch(uiActions.toggle());
  };

  const {
    isLoading: loader,
    error: hasError,
    sendRequest: setQuoteItem,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.quote.addtocart,
      method: "POST",
      token,
    },
    addItemToQuote
  );
  useEffect(() => {}, [setQuoteItem]);

  const addToCartHandler = () => {
    //console.log(token);
    if (token === null) {
      setLoggedIn(false);
      setShow(true);
    } else {
      setLoggedIn(true);
      setShow(false);
      if (ctx.cartId > 0) {
        setLoading(true);
        const itemData = {
          cartItem: {
            sku,
            qty: 1,
            quote_id: ctx.cartId,
          },
        };

        setQuoteItem(itemData);
      }
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <React.Fragment>
      {loading && (
        <div className="addto__overlay">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login to Add Product into Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login></Login>
        </Modal.Body>
      </Modal>

      <div className="flex middle-xs bitween-xs mb-16">
        <div className="w100p pr-r-15">
          <a
            className="fs-14 fw-6 ta-c cap h-48 b-box br-3 d-il-block c-white ml-auto bg-green pt-15 pb-15 w100p"
            role="button"
            id="addToBag"
            onClick={addToCartHandler}
          >
            <div className="flex center-xs">
              <div className="">Add to Bag</div>
            </div>
          </a>
        </div>
        <div className="flex ml-auto b-light-gray br-1 pos-relt">
          <FontAwesomeIcon icon={faHeart} className="m-15" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddToCart;
