import React from "react";
import styles from "./popUp.module.css";

function PopUp({ render, setPopUp, temperamentos, checked, setChecked }) {

  function handleClose(e) {
    e.preventDefault();
    setPopUp(false);
  }

  function handleOnChange(posicion) {
    const checkStateActualizado = checked.map((elemento, index) =>
      index === posicion ? !elemento : elemento
    );
    setChecked(checkStateActualizado);
  }

  return render ? (
    <div className={styles.background}>
      <button className={styles.boton} onClick={(e) => handleClose(e)}>
        X
      </button>
      <div className={styles.container}>
        {temperamentos.map((elemento, index) => {
          return (
            <span className={"spanInput"}>
              <input
                type="checkbox"
                id={elemento.name}
                name={elemento.name}
                value={elemento.name}
                key={elemento.name}
                checked={checked[index]}
                onChange={() => handleOnChange(index)}
                className={"input"}
              />
              <label htmlFor={`${elemento.name}`}>{elemento.name}</label>
            </span>
          );
        })}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUp;
