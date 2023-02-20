import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { getProducts, getFilters } from "../../../api/catalog";
import { catalogActions } from "../../../store/catalog-slice";
import MagentoConfig from "../../../config/Magento";
import Filters from "./list/Filters";

import styles from "./Listing.module.css";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { GoGraph } from "react-icons/go";

const Listing = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state || {};
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const loading = useSelector((state) => state.catalog.loading);
  const applied = useSelector((state) => state.catalog.filterApplied);
  const hsProd = useSelector((state) => state.catalog.hasProducts);
  useEffect(() => {
    dispatch(getProducts(id)).then(function(products) {
      setProducts(products);
      let hasProds = false;
      dispatch(getFilters()).then(function(filters) {
        setFilters(filters);
      });
      hasProds = products.length > 0 ? true : false;
      dispatch(
        catalogActions.setHasProducts({
          hasProducts: hasProds,
        })
      );
    });
  }, [id]);

  const appliedFiltersHandler = (filters) => {
    // console.log(filters);
    dispatch(getProducts(id, filters)).then(function(products) {
      //console.log(products);
      setProducts(products);
    });
  };
  //console.log("abc", hsProd);
  return (
    <div>
      {loading && <div className="loading"></div>}
      <div className="row mb-32">
        <div className="col-3">
          {hsProd && (
            <Filters filters={filters} appliedFilters={appliedFiltersHandler} />
          )}
        </div>
        <div className="col-9">
          {!loading &&
            products.length > 0 &&
            products.map((product) => (
              <div
                className={`col-md-4 col-sm-6 col-xs-6  product-item `}
                key={product.id}
              >
                <div
                  className={`${styles.prod__list__item} ml-5 mr-5 prod-list-item c-main-gray mb-20`}
                >
                  <div className={`${styles._thumb} pos-relt`}>
                    <div
                      className={`${styles._inner} bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden`}
                    >
                      <Link
                        to={`/product/${product.url}`}
                        state={{ sku: product.sku }}
                        className={`${styles.c__main__gray} ${styles.cursor__pointer} `}
                      >
                        {product.image !== null &&
                          product.image !== "no_selection" && (
                            <img
                              className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden"
                              alt={product.name}
                              src={`${MagentoConfig.mediaUrl}catalog/product/${product.image}`}
                            />
                          )}

                        {(product.image === null ||
                          product.image === "no_selection") && (
                          <img
                            className="_inner bg-thumb-gray flex center-xs middle-xs br-3 overflow-hidden"
                            alt={product.name}
                            src={`${MagentoConfig.thumb}`}
                          />
                        )}
                      </Link>
                    </div>
                    <ul className="actions-link actions-secondary">
                      <li>
                        <button
                          className="action tocompare"
                          title="Add to Compare"
                        >
                          <GoGraph className="m-15" />
                        </button>
                      </li>
                      <li>
                        <button
                          className="action towishlist"
                          title="Add to Wish List"
                        >
                          <AiOutlineHeart className="m-15" />
                        </button>
                      </li>
                      <li>
                        <a className="action quickview" title="Quick View">
                          <AiOutlineSearch className="m-15" />
                        </a>
                      </li>
                    </ul>
                    <div className="action">
                      <button
                        title="Add to Cart"
                        className="action tocart btn-cart primary"
                      >
                        <span className="text">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${styles.pr__22} ${styles.mt__5} m-0 fw-4 pos-relt _title ws-normal text-center`}
                  >
                    <div className="d-il-block fw-4 c-dark-gray fw-6 ls-048 en-font fs-16 lh-20">
                      ${product.price}
                    </div>
                  </div>
                  <div
                    className={`${styles.c__dark__gray} ${styles.txt__overflow__ellipsis} ${styles.mt__4} m-0 fw-4 fs-14 lh-18 ls-064 text-center`}
                  >
                    <Link
                      to={`/product/${product.url}`}
                      state={{ sku: product.sku }}
                      className={`${styles.c__main__gray} ${styles.cursor__pointer} `}
                    >
                      <span>{product.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          {!loading && products.length === 0 && (
            <div className={styles.message__empty}>
              <div>We can't find products matching the selection.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
