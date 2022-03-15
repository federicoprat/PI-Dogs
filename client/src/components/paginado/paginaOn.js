import styles from "./paginaOn.module.css";

const PaginaOn = ({ pagina }) => {
  return (
    <button className={styles.container}>
      <p className={styles.numero}>{pagina}</p>
    </button>
  );
};

export default PaginaOn;
