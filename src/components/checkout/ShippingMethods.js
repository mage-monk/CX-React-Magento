import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { saveShippingInfoAndGetPayments } from "../../api/checkout";
import AuthContext from "../../store/auth-context";

import Card from "../ui/card/Card";

const ShippingMethods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const cartId = ctx?.cartId;
  const methods = useSelector(
    (state) => state.checkout.estimated_shipping_methods
  );
  const loading = useSelector((state) => state.checkout.loading);

  const shippingAddress = sessionStorage.getItem("shipping-address");

  useEffect(() => {}, [methods]);
  const backToAddressPage = () => {
    navigate("/checkout/shipping");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (carrier) => {
    const shipping_address = JSON.parse(shippingAddress);
    const billing_address = JSON.parse(shippingAddress);

    if (shipping_address && billing_address) {
      const addressInfo = {
        addressInformation: {
          shipping_address,
          billing_address,
          shipping_carrier_code: carrier.carrier_code,
          shipping_method_code: carrier.carrier_code,
        },
      };
      if (addressInfo) {
        dispatch(saveShippingInfoAndGetPayments(token, addressInfo));
        navigate("/checkout/payment");
      }
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
          <div className="c-header-title checkout_title">Shipping Methods</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="clearfix mb-20 p-10">
              {methods.map((method, index) => (
                <React.Fragment key={method.carrier_code}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="shipping"
                      id={method.carrier_code}
                      {...register("carrier_code", { required: true })}
                      value={method.carrier_code}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={method.carrier_code}
                    >
                      {method.carrier_title}
                    </label>
                  </div>
                  {methods.length != index + 1 && <hr />}
                </React.Fragment>
              ))}

              {errors.carrier_code?.type === "required" && (
                <div className="text-danger mt-3">
                  Please Select Shipping Method.
                </div>
              )}
            </div>

            <React.Fragment>
              <div className="flex middle-xs bitween-xs mb-16">
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
                      <span className="fs-14 lh-20 ls-16 fw-6">Next</span>
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
            <div>No Shipping Method is Available.</div>
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

export default ShippingMethods;
