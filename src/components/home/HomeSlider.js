import React, { useState, useEffect } from "react";
import MagentoConfig from "../../config/Magento";
import useHttp from "../../hooks/use-http";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "./HomeSlider.module.css";

const HomeSlider = () => {
  const [slides, setslides] = useState([]);
  const mediaUrl = MagentoConfig.mediaUrl;
  const fetchCmsBlock = (blockObject) => {
    const images = [];
    try {
      const cmsPageContent = JSON.parse(blockObject.content);
      cmsPageContent.slider.map((item) => {
        images.push({ url: mediaUrl + item.url });
      });
    } catch (err) {
      console.log("Error: ", err.message);
    }
    setslides(images);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchSlides,
  } = useHttp(
    { endpoint: MagentoConfig.api.cmsblock + MagentoConfig.home_cms_block_id },
    fetchCmsBlock
  );
  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);
  return (
    <React.Fragment>
      {slides.length > 0 && (
        <Carousel
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <img src={slide.url} />
            </div>
          ))}
        </Carousel>
      )}
    </React.Fragment>
  );
};

export default HomeSlider;
