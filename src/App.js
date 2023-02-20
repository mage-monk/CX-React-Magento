import "./App.css";
import React, { lazy, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthContext from "./store/auth-context";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import List from "./components/catalog/product/Listing";
import View from "./components/catalog/product/View";
import Login from "./components/customer/login/Login";
import Signup from "./components/customer/register/Signup";
import ShippingAddress from "./components/checkout/ShippingAddress";
import ShippingMethods from "./components/checkout/ShippingMethods";
import PaymentMethods from "./components/checkout/PaymentMethods";
import Success from "./components/checkout/Success";
import MyAccount from "./components/customer/dashboard/MyAccount";
import Orders from "./components/customer/dashboard/Orders";
import Stores from "./pages/Stores";
import AddressBook from "./components/customer/dashboard/AddressBook";
import Appointments from "./components/customer/dashboard/Appointments";
import NotFound from "./pages/NotFound";
import ChatBox from "./components/chat/ChatBox";

function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  console.log("APP.js", baseUrl);
  const location = useLocation();
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const cartId = ctx?.cartId;
  const orderId = location?.state?.orderId || 0;
  //console.log("App", orderId);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/*" element={<List />} />
        <Route path="/product/*" element={<View />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {token && cartId && (
          <Route
            exact
            path="/checkout/shipping"
            element={<ShippingAddress />}
          />
        )}
        {token && cartId && (
          <Route
            exact
            path="/checkout/shipping/methods"
            element={<ShippingMethods />}
          />
        )}
        {token && cartId && (
          <Route exact path="/checkout/payment/" element={<PaymentMethods />} />
        )}
        {token && <Route exact path="/order/success/" element={<Success />} />}
        {token && (
          <Route exact path="/customer/dashboard/" element={<MyAccount />} />
        )}
        {token && <Route exact path="/customer/orders/" element={<Orders />} />}
        {token && (
          <Route
            exact
            path="/customer/appointments/"
            element={<Appointments />}
          />
        )}
        {token && (
          <Route exact path="/customer/addresses/" element={<AddressBook />} />
        )}

        <Route exact path="/store-locator" element={<Stores />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <ChatBox /> */}
    </Layout>
  );
}

export default App;
