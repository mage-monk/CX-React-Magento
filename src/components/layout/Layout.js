import { Fragment } from "react";
import Footer from "../footer/Footer";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      {/* <main className={classes.main}>{props.children}</main> */}
      <div className={`${classes.container__browser} row center-xs no-gutters`}>
        <div className="col-xs-12 start-xs">{props.children}</div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
