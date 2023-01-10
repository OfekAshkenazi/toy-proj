import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toyService } from "../services/toy.service";
import { toyService } from "../services/toy-back.service";

import { saveToy } from "../store/toy.action";

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.get(toyId)
            .then(setToyToEdit)
            .catch(err => console.log(err))

    }
    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit({ ...toyToEdit, [field]: value })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <section>
            <form onSubmit={onSaveToy}>
                <input type="text" name="name" value={toyToEdit.name} id="name" onChange={handleChange} placeholder="Name:" />
                <input type="number" name="price" value={toyToEdit.price} id="price" onChange={handleChange} placeholder="Give price" />
                <button className="edit-save-btn">save</button>
            </form>
        </section>
    )
}