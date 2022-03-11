import styles from "./Fotos.module.css";

const Fotos = ({children}) => {
  return <div className={styles.background}>{children}</div>;
};

export default Fotos;
