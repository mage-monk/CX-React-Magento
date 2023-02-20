import { NavLink } from "react-router-dom";
import MagentoConfig from "../../config/Magento";
import styles from "./Footer.module.css";
import { GrMapLocation, GrPhone } from "react-icons/gr";
import { GiEnvelope } from "react-icons/gi";
import { SiFacebook, SiTwitter, SiLinkedin, SiGithub } from "react-icons/si";
import ToTop from "./ToTop";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer__distributed}>
        <div className={styles.footer__left}>
          <h3>
            <NavLink className={styles.footer_logo} to="/">
              <img src={MagentoConfig.logo} alt="logo" width="100" />
            </NavLink>
          </h3>
        </div>

        <div className={styles.footer__center}>
          <div>
            <GrMapLocation size={20} className="h-20 mr-10" />
            <p>
              <span>444 S. Cedros Ave</span> Solana Beach, California
            </p>
          </div>

          <div>
            <GrPhone size={20} className="h-20 mr-10 " />
            <p>+1.555.555.5555</p>
          </div>

          <div>
            <GiEnvelope size={20} className="h-20 mr-10" />
            <p>
              <a href="mailto:support@company.com">support@company.com</a>
            </p>
          </div>
        </div>

        <div className={styles.footer__right}>
          <p className={styles.footer__company__about}>
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div className={styles.footer__icons}>
            <a href="#">
              <SiFacebook size={20} />
            </a>
            <a href="#">
              <SiTwitter size={20} />
            </a>
            <a href="#">
              <SiLinkedin size={20} />
            </a>
            <a href="#">
              <SiGithub size={20} />
            </a>
          </div>
        </div>
      </div>
      <ToTop />
      <small className="copyright">
        <span>
          Copyright © 2023-present Deloitte, Inc. All rights reserved.
        </span>
      </small>
    </footer>
  );
};

export default Footer;
