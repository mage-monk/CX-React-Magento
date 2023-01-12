import styles from "./SearchForm.module.css";
import Button from "../ui/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
const SearchForm = (props) => {
  const activeCls = props.active
    ? `${styles.block__content} ${styles.active}`
    : `${styles.block__content}`;
  const search__open = props.active
    ? `${styles.search__open}`
    : `${styles.search__closed}`;
  return (
    <div className={search__open}>
      <div className={activeCls}>
        <Button
          type="button"
          className={styles.btn__close}
          onClick={props.closeHanlder}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </Button>
        <form className={styles.minisearch} id="search_mini_form">
          <div className={styles.fieldsearch}>
            <label className={styles.label} forhtml="search">
              <span>Search</span>
            </label>
            <div className={styles.control}>
              <input
                type="text"
                id="search"
                placeholder="Search entire store here..."
                className={styles.input__text}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="submit"
              title="Search"
              className={styles.search}
              disabled="disabled"
            >
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
