import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container} >
      <div className={styles.spinner}></div>
      <div className={styles.loading}>Cargando datos...</div>
    </div>
  );
};

export default Spinner;
