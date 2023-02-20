import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./TopLinks.module.css";
import AuthContext from "../../store/auth-context";
import { unsetMiniCart } from "../../api/cart";

const TopLinks = (props) => {
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(unsetMiniCart());
    ctx.onLogout();
  };
  return (
    <div className={styles.panel__wrapper}>
      <div className={styles.panel__header}>
        <div className={styles.top__links}>
          <ul className={styles.header__links}>
            {!ctx.isLoggedIn && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {!ctx.isLoggedIn && (
              <li>
                <NavLink to="/signup">Register</NavLink>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <NavLink to="/login" onClick={logOut}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopLinks;
