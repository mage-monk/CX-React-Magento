import React from "react";

import classes from "./Image.module.css";
import MagentoConfig from "../../../config/Magento";

const Image = (props) => {
  return (
    <span className={`${classes.product__image__container} ${props.className}`}>
      <span className={`${classes.product__image__wrapper} ${props.className}`}>
        <img
          className={`${classes.product__image__photo} ${props.className}`}
          src={`${MagentoConfig.mediaUrl}${props.dir}${props.src}`}
          alt={props.name}
        />
      </span>
    </span>
  );
};

export default Image;
