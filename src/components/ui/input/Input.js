import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      type={props.type || "text"}
      className={`${classes.input} ${props.className}`}
    />
  );
};

export default Input;
