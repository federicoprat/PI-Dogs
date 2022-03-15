import { useEffect, useState, useRef } from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ setSearch }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearch(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [state, setSearch]);
  return (
    <div className={styles.container}>
      <p >Search </p>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Search"
        className={styles.input}
      ></input>
    </div>
  );
};

export default SearchBar;
