import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../store/auth-context";
import { estimatedShipping } from "../../api/checkout";

import Card from "../ui/card/Card";

const ShippingAddress = () => {
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const cartId = ctx?.cartId;

  const addresses = useSelector((state) => state.checkout.shipping_address);
  const saveAddress = sessionStorage.getItem("shipping-address");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (address) => {
    setLoading(true);
    address.street = [address.street_1, address.street_2];
    delete address["street_1"];
    delete address["street_2"];
    const shippingAddress = {
      address,
    };

    dispatch(estimatedShipping(token, shippingAddress));
    if (addresses) {
      sessionStorage.setItem(
        "shipping-address",
        JSON.stringify(shippingAddress.address)
      );
      navigate("/checkout/shipping/methods");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (saveAddress) {
      setShippingAddress(JSON.parse(saveAddress));
    }
  }, []);
  //console.log(typeof shippingAddress, shippingAddress);

  const handleInputsChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    reset(shippingAddress);
  }, [shippingAddress]);

  //console.log(shippingAddress.street[0]);
  return (
    <React.Fragment>
      {loading && (
        <div className="addto__overlay">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      {!loading && token && cartId && (
        <Card className="p-20 mb-20 clearfix rounded-0">
          <div className="c-header-title checkout_title">Shipping Address</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-xs-6">
                <label htmlFor="firstname" className="required">
                  First Name
                </label>
                <input
                  id="firstname"
                  className={`form-control ${
                    errors.firstname ? "validation_failed" : ""
                  }`}
                  type="text"
                  placeholder="First Name"
                  {...register("firstname", { required: true, maxLength: 80 })}
                  value={shippingAddress?.firstname || ""}
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>
              <div className="form-group col-xs-6">
                <label htmlFor="lastname" className="required">
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  className={`form-control ${
                    errors.lastname ? "validation_failed" : ""
                  }`}
                  placeholder="Last name"
                  {...register("lastname", { required: true, maxLength: 100 })}
                  value={shippingAddress?.lastname || ""}
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-6">
                <label htmlFor="email" className="required">
                  Email
                </label>
                <input
                  id="email"
                  className={`form-control ${
                    errors.email ? "validation_failed" : ""
                  }`}
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  value={shippingAddress?.email || ""}
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>

              <div className="form-group col-xs-6">
                <label htmlFor="telephone" className="required">
                  Phone Number
                </label>
                <input
                  id="telephone"
                  className={`form-control ${
                    errors.telephone ? "validation_failed" : ""
                  }`}
                  type="text"
                  placeholder="Phone Number"
                  {...register("telephone", {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message: "Please enter a number",
                  })}
                  value={shippingAddress?.telephone || ""}
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-6">
                <label htmlFor="street1" className="required">
                  Street Address
                </label>
                <input
                  id="street1"
                  className={`form-control street ${
                    errors.street_1 ? "validation_failed" : ""
                  }`}
                  type="text"
                  placeholder="Street"
                  {...register("street_1", { required: true, maxLength: 80 })}
                  value={
                    shippingAddress?.street &&
                    shippingAddress?.street.length > 0
                      ? shippingAddress?.street[0]
                      : ""
                  }
                  onChange={(e) => handleInputsChange(e)}
                />
                <input
                  id="street2"
                  className={`form-control mb-10`}
                  type="text"
                  placeholder="Landmark"
                  {...register("street_2", { required: false, maxLength: 80 })}
                  value={
                    shippingAddress?.street &&
                    shippingAddress?.street.length > 1
                      ? shippingAddress?.street[1]
                      : ""
                  }
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-6">
                <label htmlFor="country_id" className="required">
                  Country
                </label>
                <select
                  id="country_id"
                  className={`form-control ${
                    errors.country_id ? "validation_failed" : ""
                  }`}
                  {...register("country_id", { required: "select one option" })}
                  value={shippingAddress?.country_id || ""}
                  onChange={(e) => handleInputsChange(e)}
                >
                  <option value="">--Please Select--</option>
                  {/* <option value="US">United States</option> */}
                  <option value="IN">India</option>
                </select>
              </div>
              <div className="form-group col-xs-6">
                <label htmlFor="region_id" className="required">
                  State/Province
                </label>
                <select
                  id="region_id"
                  className={`form-control ${
                    errors.region_id ? "validation_failed" : ""
                  }`}
                  {...register("region_id", { required: "select one option" })}
                  value={shippingAddress?.region_id || ""}
                  onChange={(e) => handleInputsChange(e)}
                >
                  <option value="">--Please Select--</option>
                  <option value="569">Andaman and Nicobar Islands</option>
                  <option value="570">Andhra Pradesh</option>
                  <option value="571">Arunachal Pradesh</option>
                  <option value="572">Assam</option>
                  <option value="573">Bihar</option>
                  <option value="574">Chandigarh</option>
                  <option value="575">Chhattisgarh</option>
                  <option value="576">Dadra and Nagar Haveli</option>
                  <option value="577">Daman and Diu</option>
                  <option value="578">Delhi</option>
                  <option value="579">Goa</option>
                  <option value="580">Gujarat</option>
                  <option value="581">Haryana</option>
                  <option value="582">Himachal Pradesh</option>
                  <option value="583">Jammu and Kashmir</option>
                  <option value="584">Jharkhand</option>
                  <option value="585">Karnataka</option>
                  <option value="586">Kerala</option>
                  <option value="587">Lakshadweep</option>
                  <option value="588">Madhya Pradesh</option>
                  <option value="589">Maharashtra</option>
                  <option value="590">Manipur</option>
                  <option value="591">Meghalaya</option>
                  <option value="592">Mizoram</option>
                  <option value="593">Nagaland</option>
                  <option value="594">Odisha</option>
                  <option value="595">Puducherry</option>
                  <option value="596">Punjab</option>
                  <option value="597">Rajasthan</option>
                  <option value="598">Sikkim</option>
                  <option value="599">Tamil Nadu</option>
                  <option value="600">Telangana</option>
                  <option value="601">Tripura</option>
                  <option value="602">Uttar Pradesh</option>
                  <option value="603">Uttarakhand</option>
                  <option value="604">West Bengal</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-6">
                <label htmlFor="city" className="required">
                  City
                </label>
                <input
                  id="city"
                  className={`form-control ${
                    errors.city ? "validation_failed" : ""
                  }`}
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                  value={shippingAddress?.city || ""}
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>
              <div className="form-group col-xs-6">
                <label htmlFor="postcode" className="required">
                  Zip/Postal Code
                </label>
                <input
                  id="postcode"
                  className={`form-control ${
                    errors.postcode ? "validation_failed" : ""
                  }`}
                  type="text"
                  placeholder="Zip Code"
                  {...register("postcode", { required: true })}
                  value={shippingAddress?.postcode || ""}
                  onChange={(e) => handleInputsChange(e)}
                />
              </div>
            </div>

            <div className="checkout_btn">
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
          </form>
        </Card>
      )}
      {!loading && (!token || !cartId) && (
        <div className="alert alert-danger">
          <div>You can't access this page.</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ShippingAddress;
