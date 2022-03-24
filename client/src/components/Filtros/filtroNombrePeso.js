import styles from "./filtroNombrePeso.module.css";

const FiltroNombreOPeso = ({orderBy, handleNameOrWeight}) => {
  return (
    <>
    <p className={styles.p}>By name or weight</p>
    <select
      className={styles.select}
      value={orderBy}
      onChange={(e) => handleNameOrWeight(e.target.value)}
    >
      <option value={'name'}>Name</option>
      <option value={'weight'}>Weight</option>
    </select>
    </>
  );
};

export default FiltroNombreOPeso;
