import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./TopLinks.module.css";
import AuthContext from "../../store/auth-context";
import { unsetMiniCart } from "../../api/cart";
import { FaTshirt } from "react-icons/fa";
import { BiTimer } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const TopLinks = (props) => {
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(unsetMiniCart());
    ctx.onLogout();
  };
  return (
    <div className={styles.panel__wrapper}>
      <div className="bg-black-light c-white toplinks">
        <div className="container-browser row center-xs">
          <div className="col-xs-12 start-xss">
            <div className="flex middle-xs">
              <div className="ml-0 mr-auto flex middle-xs pt-10 pb-10">
                <div className="flex middle-xs">
                  <FaTshirt size={20} className="h-20" />
                  <div className="fs-14 lh-18 ls-064 pl-r-10">
                    100's of new styles everyday
                  </div>
                </div>
                <div className="flex middle-xs ml-20 mr-20">
                  <BiTimer size={20} />
                  <div className="fs-14 lh-18 ls-064 pl-r-10">
                    Express shipping
                  </div>
                </div>
                <div className="flex middle-xs">
                  <TbTruckReturn size={20} className="h-20" />
                  <div className="fs-14 lh-18 ls-064 pl-r-10">
                    Free and easy returns
                  </div>
                </div>
              </div>
              <div className="mr-0 ml-auto flex middle-xs pt-10 pb-10">
                <a
                  className="flex middle-xs c-white"
                  href="tel:8054048169"
                  rel="noopener noreferrer"
                >
                  <MdOutlinePhoneInTalk size={20} className="h-20" />
                  <div className="fs-14 lh-18 ls-064 pl-r-10 en-font forced-ltr">
                    +91 8054048169
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.panel__header}>
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
      </div> */}
    </div>
  );
};

export default TopLinks;
