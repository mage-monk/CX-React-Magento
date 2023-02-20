import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (token) => {},
  token: null,
  cartId: null,
  setCartId: (id) => {},
  onSuccess: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [cartId, setCartId] = useState(null);
  useEffect(() => {
    const login = localStorage.getItem("login");
    const token = localStorage.getItem("token");
    const qId = localStorage.getItem("cartId");
    if (login === "1") setIsLoggedIn(true);

    if (token) setToken(token);

    if (qId) setCartId(qId);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    localStorage.removeItem("cartId");
    setIsLoggedIn(false);
    setToken(null);
    setCartId(null);
  };
  const loginHandler = (customerToken) => {
    localStorage.setItem("login", "1");
    localStorage.setItem("token", customerToken);
    setIsLoggedIn(true);
    setToken(customerToken);
  };

  const cartIdHandler = (id) => {
    const login = localStorage.getItem("login");
    const token = localStorage.getItem("token");
    localStorage.setItem("cartId", id);
    setCartId(id);
  };
  const unsetCartId = () => {
    localStorage.removeItem("cartId");
    setCartId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        token: token,
        cartId: cartId,
        setCartId: cartIdHandler,
        onSuccess: unsetCartId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
