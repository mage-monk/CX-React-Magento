import React, { useEffect, useContext, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import MagentoConfig from "../../config/Magento";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { unsetMiniCart } from "../../api/cart";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const order = useSelector((state) => state.checkout.order_id);
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const [quoteId, setQuoteId] = useState(null);
  const orderId = location?.state?.orderId || 0;

  console.log("success order id", orderId);
  const getQuoteId = (id) => {
    if (id > 0) {
      ctx.setCartId(id);
      setQuoteId(id);
    }
  };

  const {
    isLoading,
    error,
    sendRequest: fetchQuoteId,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.quote.cart,
      method: "POST",
      token,
    },
    getQuoteId
  );

  useEffect(() => {
    if (orderId > 0) {
      fetchQuoteId();
      dispatch(unsetMiniCart());
    }
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            {orderId > 0 && (
              <div className="success">
                <div className="success_header">
                  <div className="check">
                    <AiOutlineCheckCircle size={50} className="icn" />
                  </div>
                </div>
                <div className="content">
                  <h1>Payment Success !</h1>
                  <p>
                    Thank you for purchasing with us, Your order number is{" "}
                    {orderId}. We received your purchase request. We'll email
                    you an order confirmation with details and tracking info!
                  </p>
                  <NavLink
                    className="fs-14 fw-6 ta-c cap h-48 b-box  d-il-block c-white ml-auto bg-green pt-15 pb-15 w100p"
                    to="/"
                    role="link"
                    state={{ id: 0 }}
                  >
                    Go to Home
                  </NavLink>
                </div>
              </div>
            )}
            {orderId === 0 && (
              <div className="alert alert-danger" role="alert">
                <RxCrossCircled size={50} className="p-10" />
                Sorry 😰! No order found!
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Success;
