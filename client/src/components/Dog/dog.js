import styles from "./dog.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDogById } from "../../redux/actions";
import { useStore } from "react-redux";
import Spinner from "../Spinner/spinner";
import Header from "../header/header";
import DogBackground from "../dogBackground/dogBackground";


const Dog = () => {
  const id = useParams();
  const dog = useSelector(({ dog }) => dog.dog);
  const dispatch = useDispatch();
  const store = useStore();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    try {
      setLoading(true);
      dispatch(getDogById(id));
      store.subscribe(() => {
        setLoading(false)
      });
    } catch (error) {
      setLoading(false);
      console.log("algo salio mal");
    }
  }, [id, dispatch, store]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.background}>
          <Header descripcion={dog.map((el) => el.name)} searchbar={false} />
          <DogBackground />
          <div className={styles.container}>
            {dog.length ? dog.map(
              ({ name, image, height, weight, temperament, lifeSpan }) => {
                return (
                  <div key={name} className={styles.dog}>
                    <img src={image} className={styles.img} alt={name} />
                    <div className={styles.containerDatos}>
                      <div>Altura: {height} cm</div>
                      <div>Peso: {weight} Kg</div>
                      <div>Temperamento: {temperament.toString().replaceAll(',', ', ')}</div>
                      <div>Años de vida: {lifeSpan}</div>
                    </div>
                  </div>
                );
              }
            ) : <div style={{fontSize: '50px', color: 'rgb(60, 60, 60)'}}> NO HAY RESULTADOS </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dog;
