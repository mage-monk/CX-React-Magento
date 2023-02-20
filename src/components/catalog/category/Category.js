import React from "react";
import { NavLink, Link } from "react-router-dom";

const Category = (props) => {
  const { id, name, level, url } = props;
  return (
    <Link to={`/list/${url}`} state={{ id: id }}>
      <span>{name}</span>
    </Link>
  );
};

export default Category;
