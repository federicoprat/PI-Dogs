import { useEffect, useState } from "react";
import styles from "./filtroTemperamentos.module.css";

const FiltroTemperamento = ({
  handleTemperamentChange,
  selectedTemperament,
}) => {
  const estadoInicial = [{ id: 0, name: "None" }];
  const [temperament, setTemperament] = useState(estadoInicial);

  async function getTemperaments() {
    const temperament = await fetch("http://localhost:3001/temperament");
    const json = await temperament.json();
    setTemperament((prev) => [...prev, ...json]);
  }

  useEffect(() => {
    getTemperaments();
  }, []);

  return (
    <>
    <p className={styles.p}>By temperaments</p>
    <select
      className={styles.select}
      value={selectedTemperament}
      onChange={(e) => handleTemperamentChange(e.target.value)}
    >
      {temperament.map(({ name, id }) => {
        return (
          <option key={id} value={name}>
            {name}
          </option>
        );
      })}
    </select>
    </>
  );
};

export default FiltroTemperamento;
