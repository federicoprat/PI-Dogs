import styles from './Foto.module.css'
import { Link } from 'react-router-dom';

const Foto = ({ name, image, temperament, weight, id }) => {
  return (
    <>
      <div className={styles.container} >
        <img alt = {name} className={styles.imagen} src={image} />
        <Link to={`/dog/${id}`} className={styles.link}>
        <div className={styles.name}>{name}</div>
        </Link>
        <div className={styles.temperament}>{temperament.replaceAll(',', ', ')}</div>
        <div className={styles.weight}>weight(kg): {weight}</div>
      </div>
    </>
  );
};

export default Foto;
