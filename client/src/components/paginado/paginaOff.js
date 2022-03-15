import { useDispatch } from "react-redux";
import { goToPage } from "../../redux/actions";
import styles from "./paginaOff.module.css";

const PaginaOff = ({ pagina }) => {
    const dispatch = useDispatch()
  return (
    <button onClick = {() => dispatch(goToPage(pagina))} className={styles.container}>
      <p className={styles.numero}>{pagina}</p>
    </button>
  );
};

export default PaginaOff;
