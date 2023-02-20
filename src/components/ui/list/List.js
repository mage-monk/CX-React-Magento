import React from "react";

import classes from "./List.module.css";

const List = (props) => {
  return (
    <div className={`${classes.listing} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default List;
