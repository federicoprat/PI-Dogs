import styles from "./Filtros.module.css";

const Filtros = ({children}) => {
 
  return (
    <div className={styles.container} >
      {children}
    </div>
  );
};

export default Filtros;
