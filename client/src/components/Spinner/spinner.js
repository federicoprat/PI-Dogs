import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container} >
      <div className={styles.spinner}></div>
      <div className={styles.loading}>Loading data...</div>
    </div>
  );
};

export default Spinner;
