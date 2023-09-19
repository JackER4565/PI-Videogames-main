import style from './Navbar.module.css'
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import Getters from "../Getters/Getters";

function Navbar({genres, setLoading}) {

  return (
    <div className={style.container}>
        <Filters genres={genres}/>
        <SearchBar />
        <Getters setLoading={setLoading}/>
    </div>
  )
}

export default Navbar