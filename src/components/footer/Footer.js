import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faPhoneSquare,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faTwitter,
  faGit,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className={styles.footer__distributed}>
      <div className={styles.footer__left}>
        <h3>
          Company<span>logo</span>
        </h3>

        <p className={styles.footer__links}>
          <a href="#" className={styles.link__1}>
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
        </p>

        <p className={styles.footer__company__name}>Company Name © 2015</p>
      </div>

      <div className={styles.footer__center}>
        <div>
          <FontAwesomeIcon icon={faLocation} />
          <p>
            <span>444 S. Cedros Ave</span> Solana Beach, California
          </p>
        </div>

        <div>
          <FontAwesomeIcon icon={faPhoneSquare} />

          <p>+1.555.555.5555</p>
        </div>

        <div>
          <FontAwesomeIcon icon={faEnvelope} />

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
            <FontAwesomeIcon icon={faFacebook} />
            {/* <i class="fa fa-facebook"></i> */}
          </a>
          <a href="#">
            {/* <i class="fa fa-twitter"></i> */}
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedinIn} />

            {/* <i class="fa fa-linkedin"></i> */}
          </a>
          <a href="#">
            {/* <i class="fa fa-github"></i> */}
            <FontAwesomeIcon icon={faGit} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
