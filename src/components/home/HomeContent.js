import React from "react";
import { AiOutlineCar, AiOutlineSafety } from "react-icons/ai";
import { BiSupport, BiRevision } from "react-icons/bi";
import MagentoConfig from "../../config/Magento";
const HomeContent = (props) => {
  //console.log(props);
  return (
    <React.Fragment>
      {props?.sale && (
        <div className="">
          <div className="container-browser row center-xs p-0">
            <div className="col-xs-12 start-xs">
              <div className="pb-8 sale_contain">
                <a className="sale_link">
                  <img
                    className="d-block"
                    src={props?.sale}
                    alt=""
                    width="100%"
                    height="593.6145833333333"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {props?.discounts?.length > 0 && (
        <div className="overflow-hidden discounts">
          <div className="container-browser row center-xs p-0">
            <div className="col-xs-12 start-xs">
              <div className="row ml-n4 mr-n4 discounts_row">
                {props.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="col-xs-3 col-sm-3 col-md-3 col-lg-3 pl-10 p-0 mb-20 discount_item"
                  >
                    <a className="d-block">
                      <div className="imgdiv">
                        <img
                          className="d-block"
                          src={discount?.url}
                          width="100%"
                          height="169.98333930969238"
                        />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {props?.highlights && (
        <div className="clearfix mb-10">
          <div className="container-browser row center-xs p-0">
            <div className="col-xs-12 start-xs">
              <div className="pb-8 pb-0">
                <a className="highlight_a">
                  <img
                    className="d-block"
                    src={MagentoConfig.heighlightImg}
                    alt=""
                    width="100%"
                    height="96.91666666666666"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="container-browser row center-xs p-0">
            <div className="col-xs-12 start-xs">
              <div className="pb-8 pb-0">
                <a className="highlight_a">
                  <img
                    className="d-block"
                    src={props?.highlights}
                    alt=""
                    width="100%"
                    height="96.91666666666666"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {(props?.layers || props?.oversized) && (
        <div className="overflow-hidden pl-8 pr-8 mb-10">
          <div className="container-browser row center-xs p-0">
            <div className="col-xs-12 start-xs p-0">
              <div className="row ml-n4 mr-n4 layer_oversized">
                {props?.layers && (
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 pl-10 pr-10 mb-20 layer">
                    <a className="d-block">
                      <div className="layer_div">
                        <img
                          className="d-block"
                          src={props?.layers}
                          width="100%"
                          height="714.9644698893229"
                        />
                      </div>
                    </a>
                  </div>
                )}
                {props?.oversized && (
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 pl-10 pr-10 mb-20 oversize">
                    <a className="d-block">
                      <div className="oversize_div">
                        <img
                          className="d-block"
                          src={props?.oversized}
                          width="100%"
                          height="714.9644698893229"
                        />
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HomeContent;
