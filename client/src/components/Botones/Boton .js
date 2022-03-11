import styles from "./Boton.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {turnPage} from '../../redux/actions'
import { ACTIONS } from "../../redux/actions";

const Boton = ({ description, name, disabled }) => {
  const page = useSelector(state => state.dogs.page)
  const dogs = useSelector(state => state.dogs.dogs)
  const dispatch = useDispatch()

  function clickHandler(event) {
    if (event === ACTIONS.NEXT_PAGE && !(page * 8 > dogs.length - 1)) {
      dispatch(turnPage(event))
    }
    else if (event === ACTIONS.PREVIOUS_PAGE && !(page <= 0)) {
      dispatch(turnPage(event))
    }
  }

  return <button disabled={disabled} onClick={(e) => clickHandler(e.target.name)} name = {name} className={styles.boton}>{description}</button>;
};
export default Boton;
