import styles from "./filtroCreados.module.css";

const FiltroCreados = ({state, handleChange}) => {
  return (
    <>
    <p className={styles.p}>By creation</p>
    <select
      className={styles.select}
      value={state}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value={'todos'}>All</option>
      <option value={'creados'}>Only Created</option>
      <option value={'api'}>Only from API</option>
    </select>
    </>
  );
};

export default FiltroCreados;
