import React from "react";

import classes from "./Price.module.css";

const Price = (props) => {
  const price = parseFloat(props.price).toFixed(2);
  return (
    <div className={classes.price__box}>
      <span className="price__container">
        <span className="price__wrapper ">
          <span className={`${classes.price} `}>${price}</span>
        </span>
      </span>
    </div>
  );
};

export default Price;
