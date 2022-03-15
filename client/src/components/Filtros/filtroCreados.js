import styles from "./filtroCreados.module.css";

const FiltroCreados = ({state, handleChange}) => {
  return (
    <>
    <p className={styles.p}>por creados</p>
    <select
      className={styles.select}
      value={state}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value={'todos'}>Todos</option>
      <option value={'creados'}>Solo Creados</option>
      <option value={'api'}>Solo de la API</option>
    </select>
    </>
  );
};

export default FiltroCreados;
