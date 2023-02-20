import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../../store/auth-context";
import Items from "./summary/Items";
import { placeOrder } from "../../api/checkout";

import Card from "../ui/card/Card";

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const methods = useSelector((state) => state.checkout.payment_methods);
  const loading = useSelector((state) => state.checkout.loading);

  useEffect(() => {}, [methods]);
  const backToAddressPage = () => {
    navigate("/checkout/shipping");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (method) => {
    const saveAddress = JSON.parse(sessionStorage.getItem("shipping-address"));
    if (Object.keys(saveAddress).length > 0) {
      const orderInfo = {
        paymentMethod: method,
        billing_address: saveAddress,
      };
      dispatch(placeOrder(token, orderInfo)).then(function (orderId) {
        if (orderId > 0) {
          navigate("/order/success/", { state: { orderId: orderId } });
          ctx.onSuccess();
          sessionStorage.removeItem("shipping-address");
        }
      });
    }
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
      {!loading && methods.length > 0 && (
        <Card className="p-20 mb-20 clearfix rounded-0">
          <div className="c-header-title checkout_title">Payment Methods</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="clearfix mb-20 p-10">
              {methods.map((method, index) => (
                <React.Fragment key={method.code}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      id={method.code}
                      {...register("method", { required: true })}
                      value={method.code}
                    />
                    <label className="form-check-label" htmlFor={method.code}>
                      {method.title}
                    </label>
                  </div>
                  {methods.length != index + 1 && <hr />}
                </React.Fragment>
              ))}

              {errors.method?.type === "required" && (
                <div className="text-danger mt-3">
                  Please Select Payment Method.
                </div>
              )}
            </div>
            <Items />
            <React.Fragment>
              <div className="flex middle-xs bitween-xs mb-16 clearfix">
                <div className="w50p p-10 ">
                  <a
                    onClick={backToAddressPage}
                    className="fs-14 fw-6 ta-c cap h-48 b-box  d-il-block c-white ml-auto bg-black-light pt-15 pb-15 w33p border-none"
                    role="link"
                  >
                    <div className="flex center-xs">
                      <div>Back</div>
                    </div>
                  </a>
                </div>
                <div className="w50p p-10 ">
                  <button
                    className="Button float_right fw-6 fs-14 cap b-box br-3 b-green bg-green b-none c-white p-10 w33p primary cap mt-16 border-none h-48"
                    type="submit"
                    role="button"
                  >
                    <span className="Action">
                      <span className="fs-14 lh-20 ls-16 fw-6">
                        Place Order
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          </form>
        </Card>
      )}
      {!loading && methods.length === 0 && (
        <React.Fragment>
          <div className="alert alert-danger">
            <div>No Payment Method is Available.</div>
          </div>
          <React.Fragment>
            <div className="flex middle-xs bitween-xs mb-16">
              <div className="w50p p-10 ">
                <a
                  role="link"
                  onClick={backToAddressPage}
                  className="fs-14 fw-6 ta-c cap h-48 b-box  d-il-block c-white ml-auto bg-black-light pt-15 pb-15 w33p border-none"
                >
                  <div className="flex center-xs">
                    <div>Back</div>
                  </div>
                </a>
              </div>
              <div className="w50p p-10 ">
                <a
                  role="link"
                  className="disabled fs-14 fw-6 ta-c cap h-48 b-box  d-il-block c-white ml-auto bg-green pt-15 pb-15 w33p border-none"
                >
                  <div className="flex center-xs">
                    <div>Next</div>
                  </div>
                </a>
              </div>
            </div>
          </React.Fragment>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PaymentMethods;
