import { showServerMessage } from "../../Utils/server-messages";
import {
    useParams,
    useNavigate,
  } from 'react-router-dom';
import axios from "axios";


function Delete() {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleSubmit = () => {
        const endpoint = `http://localhost:3001/videogames/${id}`;
        axios
            .delete(endpoint)
            .then((data) => {
                if (data.data) {
                    showServerMessage("Videojuego eliminado", "success");
                    navigate(`/home/${1}`);
                } else {
                    showServerMessage("No se pudo eliminar el videojuego", "error");
                }
            })
            .catch((error) => {
                showServerMessage("Delete = " + error.message, "error");
            });
    }
  return (
    <div>
        <h1>Borrando</h1>
        <h4>¿Realmente desea borrar esta entrada de la DB?</h4>
        <button onClick={handleSubmit}>Si</button>
        <button onClick={() => navigate(-1)}>No</button>
    </div>
  )
}

export default Delete