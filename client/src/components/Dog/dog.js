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
              ({ name, image, height, weight, temperament, life_span }) => {
                return (
                  <div key={name} className={styles.dog}>
                    <img src={image} className={styles.img} alt={name} />
                    <div className={styles.containerDatos}>
                      <div>Height: {height} cm</div>
                      <div>Weight: {weight} Kg</div>
                      <div>Temperaments: {temperament.toString().replaceAll(',', ', ')}</div>
                      <div>Life span: {life_span}</div>
                    </div>
                  </div>
                );
              }
            ) : <div style={{fontSize: '50px', color: 'rgb(60, 60, 60)'}}> NO RESULTS </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dog;
