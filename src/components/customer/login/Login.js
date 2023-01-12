import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Card from "../../ui/card/Card";
import classes from "./Login.module.css";
import AuthContext from "../../../store/auth-context";
import MagentoConfig from "../../../config/Magento";
import useHttp from "../../../hooks/use-http";

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [quoteId, setQuoteId] = useState(null);
  const fetchToken = (customerToken) => {
    // console.log(customerToken);
    setSuccess(true);
    setToken(customerToken);
    ctx.onLogin(customerToken);
    navigate("/");
  };

  const fetchError = (errorObj) => {
    //console.log(errorObj);
    setSuccess(false);
    setApiError(errorObj);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.token,
      method: "POST",
    },
    fetchToken,
    fetchError
  );
  useEffect(() => {
    //fetchTasks(null);
  }, [fetchTasks]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setApiError("");
    setSuccess(false);
    //console.log(data);
    fetchTasks(data);
    console.log(ctx?.token);
  };

  return (
    <Card className={classes.login}>
      {apiError !== "" && (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      )}
      {success > 0 && (
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
            {...register("username", { required: true, pattern: /^\S+@\S+$/i })}
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
  );
};

export default Login;
