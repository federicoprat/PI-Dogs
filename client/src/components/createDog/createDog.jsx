import styles from "./createDog.module.css";
import Header from "../header/header";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../Temperamentos/popUp";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../redux/actions";

const CreateDog = () => {
  const initialStateForm = {
    name: "",
    pesoMin: "",
    pesoMax: "",
    alturaMin: "",
    alturaMax: "",
    lifeSpan: "",
  };
  const initialStateError = {
    name: "",
    pesoMin: "",
    pesoMax: "",
    alturaMin: "",
    alturaMax: "",
    lifeSpan: "",
  };
  const [form, setForm] = useState(initialStateForm);
  const [errors, setErrors] = useState(initialStateError);
  const [popUp, setPopUp] = useState(false)
  const inicio = useRef(true);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  const [checked, setChecked] = useState(
    new Array(124).fill(false)
  );

  const validateNumber = useCallback((name) => {
    if (!/^[0-9]*$/.test(form[name])) {
      setErrors((prev) => ({ ...prev, [name]: "Solo se permiten numeros" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [form])

  const validateName = useCallback(() => {
    if (!/^[A-Za-z]+$/.test(form.name)) {
      setErrors((prev) => ({
        ...prev,
        name: "Solo se permiten letras sin espacios",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  }, [form.name])


  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("pesoMin");
  }, [form.pesoMin, validateNumber]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("pesoMax");
  }, [form.pesoMax, validateNumber]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("alturaMin");
  }, [form.alturaMin, validateNumber]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("alturaMax");
  }, [form.alturaMax, validateNumber]);
  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("lifeSpan");
  }, [form.lifeSpan, validateNumber]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateName();
  }, [form.name, validateName]);

  function handleChange(e) {
    e.preventDefault();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePopUp (e) {
    e.preventDefault()
    setPopUp(true)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const temperamentosData = []
    checked.map((elemento, index) => {
      if (elemento) return temperamentosData.push(index+1)
      else return null
    })
    if (
      !errors.pesoMin &&
      !errors.pesoMax &&
      !errors.alturaMin &&
      !errors.alturaMax &&
      !errors.lifeSpan &&
      !errors.name &&
      form.pesoMin &&
      form.pesoMax &&
      form.alturaMin &&
      form.alturaMax &&
      form.lifeSpan &&
      form.name && temperamentosData.length <= 3
      && temperamentosData.length > 0
    ) {
      try {
        const postRequest = await fetch("http://localhost:3001/dog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.toLowerCase(),
            alturaMin: form.alturaMin,
            alturaMax: form.alturaMax,
            pesoMin: form.pesoMin,
            pesoMax: form.pesoMax,
            lifeSpan: form.lifeSpan,
            temperamento: temperamentosData
          }),
        });
        if (postRequest.status === 200) {
          navigate("/success")
        }
        else if (postRequest.status === 500) {
          alert("something went wrong..")
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("There are fields with errors");
    }
  }

  return (
    <div className={styles.background}>
      <PopUp render={popUp} setPopUp={setPopUp} temperamentos={temperamentos} checked={checked} setChecked={setChecked} />
      <Header descripcion="Create a dog" searchbar={false} />
      <form className={styles.fotosContainer} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.name}>
          <input
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            style={{
              boxShadow: errors.name ? "0 0 20px 0 rgb(236, 16, 16)" : null,
              border: errors.name ? "2px solid rgb(192, 0, 0)" : null,
            }}
          />
          <p className={styles.errorName}>
            {form.name ? errors.name : "required field"}
          </p>
        </div>
        <div className={styles.pesoMinimo}>
          <input
            placeholder="Min weight (kg)"
            name="pesoMin"
            value={form.pesoMin}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            style={{
              boxShadow: errors.pesoMin ? "0 0 20px 0 rgb(236, 16, 16)" : null,
              border: errors.pesoMin ? "2px solid rgb(192, 0, 0)" : null,
            }}
          />
          <p className={styles.errorPesoMin}>
            {form.pesoMin ? errors.pesoMin : "required field"}
          </p>
        </div>
        <div className={styles.pesoMaximo}>
          <input
            placeholder="Max weight (kg)"
            name="pesoMax"
            value={form.pesoMax}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            style={{
              boxShadow: errors.pesoMax ? "0 0 20px 0 rgb(236, 16, 16)" : null,
              border: errors.pesoMax ? "2px solid rgb(192, 0, 0)" : null,
            }}
          />
          <p className={styles.errorPesoMax}>
            {form.pesoMax ? errors.pesoMax : "required field"}
          </p>
        </div>
        <div className={styles.alturaMinima}>
          <input
            placeholder="Min height (cm)"
            name="alturaMin"
            value={form.alturaMin}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            style={{
              boxShadow: errors.alturaMin
                ? "0 0 20px 0 rgb(236, 16, 16)"
                : null,
              border: errors.alturaMin ? "2px solid rgb(192, 0, 0)" : null,
            }}
          />
          <p className={styles.errorAlturaMin}>
            {form.alturaMin ? errors.alturaMin : "required field"}
          </p>
        </div>
        <div className={styles.alturaMaxima}>
          <input
            placeholder="Max height(cm)"
            name="alturaMax"
            value={form.alturaMax}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            style={{
              boxShadow: errors.alturaMax
                ? "0 0 20px 0 rgb(236, 16, 16)"
                : null,
              border: errors.alturaMax ? "2px solid rgb(192, 0, 0)" : null,
            }}
          />
          <p className={styles.errorAlturaMax}>
            {form.alturaMax ? errors.alturaMax : "required field"}
          </p>
        </div>
        <div className={styles.lifeSpan}>
          <input
            placeholder="Life span (años)"
            name="lifeSpan"
            value={form.lifeSpan}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            style={{
              boxShadow: errors.lifeSpan ? "0 0 20px 0 rgb(236, 16, 16)" : null,
              border: errors.lifeSpan ? "2px solid rgb(192, 0, 0)" : null,
            }}
          />
          <p className={styles.errorLifeSpan}>
            {form.lifeSpan ? errors.lifeSpan : "required field"}
          </p>
        </div>
        <button className={styles.botonTemperamentos} onClick={(e) => handlePopUp(e)} >Show temperaments</button>
        <input className={styles.boton} type="submit" name="boton" value="Create"/>
      </form>
    </div>
  );
};

export default CreateDog;
