import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../components/home/HomeSlider";
import HomeContent from "../components/home/HomeContent";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import MagentoConfig from "../config/Magento";
const Home = () => {
  const [loader, setLoader] = useState(false);
  const [slides, setSlides] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [highlights, setHighlights] = useState({});
  const [layers, setLayers] = useState({});
  const [oversized, setOversized] = useState({});
  const [sale, setSale] = useState({});
  const [quoteId, setQuoteId] = useState(null);

  const ctx = useContext(AuthContext);
  const token = ctx?.token;
  const mediaUrl = MagentoConfig.mediaUrl;
  const thumbnail = MagentoConfig.thumb;

  // Home Content Call

  const fetchCmsBlock = (blockObject) => {
    const images = [];
    const dicountImgs = [];
    let heighLigh = null;
    let layer = null;
    let over = null;
    let salee = null;
    try {
      const cmsPageContent = JSON.parse(blockObject.content);
      setLoader(false);
      //console.log(cmsPageContent?.highlights?.url);
      cmsPageContent.slider.map((item) => {
        images.push({ url: mediaUrl + item.url });
      });
      cmsPageContent.discounts.map((discount) => {
        dicountImgs.push({ url: mediaUrl + discount.url });
      });
      heighLigh = cmsPageContent?.highlights?.url
        ? mediaUrl + cmsPageContent?.highlights?.url
        : thumbnail;
      layer = cmsPageContent?.layers?.url
        ? mediaUrl + cmsPageContent?.layers?.url
        : thumbnail;
      over = cmsPageContent?.oversized?.url
        ? mediaUrl + cmsPageContent?.oversized?.url
        : thumbnail;
      salee = cmsPageContent?.season_sale?.url
        ? mediaUrl + cmsPageContent?.season_sale?.url
        : thumbnail;
    } catch (err) {
      console.log("Error: ", err.message);
    }
    setSlides(images);
    setDiscounts(dicountImgs);
    setHighlights(heighLigh);
    setLayers(layer);
    setOversized(over);
    setSale(salee);
  };

  const {
    isLoading: loading,
    error: err,
    sendRequest: fetchSlides,
  } = useHttp(
    { endpoint: MagentoConfig.api.cmsblock + MagentoConfig.home_cms_block_id },
    fetchCmsBlock
  );
  useEffect(() => {
    setLoader(true);
    fetchSlides();
  }, [fetchSlides]);

  // Create Quote Call

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
  //console.log(loader);
  return (
    <React.Fragment>
      {loader && <div className="loading"></div>}
      {!loader && (
        <React.Fragment>
          <HomeSlider slides={slides} />
          <HomeContent
            discounts={discounts}
            highlights={highlights}
            layers={layers}
            oversized={oversized}
            sale={sale}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Home;
