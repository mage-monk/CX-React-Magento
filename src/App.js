import "./App.css";
import React, { lazy, useContext } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

function App() {
  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const cartId = ctx?.cartId;

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
