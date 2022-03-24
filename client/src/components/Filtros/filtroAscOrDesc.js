import styles from "./filtroAscOrDesc.module.css";

const FiltroAscOrDesc = ({ascOrDesc, handleAscOrDesc}) => {
  return (
    <>
    <p className={styles.p}>By Order</p>
    <select
      className={styles.select}
      value={ascOrDesc}
      onChange={(e) => handleAscOrDesc(e.target.value)}
    >
      <option value={'asc'}>Ascendant</option>
      <option value={'desc'}>Descendant</option>
    </select>
    </>
  );
};

export default FiltroAscOrDesc;
