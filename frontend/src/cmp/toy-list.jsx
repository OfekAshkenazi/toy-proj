import { useNavigate } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy }) {
    const navigate = useNavigate()
    function onGoToAdd(toyId) {
        navigate(`/toy/edit/${toyId}`)
    }

    return (
        <ul className="toys-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview navigate={navigate} toy={toy} />
                    <div className="btn-list">
                        <button className="btn" onClick={() => onRemoveToy(toy._id)}>Delete</button>
                        <button className="btn" onClick={() => onGoToAdd(toy._id)}>edit</button>
                    </div>
                </li>)}
        </ul>
    )
}