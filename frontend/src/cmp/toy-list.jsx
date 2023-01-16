import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()
    function onGoToAdd(toyId) {
        navigate(`/toy/edit/${toyId}`)
    }

    function getAdminBox(toyId) {
        if (user) {
            if (user.isAdmin) {
                return (
                    <div className="btn-list">
                        <button className="btn" onClick={() => onRemoveToy(toyId)}>Delete</button>
                        <button className="btn" onClick={() => onGoToAdd(toyId)}>edit</button>
                    </div>
                )
            } else return null
        } else return null
    }

    return (
        <ul className="toys-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview navigate={navigate} toy={toy} />
                    {getAdminBox(toy._id)}
                </li>)}
        </ul>
    )
}