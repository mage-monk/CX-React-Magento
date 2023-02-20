import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { unsetMiniCart } from "../../api/cart";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { BiLogOut, BiCalendar } from "react-icons/bi";
import { MdAppRegistration } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const Links = () => {
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(unsetMiniCart());
    ctx.onLogout();
  };
  return (
    <div className="user pos-relt hover-dropdown trans-3">
      <a className="userlinks nocolor dropdown-toggle">
        <AiOutlineUser size={30} />
      </a>
      <div className="pos-abs top-0 z-1 pt-40 _child r-0 mr-n-8">
        <div className="br-3 bg-white p-15 b-shadow-b-2_15 b-box pos-relt z-2 w-200">
          <div className="fw-6 txt-overflow-ellipsis fs-14 ls-064">
            <div role="button" id="profile">
              {!ctx.isLoggedIn && (
                <NavLink to="/login">
                  <FaSignInAlt color="#2d2d2d" size={16} /> Log In
                </NavLink>
              )}
              {!ctx.isLoggedIn && (
                <NavLink to="/signup">
                  {" "}
                  /<MdAppRegistration color="#2d2d2d" size={16} /> Sign Up
                </NavLink>
              )}
              {ctx.isLoggedIn && (
                <NavLink to="/login" onClick={logOut}>
                  <BiLogOut color="#2d2d2d" size={16} /> Logout
                </NavLink>
              )}
            </div>
          </div>
          {ctx.isLoggedIn && (
            <div>
              <div className="flex middle-xs">
                <div>
                  <AiOutlineUser color="#2d2d2d" size={16} />
                </div>
                <div
                  className="flex row between-xs middle-xs ml-5 mr-5 w100p pt-8 pb-8 fs-14 lh-18 c-dark-gray"
                  role="button"
                  id=""
                >
                  <div className="row middle-xs">
                    <div className="ml-10 mr-10">
                      <NavLink to="/customer/dashboard/">My Account</NavLink>
                    </div>
                  </div>
                  <div className="row flex middle-xs"></div>
                </div>
              </div>
              <div className="flex middle-xs">
                <div>
                  <BsBoxSeam color="#2d2d2d" size={16} />
                </div>
                <div
                  className="flex row between-xs middle-xs ml-5 mr-5 w100p pt-8 pb-8 fs-14 lh-18 c-dark-gray"
                  role="button"
                >
                  <div className="row middle-xs">
                    <div className="ml-10 mr-10">
                      <NavLink to="/customer/orders/">My Orders</NavLink>
                    </div>
                  </div>
                  <div className="row flex middle-xs"></div>
                </div>
              </div>
              {/* <div className="flex middle-xs">
                <div>
                  <FaAddressCard size={16} />
                </div>
                <div
                  className="flex row between-xs middle-xs ml-5 mr-5 w100p pt-8 pb-8 fs-14 lh-18 c-dark-gray"
                  role="button"
                >
                  <div className="row middle-xs">
                    <div className="ml-10 mr-10">
                      <NavLink to="/customer/addresses/">
                        My AddressBook
                      </NavLink>
                    </div>
                  </div>
                  <div className="row flex middle-xs"></div>
                </div>
              </div> */}
              <div className="flex middle-xs">
                <div>
                  <BiCalendar size={16} />
                </div>
                <div
                  className="flex row between-xs middle-xs ml-5 mr-5 w100p pt-8 pb-8 fs-14 lh-18 c-dark-gray"
                  role="button"
                >
                  <div className="row middle-xs">
                    <div className="ml-10 mr-10">
                      <NavLink to="/customer/appointments/">
                        My Appointments
                      </NavLink>
                    </div>
                  </div>
                  <div className="row flex middle-xs"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Links;
