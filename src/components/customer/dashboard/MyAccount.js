import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerInfo } from "../../../api/customer";
import AuthContext from "../../../store/auth-context";
import Card from "../../ui/card/Card";
const MyAccount = () => {
  const dispatch = useDispatch();
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const loading = useSelector((state) => state.customer.loading);
  const customer = useSelector((state) => state.customer.customer);
  useEffect(() => {
    if (!customer.id) {
      dispatch(customerInfo(token)).then(function (customer) {});
    }
  }, []);
  // console.log("customer", customer);
  return (
    <React.Fragment>
      {loading && (
        <div className="addto__overlay">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      {!loading && customer.id && (
        <Card className="p-20 mb-20 clearfix rounded-0">
          <div className="c-header-title checkout_title mb-20">My Account</div>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Contact Information</h5>
                  <p className="card-text">
                    <span className="customer_name flex">
                      {customer?.firstname} {""} {customer?.lastname}
                    </span>
                    <span className="customer_email flex">
                      {customer?.email}
                    </span>
                  </p>
                  <a
                    href="#"
                    className=" Button fw-6 fs-14 cap b-box br-3 b-green bg-green b-none c-white p-10 w33p primary cap mt-16 border-none h-48"
                    role="link"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Newsletters</h5>
                  {customer?.extension_attributes?.is_subscribed === false && (
                    <p className="card-text">
                      You aren't subscribed to our newsletter.
                    </p>
                  )}
                  {customer?.extension_attributes?.is_subscribed === true && (
                    <p className="card-text">
                      You are subscribed to our newsletter.
                    </p>
                  )}

                  <a
                    href="#"
                    className=" Button fw-6 fs-14 cap b-box br-3 b-green bg-green b-none c-white p-10 w33p primary cap mt-16 border-none h-48"
                    role="link"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </React.Fragment>
  );
};

export default MyAccount;
