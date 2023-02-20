import { NavLink } from "react-router-dom";
import MagentoConfig from "../config/Magento";
const NotFound = () => {
  return (
    <div className="ta-c mt-100 p-20 ">
      <img className="w-120" src={MagentoConfig.notfound} alt="not found" />
      <div className="fs-16 fw-6 c-main-gray">Something is not right</div>
      <div className="fs-14 c-label-hint mt-5">
        Please try again, while we take a look at it
      </div>
      <button
        className="Button fw-6 fs-14 cap b-box br-3 b-green bg-green b-none c-white p-10 full-width mt-20 primary"
        type="button"
        role="button"
      >
        <NavLink to="/">
          <span className="Action">Continue Shopping</span>
        </NavLink>
      </button>
    </div>
  );
};

export default NotFound;
