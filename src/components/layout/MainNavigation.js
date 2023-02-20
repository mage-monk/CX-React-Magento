import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Category from "../catalog/category/Category";
import classes from "./MainNavigation.module.css";
import useHttp from "../../hooks/use-http";
import MagentoConfig from "../../config/Magento";
import TopLinks from "../header/TopLinks";
import MiniCart from "../cart/MiniCart";
import Search from "../search/Search";
let isInitial = true;
const MainNavigation = () => {
  const [menu, setMenu] = useState([]);
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
          .replace(/ /g, "_");
        loadedCategories.push({
          id: menuObject?.children_data[cat].id,
          name: menuObject?.children_data[cat].name,
          level: menuObject?.children_data[cat].level,
          url,
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
      <header className={classes.header}>
        <TopLinks />
        <div className={classes.header__content}>
          <NavLink className={classes.logo} to="/">
            <img src={MagentoConfig.logo} alt="logo" />
          </NavLink>
          <div className={classes.header__right}>
            <Search />
            <MiniCart />
          </div>
        </div>
      </header>
      <nav className={classes.menu}>
        {menu.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            level={category.level}
            url={category.url}
          />
        ))}
      </nav>
    </React.Fragment>
  );
};

export default MainNavigation;
