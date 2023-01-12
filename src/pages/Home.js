import HomeSlider from "../components/home/HomeSlider";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import MagentoConfig from "../config/Magento";
const Home = () => {
  const ctx = useContext(AuthContext);
  const token = ctx?.token;

  const [quoteId, setQuoteId] = useState(null);

  const getQuoteId = (id) => {
    if (id > 0) {
      //console.log(id);
      ctx.setCartId(id);
      setQuoteId(id);
    }
  };

  const {
    isLoading,
    error,
    sendRequest: fetchQuoteId,
  } = useHttp(
    {
      endpoint: MagentoConfig.api.quote.cart,
      method: "POST",
      token,
    },
    getQuoteId
  );

  useEffect(() => {
    if (token) fetchQuoteId();
  }, [fetchQuoteId]);

  return <HomeSlider />;
};
export default Home;
