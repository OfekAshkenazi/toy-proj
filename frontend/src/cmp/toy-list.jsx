import { useNavigate } from "react-router-dom";
import { ToyPreview } from "./toy-preview";


export function ToyList({ toys, onRemoveToy }) {
    const navigate = useNavigate()
    
    function onMoveToDetails(toyId) {
        navigate(`/toy/${toyId}`)
    }

    function onGoToAdd(toyId) {
        navigate(`/toy/edit/${toyId}`)
    }

    return (
        <ul className="toys-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="">
                        <button onClick={() => onMoveToDetails(toy._id)}>Details</button>
                        <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
                        <button onClick={() => onGoToAdd(toy._id)}>edit</button>
                    </div>
                </li>)}
        </ul>
    )
}