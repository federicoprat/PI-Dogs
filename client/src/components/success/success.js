import styles from "./success.module.css";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate()

  return <div className={styles.background}>
      <div className={styles.fotosContainer}>
        <p className={styles.exito}>Dog Created</p>
      <button onClick={() => navigate("/home")} className={styles.boton}>GO BACK HOME</button>
      </div>
  </div>;
};

export default Success;
