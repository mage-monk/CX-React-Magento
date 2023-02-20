import styles from "./SearchForm.module.css";
import Button from "../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../api/catalog";
import { AiOutlineCloseCircle } from "react-icons/ai";
const SearchForm = (props) => {
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    console.log("handler", e.target.value);
    dispatch(search(e.target.value));
  };
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
          <AiOutlineCloseCircle size={30} />
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
                onChange={searchHandler}
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
