import React from "react";
import MagentoConfig from "../../../../config/Magento";

const Media = (props) => {
  const mediaObj = props.mediaImgs ? props.mediaImgs : undefined;
  return (
    <React.Fragment>
      {mediaObj !== undefined && mediaObj.length > 0 && (
        <React.Fragment>
          {mediaObj.map((media) => (
            <a
              key={`${media.id}`}
              className="col-xs-6 pr-r-5 pb-5 b-box fbp-5 pl-0"
            >
              <img
                src={`${MagentoConfig.mediaUrl}catalog/product${media.file}`}
                alt={`${media.label}`}
                className="w100p d-block"
              />
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
