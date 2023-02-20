import React from "react";
import { NavLink, Link } from "react-router-dom";

const Category = (props) => {
  const { id, name, level, url, childs } = props;

  return (
    <li className="level0 pos-relt">
      <Link
        to={`/list/${name
          .toLowerCase()
          .replace(/'/g, "")
          .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
          .replace(/ /g, "")}`}
        state={{ id: id }}
        className={`${childs.length > 0 ? "haschilds" : "nochilds"}`}
      >
        <span>{name}</span>
      </Link>
      {childs.length > 0 && (
        <div className="submenu pos-abs">
          <ul className="level1 txt-overflow-ellipsis">
            {childs.map((child_2) => (
              <li
                key={child_2.id}
                className={`level1-cat ${
                  child_2.children_data.length > 0 ? "level1-haschild" : ""
                }`}
              >
                {child_2.children_data.length === 0 && (
                  <Link
                    to={`/list/${child_2.name
                      .toLowerCase()
                      .replace(/ /g, "-")
                      .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")}`}
                    state={{ id: child_2.id }}
                  >
                    <span>{child_2.name}</span>
                  </Link>
                )}
                {child_2.children_data.length > 0 && (
                  <React.Fragment>
                    <span>{child_2.name}</span>
                    <ul className="level2">
                      {child_2.children_data.map((child_3) => (
                        <li key={child_3.id} className="level2-cat">
                          <Link
                            to={`/list/${child_3.name
                              .toLowerCase()
                              .replace(/ /g, "")
                              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")}`}
                            state={{ id: child_3.id }}
                          >
                            <span>{child_3.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default Category;
