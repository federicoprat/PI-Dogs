import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <p className={styles.p}>The Dogs database</p>
          <Link to="/home" style={{textDecoration: "none"}}>
            <div className={styles.button}>
              <p>ENTRAR</p>
            </div>
          </Link>
          <div className={styles.infoContainer}>
            <ul>
              <li>Races</li>
              <li>Life span</li>
              <li>Temperaments</li>
              <li>and more</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
