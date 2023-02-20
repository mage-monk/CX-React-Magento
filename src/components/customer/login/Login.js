import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { customerToken, customerInfo } from "../../../api/customer";

import Card from "../../ui/card/Card";
import classes from "./Login.module.css";
import AuthContext from "../../../store/auth-context";
import MagentoConfig from "../../../config/Magento";
import useHttp from "../../../hooks/use-http";

const Login = (props) => {
  const dispatch = useDispatch();
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const loading = useSelector((state) => state.customer.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setApiError("");
    setSuccess(false);
    dispatch(customerToken(data)).then(function (token) {
      setSuccess(true);
      if (token) {
        setToken(token);
        ctx.onLogin(token);
        dispatch(customerInfo(token)).then(function (customer) {
          //console.log("Customer ", customer);
        });
        navigate("/");
      }
    });
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
      <Card className={classes.login}>
        {!loading && success > 0 && (
          <div className="alert alert-success" role="alert">
            Successfully Logged In..
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              type="text"
              placeholder="Email"
              {...register("username", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <button
            className="Button fw-6 fs-14 cap b-box br-3 b-green bg-green b-none c-white p-10 w100p primary cap mt-16 border-none h-48"
            type="submit"
          >
            <span className="Action">
              <span className="fs-14 lh-20 ls-16 fw-6">Login</span>
            </span>
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Login;
