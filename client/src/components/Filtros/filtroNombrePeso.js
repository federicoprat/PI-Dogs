import styles from "./filtroNombrePeso.module.css";

const FiltroNombreOPeso = ({orderBy, handleNameOrWeight}) => {
  return (
    <>
    <p className={styles.p}>por nombre o peso</p>
    <select
      className={styles.select}
      value={orderBy}
      onChange={(e) => handleNameOrWeight(e.target.value)}
    >
      <option value={'name'}>Nombre</option>
      <option value={'weight'}>Peso</option>
    </select>
    </>
  );
};

export default FiltroNombreOPeso;
