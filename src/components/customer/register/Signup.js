import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Card from "../../ui/card/Card";
import classes from "./Signup.module.css";

import useHttp from "../../../hooks/use-http";
import MagentoConfig from "../../../config/Magento";

const Signup = (props) => {
  const [customer, setCustomer] = useState({});
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const fetchCustomer = (customerObject) => {
    //console.log(customerObject);
    setSuccess(true);
    setCustomer(customerObject);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const fetchError = (errorObj) => {
    // console.log(errorObj);
    setSuccess(false);
    setApiError(errorObj);
  };

  const {
    isLoading,
    error,
    sendRequest: registerCustomer,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.registration,
      method: "POST",
    },
    fetchCustomer,
    fetchError
  );
  useEffect(() => {
    //fetchTasks(null);
  }, [registerCustomer]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setApiError("");
    setSuccess(false);
    const customerData = {
      customer: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
      password: data.password,
    };
    registerCustomer(customerData);
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
          Thank you for registering with <strong>Deloitte</strong>, Please
          login..
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
            type="text"
            placeholder="First Name"
            {...register("firstname", { required: true, maxLength: 80 })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            type="text"
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            placeholder="Last name"
            {...register("lastname", { required: true, maxLength: 100 })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            type="text"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
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
          id="validateUserIdentifier"
        >
          <span className="Action">
            <span className="fs-14 lh-20 ls-16 fw-6">Register</span>
          </span>
        </button>
      </form>
    </Card>
  );
};

export default Signup;
