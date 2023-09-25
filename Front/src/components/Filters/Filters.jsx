import { useDispatch, useSelector } from "react-redux";
import { ORDEN, GENFILTER } from "../../Redux/Actions";

import style from "./Filters.module.css";

function Filters() {
  const dispatch = useDispatch();


  const generos = useSelector((state) => state.genres);
  const handleGenChange = () => {
    return (e) => {
      console.log(e.target.value)
      dispatch({ type: GENFILTER, payload: e.target.value });
    };
  };

  const handleOrden = () => {
    return (e) => {
      dispatch({ type: ORDEN, payload: e.target.value });

    }
  }

  return (
    <div className={style.container}>
    <select onChange={handleOrden()}>
        <option value="">ORDEN</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
    </select>
    <select onChange={handleGenChange()}>
        <option value="">GENERO</option>
        <option value="all">All</option>
        {generos.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
        ))}
    </select>
        

    </div>
  )
}

export default Filters