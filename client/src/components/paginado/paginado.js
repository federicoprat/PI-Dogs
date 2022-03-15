import styles from "./paginado.module.css";
import PaginaOn from "./paginaOn";
import PaginaOff from "./paginaOff";

const Paginado = ({page, pages}) => {
  const paginas = [];

  for (let i = 0; i < pages; i++) {
    paginas.push(i);
  }

  return (
    <div className={styles.container}>
      {paginas.map((elemento) => {
        return (elemento === page ? (
          <PaginaOn pagina={elemento} key={elemento} />
        ) : (
          <PaginaOff pagina={elemento} key={elemento} />
        ));
      })}
    </div>
  );
};

export default Paginado;
