import React from "react";

import classes from "./Name.module.css";

const Name = (props) => {
  return (
    <strong className={`${classes.product__item__name} `}>
      <a href="" className={`${classes.product__item__link}`}>
        {props.name}
      </a>
    </strong>
  );
};

export default Name;
