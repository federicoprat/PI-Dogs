import styles from "./input.module.css";
import { useState } from "react";

const Input = ({ placeholder, name, valor }) => {
  const initialState = {
    name: "",
    pesoMin: 0,
    pesoMax: 0,
    alturaMin: 0,
    alturaMax: 0,
    lifeSpan: 0,
  };
  const [form, setForm] = useState(initialState);

  function handleChange(e) {
    e.preventDefault();
    setForm((prev) => {
      return { ...prev, [e.name]: [e.target.value] };
    });
  }

  return (
    <input
      onChange={(e) => handleChange(e)}
      value={form[valor]}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
