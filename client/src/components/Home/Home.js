import Fotos from "../Fotos/Fotos";
import Foto from "../Foto/Foto";
import styles from "./Home.module.css";
import Store from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addRaces } from "../../redux/actions";
import Spinner from "../Spinner/spinner";
import Boton from "../Botones/Boton ";
import { ACTIONS } from "../../redux/actions";
import Filtros from "../Filtros/Filtros";
import FiltroTemperamento from "../Filtros/filtroTemperamentos";
import FiltroCreados from "../Filtros/filtroCreados";
import Header from "../header/header";
import DogBackground from "../dogBackground/dogBackground";

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector(({ dogs }) => dogs.dogs); // todos los perros
  const page = useSelector(({dogs}) => dogs.page);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedTemperament, setSelectedTemperament] = useState("None");
  const [state, setState] = useState("todos");
  const [search, setSearch] = useState("");
  const [ascOrDesc, setAscOrDesc] = useState("desc")
  const [orderBy, setOrderBy] = useState("id")


  function handleTemperamentChange(temperament) {
    setSelectedTemperament(temperament);
  }

  function handleChange(option) {
    setState(option);
  }

  const dogOrdenado = [...dogs];
  function ordenadora(ascOrDesc, orderBy) {
    dogOrdenado.sort((a, b) => {
      let nombreA = a[orderBy],
        nombreB = b[orderBy];
      if (ascOrDesc === "asc") {
        if (nombreA < nombreB) return -1;
        if (nombreB < nombreA) return 1;
        return 0;
      } else if (ascOrDesc === "desc") {
        if (nombreA > nombreB) return -1;
        if (nombreB > nombreA) return 1;
        return 0;
      }
    });
  }

  useEffect(() => {
    try {
      setError(false);
      setLoading(true);
      Store.subscribe(() => {
        setLoading(false);
      });
      dispatch(addRaces(selectedTemperament, state, search, orderBy, ascOrDesc));
    } catch (error) {
      setError(true);
    }
  }, [dispatch, selectedTemperament, state, search]);

  return (
    <div className={styles.background}>
      <DogBackground />
      <Header
        search={search}
        setSearch={setSearch}
        descripcion="Dogs database"
        searchbar
      />
      <div className={styles.filtrosContainer}>
        <Filtros>
          <FiltroTemperamento
            handleTemperamentChange={handleTemperamentChange}
            selectedTemperament={selectedTemperament}
          />
          <FiltroCreados state={state} handleChange={handleChange} />
        </Filtros>
      </div>
      <div className={styles.fotosContainer}>
        <Boton
          name={ACTIONS.PREVIOUS_PAGE}
          description="Anterior"
          className="anterior"
          disabled={page <= 0}
        />
        {error ? (
          <div>HUBO UN ERROR</div>
        ) : (
          <Fotos className="hola">
            {loading ? (
              <Spinner />
            ) : dogs.length ? (
              dogs.map(
                (
                  {
                    id,
                    temperament,
                    weight,
                    image = "http://localhost:3001/dogimage?name=notFound",
                    name,
                  },
                  index
                ) => {
                  if (index >= 8 * page && index < 8 * page + 8) {
                    return (
                      <Foto
                        key={id}
                        name={name}
                        image={
                          image.slice(0, 4) === "http"
                            ? image
                            : `https://cdn2.thedogapi.com/images/${image}.jpg`
                        }
                        weight={weight}
                        temperament={temperament}
                        id={id}
                      />
                    );
                  } else return null;
                }
              )
            ) : (
              <div className={styles.notfound}>
                NO RESULTS FOR THE SEARCH {`"${search}"`.toUpperCase()}...
              </div>
            )}
          </Fotos>
        )}
        <Boton
          name={ACTIONS.NEXT_PAGE}
          description="Siguiente"
          className="siguiente"
          disabled={page >= Math.floor(dogs.length) / 8 - 1}
        />
      </div>
    </div>
  );
};

export default Home;
