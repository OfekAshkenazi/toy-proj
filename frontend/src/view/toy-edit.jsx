import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
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

    async function loadToy() {
        try {
            const toy = await toyService.get(toyId)
            setToyToEdit(toy)
        } catch (err) {
            showErrorMsg('Cannot load Toy')
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit({ ...toyToEdit, [field]: value })
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toyToEdit)
            navigate('/toy')
            showSuccessMsg('Toy Saved')
        } catch (err) {
            showErrorMsg('Cannot Save Toy')
        }
    }

    return (
        <section>
            <form onSubmit={onSaveToy}>
                <input type="text" name="name" value={toyToEdit.name} id="name" onChange={handleChange} placeholder="Name:" />
                <input type="number" name="price" value={toyToEdit.price} id="price" onChange={handleChange} placeholder="Give price" />
                <button className="btn">save</button>
            </form>
        </section>
    )
}