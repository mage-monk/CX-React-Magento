import React, { useState, useEffect } from "react";
import MagentoConfig from "../../config/Magento";
import useHttp from "../../hooks/use-http";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "./HomeSlider.module.css";

const HomeSlider = (props) => {
  const slides = props?.slides || [];
  return (
    <React.Fragment>
      {slides?.length > 0 && (
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
