import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Category from "../catalog/category/Category";
import classes from "./MainNavigation.module.css";
import useHttp from "../../hooks/use-http";
import MagentoConfig from "../../config/Magento";
import TopLinks from "../header/TopLinks";
import MiniCart from "../cart/MiniCart";
import Search from "../search/Search";
import Links from "../customer/Links";
let isInitial = true;
const MainNavigation = () => {
  const [menu, setMenu] = useState([]);
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);

  // Sticky Nav
  // handle scroll event
  const handleScroll = (elTopOffset, elHeight) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  // add/remove scroll event listener
  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  // Category API Call
  const fetchCategories = (menuObject) => {
    const loadedCategories = [];
    for (const cat in menuObject?.children_data) {
      if (
        menuObject?.children_data[cat]?.is_active === true &&
        menuObject?.children_data[cat]?.level === 2
      ) {
        const url = menuObject?.children_data[cat].name
          .toLowerCase()
          .replace(/'/g, "")
          .replace(/ /g, "-");
        loadedCategories.push({
          id: menuObject?.children_data[cat].id,
          name: menuObject?.children_data[cat].name,
          level: menuObject?.children_data[cat].level,
          url,
          childs: menuObject?.children_data[cat].children_data,
        });
      }
    }
    setMenu(loadedCategories);
  };
  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.menu,
    },
    fetchCategories
  );
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <React.Fragment>
      <header className={classes.header} style={{ marginTop: sticky.offset }}>
        <TopLinks />
        <div className={classes.header__content}>
          <NavLink className={classes.logo} to="/">
            <img src={MagentoConfig.logo} alt="logo" width="100" />
          </NavLink>
          <div className={classes.header__right}>
            <Links />
            <Search />
            <MiniCart />
          </div>
        </div>
      </header>
      <nav
        className={`navbar${sticky.isSticky ? " sticky" : ""} ${classes.menu}`}
        ref={headerRef}
      >
        <ul className="menu">
          {menu.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              level={category.level}
              url={category.url}
              childs={category.childs}
            />
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default MainNavigation;
