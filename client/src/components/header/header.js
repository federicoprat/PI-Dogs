import styles from "./header.module.css";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch, descripcion, searchbar }) => {
  if (searchbar)
    return (
      <div className={styles.header}>
        <div className={styles.lineas}>
          <SearchBar search={search} setSearch={setSearch} /> {descripcion}
          <Link to="/createdog" className={styles.crearPerro}>
            <div >Create a dog</div>
          </Link>
        </div>
      </div>
    );
  else
    return (
      <div className={styles.header}>
        <div className={styles.lineas}>
          <Link to="/home" className={styles.irAtras}>
            <div >GO BACK</div>
          </Link>
          {descripcion}
        </div>
      </div>
    );
};

export default Header;
