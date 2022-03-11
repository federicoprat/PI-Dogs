import styles from "./header.module.css";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch, descripcion, searchbar }) => {
  if (searchbar)
    return (
      <div className={styles.header}>
        <div className={styles.lineas}>
          <SearchBar search={search} setSearch={setSearch} /> {descripcion}
        </div>
      </div>
    );
  else
    return (
      <div className={styles.header}>
        <div className={styles.lineas}>
          <Link to="/home" className={styles.irAtras}>
            <div >IR ATRAS</div>
          </Link>
          {descripcion}
        </div>
      </div>
    );
};

export default Header;
