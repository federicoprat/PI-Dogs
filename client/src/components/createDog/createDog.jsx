import styles from "./createDog.module.css";
import Header from "../header/header";
import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    console.log(checked);
  }, checked);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("pesoMin");
  }, [form.pesoMin]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("pesoMax");
  }, [form.pesoMax]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("alturaMin");
  }, [form.alturaMin]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("alturaMax");
  }, [form.alturaMax]);
  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateNumber("lifeSpan");
  }, [form.lifeSpan]);

  useEffect(() => {
    if (!inicio) {
      return (inicio.current = false);
    }
    validateName();
  }, [form.name]);

  function handleChange(e) {
    e.preventDefault();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validateNumber(name) {
    if (!/^[0-9]*$/.test(form[name])) {
      setErrors((prev) => ({ ...prev, [name]: "Solo se permiten numeros" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validateName() {
    if (!/^[A-Za-z]+$/.test(form.name)) {
      setErrors((prev) => ({
        ...prev,
        name: "Solo se permiten letras sin espacios",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  }
  function handlePopUp (e) {
    e.preventDefault()
    setPopUp(true)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const temperamentosData = []
    checked.map((elemento, index) => {
      if (elemento) temperamentosData.push(index+1)
    })
    console.log({temperamentosData})
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
      form.name && temperamentosData.length
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
          console.log(postRequest)
        }
        else if (postRequest.status === 500) {
          console.log(postRequest)
          alert("algo salio mal")
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("hay campos con errores");
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
            {form.name ? errors.name : "campo requerido"}
          </p>
        </div>
        <div className={styles.pesoMinimo}>
          <input
            placeholder="Peso minimo"
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
            {form.pesoMin ? errors.pesoMin : "campo requerido"}
          </p>
        </div>
        <div className={styles.pesoMaximo}>
          <input
            placeholder="Peso maximo"
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
            {form.pesoMax ? errors.pesoMax : "campo requerido"}
          </p>
        </div>
        <div className={styles.alturaMaxima}>
          <input
            placeholder="Altura minima"
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
            {form.alturaMin ? errors.alturaMin : "campo requerido"}
          </p>
        </div>
        <div className={styles.alturaMinima}>
          <input
            placeholder="Altura maxima"
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
            {form.alturaMax ? errors.alturaMax : "campo requerido"}
          </p>
        </div>
        <div className={styles.lifeSpan}>
          <input
            placeholder="Esperanza de vida"
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
            {form.lifeSpan ? errors.lifeSpan : "campo requerido"}
          </p>
        </div>
        <button className={styles.botonTemperamentos} onClick={(e) => handlePopUp(e)} >Desplegar temperamentos</button>
        <input className={styles.boton} type="submit" name="boton" />
      </form>
    </div>
  );
};

export default CreateDog;
