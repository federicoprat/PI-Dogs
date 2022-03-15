import styles from "./filtroAscOrDesc.module.css";

const FiltroAscOrDesc = ({ascOrDesc, handleAscOrDesc}) => {
  return (
    <>
    <p className={styles.p}>Cambiar orden</p>
    <select
      className={styles.select}
      value={ascOrDesc}
      onChange={(e) => handleAscOrDesc(e.target.value)}
    >
      <option value={'asc'}>Ascendente</option>
      <option value={'desc'}>Descendente</option>
    </select>
    </>
  );
};

export default FiltroAscOrDesc;
