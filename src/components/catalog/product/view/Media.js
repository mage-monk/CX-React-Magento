import React from "react";
import MagentoConfig from "../../../../config/Magento";
import { GoMirror } from "react-icons/go";

const Media = (props) => {
  const mediaObj = props.mediaImgs ? props.mediaImgs : undefined;

  const gotoRelated = () => {
    props.similarClick();
  };
  return (
    <React.Fragment>
      {mediaObj !== undefined && mediaObj.length > 0 && (
        <React.Fragment>
          {mediaObj.map((media, index) => (
            <a
              key={`${media.id}`}
              className={`col-xs-6 pr-r-5 pb-5 b-box fbp-5 pl-0 ${
                index === 1 ? "similar_container" : ""
              }`}
            >
              <img
                src={`${MagentoConfig.mediaUrl}catalog/product${media.file}`}
                alt={`${media.label}`}
                className="w100p d-block"
              />
              {index === 1 && (
                <div
                  className="image-grid-similarColorsCta"
                  onClick={gotoRelated}
                >
                  <GoMirror className="myntraweb-sprite image-grid-similarColorsIcon sprites-similarProductsIcon" />
                  <span className="image-grid-iconText">VIEW SIMILAR</span>
                </div>
              )}
            </a>
          ))}
        </React.Fragment>
      )}

      {mediaObj.length === 0 && (
        <React.Fragment>
          <a className="col-xs-6 pr-r-5 pb-5 b-box fbp-5 pl-0">
            <img src={MagentoConfig.thumb} className="w100p d-block" />
          </a>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Media;
